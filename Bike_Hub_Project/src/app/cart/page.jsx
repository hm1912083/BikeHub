"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    await axios
      .get("/api/product/cart")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        if (error.response.status == 409) alert(error.response.data.message);
        console.error(
          "Error adding to cart:",
          error.response?.data?.message || error.message
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (id) => {
    await axios
      .delete("/api/product/cart", {
        data: { id: id },
      })
      .then((response) => {
        fetchData();
        alert("Item removed from cart");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          console.error(
            "Error removing from cart:",
            error.response?.data?.message || error.message
          );
        }
      });
  };

  const handleQuantityChange = async (product_id, quantity) => {
    const updatedQuantity = parseInt(quantity, 10);

    try {
      const response = await axios.patch("/api/product/cart", {
        product_id:product_id,
        quantity: updatedQuantity,
      });
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response?.data?.message || error.message
      );
      alert("Failed to update quantity");
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!cart || cart.length === 0) {
    return (
      <div>
        <div className="container" style={{ marginTop: "200px" }}>
          <div className="alert text-white bg-danger mt-5">
            Your cart is empty.
          </div>
          ;
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-md-10 mt-5 offset-md-1">
          <h3 className="lead mt-4">
            {cart.length} items in the shopping cart
          </h3>
          <table className="table table-responsive">
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src="images/" alt="" />
                    <img
                      src={`./../../images/${item.image}`}
                      height="100px"
                      width="100px"
                      alt={item.name}
                    />
                  </td>
                  <td>
                    <h3 className="lead light-text">{item.name}</h3>
                    <p className="light-text">{item.details}</p>
                  </td>
                  <td>
                    <button
                      className="cart-option rounded btn btn-danger btn-sm custom-border"
                      onClick={() => handleRemove(item.product_id)}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <select
                      className="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.product_id, e.target.value)
                      }
                    >
                      {[...Array(10).keys()].map((i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)} QAR</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary">
            <div className="row">
              <div className="col-md-8">
                <p className="light-text">
                  Summary details or promotional text can go here.
                </p>
              </div>
              <div className="col-md-3 offset-md-1">
                <p className="text-right light-text">
                  Subtotal &nbsp; &nbsp; {calculateSubtotal().toFixed(2)} QAR
                </p>
                <p className="text-right">
                  Total &nbsp; &nbsp; {calculateSubtotal().toFixed(2)} QAR
                </p>
              </div>
            </div>
          </div>
          <div className="cart-actions mb-5">
            <a className="btn custom-border-n rounded" href="/">
              Continue Shopping
            </a>
            <a
              className="float-right btn btn-success rounded custom-border-n"
              href="/checkout"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
