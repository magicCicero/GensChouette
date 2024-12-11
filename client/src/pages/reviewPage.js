import React from "react";
import Header from "../component/include/header";
import Navbar from "../component/include/navbar";
import Footer from "../component/include/footer";
import Review from "../component/include/review";

export default function ReviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Navbar />
      <Review />
      <Footer />
    </div>
  );
}
