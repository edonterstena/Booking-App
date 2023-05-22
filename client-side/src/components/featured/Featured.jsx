import React from "react";

import featuredImg from "../../img/featured-img.jpg";
import { AiFillStar } from "react-icons/Ai";
import useFetch from "../../hooks/useFetch";

function Featured() {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/v1/hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <>
      <div name="featured-container" className=" bg-white md:p-14">
        <p
          name="featured-container-title"
          className="text-center font-PlusJakartaSans font-bold p-4 text-2xl sm:text-4xl sm:text-start"
        >
          Perfect holiday deals
        </p>
        <div
          name="featured-items-list"
          className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 gap-10 p-4"
        >
          {loading ? (
            "Loading please wait"
          ) : (
            <>
              <div name="featured-item" className="bg-white ">
                <div
                  style={{ backgroundImage: `url(${featuredImg})`, blur }}
                  name="featured-img"
                  className="p-3 h-64 bg-no-repeat rounded-xl bg-cover flex justify-start items-end "
                >
                  <div className="text-white text-4xl font-bold hover:blur-none">
                    <h1>Berlin</h1>
                    <p>{data[0]} properties</p>
                  </div>
                </div>
              </div>
              <div name="featured-item" className="bg-white ">
                <div
                  style={{ backgroundImage: `url(${featuredImg})` }}
                  name="featured-img"
                  className="p-3 h-64 bg-no-repeat rounded-xl bg-cover flex justify-start items-end "
                >
                  <div className="text-white text-4xl font-bold hover:blur-none">
                    <h1>Madrid</h1>
                    <p>{data[1]} properties</p>
                  </div>
                </div>
              </div>
              <div name="featured-item" className="bg-white ">
                <div
                  style={{ backgroundImage: `url(${featuredImg})` }}
                  name="featured-img"
                  className="p-3 h-64 bg-no-repeat rounded-xl bg-cover flex justify-start items-end "
                >
                  <div className="text-white text-4xl font-bold hover:blur-none">
                    <h1>London</h1>
                    <p>{data[2]} properties</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Featured;
