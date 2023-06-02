import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const EditRoom = () => {
  const [hotelId, setHotelId] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [rooms, setRooms] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // const { data, loading, error } = useFetch(
  //   "http://localhost:8800/api/v1/hotels"
  // );

  const {
    data: roomData,
    loading: roomLoading,
    error: roomError,
  } = useFetch(`http://localhost:8800/api/v1/rooms/${id}`);

  useEffect(() => {
    if (!roomLoading && roomData) {
      setTitle(roomData.title);
      setPrice(roomData.price);
      setMaxPeople(roomData.maxPeople);
      setDescription(roomData.description);
      if (roomData.roomNumbers && Array.isArray(roomData.roomNumbers)) {
        const roomNumbers = roomData.roomNumbers
          .map((room) => room.number)
          .join(", ");
        setRooms(roomNumbers);
      } else {
        setRooms("");
      }
    }
  }, [roomLoading, roomData]);

  // const handleHotelChange = (selectedOptions) => {
  //   const selectedIds = selectedOptions.map((option) => option.value);
  //   setHotelIds(selectedIds);

  // };

  // const customStyles = {
  //   control: (provided) => ({
  //     ...provided,
  //     width: 300, // Set the desired width
  //   }),
  //   multiValue: (provided) => ({
  //     ...provided,
  //     display: "flex",
  //     flexDirection: "row",
  //   }),
  //   multiValueLabel: (provided) => ({
  //     ...provided,
  //     whiteSpace: "nowrap",
  //   }),
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    let roomNumbers = [];
    if (rooms) {
      roomNumbers = rooms.split(",").map((room) => ({ number: room.trim() }));
    }
    try {
      await axios.put(
        `http://localhost:8800/api/v1/rooms/${id}`,

        { title, description, price, maxPeople, roomNumbers },
        { withCredentials: true }
      );
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
    console.log(roomNumbers);
  };

  return (
    <>
      {" "}
      <div>
        <h1 className="text-4xl flex justify-center font-semibold font-sans uppercase mb-20 text-gray-900">
          Edit Room
        </h1>
      </div>
      <div className="flex justify-center gap-20 ">
        <div className="">
          <form className="grid grid-cols-2 gap-4 items-center  ">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                placeholder="title"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                value={description}
                placeholder="description"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="text"
                value={price}
                placeholder="price"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Max people</label>
              <input
                value={maxPeople}
                type="text"
                placeholder="Max people"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setMaxPeople(e.target.value)}
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add Room Numbers
              </label>
              <textarea
                id="message"
                rows="4"
                value={rooms}
                className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="give comma between room numbers"
                onChange={(e) => setRooms(e.target.value)}
              ></textarea>
            </div>

            {/* <div className="self-start">
              <label>Choose Hotels</label>
              <Select
                isMulti
                options={data.map((hotel) => ({
                  key: hotel._id,
                  value: hotel.name,
                  label: hotel.name,
                }))}
                value={hotelIds.map((id) => ({ value: id, label: id }))}
                onChange={handleHotelChange}
                styles={customStyles}
              />
            </div> */}

            {/* <div name="select hotel" className="relative self-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-11  w-6 h-6 my-auto text-gray-400 right-2.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <label>Choose a Hotel</label>
              <select
                onChange={(e) => setHotelId(e.target.value)}
                className="w-full p-2.5 mt-2 text-gray-500 bg-white border border-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              >
                {loading
                  ? "loading"
                  : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
                <option>Select a Hotel</option>
              </select>
            </div> */}

            <button
              onClick={handleClick}
              className="px-6 py-3 self-end text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRoom;
