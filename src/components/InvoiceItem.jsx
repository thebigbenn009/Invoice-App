import React from "react";

const InvoiceItem = ({ name, quantity, price, total }) => {
  return (
    <div className="item-details">
      <p className="details-bold">{name}</p>
      <p className="details-bold text-center">{quantity}</p>
      <p className="details-bold text-right">{price}</p>
      <p className="details-bold text-right">{total}</p>
    </div>
  );
};

export default InvoiceItem;
