import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(false);
  const [activeBurgerIcon, setActiveBurgerIcon] = useState(false);
  const [userIconClicked, setUserIconClicked] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  console.log(user?._id);

  const navigate = useNavigate();

  const links = [
    { text: "Home", url: "/", isActive: activeLink === 0 },
    { text: "Hotels", url: "/hotels", isActive: activeLink === 1 },
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
        className=" bg-white  shadow-lg shadow-gray-300 max-w-2xl sm:max-w-6xl md:max-w-full flex justify-around items-center py-4 w-screen "
      >
        <Link to="/">
          <div name="logo">
            <p className="font-Prata font-bold text-2xl">LOGO</p>
          </div>
        </Link>
        <ul
          name="nav-links"
          className="font-PlusJakartaSans font-[500] md:text-lg flex gap-10 hidden md:flex"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              style={{
                color: link.isActive ? "#5e90cb" : "",
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
          {/* <FaMoon size={20} /> */}
          <BiUser
            size={20}
            onClick={() => setUserIconClicked(!userIconClicked)}
            className="relative"
          />

          {userIconClicked && (
            <div className="bg-black rounded text-white absolute top-14 right-[32px] p-2  z-10 font-semibold">
              <ul className="flex flex-col gap-2 items-center">
                <Link to="http://localhost:5000/" className="w-full">
                  <li className="hover:bg-white rounded p-1 hover:text-black">
                    Go to Admin
                  </li>
                </Link>
                {user ? (
                  <>
                    <Link to={`/userProfile/${user?._id}`}>
                      <li className="hover:bg-white rounded p-1 hover:text-black">
                        User: {user.email}
                      </li>
                    </Link>
                    <li
                      onClick={() => {
                        dispatch({ type: "LOGOUT" });
                        navigate("/");
                      }}
                      className="hover:bg-white w-[100%] rounded p-1 hover:text-black"
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="w-full">
                      <li className=" text-center rounded hover:bg-white hover:text-black">
                        Login
                      </li>
                    </Link>
                    <Link to="/register" className="w-full">
                      <li className=" text-center rounded hover:bg-white hover:text-black">
                        {" "}
                        Register
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          )}

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
          className="md:hidden p-8 transition text-white bg-black h-screen flex flex-col justify-around items-center   
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
                  color: link.isActive ? "#5e90cb" : "",
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
