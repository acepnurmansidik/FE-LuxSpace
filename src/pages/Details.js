import React from "react";
import Clients from "parts/Clients";
import Header from "parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";

export default function HomePage() {
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
      <Clients />
      <Sitemap />
      <Footer />
    </>
  );
}
