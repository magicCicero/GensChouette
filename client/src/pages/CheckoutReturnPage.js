import React from "react";
import Header from "../component/include/header";
import Navbar from "../component/include/navbar";
import Footer from "../component/include/footer";
import CheckoutReturn from "../component/include/checkoutReturn";

export default function CheckoutReturnPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Navbar />
      <CheckoutReturn />
      <Footer />
    </div>
  );
}