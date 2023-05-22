import React from "react";

import featuredImg from "../../img/featured-img.jpg";
import { AiFillStar } from "react-icons/Ai";
import useFetch from "../../hooks/useFetch";

function PropertyList() {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/hotels/countByType"
  );
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  return (
    <>
      <div name="featured-container" className=" bg-white md:p-14">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Perfect holiday deals
        </p>
        {loading ? (
          "loading"
        ) : (
          <div
            name="featured-items-list"
            className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-5 md:justify-items-center p-4"
          >
            {data &&
              images.map((img, i) => (
                <div name="featured-item" className="bg-white " key={i}>
                  <div
                    style={{ backgroundImage: `url(${img})`, blur }}
                    name="featured-img"
                    className="p-3 h-48 w-56 bg-no-repeat rounded-t-xl bg-cover flex justify-start items-end "
                  ></div>

                  <div
                    name="featured-desc"
                    className="bg-white  p-3 flex flex-col gap-3 "
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
                        {data[i]?.count} {data[i]?.type}
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
