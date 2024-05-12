"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Checkout = () => {
  const router = useRouter();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  });

  const fetchData = async () => {
    await axios
      .get("/api/product/cart")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        if (error.response.status == 409) alert(error.response.data.message);
        console.error(
          "Error fetching cart items",
          error.response?.data?.message || error.message
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await axios
        .post("/api/order", {
          formData: formData,
          cartItems: cart,
          total: total,
        })
        .then(() => {
          alert("Your order has been completed successfully!");
          router.push("/");
        })
        .catch((error) => {
          if (error.response.status == 409) alert(error.response.data.message);
          console.error(
            "Error fetching cart items",
            error.response?.data?.message || error.message
          );
        });
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Error processing your order");
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-md-5 offset-md-1">
          <hr />
          <h3>Your Order</h3>
          <hr />
          {cart.length > 0 ? (
            <table className="table table-borderless table-responsive">
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={`/images/${item.image}`}
                        height="100px"
                        width="100px"
                        alt={item.name}
                      />
                    </td>
                    <td>
                      <h3 className="lead light-text">{item.name}</h3>
                      <p className="light-text">{item.details}</p>
                      <h3 className="light-text lead text-small">
                        {item.price} QAR
                      </h3>
                    </td>
                    <td>
                      <span className="quantity-square">{item.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in cart.</p>
          )}
          <hr />
          <div className="row">
            <div className="col-md-4">
              <h3>Total</h3>
            </div>
            <div className="col-md-4 offset-md-4">
              <h3 className="text-right">{calculateTotal()} QAR</h3>
            </div>
          </div>
        </div>

        <div className="col-md-5 offset-md-1">
          <div className="card mb-5">
            <div className="card-body">
              <h1 className="lead" style={{ fontSize: "1.5em" }}>
                Checkout
              </h1>
              <hr />
              <h3
                className="lead"
                style={{ fontSize: "1.2em", marginBottom: "1.6em" }}
              >
                Billing details
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="light-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control my-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="light-text">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control my-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="light-text">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control my-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city" className="light-text">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control my-input"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="province" className="light-text">
                        Province
                      </label>
                      <input
                        type="text"
                        name="province"
                        className="form-control my-input"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="postal_code" className="light-text">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        className="form-control my-input"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone" className="light-text">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control my-input"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success custom-border-success btn-block"
                >
                  Complete Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
