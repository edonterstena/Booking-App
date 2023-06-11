import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Email = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/v1/subscribers", { email });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setSuccess(false);
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
  return (
    <>
      <div
        name="email-container"
        className=" my-36  p-4 flex justify-center items-center "
      >
        <div
          name="email-content"
          className="bg-white   rounded-full flex flex-col items-center p-10 gap-3 md:grid md:grid-rows-1 md:grid-cols-1 md:gap-8 lg:grid-cols-2  md:justify-items-center "
        >
          <div name="email-desc" className="flex flex-col gap-2">
            <p className="font-PlusJakartaSans text-3xl  font-semibold max-w-[200px] md:max-w-full md:text-4xl">
              Save time, save money
            </p>
            <p className="font-PlusJakartaSans font-medium md:text-lg">
              Sign up and we'll send the best deals
            </p>
          </div>
          <div name="email-input" className="flex gap-3 items-center">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter you email address"
              className="rounded-full py-2 px-4 md:w-96 bg-gray-300"
            />
            <button
              onClick={handleSubscribe}
              className="bg-black text-white font-medium p-2 rounded-full"
            >
              Subscribe
            </button>
            {success && (
              <span className="text-green-800 font-semibold">Subscribed!</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
