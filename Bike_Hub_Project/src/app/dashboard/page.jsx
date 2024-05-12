"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminTopBar from "../../components/AdminTopBar";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [ordersCount, setOrdersCount] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [categories, setCategories] = useState([]);
  const [bestSellingProduct, setBestSellingProduct] = useState([]);

  const [stats, setStats] = useState({
    categoriesCount: 0,
    productsCount: 0,
    ordersCount: 0,
    totalPurchases: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      setStats(response.data.stats);
      setCategories(response.data.categories);
      setBestSellingProduct(response.data.bestSellingProduct);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authenticatedUser")) {
      router.push("/login");
    }
    fetchData();
  }, [month]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/stats`, { params: { month } });
      setOrdersCount(response.data.ordersCount);
      setMonthlySales(response.data.monthlySales);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div
      className="container"
      style={{ minHeight: "80vh", marginTop: "100px" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-12">
          <AdminTopBar />

          <div className="row">
            <div className="col-md-12 justify-content-end mb-3">
              <div className="col-md-2 offset-md-10 px-0">
                <form>
                  <input
                    type="month"
                    className="form-control"
                    value={month}
                    onChange={handleMonthChange}
                  />
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-dark text-light">
                <div className="card-body">
                  <h4>
                    Orders in{" "}
                    {new Date(month).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <h6>{ordersCount}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-warning">
                <div className="card-body">
                  <h4>
                    Sales in{" "}
                    {new Date(month).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <h6>{monthlySales.toLocaleString()} QAR</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-3">
              <div className="card bg-primary text-light">
                <div className="card-body">
                  <h4>All Categories</h4>
                  <h6>{stats.categoriesCount}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-light">
                <div className="card-body">
                  <h4>All Products</h4>
                  <h6>{stats.productsCount}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-secondary text-light">
                <div className="card-body">
                  <h4>All Orders</h4>
                  <h6>{stats.ordersCount}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-light">
                <div className="card-body">
                  <h4>Total Purchases</h4>
                  <h6>{stats.totalPurchases.toLocaleString()} QAR</h6>
                </div>
              </div>
            </div>
          </div>

{bestSellingProduct.soldSoFar > 0 && (
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card bg-success text-light">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                    <h2>Best Selling Bike</h2>
                    <h3><strong>Name:</strong> {bestSellingProduct.name}</h3>
                    <h4><strong>Sold So Far:</strong> {bestSellingProduct.soldSoFar} times</h4>
                    <p><strong>Descripton:</strong> {bestSellingProduct.description}</p>
                    </div>
                    <div className="col-md-6">
                      <img className="img-fluid w-100 object-fit-cover" style={{ maxHeight:'300px', objectFit:'cover' }} src={`../../images/${bestSellingProduct.image}`} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
)}

          <div className="row pb-5">
            <div className="col-md-12 mt-5">
              <div className="card">
                <div className="card-body">
                  <h4>Categories List</h4>
                  <table className="table table-striped table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>{category.slug}</td>
                          <td>{category._count.products}</td>
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

export default Dashboard;
