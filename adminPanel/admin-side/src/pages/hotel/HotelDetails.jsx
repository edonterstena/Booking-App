import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/SideBar";

import { Carousel } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import useFetch from "../../hooks/useFetch";

const HotelDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );

  const [isLoading, setIsLoading] = useState(loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  const [isReserved, setIsReserved] = useState(false);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data?.rooms?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const photos = data.photos || [];

  return (
    <div className="flex">
      <div className="sticky top-0 ">
        <Sidebar />
      </div>

      <div
        name="second-div"
        className=" h-screen overflow-y-auto bg-gray-100  p-8 "
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col md:flex-row -mx-4 ">
            <div className="md:flex-1 px-4">
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
                  {/* <img
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    alt="image 2"
                    className="h-full w-full object-cover"
                  />
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    alt="image 3"
                    className="h-full w-full object-cover"
                  /> */}
                </Carousel>
              </div>
              {/* <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                    Add to Wishlist
                  </button>
                </div>
              </div> */}
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
              <p className="text-lg  mb-4">{data.title}</p>
              <div className="grid grid-cols-2 mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Type:</span>
                  <span className="text-gray-600"> {data.type}</span>
                </div>
                <div className="mr-4">
                  <span className="font-bold text-gray-700">City:</span>
                  <span className="text-gray-600"> {data.city}</span>
                </div>
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Address:</span>
                  <span className="text-gray-600"> {data.address}</span>
                </div>
                <div className="mr-4">
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
                </div>
                <div className="mr-4">
                  <span className="font-bold text-gray-700">
                    Cheapest Price:
                  </span>
                  <span className="text-gray-600"> {data.cheapestPrice}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Distance: </span>
                  <span className="text-gray-600">{data.distance}m</span>
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
                  {data.type} Description
                </span>
                <p className="text-gray-600 text-sm mt-2">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 shadow-sm border border-gray-700  bg-gray-900 p-4 rounded-lg  overflow-x-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-semibold text-lg text-white">Hotel's Rooms</h1>
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
                  {/* <th className="py-3 px-6">City</th>
                  <th className="py-3 px-6">Address</th>
                  <th className="py-3 px-6">Featured</th> */}

                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-white divide-y">
                {currentItems?.map((item) => (
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
                          {item.title}
                        </span>
                        <span className="block text-white text-xs">
                          Id: {item._id}
                        </span>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.featured.toString()}
                    </td> */}

                    <td className="text-right  ">
                      <span className="flex gap-5 justify-end">
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
                      </span>
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

export default HotelDetails;
