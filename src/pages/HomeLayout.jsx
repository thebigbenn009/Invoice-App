import React from "react";
import SIdebar from "../components/SIdebar";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../Context";
import DeleteModal from "../components/DeleteModal";

const HomeLayout = () => {
  const { showModal, setShowModal } = useGlobalContext();
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
