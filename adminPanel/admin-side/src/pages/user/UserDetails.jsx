import React, { useState } from "react";
import Sidebar from "../../components/sidebar/SideBar";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Oval } from "react-loader-spinner";

const UserDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/users/${id}`
  );

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

  return (
    <div className="flex  ">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className="overflow-y-auto w-screen ">
        <div className="h-screen  overflow-y-auto flex flex-col p-10 ">
          <div className="bg-gray-200 shadow rounded-lg border flex">
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h3>
              <img
                src={data.img}
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
              ></img>
              <p>Admin: {data.isAdmin?.toString()}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0 ">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-600">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2 capitalize">
                    {data.name} {data.lastname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-600">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-600">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.phone}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-600">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.country}, {data.city}, str. {data.address}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className=" self-center mb-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
              <div className=" ">
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
                              {item.roomNumbers.map((roomNumber, i) => (
                                <p key={i}>
                                  {roomNumber.reservedBy === data._id
                                    ? roomNumber.number
                                    : " "}
                                </p>
                              ))}
                            </td>

                            <td className="text-right px-6 whitespace-nowrap">
                              <a
                                href={`/roomDetails/${item._id}`}
                                className="py-2 px-3 font-medium text-yellow-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                              >
                                View
                              </a>
                              {/* <a
                      href={`/editHotel/${item?._id}`}
                      className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </a> */}
                              {/* <button
                                onClick={() => handleDelete(item?._id)}
                                className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                              >
                                Delete
                              </button> */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
