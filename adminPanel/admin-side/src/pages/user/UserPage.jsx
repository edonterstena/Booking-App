import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const navigate = useNavigate();

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/v1/users",
    { withCredentials: true }
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/v1/users/${id}`, {
        withCredentials: true,
      });
      reFetch(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Users Table
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex gap-3">
          <CSVLink
            className="bg-green-600 rounded-lg p-2 text-white"
            data={data}
          >
            Download
          </CSVLink>

          <a
            onClick={() => navigate("/createUser")}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add User
          </a>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Name & Lastname</th>
              <th className="py-3 px-6">Email & Username</th>
              <th className="py-3 px-6">Country</th>
              <th className="py-3 px-6">City</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Admin</th>

              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={
                      item.img ||
                      "https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=600"
                    }
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">
                      {item.name} {item.lastname}
                    </span>
                    <span className="block text-gray-700 text-xs"></span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">
                      {item.username}
                    </span>
                    <span className="block text-gray-700 text-xs">
                      {item.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.isAdmin.toString()}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  {/* <a
                    href={`/hotelDetails/${item._id}`}
                    className="py-2 px-3 font-medium text-yellow-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    View
                  </a> */}
                  <a
                    href={`/editUser/${item._id}`}
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

        {/* Pagination */}

        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
          {/* Desktop version */}
          <div className="hidden justify-between text-sm md:flex">
            <div>
              SHOWING {indexOfFirstItem + 1}-{indexOfLastItem} OF {data.length}
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
                        aria-current={currentPage === page ? "page" : undefined}
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
              SHOWING {indexOfFirstItem + 1}-{indexOfLastItem} OF {data.length}
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
  );
};

export default HotelPage;
