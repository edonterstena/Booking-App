import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaHotel, FaBed, FaUsers } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

import Dashboard from "../../pages/dashboard/Dashboard";
import HotelPage from "../../pages/hotel/HotelPage";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Sidebar = () => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [userName, setUsername] = useState("");
  // const [hotelsPath, setHotelPath] = useState(false);
  // const [roomsPath, setRoomPath] = useState(false);
  // const [usersPath, setUsersPath] = useState(false);

  // const location = useLocation();
  // console.log(location.pathname.split("/")[1]);
  // const path = location.pathname.split("/")[1];

  const { dispatch } = useContext(AuthContext);

  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/users",
    {
      withCredentials: true,
    }
  );

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const userId = user?._id;

  // const isIdMatch = data.some((item) => item._id === userId);

  // console.log(isIdMatch);

  useEffect(() => {
    const isIdMatch = data.some((item) => item._id === userId);
    setIsCurrentUser(isIdMatch);
    if (isIdMatch) {
      setUserImg(user.img);
      setUsername(user.name);
    }
  }, [data, userId]);

  const navigation = [
    {
      href: "/",
      name: "Dashboard",
      icon: <MdDashboard className="w-5 h-5" />,
    },
    {
      href: "/hotels",
      name: "Hotels",
      icon: <FaHotel className="w-5 h-5" />,
    },
    {
      href: "/rooms",
      name: "Rooms",
      icon: <FaBed className="w-5 h-5" />,
    },
    {
      href: "/subscribers",
      name: "Subscribers",
      icon: <MdSubscriptions className="w-5 h-5" />,
    },
    {
      href: "/users",
      name: "Users",
      icon: <FaUsers className="w-5 h-5" />,
    },
  ];

  const navsFooter = [
    {
      href: "/",
      name: "Help",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      href: "/",
      name: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      name: <div onClick={() => dispatch({ type: "LOGOUT" })}>Logout</div>,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-white "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <nav className=" h-screen border-r bg-gray-800 space-y-8 w-60">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8 ">
            <a
              href="/"
              className="flex-none text-white font-PlusJakartaSans font-bold text-2xl"
            >
              ADMIN PANEL
            </a>
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto  ">
            <ul className="px-4 text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-gray-900 active:bg-gray-100 duration-150"
                  >
                    <div className="">{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-gray-9 active:bg-gray-100  duration-150"
                    >
                      <div className="text-gray-500 ">{item.icon}</div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="py-4 px-4 border-t">
                {isCurrentUser && (
                  <div className="flex items-center gap-x-4">
                    <img src={userImg} className="w-12 h-12 rounded-full" />
                    <div>
                      <span className="block text-white text-sm font-semibold">
                        {userName}
                      </span>
                      <a
                        href={`/userDetails/${userId}`}
                        className="block mt-px text-gray-300 hover:text-indigo-600 text-xs"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
