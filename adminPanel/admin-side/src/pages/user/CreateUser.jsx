import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Sidebar from "../../components/sidebar/SideBar";
const CreateHotel = () => {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // const { data, loading, error } = useFetch(
  //   "http://localhost:8800/api/v1/"
  // );

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setRooms(value);
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "booking-app");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/djidbl4je/upload",

        data
      );
      const { url } = uploadRes.data;
      const newUser = {
        username,
        name,
        lastname,
        email,
        password,
        address,
        country,
        phone,
        city,
        isAdmin,
        img: url,
      };
      console.log(newUser);
      await axios.post("http://localhost:8800/api/v1/auth/register", newUser);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-28">
      <div>
        <Sidebar />
      </div>
      <div>
        {" "}
        <div>
          <h1 className="text-2xl text-center font-semibold font-sans uppercase my-2 mb-10 text-gray-900">
            Add a new user
          </h1>
        </div>
        <div className="flex justify-center gap-20">
          <div className="">
            <form className="grid grid-cols-2 gap-4 items-center ">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="name"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Lastname</label>
                <input
                  type="text"
                  placeholder="lastname"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="username"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="address"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="country"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="city"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="phone number"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="relative  ">
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
                <label>Admin</label>
                <select
                  onChange={(e) => setIsAdmin(e.target.value === "true")}
                  className="w-full p-2.5 mt-2 text-gray-500 bg-white border border-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {/* <div name="selectRooms" className="relative">
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
            </div> */}

              <button
                onClick={handleClick}
                className="px-6 py-3 self-end text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
              >
                Create
              </button>
            </form>
          </div>
          <div>
            <div className="w-40">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="multiple_files"
              >
                Upload image
              </label>
              <input
                className="block w-full text-sm mt-2 mb-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHotel;
