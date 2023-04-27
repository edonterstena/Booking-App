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
        className="bg-[url('./img/header-image.jpg')] m-4 p-1 rounded-2xl  "
      >
        <div>
          <h1 className="text-white font-bold font-PlusJakartaSans text-4xl px-3 pt-8">
            Find the best place
          </h1>
        </div>
        <div
          name="search-header-container"
          className="bg-white flex flex-col py-4 px-6 gap-5 m-3 rounded-lg "
        >
          <div name="input-item " className="flex flex-col gap-2">
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
              className="w-full bg-gray-300 border border-solid border-white-500 rounded shadow shadow-gray-500 text-center"
            ></input>
          </div>
          <div name="input-item" className="flex flex-col gap-2">
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
              className="w-full text-gray-400 bg-gray-300 border border-solid border-white-500 rounded shadow shadow-gray-500 text-center"
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")}  to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}
                `}
            </span>
          </div>
          <div name="input-item " className="flex flex-col gap-2">
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
              className="w-full  text-gray-400 bg-gray-300 border border-solid border-white-500 rounded shadow shadow-gray-500 text-center"
            >
              {`${guests.adult} adult - ${guests.children} children - ${guests.room}  room`}
            </span>
          </div>
          <button className="bg-[#fb445b] w-[100%] rounded p-4 text-white text-xl font-semibold ">
            Search
          </button>
        </div>
      </div>

      {openCalendar && (
        <div
          name="calendar"
          className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50 "
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setDate([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date"
          />
          <div
            onClick={() => setOpenCalendar(!openCalendar)}
            className="bg-blue-700  w-screen p-3 rounded-lg  text-center text-white font-semibold"
          >
            OK
          </div>
        </div>
      )}
      {openGuest && (
        <div
          name="guests"
          className=" fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50 "
        >
          <div
            name="guest-items-container"
            className="flex flex-col gap-10 bg-white p-16 rounded-lg"
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
          <div
            onClick={() => setOpenGuest(!openGuest)}
            className="bg-blue-700  w-screen p-3 rounded-lg  text-center text-white font-semibold"
          >
            OK
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
