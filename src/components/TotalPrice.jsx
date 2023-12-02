import React from "react";

const TotalPrice = ({ total }) => {
  return (
    <article className="total-price">
      <p>Amount Due</p>
      <p className="total-amount">{total}</p>
    </article>
  );
};

export default TotalPrice;
