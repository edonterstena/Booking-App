import React from "react";

import featuredImg from "../../img/featured-img.jpg";
import { AiFillStar } from "react-icons/Ai";

function Featured() {
  return (
    <>
      <div name="featured-container" className=" bg-white ">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Perfect holiday deals
        </p>
        <div
          name="featured-items-list"
          className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-3"
        >
          <div name="featured-item" className="bg-white ">
            <div name="featured-img" className="p-3">
              <img
                src={featuredImg}
                className="bg-cover border border-transparent rounded-xl"
                alt="featured-img"
              />
            </div>

            <div
              name="featured-desc"
              className="bg-white  p-3 flex flex-col gap-3 "
            >
              <div name="title-price" className="flex justify-between">
                <p name="title" className="font-PlusJakartaSans font-semibold">
                  Entire Guest Suite
                </p>
                <p name="price" className="font-PlusJakartaSans ">
                  $74.00 night
                </p>
              </div>
              <div className="flex justify-start">
                <p name="location" className="font-PlusJakartaSans ">
                  Tourlos, Mikonos, Grecce
                </p>
              </div>

              <div name="reviews-stars" className="flex gap-4 items-center">
                <div className="text-[#fb445b] flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p className="font-PlusJakartaSans">8.5 ~ 6 reviews</p>
              </div>
            </div>
          </div>
          <div name="featured-item" className="bg-white ">
            <div name="featured-img" className="p-3">
              <img
                src={featuredImg}
                className="bg-cover border border-transparent rounded-xl"
                alt="featured-img"
              />
            </div>

            <div
              name="featured-desc"
              className="bg-white  p-3 flex flex-col gap-3 "
            >
              <div name="title-price" className="flex justify-between">
                <p name="title" className="font-PlusJakartaSans font-semibold">
                  Entire Guest Suite
                </p>
                <p name="price" className="font-PlusJakartaSans ">
                  $74.00 night
                </p>
              </div>
              <div className="flex justify-start">
                <p name="location" className="font-PlusJakartaSans ">
                  Tourlos, Mikonos, Grecce
                </p>
              </div>

              <div name="reviews-stars" className="flex gap-4 items-center">
                <div className="text-[#fb445b] flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p className="font-PlusJakartaSans">8.5 ~ 6 reviews</p>
              </div>
            </div>
          </div>
          <div name="featured-item" className="bg-white ">
            <div name="featured-img" className="p-3">
              <img
                src={featuredImg}
                className="bg-cover border border-transparent rounded-xl"
                alt="featured-img"
              />
            </div>

            <div
              name="featured-desc"
              className="bg-white  p-3 flex flex-col gap-3 "
            >
              <div name="title-price" className="flex justify-between">
                <p name="title" className="font-PlusJakartaSans font-semibold">
                  Entire Guest Suite
                </p>
                <p name="price" className="font-PlusJakartaSans ">
                  $74.00 night
                </p>
              </div>
              <div className="flex justify-start">
                <p name="location" className="font-PlusJakartaSans ">
                  Tourlos, Mikonos, Grecce
                </p>
              </div>

              <div name="reviews-stars" className="flex gap-4 items-center">
                <div className="text-[#fb445b] flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p className="font-PlusJakartaSans">8.5 ~ 6 reviews</p>
              </div>
            </div>
          </div>
          <div name="featured-item" className="bg-white ">
            <div name="featured-img" className="p-3">
              <img
                src={featuredImg}
                className="bg-cover border border-transparent rounded-xl"
                alt="featured-img"
              />
            </div>

            <div
              name="featured-desc"
              className="bg-white  p-3 flex flex-col gap-3 "
            >
              <div name="title-price" className="flex justify-between">
                <p name="title" className="font-PlusJakartaSans font-semibold">
                  Entire Guest Suite
                </p>
                <p name="price" className="font-PlusJakartaSans ">
                  $74.00 night
                </p>
              </div>
              <div className="flex justify-start">
                <p name="location" className="font-PlusJakartaSans ">
                  Tourlos, Mikonos, Grecce
                </p>
              </div>

              <div name="reviews-stars" className="flex gap-4 items-center">
                <div className="text-[#fb445b] flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p className="font-PlusJakartaSans">8.5 ~ 6 reviews</p>
              </div>
            </div>
          </div>
          <div name="featured-item" className="bg-white ">
            <div name="featured-img" className="p-3">
              <img
                src={featuredImg}
                className="bg-cover border border-transparent rounded-xl"
                alt="featured-img"
              />
            </div>

            <div
              name="featured-desc"
              className="bg-white  p-3 flex flex-col gap-3 "
            >
              <div name="title-price" className="flex justify-between">
                <p name="title" className="font-PlusJakartaSans font-semibold">
                  Entire Guest Suite
                </p>
                <p name="price" className="font-PlusJakartaSans ">
                  $74.00 night
                </p>
              </div>
              <div className="flex justify-start">
                <p name="location" className="font-PlusJakartaSans ">
                  Tourlos, Mikonos, Grecce
                </p>
              </div>

              <div name="reviews-stars" className="flex gap-4 items-center">
                <div className="text-[#fb445b] flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p className="font-PlusJakartaSans">8.5 ~ 6 reviews</p>
              </div>
            </div>
          </div>
          <div name="featured-item" className="bg-white ">
            <div name="featured-img" className="p-3">
              <img
                src={featuredImg}
                className="bg-cover border border-transparent rounded-xl"
                alt="featured-img"
              />
            </div>

            <div
              name="featured-desc"
              className="bg-white  p-3 flex flex-col gap-3 "
            >
              <div name="title-price" className="flex justify-between">
                <p name="title" className="font-PlusJakartaSans font-semibold">
                  Entire Guest Suite
                </p>
                <p name="price" className="font-PlusJakartaSans ">
                  $74.00 night
                </p>
              </div>
              <div className="flex justify-start">
                <p name="location" className="font-PlusJakartaSans ">
                  Tourlos, Mikonos, Grecce
                </p>
              </div>

              <div name="reviews-stars" className="flex gap-4 items-center">
                <div className="text-[#fb445b] flex">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p className="font-PlusJakartaSans">8.5 ~ 6 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Featured;
