import React from "react";

const DeliveryPage = () => {
  return (
    <>
      <h1>Delivery Page</h1>
      <form action="" className="border border-black">
        <div className="input-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            className="border border-black"
          />
        </div>
      </form>
    </>
  );
};

export default DeliveryPage;
