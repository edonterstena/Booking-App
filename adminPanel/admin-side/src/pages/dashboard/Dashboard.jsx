import React from "react";
import Sidebar from "../../components/sidebar/SideBar";
import useFetch from "../../hooks/useFetch";
import { Oval } from "react-loader-spinner";

const Dashboard = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/dashboard"
  );

  return (
    <div>
      <>
        {/*-===================== FIRST ROW CONTAINING THE  STATS CARD STARTS HERE =============================*/}
        <div className="flex gap-40 bg-gray-100 ">
          <div>
            <Sidebar />
          </div>
          {/*-== First Stats Container ====-*/}
          <div className="grid grid-cols-2  items-center ">
            <div className="container mx-auto pr-4">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg shadow-red-400 hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-red-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5"> SUBSCRIBERS</p>
                </div>
                <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
                </div>
                {loading ? (
                  <div className="py-4 text-3xl ml-5">
                    <Oval
                      height={20}
                      width={20}
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
                  <p className="py-4 text-3xl ml-5">{data.totalSubscribers}</p>
                )}
                {/* <hr > */}
              </div>
            </div>
            {/*-== First Stats Container ====-*/}
            {/*-== Second Stats Container ====-*/}
            <div className="container mx-auto pr-4">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg shadow-blue-500 hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-blue-500 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">HOTELS</p>
                </div>
                <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
                </div>

                {loading ? (
                  <div className="py-4 text-3xl ml-5">
                    <Oval
                      height={20}
                      width={20}
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
                  <p className="py-4 text-3xl ml-5">{data.totalHotels}</p>
                )}
                {/* <hr > */}
              </div>
            </div>
            {/*-== Second Stats Container ====-*/}
            {/*-== Third Stats Container ====-*/}
            <div className="container mx-auto pr-4">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg shadow-green-800 hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-green-800 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">Users</p>
                </div>
                <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
                </div>
                {loading ? (
                  <div className="py-4 text-3xl ml-5">
                    <Oval
                      height={20}
                      width={20}
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
                  <p className="py-4 text-3xl ml-5">{data.totalUsers}</p>
                )}
                {/* <hr > */}
              </div>
            </div>
            {/*-== Third Stats Container ====-*/}
            {/*-== Fourth Stats Container ====-*/}
            <div className="container mx-auto">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg shadow-blue-900 hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-20 bg-blue-900 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">Rooms</p>
                </div>
                <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
                </div>
                {loading ? (
                  <div className="py-4 text-3xl ml-5">
                    <Oval
                      height={20}
                      width={20}
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
                  <p className="py-4 text-3xl ml-5">{data.totalRooms}</p>
                )}
                {/* <hr > */}
              </div>
            </div>
            {/*-== Fourth Stats Container ====-*/}
          </div>
        </div>
        {/*-===================== FIRST ROW CONTAINING THE  STATS CARD ENDS HERE =============================*/}
        {/*----===================== SECOND ROW CONTAINING THE TABLE STATS STARTS HERE =============================*/}

        {/*==== Third div ends here ====-*/}

        {/*-------===================== SECOND ROW CONTAINING THE TABLE STATS ENDS HERE =============================*/}
      </>
    </div>
  );
};

export default Dashboard;
