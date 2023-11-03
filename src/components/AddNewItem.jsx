import React from "react";
import { useGlobalContext } from "../Context";

const AddNewItem = () => {
  const { formData, handleInputChange } = useGlobalContext();
  const { items } = formData;
  return (
    <div className="new-item-container">
      {items.map((item, index) => {
        <div className="new-item" key={index}>
          <div className="new-item-name item-name">
            <p>Item Name</p>
            <input
              type="text"
              name={`items[${index}].name`}
              value={item.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="new-item-name quantity">
            <p>Qty.</p>
            <input
              type="number"
              name="items[0].quantity"
              value={items[0].quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="new-item-name item-price">
            <p>Price</p>
            <input
              type="number"
              name="items[0].price"
              value={items[0].price}
              onChange={handleInputChange}
            />
          </div>
          <div className="new-item-name item-total ">
            <p>Total</p>
            <div className="total">156</div>
          </div>
          <div className="new-item-name bin">
            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                fill="#888EB0"
                fill-rule="nonzero"
              />
            </svg>
          </div>
        </div>;
      })}
    </div>
  );
};

export default AddNewItem;
