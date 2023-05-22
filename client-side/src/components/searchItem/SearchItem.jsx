import React from "react";
import featuredImg from "../../img/featured-img.jpg";

import { GrCafeteria } from "react-icons/gr";
import { AiFillStar } from "react-icons/Ai";
import { Link } from "react-router-dom";
const SearchItem = ({ item }) => {
  return (
    <div className="p-6 sm:p-16 border lg:flex lg:justify-start lg:gap-5 border-y-gray-300 rounded-lg font-PlusJakartaSans ">
      <div name="img">
        <img
          src={item.photos[0]}
          className="bg-cover border border-transparent rounded-xl w-full lg:w-80"
          alt="featured-img"
        />
      </div>
      <div name="desc" className="flex flex-col gap-4 relative">
        <p className="sm:text-lg">{item.city}</p>
        <p name="title" className="lg:text-2xl font-semibold sm:text-3xl">
          {item.name}
        </p>
        <p>{item.description}</p>
        <div name="icons" className="flex gap-2">
          <GrCafeteria />
          <GrCafeteria />
          <GrCafeteria />
          <GrCafeteria />
          <GrCafeteria />
          <GrCafeteria />
          <GrCafeteria />
          <GrCafeteria />
        </div>

        <div name="reviews-price" className="flex justify-between lg:gap-40">
          <div name="review-stars" className="flex items-center gap-4">
            <div className="flex text-yellow-500">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <p> {item.rating || 8.45} Reviews</p>
          </div>
          <div name="price" className="flex flex-col">
            <p className="font-semibold text-lg">${item.cheapestPrice}</p>
            <p>{item.distance}m from center</p>
          </div>
        </div>
        <Link to={`/hotels/${item._id}`}>
          <button className="bg-[#5e90cb] text-white md:absolute md:top-2 md:right-2 p-2 rounded">
            Check Availability
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
