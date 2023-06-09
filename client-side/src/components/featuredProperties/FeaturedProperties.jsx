import React from "react";

import featuredImg from "../../img/featured-img.jpg";
import { AiFillStar } from "react-icons/Ai";
import useFetch from "../../hooks/useFetch";

function FeaturedProperties() {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/hotels?featured=true"
  );
  return (
    <>
      <div name="featured-container" className=" bg-[#F5f5f5] md:p-14">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Featured Properties
        </p>
        <div
          name="featured-items-list"
          className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-3"
        >
          {loading ? (
            "loading"
          ) : (
            <>
              {" "}
              {data.map((item) => (
                <div
                  name="featured-item"
                  className="bg-[#F5f5f5] "
                  key={item._id}
                >
                  <div name="featured-img" className="p-3">
                    <img
                      src={item?.photos[0] || featuredImg}
                      className="bg-cover border border-transparent rounded-xl"
                      alt="featured-img"
                    />
                  </div>

                  <div
                    name="featured-desc"
                    className="bg-[#F5f5f5] p-3 flex flex-col gap-3 "
                  >
                    <div name="title-price" className="flex justify-between">
                      <p
                        name="title"
                        className="font-PlusJakartaSans font-semibold"
                      >
                        {item.name}
                      </p>
                      <p name="price" className="font-PlusJakartaSans ">
                        Starting from ${item.cheapestPrice} night
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <p name="location" className="font-PlusJakartaSans ">
                        {item.city}
                      </p>
                    </div>

                    <div
                      name="reviews-stars"
                      className="flex gap-4 items-center"
                    >
                      <div className="text-yellow-500 flex">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </div>
                      {item.rating && (
                        <p className="font-PlusJakartaSans">
                          {item.rating} ~ 6 reviews
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FeaturedProperties;
