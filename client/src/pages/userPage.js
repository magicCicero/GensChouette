import React, { useEffect } from "react";
import Header from "../component/include/header";
import Navbar from "../component/include/navbar";
import Footer from "../component/include/footer";
import UserSellTable from "../component/user/user_table";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function UserPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("user") !== "0") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <UserSellTable />
      <Footer />
    </>
  );
}
