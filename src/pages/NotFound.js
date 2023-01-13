import React from "react";
import Header from "parts/Header";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";
import PageErrorMessage from "parts/PageErrorMessage";
import DocumentWrap from "parts/DocumentWrap";

export default function NotFound() {
  return (
    <DocumentWrap>
      <Header />
      <PageErrorMessage />
      <Sitemap />
      <Footer />
    </DocumentWrap>
  );
}
