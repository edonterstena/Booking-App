import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(false);
  const [activeBurgerIcon, setActiveBurgerIcon] = useState(false);

  const links = [
    { text: "Home", url: "#", isActive: activeLink === 0 },
    { text: "Rooms", url: "#", isActive: activeLink === 1 },
    { text: "Contact", url: "#", isActive: activeLink === 2 },
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const handleBurgerIcon = () => {
    setActiveBurgerIcon((active) => !active);
  };
  return (
    <>
      <div
        name="navbar-container-bigScreen"
        className=" bg-yellow-400  max-w-2xl sm:max-w-6xl md:max-w-full flex justify-around items-center py-4 w-screen "
      >
        <div name="logo">
          <h1 className="text-[#fb445b] font-Pacifico text-3xl md:text-3xl  ">
            Logo
          </h1>
        </div>
        <ul
          name="nav-links"
          className="font-PlusJakartaSans font-[500] md:text-lg flex gap-10 hidden md:flex"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              style={{
                color: link.isActive ? "#fb445b" : "",
                textDecoration: link.isActive ? "underline" : "",
                textUnderlineOffset: link.isActive ? "8px" : "",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease-in-out",
              }}
              onClick={() => handleLinkClick(index)}
            >
              <li className={link.isActive ? "" : "underline-offset-8"}>
                {link.text}
              </li>
            </Link>
          ))}
        </ul>
        <div name="login-signup-darkmode" className="flex gap-8">
          <FaSun size={20} className="hidden" />
          <FaMoon size={20} />
          <BiUser size={20} />
          {activeBurgerIcon ? (
            <GrClose
              size={20}
              className=" md:hidden"
              onClick={handleBurgerIcon}
            />
          ) : (
            <RxHamburgerMenu
              size={20}
              className="md:hidden"
              onClick={handleBurgerIcon}
            />
          )}
        </div>
      </div>

      {activeBurgerIcon ? (
        <div
          name="navbar-container-mobile"
          className="md:hidden p-8 transition  bg-blue-400 h-auto flex flex-col justify-around items-center   
          "
        >
          <ul
            name="nav-links"
            className="font-PlusJakartaSans font-[500] text-3xl flex flex-col items-center gap-10 "
          >
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                style={{
                  color: link.isActive ? "#fb445b" : "",
                  textDecoration: link.isActive ? "underline" : "",
                  textUnderlineOffset: link.isActive ? "8px" : "",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
                onClick={() => handleLinkClick(index)}
              >
                <li
                  className={
                    link.isActive ? "uppercase" : "underline-offset-8 uppercase"
                  }
                >
                  {link.text}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
