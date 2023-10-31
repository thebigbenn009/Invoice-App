import React from "react";
import SIdebar from "../components/SIdebar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <section className="app-container">
        <SIdebar />
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
