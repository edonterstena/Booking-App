import React, { useContext } from "react";
import { FaBed } from "react-icons/fa";
import { BsFillCalendarCheckFill } from "react-icons/Bs";
import { VscPerson } from "react-icons/vsc";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { FaSearch } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // const [guests, setGuests] = useState({
  //   adult: 1,
  //   children: 0,
  //   // room: 1,
  // });

  // const handleGuest = (name, operation) => {
  //   setGuests((prev) => {
  //     return {
  //       ...prev,
  //       [name]: operation === "i" ? guests[name] + 1 : guests[name] - 1,
  //     };
  //   });
  // };

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates } });
    navigate("/hotels", { state: { destination, dates } });
  };

  return (
    <>
      <div
        name="header-container"
        className="bg-[url('./img/hotel-1.jpg')]  m-4 p-1 rounded-2xl md:m-8 md:p-8 lg:flex lg:flex-col lg:gap-44"
      >
        <div>
          <h1 className="text-gray-100 font-bold font-PlusJakartaSans text-4xl px-3 pt-8 lg:max-w-[500px] lg:text-6xl ">
            Find the best place
          </h1>
        </div>
        <div name="search-wrapper" className="lg:flex  w-full  ">
          <div
            name="search-header-container"
            className="bg-white flex flex-col py-4 px-6 gap-5 m-3 rounded-lg lg:flex-row lg:w-full lg:justify-between lg:rounded-full lg:px-10 lg:py-4 shadow-black shadow-lg"
          >
            <div name="input-item " className="flex w-full gap-3">
              <div className="flex  lg:w-full  gap-2 ">
                <div name="input-label" className="flex gap-4 items-center ">
                  <p className="text-2xl ">
                    <ImLocation2 />
                  </p>
                  {/* <label
                    name="label"
                    className="text-lg font-semibold text-gray-800"
                  >
                    Location
                  </label> */}
                </div>
                <input
                  type="text"
                  placeholder="Where are you going ?"
                  onChange={(e) => setDestination(e.target.value)}
                  className="lg:w-full placeholder-gray-600 bg-white border border-solid border-gray-500 rounded-full transition-all duration-200 ease-in-out hover:shadow hover:shadow-gray-500  lg:rounded-full lg:px-10 lg:py-5"
                ></input>
              </div>

              <button
                onClick={handleSearch}
                className=" self-center rounded-full p-4 text-white text-xl font-semibold  bg-black w-fit h-fit "
              >
                <FaSearch />
              </button>
            </div>
            {/* <div name="input-item" className="flex flex-col gap-2 relative">
              <div name="input-label " className="flex gap-4 items-center ">
                <p className="text-2xl">
                  <BsFillCalendarCheckFill />
                </p>
                <label
                  name="label"
                  className="text-lg font-semibold text-gray-500"
                >
                  Check In & Check Out
                </label>
              </div>
              <span
                onClick={() => setOpenCalendar(!openCalendar)}
                className="w-full text-gray-400 bg-white border border-solid  transition-all duration-200 ease-in-out border-white-500 rounded-full hover:shadow hover:shadow-gray-500 text-center lg:rounded-full lg:px-2"
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
                  className="lg:absolute lg:top-16 lg:left-0 lg:z-10 lg:flex-none lg:justify-normal flex justify-center z-10 "
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
                 
                </div>
              )}
            </div> */}
            {/* <div name="input-item " className="flex flex-col gap-2 relative">
              <div name="input-label" className="flex gap-4 items-center ">
                <p className="text-2xl ">
                  <VscPerson />
                </p>
                <label
                  name="label"
                  className="text-lg font-semibold text-gray-500"
                >
                  Guests
                </label>
              </div>
              <span
                onClick={() => setOpenGuest(!openGuest)}
                className="w-full  text-gray-400 bg-white border border-solid border-white-500  transition-all duration-200 ease-in-out rounded-full hover:shadow hover:shadow-gray-500 text-center lg:rounded-full lg:px-2 "
              >
                {`${guests.adult} adult - ${guests.children} children `}
              </span>
              {openGuest && (
                <div
                  name="guests"
                  className="lg:absolute lg:top-16 lg:left-0 lg:z-10 lg:flex-none lg:justify-normal flex justify-center z-10"

                  //   className=" fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50 "
                >
                  <div
                    name="guest-items-container"
                    className="flex flex-col gap-10 bg-white shadow-black shadow-lg   p-16 rounded-lg absolute 
                    "
                  >
                    <div
                      name="adult-item "
                      className="flex w-56 justify-between text-xl font-semibold font-PlusJakartaSans"
                    >
                      <p>Adult</p>
                      <div className="flex gap-3 ">
                        <button
                          disabled={guests.adult <= 1}
                          onClick={() => handleGuest("adult", "d")}
                          className="border hover:border-blue-600 border-gray-500 px-2"
                        >
                          -
                        </button>
                        <p>{guests.adult}</p>
                        <button
                          onClick={() => handleGuest("adult", "i")}
                          className="border hover:border-blue-600 border-gray-500 px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      name="children-item "
                      className="flex w-56 justify-between text-xl font-semibold font-PlusJakartaSans"
                    >
                      <p>Children</p>
                      <div className="flex gap-3 ">
                        <button
                          disabled={guests.children <= 0}
                          onClick={() => handleGuest("children", "d")}
                          className="border hover:border-blue-600 border-gray-500 px-2 "
                        >
                          -
                        </button>
                        <p>{guests.children}</p>
                        <button
                          onClick={() => handleGuest("children", "i")}
                          className="border hover:border-blue-600 border-gray-500 px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                   
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
