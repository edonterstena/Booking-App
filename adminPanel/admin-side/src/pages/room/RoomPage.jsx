import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Oval } from "react-loader-spinner";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import Sidebar from "../../components/sidebar/SideBar";
const RoomPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  {
    /*  { field: "_id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 230 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "maxPeople", headerName: "Max People", width: 100 }, */
  }

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/v1/rooms",
    { withCredentials: true }
  );

  const [isLoading, setIsLoading] = useState(loading);

  console.log(data);
  const { data: hotelsData } = useFetch("http://localhost:8800/api/v1/hotels", {
    withCredentials: true,
  });

  const combinedData = data.map((room) => {
    const hotel = hotelsData.find((hotel) => hotel.rooms.includes(room._id));
    return {
      ...room,
      hotelId: hotel ? hotel._id : null,
    };
  });

  const totalPages = Math.ceil(combinedData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // item.price.toString().toLowerCase().inlcudes(searchQuery.toLowerCase()) ||
      item.maxPeople === searchQuery
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //hotelId is selecting as undefined
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/v1/rooms/${id}`, {
        withCredentials: true,
      });
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
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex self-center ">
        <div className="max-w-fit mx-auto  md:px-8">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Room Table
              </h3>
            </div>
            <div className="mt-3 md:mt-0 flex gap-3">
              <CSVLink
                className="bg-green-600 rounded-lg p-2 text-white"
                data={data}
              >
                Download
              </CSVLink>

              <a
                onClick={() => navigate("/createRoom")}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Add Room
              </a>
            </div>
          </div>
          <div className="mt-12 shadow-sm border border-gray-700 bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <div className="flex items-center justify-end px-6 py-4">
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
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Title</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Price</th>
                    <th className="py-3 px-6">Max People</th>

                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-white divide-y">
                  {currentItems.map((item) => (
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.description.substring(0, 20) + "..."}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.maxPeople}
                      </td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <a
                          href={`/roomDetails/${item._id}`}
                          className="py-2 px-3 font-medium text-yellow-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          View
                        </a>
                        <a
                          href={`/editRoom/${item._id}`}
                          className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit
                        </a>

                        <button
                          onClick={() => handleDelete(item._id)}
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
              {/* Desktop version */}
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
    </div>
  );
};

export default RoomPage;
