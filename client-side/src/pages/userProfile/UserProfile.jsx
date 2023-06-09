import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import React, { useEffect, useState } from "react";

import { Oval } from "react-loader-spinner";

import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/v1/users/${id}`,
    {
      withCredentials: true,
    }
  );
  console.log(data);

  const handleHome = () => {
    navigate("/");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();

  // const { data, loading, error, reFetch } = useFetch(
  //   "http://localhost:8800/api/v1/hotels",
  //   { withCredentials: true }
  // );

  const [isLoading, setIsLoading] = useState(loading);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.reservedRooms?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.put(
        `http://localhost:8800/api/v1/rooms/removeReservedRoom/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      reFetch(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(loading);
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-20">
        <div className="bg-white  shadow overflow-hidden sm:rounded-lg ">
          <div className="px-4 py-5 sm:px-6 ">
            {/* <div className="flex gap-10 border bg-white border-gray-400 rounded px-10 py-5 ">
              <img src={data.img} className="rounded-full w-48 h-48" />
              <div className="self-end">
                <p>
                  Name: {data.name} {data.lastname}
                </p>
                <p>Email: {data.email}</p>
                <p>Mobile: {data.phone}</p>
              </div>
              <div className="self-end">
                <p>Country: {data.country}</p>
                <p>City: {data.city}</p>
                <p>Address: {data.address}</p>
              </div>
            </div> */}

            <div className="mt-12 sm:w-fit md:w-[800px] shadow-sm border border-gray-700  bg-gray-900 p-4 rounded-lg  overflow-x-auto">
              <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-white font-semibold text-xl mb-2">
                  Reserved Rooms
                </h1>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-80">
                  <Oval
                    height={80}
                    width={80}
                    color="green"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="
                #4f46e5"
                    strokeWidth={4}
                    strokeWidthSecondary={2}
                  />
                </div>
              ) : (
                <table className="w-full table-auto border-gray-700 bg-gray-900 text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                      <th className="py-3 px-6">Title</th>
                      <th className="py-3 px-6">Room Numbers</th>

                      <th className="py-3 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="text-white divide-y">
                    {currentItems?.map((item) => (
                      <tr key={item._id}>
                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                          <img
                            src={
                              "https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=600"
                            }
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <span className="block text-white text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="block text-white text-xs">
                              Id: {item._id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          {item.roomNumbers.map((roomNumber) => (
                            <p>
                              {roomNumber.reservedBy === data._id
                                ? roomNumber.number
                                : " "}
                            </p>
                          ))}
                        </td>

                        <td className="text-right px-6 whitespace-nowrap">
                          {/* <a
                    href={`/hotelDetails/${item._id}`}
                    className="py-2 px-3 font-medium text-yellow-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    View
                  </a> */}
                          {/* <a
                      href={`/editHotel/${item?._id}`}
                      className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </a> */}
                          <button
                            onClick={() => handleDelete(item?._id)}
                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Pagination */}

              <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
                <div className="hidden justify-between text-sm md:flex">
                  <div>
                    SHOWING {indexOfFirstItem + 1}-{indexOfLastItem} OF{" "}
                    {data.length}
                  </div>
                  <div
                    className="flex items-center gap-12"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="hover:text-indigo-600"
                    >
                      Previous
                    </button>
                    <ul className="flex items-center gap-1">
                      {Array.from(
                        { length: totalPages },
                        (_, idx) => idx + 1
                      ).map((page) => (
                        <li key={page}>
                          <button
                            onClick={() => handlePageChange(page)}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                            className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-indigo-600 ${
                              currentPage === page
                                ? "bg-indigo-600 text-white font-medium"
                                : ""
                            }`}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="hover:text-indigo-600"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <div className="font-medium">
                    SHOWING {indexOfFirstItem + 1}-{indexOfLastItem} OF{" "}
                    {data.length}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <button
              className="bg-yellow-600 rounded p-2 text-white font-semibold mt-2 "
              onClick={handleHome}
            >
              Return back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
