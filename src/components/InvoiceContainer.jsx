import React from "react";
import { useEffect, useState } from "react";
import InvoiceCard from "./InvoiceCard";
import { useGlobalContext } from "../Context";
const countryAPI = `https://restcountries.com/v3.1/name/`;

const InvoiceContainer = () => {
  const { invoiceData, displayInvoice, fetchCountrySymbol } =
    useGlobalContext();
  const [currencySymbol, setCurrencySymbol] = useState("");

  // const fetchData = async (invoice) => {
  //   try {
  //     const symbol = await fetchCountrySymbol(invoice.clientAddress.country);
  //     setCurrencySymbol(symbol);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <section className="invoice-container">
      {displayInvoice.map((invoice) => {
        return (
          <InvoiceCard
            key={invoice.id}
            {...invoice}
            backgroundColor={`${
              invoice.status === "pending"
                ? "rgba(255, 143, 0, 0.1)"
                : invoice.status === "paid"
                ? "rgba(51, 214, 159, 0.1)"
                : invoice.status === "draft"
                ? "rgba(151, 151, 151, 0.1)"
                : ""
            }`}
            color={`${
              invoice.status === "pending"
                ? "#ff8f00"
                : invoice.status === "paid"
                ? "#33d69f"
                : invoice.status === "draft"
                ? "rgb(151, 151, 151)"
                : ""
            }`}
          />
        );
      })}
    </section>
  );
};

export default InvoiceContainer;
