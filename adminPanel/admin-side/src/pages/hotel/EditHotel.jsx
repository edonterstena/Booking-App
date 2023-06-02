import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const EditHotel = () => {
  const [files, setFiles] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Select Type of Hotel");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hotelImage, setHotelImage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/rooms"
  );

  const {
    data: hotelTypes,
    loading: loadingTypes,
    error: errorTypes,
  } = useFetch("http://localhost:8800/api/v1/hotels/countByType");
  console.log(hotelTypes);

  const {
    data: hotelData,
    loading: hotelLoading,
    error: hotelError,
  } = useFetch(`http://localhost:8800/api/v1/hotels/find/${id}`);

  useEffect(() => {
    if (!hotelLoading && hotelData) {
      setName(hotelData.name);
      setType(hotelData.type);
      setCity(hotelData.city);
      setAddress(hotelData.address);
      setTitle(hotelData.title);
      setDistance(hotelData.distance);
      setDescription(hotelData.description);
      setCheapestPrice(hotelData.cheapestPrice);
      setFeatured(hotelData.featured);
      setRooms(hotelData.rooms);

      if (hotelTypes && hotelTypes.some((t) => t.type === hotelData.type)) {
        setType(hotelData.type);
      } else {
        setType("");
      }

      if (hotelData.photos && hotelData.photos.length > 0) {
        setFiles(hotelData.photos);
        setHotelImage(hotelData.photos[0]);
      } else {
        setFiles([]);
        setHotelImage("");
      }
    }
  }, [hotelLoading, hotelData, hotelTypes]);

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "booking-app");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/djidbl4je/upload",

            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const updatedHotel = {
        name,
        type,
        city,
        address,
        title,
        distance,
        description,
        cheapestPrice,
        featured,
        rooms,
        photos: list,
      };
      console.log(updatedHotel);
      await axios.put(
        `http://localhost:8800/api/v1/hotels/${id}`,
        updatedHotel,
        {
          withCredentials: true,
        }
      );
      navigate("/hotels");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <div>
        <h1 className="text-4xl flex justify-center font-semibold font-sans uppercase mb-20 text-gray-900">
          Edit Hotel
        </h1>
      </div>
      <div className="flex justify-center gap-20">
        <div className="">
          <form className="grid grid-cols-2 gap-4  justify-center ">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="name"
                value={name}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Title</label>
              <input
                type="text"
                placeholder="distance"
                value={title}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div name="select Types" className="relative self-start">
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
              <label>Select Type of Hotel</label>
              <select
                onChange={(e) => setType(e.target.value)}
                defaultValue=""
                className="w-full p-2.5 mt-2 text-gray-500 bg-white border border-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              >
                <option disabled>Select one</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  hotelTypes &&
                  hotelTypes.map((t) => (
                    <option key={t.type} value={t.type}>
                      {t.type}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                placeholder="city"
                value={city}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                placeholder="address"
                value={address}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>Distance</label>
              <input
                type="text"
                placeholder="distance"
                value={distance}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                placeholder="description"
                value={description}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>CheapestPrice</label>
              <input
                type="text"
                placeholder="cheapest price"
                value={cheapestPrice}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setCheapestPrice(e.target.value)}
              />
            </div>

            <div className="relative  self-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-11  align-center w-6 h-6 my-auto text-gray-400 right-2.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <label>Featured</label>
              <select
                onChange={(e) => setFeatured(e.target.value === "true")}
                className="w-full p-2.5 mt-2 text-gray-500 bg-white border border-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div name="selectRooms" className="relative">
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
              <label>Rooms</label>
              <select
                multiple
                onChange={handleSelect}
                className="w-full p-2.5 mt-2 text-gray-500 bg-white border border-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              >
                {loading
                  ? "loading"
                  : data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
              </select>
            </div>

            <button
              onClick={handleClick}
              className="px-6 py-3 self-end text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
            >
              Edit
            </button>
          </form>
        </div>
        <div>
          <div className="w-40">
            <img
              src={
                hotelImage ||
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Hotel"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="multiple_files"
            >
              Upload multiple files
            </label>
            <input
              className="block w-full text-sm mt-2 mb-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              multiple
              onChange={(e) => {
                setFiles(e.target.files);
                setHotelImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
