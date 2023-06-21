import React from "react";

import featuredImg from "../../img/featured-img.jpg";
import { AiFillStar } from "react-icons/Ai";
import useFetch from "../../hooks/useFetch";

function PropertyList() {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/hotels/countByType"
  );
  const images = [
    "https://images.pexels.com/photos/774042/pexels-photo-774042.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/7071955/pexels-photo-7071955.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  return (
    <>
      <div name="featured-container" className=" bg-[#F5f5f5] md:p-14">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Property List
        </p>
        {loading ? (
          "loading"
        ) : (
          <div
            name="featured-items-list"
            className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-4 "
          >
            {data &&
              images.map((img, i) => (
                <div name="featured-item" className="bg-white " key={i}>
                  <div
                    style={{ backgroundImage: `url(${img})`, blur }}
                    name="featured-img"
                    className="md:p-3 sm:h-48 sm:w-56 border border-gray-400 w-80 h-80 bg-no-repeat rounded-t-xl bg-cover flex justify-start items-end "
                  ></div>

                  <div
                    name="featured-desc"
                    className="bg-white  p-3 flex md:flex-col gap-3 "
                  >
                    <div name="title-price" className="flex justify-between">
                      <p
                        name="title"
                        className="font-PlusJakartaSans font-semibold capitalize"
                      >
                        {" "}
                        {data[i]?.type}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <p name="location" className="font-PlusJakartaSans ">
                        {data[i]?.count} {data[i]?.type}s
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyList;
