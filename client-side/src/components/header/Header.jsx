import React from "react";
import { FaBed } from "react-icons/fa";
import { BsFillCalendarCheckFill } from "react-icons/Bs";
import { VscPerson } from "react-icons/vsc";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const Header = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);

  const [guests, setGuests] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleGuest = (name, operation) => {
    setGuests((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? guests[name] + 1 : guests[name] - 1,
      };
    });
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <>
      <div
        name="header-container"
        className="bg-[url('./img/header-image.jpg')]  m-4 p-1 rounded-2xl md:m-8 md:p-8 lg:flex lg:flex-col lg:gap-44"
      >
        <div>
          <h1 className="text-white font-bold font-PlusJakartaSans text-4xl px-3 pt-8 lg:max-w-[500px] lg:text-6xl ">
            Find the best place
          </h1>
        </div>
        <div name="search-wrapper" className="lg:flex  lg:justify-center ">
          <div
            name="search-header-container"
            className="bg-white flex flex-col py-4 px-6 gap-5 m-3 rounded-lg lg:flex-row lg:w-full lg:justify-between lg:rounded-full lg:px-16 lg:py-4 shadow-black shadow-lg"
          >
            <div name="input-item " className="flex flex-col gap-2 ">
              <div name="input-label" className="flex gap-4 items-center ">
                <p className="text-2xl">
                  <FaBed />
                </p>
                <label
                  name="label"
                  className="text-lg font-semibold text-gray-500"
                >
                  Location
                </label>
              </div>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full placeholder-gray-400  bg-white border border-solid border-white-500 rounded-full transition-all duration-200 ease-in-out hover:shadow hover:shadow-gray-500 text-center lg:rounded-full lg:px-2 "
              ></input>
            </div>
            <div name="input-item" className="flex flex-col gap-2 relative">
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
                {`${format(date[0].startDate, "MM/dd/yyyy")}  to ${format(
                  date[0].endDate,
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
                      setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
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
            <div name="input-item " className="flex flex-col gap-2 relative">
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
                {`${guests.adult} adult - ${guests.children} children - ${guests.room}  room`}
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
                      className="flex w-56 justify-between text-2xl font-semibold font-PlusJakartaSans"
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
                      className="flex w-56 justify-between text-2xl font-semibold font-PlusJakartaSans"
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
                    <div
                      name="room-item "
                      className="flex w-56 justify-between text-2xl font-semibold font-PlusJakartaSans"
                    >
                      <p>Room</p>
                      <div className="flex  gap-3">
                        <button
                          disabled={guests.room <= 1}
                          onClick={() => handleGuest("room", "d")}
                          className="border hover:border-blue-600 border-gray-500 px-2 "
                        >
                          -
                        </button>
                        <p>{guests.room}</p>
                        <button
                          onClick={() => handleGuest("room", "i")}
                          className="border hover:border-blue-600 border-gray-500 px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="bg-[#fb445b] w-[100%] rounded p-4 text-white text-xl font-semibold lg:rounded-full lg:w-52 ">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;