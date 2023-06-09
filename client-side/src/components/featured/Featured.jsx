import React, { useEffect, useState } from "react";
import featuredImg from "../../img/featured-img.jpg";
import useFetch from "../../hooks/useFetch";

function Featured() {
  const [cities, setCities] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    "https://i.pinimg.com/736x/f0/54/83/f05483028878fe9037a6d2f0d46444d5.jpg",
    "https://img.freepik.com/premium-vector/urban-city-silhouette-with-skyscraper-buildings-morning_611868-28.jpg?w=360",
    "https://cdn.dribbble.com/users/3928490/screenshots/6996603/city--00.jpg",
    "https://gd-hbimg.huaban.com/33fffe738a8264f4ffcaf3d627a3f862d3dc455c9888a-wjIwNw",
    "https://gd-hbimg.huaban.com/0d59bd4836ee1b9700ed83ea5c70fbfa0ba07db175df9-dPfOdr",
    "https://gd-hbimg.huaban.com/69f6be2c01a5138da0919c4ef2abb9a921ddf9dba35a6-Bj0SdF",
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
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
      <div name="featured-container" className="bg-[#F5f5f5] md:p-14">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Featured
        </p>
        <div
          name="featured-items-list"
          className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 gap-10 p-4 bg-[#F5f5f5]"
        >
          {loading
            ? "Loading please wait"
            : filteredHotelData.map((item, index) => (
                <div key={`${item.city}-${index}`}>
                  <div name="featured-item" className="bg-[#F5f5f5]">
                    <div
                      style={{
                        backgroundImage: `url(${randomImage})`,
                      }}
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
