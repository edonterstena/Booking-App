import React, { useContext, useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/SideBar";
const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [state, setState] = useState(true);
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/v1/users",
    { withCredentials: true }
  );
  const [isLoading, setIsLoading] = useState(loading);
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(loading);
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item._id === searchQuery
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user._id;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/v1/users/${id}`, {
        withCredentials: true,
      });

      setState(false);

      if (userId === id) {
        dispatch({ type: "LOGOUT" });
      }

      reFetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex ">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className=" h-screen overflow-y-auto flex flex-col self-center p-4">
        {" "}
        <div className="max-w-fit  px-4 md:px-8">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl ">
                Users Table
              </h3>
              {/* <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p> */}
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
          <div className="mt-12 shadow-sm border border-gray-700  bg-gray-900 p-4 rounded-lg overflow-x-auto">
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
              <table className="w-full table-auto text-sm text-left ">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Name & Lastname</th>
                    <th className="py-3 px-6">Email & Username</th>
                    <th className="py-3 px-6">Country</th>
                    <th className="py-3 px-6">City</th>
                    <th className="py-3 px-6">Address</th>
                    {/* <th className="py-3 px-6">Phone</th> */}
                    <th className="py-3 px-6">Admin</th>

                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-white divide-y">
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
                          <span className="block text-white text-sm font-medium">
                            {item.name} {item.lastname}
                          </span>
                          <span className="block text-white text-xs">
                            Id:{item._id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="block text-white text-sm font-medium">
                            {item.username}
                          </span>
                          <span className="block text-white text-xs">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.address}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {item.phone}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.isAdmin.toString()}
                      </td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <a
                          href={`/userDetails/${item._id}`}
                          className="py-2 px-3 font-medium text-yellow-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          View
                        </a>
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

export default UserPage;
