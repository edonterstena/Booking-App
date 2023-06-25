import { AiFillCloseCircle } from "react-icons/Ai";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

const Reserve = ({ setOpen, hotelId, hotelPrice }) => {
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomsNumber, setSelectedRoomsNumber] = useState([]);

  const [emptyOptions, setEmptyOptions] = useState(false);

  const [roomPrice, setRoomPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openCalendar, setOpenCalendar] = useState(false);

  const [totalPrice, setTotalPrice] = useState(hotelPrice);

  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  let price = 0;
  console.log("days" + " " + days);
  console.log(hotelPrice);

  useEffect(() => {
    if (days === 0) {
      price += hotelPrice;
      console.log("price " + price);
      setTotalPrice(price);
    } else {
      price += hotelPrice * days;
      setTotalPrice(price);
    }
  }, [dates]);

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/room/${hotelId}`
  );

  console.log(data);
  // const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  // const isAvailable = (roomNumber) => {
  //   const isFound = roomNumber.unavailableDates.some((date) =>
  //     alldates.includes(new Date(date).getTime())
  //   );

  //   return !isFound;
  // };

  const isAvailable = (roomNumber) => {
    return roomNumber.unavailableDates.length == 0;
  };

  const handleSelect = (e, roomPrice, roomNumberId) => {
    const checked = e.target.checked;

    setSelectedRoomsNumber((prevSelectedRoomsNumber) => {
      if (checked) {
        return [...prevSelectedRoomsNumber, roomNumberId];
      } else {
        return prevSelectedRoomsNumber.filter((item) => item !== roomNumberId);
      }
    });

    setTotalPrice((prevTotalPrice) => {
      if (checked) {
        return prevTotalPrice + roomPrice;
      } else {
        return prevTotalPrice - roomPrice;
      }
    });
  };

  useEffect(() => {
    console.log(selectedRoomsNumber);
  }, [selectedRoomsNumber]);

  const handleSelectRoom = (e, roomPrice) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setRoomPrice(roomPrice);
    } else {
      setRoomPrice(0);
    }
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);
  console.log("Room price" + roomPrice);

  const navigate = useNavigate();

  console.log(selectedRoomsNumber);

  const handleClick = async () => {
    // const { dispatch } = useContext(SearchContext);

    // dispatch({
    //   type: "NEW_SEARCH",
    //   payload: { dates },
    // });

    if (
      selectedRooms.length > 0 &&
      selectedRoomsNumber.length > 0 &&
      alldates.length > 0
    ) {
      try {
        // await Promise.all(
        //   selectedRooms.map((roomId) => {
        //     const res = axios.put(
        //       `http://localhost:8800/api/v1/rooms/availability`,
        //       {
        //         roomNumberIds: selectedRooms,
        //         dates: alldates,
        //       },
        //       { withCredentials: true }
        //     );
        //     return res.data;
        //   })
        // );

        await axios.put(
          `http://localhost:8800/api/v1/rooms/availability`,
          {
            roomIds: selectedRooms,
            roomNumberIds: selectedRoomsNumber,
            dates: alldates,
          },
          { withCredentials: true }
        );

        setSuccess(true);
        // setOpen(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSuccess(false);

      setEmptyOptions(true);
    }
  };

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    let timer;
    if (emptyOptions) {
      timer = setTimeout(() => {
        setEmptyOptions(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [emptyOptions]);
  return (
    <div className="reserve">
      <div className="rContainer ">
        <AiFillCloseCircle onClick={() => setOpen(false)} />

        {/* <span className="w-56 rounded p-1 bg-white text-gray-400">
              {dates && dates[0]
                ? `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`
                : "Dates are undefined"}
            </span> */}

        <div className="grid grid-cols-2">
          <div className="mt-4">
            <label>Check-in date</label>
            <span
              onClick={() => setOpenCalendar(!openCalendar)}
              className="w-full lg:relative ml-2  text-gray-800 bg-gray-300 border rounded p-2 border-solid  transition-all duration-200 ease-in-out border-white-500  hover:shadow hover:shadow-gray-500 text-center  "
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

          <div>
            <span>Select your rooms:</span>
            {data.map((item) => (
              <>
                <div
                  className={`rItem flex ${
                    selectedRooms.includes(item?._id)
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }`}
                  key={item?._id}
                >
                  <div className="flex gap-2 ">
                    <label
                    // for={item?._id}
                    >
                      {" "}
                      Select Room:{" "}
                    </label>
                    <input
                      type="checkbox"
                      value={item?._id}
                      onClick={(e) => handleSelectRoom(e, item.price)}
                      className="w-5 "
                      // id={item?._id}
                    />
                  </div>

                  <div className="rItemInfo">
                    <div className="rTitle">{item?.title}</div>
                    <div className="rDesc">{item?.desc}</div>
                    <div className="rMax">
                      Max people: <b>{item?.maxPeople}</b>
                    </div>
                    <div className="rPrice">{item?.price}$</div>
                  </div>
                  <div className="rSelectRooms">
                    {item?.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber?._id} className="room">
                        <label className="text-black text-xs">
                          {roomNumber?.number}
                        </label>
                        <input
                          type="checkbox"
                          className=""
                          value={roomNumber?._id}
                          onChange={(e) =>
                            handleSelect(e, item.price, roomNumber?._id)
                          }
                          disabled={
                            !isAvailable(roomNumber)
                            // !selectedRoomsNumber.includes(roomNumber?._id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="rounded border-gray-400" />
              </>
            ))}

            <div className="flex flex-col  gap-2 self-end">
              <button onClick={handleClick} className="rButton w-fit">
                Reserve Now!
              </button>

              <p>Total price: {totalPrice}$</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
            <div className="flex justify-between py-3">
              <div className="flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rounded-full text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="self-center ml-3">
                  <span className="text-green-600 font-semibold">Success</span>
                  <p className="text-green-600 mt-1">
                    {data.type} has been reserved successfully.
                  </p>
                </div>
              </div>
              <button className="self-start text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {emptyOptions && (
          <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
            <div className="flex justify-between py-3">
              <div className="flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rounded-full text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="self-center ml-3">
                  <span className="text-red-600 font-semibold">Failed</span>
                  <p className="text-red-600 mt-1">
                    Please select all the options!
                  </p>
                </div>
              </div>
              <button className="self-start text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;
