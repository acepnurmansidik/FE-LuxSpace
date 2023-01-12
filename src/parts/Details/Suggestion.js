import React from "react";
import { Link } from "react-router-dom";

export default function Suggestion({ data }) {
  const data2 = [
    {
      id: 1,
      idc: 2,
      title: "Cangkir Mauttie",
      price: 89300000,
      imageUrl: "/images/content/chair-1.png",
    },
    {
      id: 2,
      idc: 2,
      title: "Cangkir Mauttie",
      price: 14500399,
      imageUrl: "/images/content/chair-2.png",
    },
    {
      id: 3,
      idc: 2,
      title: "Lino Dino",
      price: 22000000,
      imageUrl: "/images/content/chair-3.png",
    },
    {
      id: 4,
      idc: 2,
      title: "Syail Ammeno",
      price: 6399999,
      imageUrl: "/images/content/chair-4.png",
    },
  ];

  return (
    <section className="bg-gray-100 px-4 py-16">
      <div className="container mx-auto">
        <div className="flex flex-start mb-4">
          <h3 className="text-2xl capitalize font-semibold">
            Complete your room <br className="" />
            with what we designed
          </h3>
        </div>
        <div className="flex overflow-x-auto mb-4 -mx-3">
          {data2?.map((item, index) => (
            <div
              className="px-3 flex-none"
              style={{ width: 320 }}
              key={item.id}
            >
              <div className="rounded-xl p-4 pb-8 relative bg-white">
                <div className="rounded-xl overflow-hidden card-shadow w-full h-36">
                  <img
                    src={item.imageUrl}
                    alt={item.imageUrl}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h5 className="text-lg font-semibold mt-4">{item.title}</h5>
                <span className="">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.price)}
                </span>
                <Link
                  to={`/categories/${item.idc}/products/${item.id}`}
                  className="stretched-link"
                >
                  {/* <!-- fake children --> */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
