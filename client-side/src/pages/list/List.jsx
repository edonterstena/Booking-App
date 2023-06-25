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
import { Oval } from "react-loader-spinner";

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
  // const [guests, setGuests] = useState(
  //   location.state?.guests || {
  //     adult: 1,
  //     children: 0,
  //     room: 1,
  //   }
  // );

  const [types, setTypes] = useState([]);

  const handleTypeChange = (event) => {
    const selectedTypes = [...types]; // Create a copy of the types array
    const typeValue = event.target.value;

    if (event.target.checked) {
      selectedTypes.push(typeValue); // Add the selected type to the array
    } else {
      const typeIndex = selectedTypes.indexOf(typeValue);
      if (typeIndex !== -1) {
        selectedTypes.splice(typeIndex, 1); // Remove the type if it exists in the array
      }
    }

    setTypes(selectedTypes); // Update the types state with the modified array
  };

  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const [openCalendar, setOpenCalendar] = useState(false);

  useEffect(() => {
    if (dates && dates[0]) {
      setMin(dates[0].startDate);
      setMax(dates[0].endDate);
    }
  }, [dates]);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/v1/hotels?${
      destination ? `destination=${destination}` : ""
    }${
      Array.isArray(types) && types.length > 0
        ? `&types=${types.join(",")}`
        : ""
    }${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""}`
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
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, types },
    });
    setMin(undefined); // Reset min state
    setMax(undefined);
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
            <div className="flex justify-center items-center h-80">
              <Oval
                height={80}
                width={80}
                color="green"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="
        #4f46e5"
                strokeWidth={4}
                strokeWidthSecondary={2}
              />
            </div>
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
            {/* <label>Check-in date</label>
         
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
                 
                </div>
              )}
            </div> */}
          </div>
          <hr className="border border-lg border-gray-800 w-full" />
          <h1 className="font-semibold flex self-center">Search by price: </h1>
          <div className="flex flex-col gap-4 sm:w-56">
            <div className="flex justify-between items-center  ">
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
            {/* <div className="flex justify-between ">
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
            </div> */}
          </div>
          <hr className="border border-lg border-gray-800 rounded-full w-full" />
          <div className="flex flex-col gap-4 sm:w-56">
            <h1 className="font-semibold flex self-center">Search by Type: </h1>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="hotel"
                value="hotel"
                onChange={handleTypeChange}
              />
              <label htmlFor="hotel">Hotel</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="villa"
                value="villa"
                onChange={handleTypeChange}
              />
              <label htmlFor="villa">Villa</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="apartment"
                value="apartment"
                onChange={handleTypeChange}
              />
              <label htmlFor="apartment">Apartment</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="house"
                value="house"
                onChange={handleTypeChange}
              />
              <label htmlFor="house">House</label>
            </div>
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
