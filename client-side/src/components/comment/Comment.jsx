import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../adminPanel/admin-side/src/hooks/useFetch";
import axios from "axios";

const Comment = () => {
  const [state, setState] = useState(false);
  const [helpful, setHelpful] = useState(true);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const MAX_RATING = 5;

  const { id } = useParams();

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/v1/hotels/${id}/reviews`
  );

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user._id;

  const isSubmitted = data.reviews?.some(
    (review) => review.user._id === userId
  );
  console.log(isSubmitted);
  const handleAddFeedback = (e) => {
    setState(true);
  };

  const handleAddReview = async () => {
    const reviewData = {
      hotel: id,
      rating,
      title,
      comment,
    };

    try {
      await axios.post("http://localhost:8800/api/v1/reviews", reviewData, {
        withCredentials: true,
      });
      setState(false);

      reFetch();
      // Review created successfully
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handleHelpfulClick = async (reviewId) => {
    try {
      await axios.put(
        `http://localhost:8800/api/v1/reviews/helpful/${reviewId}`,
        {},
        { withCredentials: true }
      );

      reFetch(data.reviews.numOfHelpful);
      // handle success if needed
    } catch (error) {
      console.log(error);
      // handle error if needed
    }
  };

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            {!isSubmitted ? (
              <button
                type="submit"
                onClick={handleAddFeedback}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Add your feedback
              </button>
            ) : (
              <p className="font-semibold text-green-700">
                You already submitted a review!
              </p>
            )}
            <div className="flex pl-0 space-x-1 sm:pl-2"></div>
          </div>
        </div>

        {loading
          ? "Loading"
          : data.reviews &&
            data.reviews.map((review) => (
              <article className="w-[500px] " key={review._id}>
                <div className="flex items-center mb-4 space-x-4 ">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      review.user.img
                      // "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    }
                    alt=""
                  />
                  <div className="space-y-1 font-medium dark:text-white">
                    <p>
                      {review.user.name} {review.user.lastname}
                      <time
                        dateTime={review.user.createdAt}
                        className="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        Joined on{" "}
                        {new Date(review.user.createdAt).toLocaleDateString()}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-1">
                  {[...Array(MAX_RATING)].map((_, index) => {
                    const starNumber = index + 1;
                    const isFilled = starNumber <= review.rating;

                    return (
                      <svg
                        key={index}
                        aria-hidden="true"
                        className={`w-5 h-5 ${
                          isFilled ? "text-yellow-400" : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Star {starNumber}</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  })}
                  <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {review.title}
                  </h3>
                </div>
                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex gap-2">
                    Reviewed on
                    <time
                      dateTime={review.createdAt}
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                  </p>
                </footer>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {review.comment}
                </p>

                <a
                  href="#"
                  className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Read more
                </a>
                <aside>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {review.numOfHelpful} people found this helpful
                  </p>
                  <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                    <button
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      onClick={() => handleHelpfulClick(review._id)}
                      disabled={review.markedAsHelpful}
                    >
                      {review.markedAsHelpful ? "Marked as Helpful" : "Helpful"}
                    </button>
                    {/* <a
                      href="#"
                      className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Report abuse
                    </a> */}
                  </div>
                  <hr className="border-2 mt-10 rounded border-gray-300" />
                </aside>
              </article>
            ))}
      </div>

      {state ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setState(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 flex flex-col gap-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto  rounded-full">
                  <div class="flex  items-center">
                    {/*StarRating*/}
                    <div className="star-rating flex text-5xl">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= (hover || rating)
                                ? "text-[#facc15]"
                                : "off"
                            }
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            <span className="flex">&#9733;</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div class="px-4 py-2 flex flex-col gap-2 bg-white rounded-t-lg border border-gray-300 dark:bg-gray-800">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 text-sm text-gray-900 bg-white border border-gray-400 dark:bg-gray-800 focus:ring-0"
                    type="text"
                  />
                  <label for="comment" class="sr-only">
                    Your comment
                  </label>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    id="comment"
                    rows="4"
                    className="w-full  p-2 text-sm text-gray-900 bg-white border border-gray-400 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
              </div>
              <div className="items-center gap-2 mt-3 sm:flex">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-[#1d4ed8] rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={handleAddReview}
                >
                  Submit
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 bg-gray-300 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setState(false)}
                >
                  Undo
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Comment;
