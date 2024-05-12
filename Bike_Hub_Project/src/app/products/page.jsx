"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminTopBar from "../../components/AdminTopBar";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("authenticatedUser")) {
      router.push("/login");
    }
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/product/${page}`);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

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
                  <h4>All Products</h4>
                  <table className="table table-striped table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.category?.name}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                              <img
                                src={`../../../images/${product.image}`}
                                className="img-thumbnail"
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{product.quantity}</td>
                            <td>{product.price} QAR</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center font-italic text-muted"
                          >
                            No Record Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {totalPages > 1 && (
                    <div className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Link
                          href="#"
                          key={i + 1}
                          onClick={() => setPage(i + 1)}
                        >
                          <span
                            className={`page-item ${
                              page === i + 1 ? "active" : ""
                            }`}
                          >
                            {i + 1}
                          </span>
                        </Link>
                      ))}
                    </div>
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

export default Products;
