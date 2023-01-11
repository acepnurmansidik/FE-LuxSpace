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

export default function HomePage() {
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
      <ProductDetail data={data?.detail} isLoading={isLoading} />
      <Suggestion data={data?.relatedProducts} isLoading={isLoading} />
      <Clients />
      <Sitemap />
      <Footer />
    </>
  );
}
