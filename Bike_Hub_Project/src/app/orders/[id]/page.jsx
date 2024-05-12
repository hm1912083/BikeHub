"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminTopBar from "../../../components/AdminTopBar";

const Orders = ({ params }) => {
  const id = parseInt(params.id);
  const router = useRouter();
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    await axios
      .get(`/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("authenticatedUser")) {
      router.push("/login");
    }

    fetchOrder();
  }, [id]);

  return (
    <div
      className="container"
      style={{ minHeight: "80vh", marginTop: "100px" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-12">
          <AdminTopBar />
          <div className="row pb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body table-responsive">
                  <h4>Order Details</h4>
                  <table className="table table-striped table-sm table-bordered">
                    <tbody>
                      {/* <tr>
                        <th>ID</th>
                        <td>ORD{order.idStr}</td>
                      </tr> */}
                      <tr>
                        <th>Name</th>
                        <td>{order.billing_name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{order.billing_email}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{order.billing_address}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{order.billing_phone}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>${order.billing_total}</td>
                      </tr>
                      <tr>
                        <th>Shipment Status</th>
                        <td>
                          {order.shipped === 0 ? (
                            <span>
                              <span className="badge badge-info">Pending</span>
                              <Link
                                href={`/order/mark-as-delivered/${order.id}`}
                              >
                                <a className="btn btn-dark btn-sm">
                                  Mark as Delivered
                                </a>
                              </Link>
                            </span>
                          ) : (
                            <span className="badge badge-success">
                              Delivered
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>On</th>
                        <td>
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <h4>Products</h4>
                  <table className="table table-bordered table-striped table-hover table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order &&
                        order.order_products &&
                        order.order_products.map((item) => (
                          <tr key={item.id}>
                            <td>{item.product.name}</td>
                            <td>{item.product.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price} QAR</td>
                            <td>{item.product.price*item.quantity} QAR</td>
                            <td>
                              <img
                                src={`../../images/${item.product.image}`}
                                className="image-thumbnail active"
                                style={{ width: "100px" }}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
