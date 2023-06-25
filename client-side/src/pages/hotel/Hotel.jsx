import React, { useContext, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { MdLocationPin } from "react-icons/md";

import { FaWindowClose } from "react-icons/fa";
import Email from "../../components/emailFeature/Email";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Comment from "../../components/comment/Comment";
import Rating from "../../components/rating/Rating";
import { Oval } from "react-loader-spinner";
import { Carousel } from "@material-tailwind/react";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState(false);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );

  const { user } = useContext(AuthContext);
  const { dates, guests } = useContext(SearchContext);

  const navigate = useNavigate();

  // const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
  //   const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
  //   return diffDays;
  // }

  // const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  // console.log(dates);
  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      setState(true);
      // navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
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
        <div name="hotel-container">
          <div
            name="content"
            className="font-PlusJakartaSans flex flex-col gap-10 p-10"
          >
            <div
              name="desc-btn-wrapper"
              className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-end"
            >
              <div name="description-title" className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold w-72 lg:w-full lg:text-4xl ">
                  {data.name}
                </h1>
                <div className="flex items-center gap-1">
                  <MdLocationPin />
                  <p>{data.address}</p>
                </div>
                <p className="text-lg font-semibold text-green-800">
                  Excellent location - {data.distance}m from center
                </p>
                <p className="text-yellow-600">
                  Book a stay over ${data.cheapestPrice} at this property and
                  get a free airport taxi
                </p>
              </div>
              <div name="rezerve-button">
                <button
                  onClick={handleClick}
                  className="bg-[#5e90cb] text-white p-2 rounded"
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <Carousel className="rounded-xl">
                  {data.photos?.map((item, i) => (
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

            <div
              name="hotel-details"
              className="flex flex-col gap-24  lg:flex-row "
            >
              <div
                name="details-descr"
                className="flex flex-col gap-4 lg:w-[1500px]"
              >
                <h1 className="text-3xl font-semibold">{data.title}</h1>
                <p className="text-justify">{data.description}</p>
              </div>

              <div
                name="reserve-price"
                className="flex flex-col gap-6 rounded-lg p-5 border border-[#5e90cb] shadow-black shadow-lg sm:w-[450px] lg:w-fit sm:self-center"
              >
                <p className="text-2xl font-semibold">
                  Perfect for a 9-night stay!
                </p>
                <p className="text-justify font-semibold">
                  Located in the real heart of {data.city}, this property has an
                  excellent location score of {data.averageRating}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-2xl">
                    ${data.cheapestPrice}
                  </p>
                  <p className="text-xl">(9 nights)</p>
                </div>
                <button
                  onClick={handleClick}
                  className="bg-[#5e90cb] text-white p-2 rounded"
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
            <div className="">
              <Rating />
            </div>
            <div className="flex justify-start ">
              <Comment />
            </div>
          </div>
        </div>
      )}

      <Email />
      <Footer />

      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          hotelId={id}
          hotelPrice={data.cheapestPrice}
        />
      )}

      {state && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setState(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3">
                <span
                  onClick={() => setState(false)}
                  className="absolute top-3 right-3 hover:cursor-pointer"
                >
                  <FaWindowClose />
                </span>
                <div className="mt-2 text-center">
                  <h4 className="text-lg font-medium text-gray-800">
                    You need to login in order to reserve or book.
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    If you you don't have an account please register before
                    login.
                  </p>
                </div>
              </div>
              <div className="items-center gap-2 mt-3 sm:flex">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
