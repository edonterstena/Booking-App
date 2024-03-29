import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../adminPanel/admin-side/src/hooks/useFetch";

const Rating = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );

  const calculatePercentage = (rating) => {
    const totalRatings = data.numOfReviews;
    const ratingPercentage = (rating / 5) * 100;
    return Math.round((ratingPercentage / totalRatings) * 10) / 10;
  };

  return (
    <div>
      <>
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className={`w-5 h-5 ${
                index < data.averageRating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Star {index + 1}</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            {data.averageRating} out of 5
          </p>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {data.numOfReviews} global ratings
        </p>
        {Array.from({ length: 5 }, (_, index) => (
          <div className="flex items-center mt-4" key={index}>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {5 - index} star
            </span>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{ width: `${calculatePercentage(5 - index)}%` }}
              />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {calculatePercentage(5 - index)}%
            </span>
          </div>
        ))}
      </>
    </div>
  );
};

export default Rating;
