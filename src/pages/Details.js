import React, { useEffect } from "react";
import Clients from "parts/Clients";
import Header from "parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";
import ProductDetail from "parts/Details/ProductDetail";
import Suggestion from "parts/Details/Suggestion";
import useAsync from "helpers/hooks/useAsync";
import { useParams } from "react-router-dom";
import useScrollToTop from "helpers/hooks/useScrollToTop";

export default function HomePage() {
  useScrollToTop();
  const { idp } = useParams();
  const { data, run, isLoading } = useAsync();

  useEffect(() => {
    run(fetch({ url: `/api/products/${idp}` }));
  }, [idp, run]);

  return (
    <>
      <Header theme={"black"} />
      <Breadcrumb
        list={[
          { url: "/", name: "Home" },
          { url: "/categories/87211", name: "Office Room" },
          { url: "/categories/87211/products/", name: "Detail" },
        ]}
      />
      {isLoading ? (
        <LoaderProductDetails />
      ) : (
        <ProductDetail data={data?.detail} />
      )}

      {isLoading ? (
        <LoaderSuggestion />
      ) : (
        <Suggestion data={data?.relatedProducts} />
      )}

      <Clients />
      <Sitemap />
      <Footer />
    </>
  );
}

const LoaderProductDetails = () => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-wrap my-4 md:my-12">
        {/* for tablet and under */}
        <div className="w-full md:hidden px-4">
          <div className="w-80 h-16 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-40 h-4 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
        </div>

        {/* for desktop */}
        <div className="flex-1">
          <div className="slider">
            <div className="thumbnail">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div className="px-2 relative card group" key={index}>
                    <div
                      className="rounded-xl item bg-gray-300 animate-pulse"
                      style={{ height: 106, width: 106 }}
                    ></div>
                  </div>
                ))}
            </div>
            <div className="preview">
              <div className="item rounded-lg h-full overflow-hidden">
                <div className="item bg-gray-300 animate-pulse rounded-lg h-full overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 md:p-6">
          <div className="w-80 h-16 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-40 h-4 mt-3 bg-gray-300 animate-pulse rounded-full"></div>

          <div className="w-44 h-10 mt-8 bg-gray-300 animate-pulse rounded-full"></div>
          <hr className="my-8" />

          <div className="w-36 h-6 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-88 h-6 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-60 h-6 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-88 h-6 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-60 h-6 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="w-88 h-6 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

const LoaderSuggestion = () => {
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
          {Array(4)
            .fill()
            .map((_, index) => (
              <div
                className="px-3 flex-none"
                style={{ width: 320 }}
                key={index}
              >
                <div
                  className="rounded-xl p-4 pb-8 relative bg-white"
                  key={index}
                >
                  <div className="rounded-xl overflow-hidden card-shadow w-full h-36">
                    <div
                      className="bg-gray-300 animate-pulse rounded-lg h-full"
                      style={{ width: 287, height: 150 }}
                    ></div>
                  </div>
                  <div className="w-56 h-4 mt-6 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="w-40 h-4 mt-3 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
