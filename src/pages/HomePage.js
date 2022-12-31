import React from "react";
import Clients from "parts/Clients";
import Header from "parts/Header";
import BrowseRoom from "parts/HomePage/BrowseRoom";
import JustArrived from "parts/HomePage/JustArrived";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";
import Hero from "parts/HomePage/Hero";
import useScrollAnchor from "helpers/hooks/useScrollAnchor";

export default function HomePage() {
  useScrollAnchor();

  return (
    <>
      <Header theme={"white"} posotion={"absolute"} />
      <Hero />
      <BrowseRoom />
      <JustArrived />
      <Clients />
      <Sitemap />
      <Footer />
    </>
  );
}
