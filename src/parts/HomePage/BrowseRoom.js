/* eslint-disable no-unused-vars */
import useAsync from "helpers/hooks/useAsync";
import React, { useEffect } from "react";

export default function BrowseRoom() {
  const { data, status, error, run, isLoading } = useAsync({
    data: { username: "" },
  });

  useEffect(() => {
    run(
      fetch(
        "https://2141c654-73c9-4ea9-8e89-ee7c8d597b8d.mock.pstmn.io/api/categories/?page=1&limit=4"
      ).then(async (response) => {
        // ambil result dari response API
        const jsonResponse = await response.json();
        // cek jika statusnya ok make return datanya
        if (response.ok) return jsonResponse;
        // jika tidak ok maka return error
        throw new Error(JSON.stringify(jsonResponse));
      })
    );
  }, [run]);

  // console.log(data, status, error);

  if (isLoading) return "Loading";

  return (
    <>
      {/* <!-- START: BROWSE THE ROOM --> */}
      <section className="flex bg-gray-100 py-16 px-4" id="browse-the-room">
        <div className="container mx-auto">
          <div className="flex flex-start mb-4">
            <h3 className="text-2xl capitalize font-semibold">
              browse the room <br className="" />
              that we designed for you
            </h3>
          </div>
          <div className="grid grid-rows-2 grid-cols-9 gap-4">
            <div
              className="relative col-span-9 row-span-1 md:col-span-4 card"
              style={{ height: 180 }}
            >
              <div className="card-shadow rounded-xl">
                <img
                  src="./images/content/image-catalog-1.png"
                  alt=""
                  className="w-full h-full object-cover object-center overlay overflow-hidden rounded-xl"
                />
              </div>
              <div className="overlay left-0 top-0 bottom-0 flex justify-center flex-col pl-48 md:pl-72">
                <h5 className="text-lg font-semibold">Living Room</h5>
                <span className="">18.309 items</span>
              </div>
              <a href="details.html" className="stretched-link">
                {/* <!-- fake children --> */}
              </a>
            </div>
            <div className="relative col-span-9 row-span-1 md:col-span-2 md:row-span-2 card">
              <div className="card-shadow rounded-xl">
                <img
                  src="./images/content/image-catalog-3.png"
                  alt=""
                  className="w-full h-full object-cover object-center overlay overflow-hidden rounded-xl"
                />
              </div>
              <div className="overlay right-0 left-0 top-0 bottom-0 md:bottom-auto flex justify-center md:items-center flex-col pl-48 md:pl-0 pt-0 md:pt-12">
                <h5 className="text-lg font-semibold">Decoration</h5>
                <span className="">77.392 items</span>
              </div>
              <a href="details.html" className="stretched-link">
                {/* <!-- fake children --> */}
              </a>
            </div>
            <div className="relative col-span-9 row-span-1 md:col-span-3 md:row-span-2 card">
              <div className="card-shadow rounded-xl">
                <img
                  src="./images/content/image-catalog-4.png"
                  alt=""
                  className="w-full h-full object-cover object-center overlay overflow-hidden rounded-xl"
                />
              </div>
              <div className="overlay right-0 left-0 top-0 bottom-0 md:bottom-auto flex justify-center md:items-center flex-col pl-48 md:pl-0 pt-0 md:pt-12">
                <h5 className="text-lg font-semibold">Living Room</h5>
                <span className="">22.094 items</span>
              </div>
              <a href="details.html" className="stretched-link">
                {/* <!-- fake children --> */}
              </a>
            </div>
            <div className="relative col-span-9 row-span-1 md:col-span-4 card">
              <div className="card-shadow rounded-xl">
                <img
                  src="./images/content/image-catalog-2.png"
                  alt=""
                  className="w-full h-full object-cover object-center overlay overflow-hidden rounded-xl"
                />
              </div>
              <div className="overlay left-0 top-0 bottom-0 flex justify-center flex-col pl-48 md:pl-72">
                <h5 className="text-lg font-semibold">Children Room</h5>
                <span className="">837 items</span>
              </div>
              <a href="details.html" className="stretched-link">
                {/* <!-- fake children --> */}
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- END: BROWSE THE ROOM --> */}
    </>
  );
}
