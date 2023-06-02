import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
  // const [isAdmin, setIsAdmin] = useState(false);

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
        // isAdmin,
        img: url,
      };
      console.log(newUser);
      await axios.post("http://localhost:8800/api/v1/auth/register", newUser);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <main className="w-full h-full flex  items-center justify-center px-4 bg-gray-400 ">
      <div className=" w-fit text-gray-600 shadow-2xl bg-white m-40 shadow-gray-800 px-10 py-8 rounded-2xl">
        <div className="text-center ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdj0zbn-1d0dJbVLL9EUFAX67byLEhnfQFA&usqp=CAU"
            width={150}
            className="mx-auto rounded-full "
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create account
            </h3>
            <p className="">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-5 grid grid-cols-3 gap-3">
          <div>
            <label className="font-medium">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Lastname</label>
            <input
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Country</label>
            <input
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium">Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">City</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
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
                className="block w-full text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          {/* {error && <span>{error.message}</span>} */}
          {/* <div className="text-center">
            <a href="/forgot-password" className="hover:text-indigo-600">
              Forgot password?
            </a>
          </div> */}
        </form>
        <button
          type="submit"
          onClick={handleClick}
          className="w-full px-4 py-4 mt-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Sign up
        </button>
      </div>
    </main>
  );
};

export default Register;
