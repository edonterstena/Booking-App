import React, { useContext, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { MdLocationPin } from "react-icons/md";
import Email from "../../components/emailFeature/Email";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );

  const { user } = useContext(AuthContext);
  const { dates, guests } = useContext(SearchContext);

  const navigate = useNavigate();

  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  console.log(dates);
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
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
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
            <div
              name="img-container"
              className="grid grid-cols-1 gap-2 lg:grid-cols-3"
            >
              {data.photos?.map((photo, i) => (
                <div name="img-item" key={i}>
                  <img src={photo} />
                </div>
              ))}
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
                className="flex flex-col gap-6  rounded-lg p-5 border border-[#5e90cb] shadow-black shadow-lg sm:w-[450px] lg:w-fit sm:self-center"
              >
                <p className="text-2xl font-semibold">
                  Perfect for a {days}-night stay!
                </p>
                <p className="text-justify font-semibold">
                  Located in the real heart of {data.city}, this property has an
                  excellent location score of 9.8!
                </p>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-2xl">
                    ${days * data.cheapestPrice * guests.room}
                  </p>
                  <p className="text-xl">({days} nights)</p>
                </div>
                <button
                  onClick={handleClick}
                  className="bg-[#5e90cb] text-white p-2 rounded"
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Email />
      <Footer />

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
