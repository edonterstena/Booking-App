import React, { useEffect, useState } from "react";
import featuredImg from "../../img/featured-img.jpg";
import useFetch from "../../hooks/useFetch";

function Featured() {
  const [cities, setCities] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await fetch(
          "http://localhost:8800/api/v1/hotels/hotelCities"
        ).then((res) => res.json());
        const cityNames = citiesResponse.map((city) => city.city);

        const hotelDataResponse = await fetch(
          `http://localhost:8800/api/v1/hotels/countByCity?cities=${cityNames.join(
            ","
          )}`
        ).then((res) => res.json());

        setCities(citiesResponse);
        setHotelData(hotelDataResponse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredHotelData = hotelData.reduce((acc, item) => {
    const existingCity = acc.find((city) => city.city === item.city);
    if (!existingCity) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <>
      <div name="featured-container" className="bg-white md:p-14">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Featured
        </p>
        <div
          name="featured-items-list"
          className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 gap-10 p-4"
        >
          {loading
            ? "Loading please wait"
            : filteredHotelData.map((item, index) => (
                <div key={`${item.city}-${index}`}>
                  <div name="featured-item" className="bg-white">
                    <div
                      style={{ backgroundImage: `url(${featuredImg})` }}
                      name="featured-img"
                      className="p-3 h-64 bg-no-repeat rounded-xl bg-cover flex justify-start items-end"
                    >
                      <div className="text-white text-4xl font-bold hover:blur-none">
                        <h1>{item.city}</h1>
                        <p>{item.count} properties</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default Featured;
