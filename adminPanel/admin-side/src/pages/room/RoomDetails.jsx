import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/SideBar";

import { Carousel } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { FaUser } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";

const RoomDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/rooms/${id}`
  );

  const [isLoading, setIsLoading] = useState(loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  const [isReserved, setIsReserved] = useState(false);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.roomNumbers?.filter(
    (item) => item.number === searchQuery
  );

  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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

  const d = "648efd4f0335666eb05094a8";
  const f = data.reservedByUsers?.some((user) => user._id === d);
  console.log(f);

  // const photos = data.photos || [];

  const formatDates = (dates) => {
    const startDate = new Date(dates[0]).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const endDate = new Date(dates[dates.length - 1]).toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="flex">
      <div className="sticky top-0 ">
        <Sidebar />
      </div>

      <div
        name="second-div"
        className=" h-screen  w-screen overflow-y-auto bg-gray-100  p-8 "
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col md:flex-row -mx-4 ">
            {/* <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <Carousel className="rounded-xl">
                  {photos.map((item, i) => (
                    <img
                      key={i}
                      src={item}
                      alt={`image ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ))}
         
                </Carousel>
              </div>
             
            </div> */}
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">
                Room Type: {data.title}
              </h2>
              {/* <p className="text-lg  mb-4">{data.title}</p> */}
              <div className="grid grid-cols-2 mb-4">
                {/* <div className="mr-4">
                  <span className="font-bold text-gray-700">Type:</span>
                  <span className="text-gray-600"> {data.type}</span>
                </div> */}
                {/* <div className="mr-4">
                  <span className="font-bold text-gray-700">City:</span>
                  <span className="text-gray-600"> {data.city}</span>
                </div> */}
                {/* <div className="mr-4">
                  <span className="font-bold text-gray-700">Address:</span>
                  <span className="text-gray-600"> {data.address}</span>
                </div> */}
                {/* <div className="mr-4">
                  <span className="font-bold text-gray-700">
                    Average Rating:
                  </span>
                  <span className="text-gray-600"> {data.averageRating}</span>
                </div>
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Featured:</span>
                  <span className="text-gray-600">
                    {" "}
                    {data.featured?.toString()}
                  </span>
                </div> */}
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-gray-600"> {data.price}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">
                    Maximum people:{" "}
                  </span>
                  <span className="text-gray-600">{data.maxPeople}</span>
                </div>

                <div>
                  <span className="font-bold text-gray-700">Hotel: </span>
                  <span className=" text-gray-700">{data.hotel?.title}</span>
                </div>
              </div>
              {/* <div className="mb-4">
                <span className="font-bold text-gray-700">Select Color:</span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 mr-2" />
                  <button className="w-6 h-6 rounded-full bg-red-500 mr-2" />
                  <button className="w-6 h-6 rounded-full bg-blue-500 mr-2" />
                  <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2" />
                </div>
              </div> */}
              {/* <div className="mb-4">
                <span className="font-bold text-gray-700">Select Size:</span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    S
                  </button>
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    M
                  </button>
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    L
                  </button>
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    XL
                  </button>
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    XXL
                  </button>
                </div>
              </div> */}
              <div>
                <span className="font-bold text-gray-700 capitalize">
                  Description
                </span>
                <p className="text-gray-600 text-sm mt-2">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 shadow-sm border border-gray-700  bg-gray-900 p-4 rounded-lg  overflow-x-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-semibold text-lg text-white">Room's numbers</h1>
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
                  <th className="py-3 px-6">Number</th>
                  <th className="py-3 px-6">Unavailable Dates</th>
                  <th className="py-3 px-6">Reserved By</th>
                  {/* <th className="py-3 px-6">City</th>
      
                  <th className="py-3 px-6">Featured</th> */}

                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-white divide-y">
                {data.roomNumbers?.map((item) => (
                  <tr key={item._id}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      {/* <img
                        src={
                          item.photos[0] ||
                          "https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        className="w-10 h-10 rounded-full"
                      /> */}
                      <div>
                        <span className="block text-white text-sm font-medium">
                          {item.number}
                        </span>
                        <span className="block text-white text-xs">
                          Id: {item._id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.unavailableDates.length <= 0 ? (
                        <span>it is Available</span>
                      ) : (
                        <span className="text-yellow-800">
                          {formatDates(item?.unavailableDates)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-center gap-2">
                        <a
                          href={`/userDetails/${item.reservedBy}`}
                          className=" text-white font-semibold text-sm  p-1 cursor rounded flex items-center gap-2 bg-blue-900"
                        >
                          Navigate to <FaUser />
                        </a>
                        <span className="block text-white text-xs">
                          user:
                          {data.reservedByUsers?.some(
                            (user) => user._id === item.reservedBy
                          ) ? (
                            <p>{item.reservedBy}</p>
                          ) : (
                            "No User"
                          )}
                        </span>
                      </div>
                    </td>

                    <td className="text-right  ">
                      {/* <span className="flex gap-5 justify-end">
                        {item.reservedByUsers.length <= 0 ? (
                          <span className="bg-green-600 p-1 rounded font-semibold text-black flex self-center">
                            Available
                          </span>
                        ) : (
                          <span className="bg-red-600 p-1 rounded font-semibold text-white flex self-center">
                            Reserved
                          </span>
                        )}

                        <a
                          href={`/roomDetails/${item?._id}`}
                          className="py-2 px-3 font-medium text-yellow-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          View
                        </a>
                      </span> */}
                      {/* <a
                        href={`/editHotel/${item._id}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(item._id)}
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
            {/* Desktop version */}
            <div className="hidden justify-between text-sm md:flex">
              <div>
                SHOWING {indexOfFirstItem + 1}-{indexOfLastItem} OF{" "}
                {data.length}
              </div>
              <div className="flex items-center gap-12" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="hover:text-indigo-600"
                >
                  Previous
                </button>
                <ul className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                    (page) => (
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
                    )
                  )}
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

            {/* Mobile version */}
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
  );
};

export default RoomDetails;
