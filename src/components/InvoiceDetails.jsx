import React from "react";
import { useGlobalContext } from "../Context";
import InvoiceItem from "./InvoiceItem";
import TotalPrice from "./TotalPrice";
import { useEffect, useState } from "react";
import { getCurrency } from "../utils";
const InvoiceDetails = ({ singleInvoice }) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = singleInvoice;
  const { fetchCountrySymbol } = useGlobalContext();
  const [currencySymbol, setCurrencySymbol] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbol = await fetchCountrySymbol(clientAddress?.country);
        if (symbol) {
          setCurrencySymbol(symbol);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <article className="invoice-details">
      <div className="details-primary">
        <div className="primary-1">
          <p className="details-bold">
            {`#`}
            {id}
          </p>
          <p>{description}</p>
        </div>
        <div className="primary-2">
          <p>{senderAddress.street}</p>
          <p>{senderAddress.city}</p>
          <p>{senderAddress.postCode}</p>
          <p>{senderAddress.country}</p>
        </div>
      </div>
      <div className="details-secondary">
        <div className="secondary-1">
          <div className="mb-3">
            <p className="mb-2">Invoice Date</p>
            <p className="details-bold">{createdAt}</p>
          </div>
          <div>
            <p className="mb-2">Payment Due</p>
            <p className="details-bold">{paymentDue}</p>
          </div>
        </div>
        <div className="secondary-2">
          <div>
            <p className="mb-2">Bill to</p>
            <p className="details-bold">{clientName}</p>
            <p>{clientAddress.street}</p>
            <p>{clientAddress.city}</p>
            <p>{clientAddress.postCode}</p>
            <p>{clientAddress.country}</p>
          </div>
        </div>
        <div className="secondary-3">
          <div>
            <p className="mb-2">Sent to</p>
            <p className="details-bold">{clientEmail}</p>
          </div>
        </div>
      </div>
      <div className="details-tertiary">
        <div className="item-details">
          <p>Item Name</p>
          <p className="text-center">QTY.</p>
          <p className="text-right">Price</p>
          <p className="text-right">Total</p>
        </div>
        {items.map((item, index) => {
          return (
            <InvoiceItem
              key={index}
              {...item}
              price={`${currencySymbol}${item.price}`}
              total={`${currencySymbol}${item.total}`}
            />
          );
        })}
      </div>
      <TotalPrice total={`${currencySymbol}${total}`} />
    </article>
  );
};

export default InvoiceDetails;
