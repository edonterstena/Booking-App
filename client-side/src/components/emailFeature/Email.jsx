import React from "react";

const Email = () => {
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
          <div name="email-input" className="flex gap-3">
            <input
              type="text"
              placeholder="Enter you email address"
              className="rounded-full px-4 md:w-96 bg-gray-300"
            />
            <button
              type="submit"
              className="bg-black text-white font-medium p-2 rounded-full"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
