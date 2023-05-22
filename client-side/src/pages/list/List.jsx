import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import SearchItem from "../../components/searchItem/SearchItem";
import Email from "../../components/emailFeature/Email";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [guests, setGuests] = useState(location.state.guests);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/v1/hotels?city=${destination}&min=${
      min || 0
    }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div
        name="list-wrapper"
        className="flex flex-col lg:flex-row lg:justify-around relative "
      >
        <div name="searchItems">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </>
          )}
        </div>
        <div
          name="listContainer"
          className="bg-gray-300 rounded-lg flex flex-col sticky top-4 gap-5 p-4 px-20  items-center h-fit font-PlusJakartaSans"
        >
          <p className="text-xl">Search</p>
          <div className=" flex flex-col gap-2 items-center sm:items-start ">
            <label>Destination</label>
            <input
              type="text"
              placeholder={destination}
              disabled
              className="w-56 rounded p-1"
            ></input>
            <label>Check-in date</label>
            <span className="w-56 rounded p-1 bg-white text-gray-400">{`${format(
              dates[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
          </div>
          <p className="text-xl">Guests-Options</p>
          <div className="flex flex-col gap-4 sm:w-56">
            <div className="flex justify-between items-center ">
              <label>Min price (per night)</label>
              <input
                type="number"
                onChange={(e) => setMin(e.target.value)}
                className="w-12 rounded "
              />
            </div>
            <div className="flex justify-between ">
              <label>Max price (per night)</label>
              <input
                type="number"
                onChange={(e) => setMax(e.target.value)}
                className="w-12 rounded "
              />
            </div>
            <div className="flex justify-between ">
              <label>Adult</label>
              <input
                type="number"
                className="w-12 rounded text-center"
                min={1}
                placeholder={guests.adult}
              />
            </div>
            <div className="flex justify-between ">
              <label>Children</label>
              <input
                type="number"
                className="w-12 rounded text-center"
                placeholder={guests.children}
                min={0}
              />
            </div>
            <div className="flex justify-between ">
              <label>Room</label>
              <input
                type="number"
                className="w-12 rounded text-center"
                placeholder={guests.room}
                min={1}
              />
            </div>
          </div>
          <p className="text-xl">Rating</p>
          <div
            name="ratings-options"
            className="flex justify-center sm:justify-start"
          >
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2">
                <input type="checkbox"></input>
                <label>Wonderful: 9+</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox"></input>
                <label>Very Good: 8+</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox"></input>
                <label>Good: 7+</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              onClick={handleClick}
              className="bg-black text-white w-full rounded p-2"
            >
              Search
            </button>
          </div>
          <div className="border border-b-gray-600"></div>
        </div>
      </div>
      <div>
        <Email />
        <Footer />
      </div>
    </div>
  );
};

export default List;
