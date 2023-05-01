import React from "react";

import { BsFacebook } from "react-icons/Bs";
import { BsTwitter } from "react-icons/Bs";
import { BsInstagram } from "react-icons/Bs";

function Footer() {
  return (
    <>
      <div name="footer-container" className="bg-gray-200 w-full p-4 pt-24">
        <div
          name="footer-section"
          className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-4 justify-items-center"
        >
          <div name="footer-item" className=" flex flex-col gap-4 ">
            <p className="font-PlusJakartaSans font-bold text-xl">About</p>
            <div
              name="sub-items"
              className="font-PlusJakartaSans flex flex-col gap-2"
            >
              <p>Blog</p>
              <p>Learn about us</p>
              <p>Investors</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
          <div name="footer-item" className=" flex flex-col gap-4 ">
            <p className="font-PlusJakartaSans font-bold text-xl">Main Links</p>
            <div
              name="sub-items"
              className="font-PlusJakartaSans flex flex-col gap-2"
            >
              <p>Home</p>
              <p>Listings</p>
              <p>Single Listing</p>
              <p>Single listing alternative</p>
              <p>Log in</p>
            </div>
          </div>
          <div name="footer-item" className=" flex flex-col gap-4">
            <p className="font-PlusJakartaSans font-bold text-xl">Support</p>
            <div
              name="sub-items"
              className="font-PlusJakartaSans flex flex-col gap-2"
            >
              <p>Buy Theme</p>
              <p>Pre-sale questions</p>
              <p>Cancellation options</p>
              <p>Safety information</p>
              <p>Support</p>
            </div>
          </div>
          <div name="footer-item" className=" flex flex-col gap-4">
            <p className="font-PlusJakartaSans font-bold text-xl">Contact</p>
            <div
              name="sub-items"
              className="font-PlusJakartaSans flex flex-col gap-2"
            >
              <p className="font-bold">+1(555)555-5555</p>
              <p className="font-bold">mail@example.com</p>
            </div>
          </div>
        </div>

        <div
          name="footer-copyrights"
          className="mt-20 grid grid-rows-1 grid-cols-2 border-t-2 pt-3  border-gray-300 "
        >
          <p className="max-w-[210px] sm:max-w-full font-PlusJakartaSans">
            &copy; 2023 E.T. All rights reserved
          </p>
          <div
            name="footer-social-icons"
            className="grid grid-cols-3 gap-3 justify-self-end items-center "
          >
            <BsInstagram />
            <BsFacebook />
            <BsTwitter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
