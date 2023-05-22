import React from "react";
import useFetch from "../../hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/room/${hotelid}`
  );
  return (
    <div className="reserve">
      <div name="container">
        <span onClick={() => setOpen(false)}>ICON</span>
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserve;
