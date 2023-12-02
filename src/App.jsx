import React from "react";
import "./index.css";
import SIdebar from "./components/SIdebar";
import MainContent from "./components/MainContent";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import LandingPage from "./pages/LandingPage";
import CreateNewInvoice from "./pages/CreateNewInvoice";
import ErrorPage from "./pages/ErrorPage";
import SingleInvoice from "./components/SingleInvoice";
import EditInvoice from "./components/EditInvoice";
import { loader as singleInvoiceLoader } from "./components/SingleInvoice";
import { loader as editInvoiceLoader } from "./components/EditInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        element: <CreateNewInvoice />,
        path: "newInvoice",
      },
      {
        element: <SingleInvoice />,
        path: "singleInvoice/:id",
        errorElement: <ErrorPage />,
        loader: singleInvoiceLoader,
      },
      {
        element: <EditInvoice />,
        path: "editInvoice/:id",
        errorElement: <ErrorPage />,
        loader: editInvoiceLoader,
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
    // <section className="app-container">
    //   <SIdebar />
    //   <MainContent />
    // </section>
  );
}

export default App;
