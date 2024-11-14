import React from "react";
import Header from "../component/include/header";
import Navbar from "../component/include/navbar";
import Footer from "../component/include/footer";
import BusinessIntro from "../component/include/business-intro";

export default function IntroPage() {
  return (
    <>
      <Header />
      <Navbar />
      <BusinessIntro />
      <Footer />
    </>
  );
}
