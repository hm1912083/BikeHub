"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminTopBar from "../../components/AdminTopBar";

const Orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("authenticatedUser")) {
            router.push("/login");
          }
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`/api/order/${page}`);
                setOrders(data.orders);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [page]);

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
                        <table className="table table-striped table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Total</th>
                                    <th>Shipment Status</th>
                                    <th>On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? orders.map(order => (
                                    <tr key={order.id}>
                                        <td>
                                            <Link href={`/orders/${order.id}`}>
                                                <span>ORD{order.idStr}</span>
                                            </Link>
                                        </td>
                                        <td>{order.billing_name}</td>
                                        <td>{order.billing_email}</td>
                                        <td>{order.billing_address}</td>
                                        <td>{order.billing_phone}</td>
                                        <td>{order.billing_total} QAR</td>
                                        <td>
                                            <span className={`badge ${order.shipmentStatus === 'Delivered' ? 'badge-success' : 'badge-info'}`}>
                                                {order.shipmentStatus}
                                            </span>
                                        </td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="text-center font-italic text-muted">No Record Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {totalPages > 1 && (
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li className={`page-item ${page === i + 1 ? 'active' : ''}`} key={i + 1}>
                                            <Link href="#">
                                                <span onClick={(e) => {
                                                    e.preventDefault();
                                                    setPage(i + 1);
                                                }}>{i + 1}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
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
