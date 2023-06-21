import { AiFillCloseCircle } from "react-icons/Ai";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId, hotelPrice }) => {
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomsNumber, setSelectedRoomsNumber] = useState([]);
  const [totalPrice, setTotalPrice] = useState(hotelPrice);
  const [roomPrice, setRoomPrice] = useState(0);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/room/${hotelId}`
  );

  console.log(data);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  // const isAvailable = (roomNumber) => {
  //   const isFound = roomNumber.unavailableDates.some((date) =>
  //     alldates.includes(new Date(date).getTime())
  //   );

  //   return !isFound;
  // };

  const isAvailable = (roomNumber) => {
    return roomNumber.unavailableDates.length == 0;
  };

  const handleSelect = (e, roomPrice, roomNumberId) => {
    const checked = e.target.checked;

    setSelectedRoomsNumber((prevSelectedRoomsNumber) => {
      if (checked) {
        return [...prevSelectedRoomsNumber, roomNumberId];
      } else {
        return prevSelectedRoomsNumber.filter((item) => item !== roomNumberId);
      }
    });

    setTotalPrice((prevTotalPrice) => {
      if (checked) {
        return prevTotalPrice + roomPrice;
      } else {
        return prevTotalPrice - roomPrice;
      }
    });
  };

  useEffect(() => {
    console.log(selectedRoomsNumber);
  }, [selectedRoomsNumber]);

  const handleSelectRoom = (e, roomPrice) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setRoomPrice(roomPrice);
    } else {
      setRoomPrice(0);
    }
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);
  console.log("Room price" + roomPrice);

  const navigate = useNavigate();

  console.log(selectedRoomsNumber);

  const handleClick = async () => {
    try {
      // await Promise.all(
      //   selectedRooms.map((roomId) => {
      //     const res = axios.put(
      //       `http://localhost:8800/api/v1/rooms/availability`,
      //       {
      //         roomNumberIds: selectedRooms,
      //         dates: alldates,
      //       },
      //       { withCredentials: true }
      //     );
      //     return res.data;
      //   })
      // );

      await axios.put(
        `http://localhost:8800/api/v1/rooms/availability`,
        {
          roomIds: selectedRooms,
          roomNumberIds: selectedRoomsNumber,
          dates: alldates,
        },
        { withCredentials: true }
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <AiFillCloseCircle onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <>
            <div
              className={`rItem flex ${
                selectedRooms.includes(item?._id)
                  ? "bg-green-400"
                  : "bg-gray-300"
              }`}
              key={item?._id}
            >
              <div className="flex gap-2 ">
                <label
                // for={item?._id}
                >
                  {" "}
                  Select Room:{" "}
                </label>
                <input
                  type="checkbox"
                  value={item?._id}
                  onClick={(e) => handleSelectRoom(e, item.price)}
                  className="w-5 "
                  // id={item?._id}
                />
              </div>

              <div className="rItemInfo">
                <div className="rTitle">{item?.title}</div>
                <div className="rDesc">{item?.desc}</div>
                <div className="rMax">
                  Max people: <b>{item?.maxPeople}</b>
                </div>
                <div className="rPrice">{item?.price}$</div>
              </div>
              <div className="rSelectRooms">
                {item?.roomNumbers.map((roomNumber) => (
                  <div key={roomNumber?._id} className="room">
                    <label>{roomNumber?.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber?._id}
                      onChange={(e) =>
                        handleSelect(e, item.price, roomNumber?._id)
                      }
                      disabled={
                        !isAvailable(roomNumber)
                        // !selectedRoomsNumber.includes(roomNumber?._id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <hr className="rounded border-gray-400" />
          </>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>

        <div>
          <p>Total price: {totalPrice}$</p>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
