import React, { useEffect } from "react";
import Header from "../component/include/header";
import Navbar from "../component/include/navbar";
import Footer from "../component/include/footer";
import UserTable from "../component/admin/user_table";
import AdminTabs from "../component/admin/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminSellTable from "../component/admin/sell_table";
import Cookies from 'js-cookie'

export default function AdminPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("user") === '82') {
      if (!searchParams.get("tab")) {
        const newURL = new URLSearchParams();
        newURL.set("tab", "user");
        navigate(`/admin?${newURL.toString()}`, { replace: true });
      }
    } else {
        navigate('/')
    }
  }, []);

  const showTable = () => {
    if (!searchParams.get("tab") || searchParams.get("tab") === "user") {
      return <UserTable />;
    } else {
      return <AdminSellTable />;
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <AdminTabs />
      {showTable()}
      <Footer />
    </>
  );
}
