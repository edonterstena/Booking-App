import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import SearchItem from "../../components/searchItem/SearchItem";
import { BsFillCalendarCheckFill } from "react-icons/Bs";
import Email from "../../components/emailFeature/Email";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination);
  const [dates, setDates] = useState(
    location.state?.dates || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]
  );
  const [guests, setGuests] = useState(
    location.state?.guests || {
      adult: 1,
      children: 0,
      room: 1,
    }
  );
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [openCalendar, setOpenCalendar] = useState(false);

  useEffect(() => {
    if (dates && dates[0]) {
      setMin(dates[0].startDate);
      setMax(dates[0].endDate);
    }
  }, [dates]);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/v1/hotels${
      destination
        ? `?city=${destination}`
        : ""
        ? ""
        : `?min=${min || 0}&max=${max || 999}`
    }`
  );

  // const handleClick = () => {
  //   reFetch();
  // };

  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

  // const [guests, setGuests] = useState({
  //   adult: 1,
  //   children: 0,
  //   room: 1,
  // });

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, guests } });
    reFetch();
    // navigate("/hotels", { state: { destination, dates, guests } });
  };

  return (
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
      <div
        name="list-wrapper"
        className="flex flex-col lg:flex-row lg:justify-around relative m-10 gap-2 "
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
          className="bg-gray-300 rounded-lg  flex flex-col sticky top-4  gap-5 p-4 px-20  items-center h-fit font-PlusJakartaSans"
        >
          <p className="text-xl">Search</p>
          <div className=" flex flex-col gap-2 items-center sm:items-start ">
            <label>Destination</label>
            <input
              type="text"
              placeholder={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-56 rounded p-1"
            ></input>
            <label>Check-in date</label>
            {/* <span className="w-56 rounded p-1 bg-white text-gray-400">
              {dates && dates[0]
                ? `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`
                : "Dates are undefined"}
            </span> */}
            <div>
              <span
                onClick={() => setOpenCalendar(!openCalendar)}
                className="w-full lg:relative text-gray-400 bg-white border border-solid  transition-all duration-200 ease-in-out border-white-500  hover:shadow hover:shadow-gray-500 text-center  "
              >
                {`${format(dates[0].startDate, "MM/dd/yyyy")}  to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}
                `}
              </span>
              {openCalendar && (
                <div
                  name="calendar"
                  className="lg:absolute lg:top-50 lg:left-6 lg:z-10 lg:flex-none lg:justify-normal flex justify-center z-10 "
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDates([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date bg-white border border-gray-300 rounded-md shadow-black shadow-lg  sm:text-[12px] absolute"
                  />
                  {/* <div
                    onClick={() => setOpenCalendar(!openCalendar)}
                    className="bg-blue-700  w-screen p-3 rounded-lg  text-center text-white font-semibold"
                  >
                    OK
                  </div> */}
                </div>
              )}
            </div>
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
                placeholder={guests?.adult}
              />
            </div>
            <div className="flex justify-between ">
              <label>Children</label>
              <input
                type="number"
                className="w-12 rounded text-center"
                placeholder={guests?.children}
                min={0}
              />
            </div>
            {/* <div className="flex justify-between ">
              <label>Room</label>
              <input
                type="number"
                className="w-12 rounded text-center"
                placeholder={guests?.room}
                min={1}
              />
            </div> */}
          </div>

          <div className="flex justify-center w-full">
            <button
              onClick={handleSearch}
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
