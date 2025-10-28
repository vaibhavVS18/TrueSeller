import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders/my-orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case "ordered":
        return 25;
      case "shipped":
        return 50;
      case "out-for-delivery":
        return 75;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 text-lg mb-3">You have no orders yet.</p>
        <Link
          to="/productsPage"
          className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-500 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-emerald-700">
        My Orders
      </h1>

      <div className="max-w-6xl mx-auto space-y-6">
        {orders.map((order) => {
          const progress = getProgressPercentage(order.status);

          return (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Placed On:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

              {/* Order Status ,Progress Bar */}
              <div className="relative mb-4 pb-3">
                <p
                  className={`font-semibold 
                                ${ order.status === "delivered"
                                ? "text-green-600"
                                : order.status === "cancelled"
                                ? "text-red-600"
                                : "text-yellow-600"
                                }
                              mb-4
                            `}
                >
                  Status: {order.status}
                </p>
                
                <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="flex items-center relative">
                    <div
                        className="h-2 bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <div
                        className="absolute h-3 w-3 rounded-full border border-green-200 bg-cyan-600"
                        style={{
                            left: `${progress}%`,
                            transform: "translate(-50%, 0%)",  // imp.
                        }}
                    ></div>
                </div>
             </div>


                {/* Step Labels */}
                <div className="flex justify-between text-xs mt-2 text-gray-600 font-medium">
                  <span>
                  </span>

                  <span
                    className={progress >= 25 ? "text-emerald-600 font-semibold" : ""}
                  >
                    Ordered
                  </span>
                  <span
                    className={progress >= 50 ? "text-emerald-600 font-semibold" : ""}
                  >
                    Shipped
                  </span>
                  <span
                    className={progress >= 75 ? "text-emerald-600 font-semibold" : ""}
                  >
                    Delivering
                  </span>
                  <span
                    className={progress >= 100 ? "text-emerald-600 font-semibold" : ""}
                  >
                    Delivered
                  </span>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-4 border border-2 border-cyan-600 p-3">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product?.images?.[0] || "https://via.placeholder.com/60"}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.product?.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Shop: {item.shop?.shopname || "Unknown Shop"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.quantity} × ₹{item.priceAtPurchase}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 font-medium mt-2 md:mt-0">
                      ₹{(item.quantity * item.priceAtPurchase).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-end">
                    <p className="text-lg">Total:</p>
                      &nbsp;
                    <p className="font-semibold text-emerald-700 text-lg">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                </div>

              </div>

              {/* Order Summary */}
              <div className="mt-4 text-gray-700">
                <p>
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {order.deliveryAddress}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentMethod} ({order.paymentStatus})
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
