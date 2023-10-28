import React from "react";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceContainer from "./InvoiceContainer";

const MainContent = () => {
  return (
    <main className="main-section">
      <InvoiceHeader />
      <InvoiceContainer />
    </main>
  );
};

export default MainContent;
