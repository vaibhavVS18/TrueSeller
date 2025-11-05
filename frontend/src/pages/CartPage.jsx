import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart.context";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "../config/axios";

export default function CartPage() {
  
  const {
    cart,
    productsData,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
    setDeliveryAddress,
    setPaymentMethod,
  } = useContext(CartContext);

  const [orderLoading, setOrderLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const mergedProducts = cart.products.map((cartItem) => {
    const fullProduct = productsData.find((p) => p._id === cartItem.product);
    return {
      ...fullProduct,
      quantity: cartItem.quantity,
    };
  });

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cart.deliveryAddress.trim()) {
      setValidationError("Please enter your delivery address");
      return;
    }

    try {
      setOrderLoading(true);
      setValidationError("");

      const res = await axios.post("/api/orders", cart);

      if (res.data?.order) {
        console.log("Order placed:", res.data.order);

        clearCart();

        alert("Order placed successfully!");
        navigate("/ordersPage");
      } 
      else {
        alert("Something went wrong. Please try again.");
      }
    } 

    catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    } 
    finally {
      setOrderLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-2xl xl:text-3xl font-bold text-center mb-6 text-emerald-700">
        Your Cart
      </h1>

      {cart.products.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link
            to="/productsPage"
            className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-500 transition"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 bg-white shadow-lg rounded-xl p-5">
            {mergedProducts.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b py-4">
                <img
                  src={item?.images?.[0] || "https://via.placeholder.com/80"}
                  alt={item?.name}
                  className="w-16 h-16 object-cover rounded-lg border mr-4"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item?.name}</p>
                  <p className="text-gray-500">₹{item?.price}</p>
                  <p className="text-gray-500 text-sm">Shop: {item?.shop || "—"}</p>
                </div>

                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 text-lg font-semibold border-r text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-gray-800 text-sm font-medium bg-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 text-lg font-semibold border-l text-white bg-cyan-600 hover:bg-cyan-500"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="border rounded p-1 mt-4 text-red-700 hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="text-center mt-7">
              <p className="text-gray-600 text-lg">Add more items in your cart.</p>
              <Link
                to="/productsPage"
                className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-500 transition"
              >
                Go Shopping
              </Link>
            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 max-h-100 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <p className="text-gray-700 mb-2">
              Total Items: <span className="font-bold">{totalItems}</span>
            </p>
            <p className="text-gray-700 mb-4">
              Total Price:{" "}
              <span className="font-bold text-emerald-700">₹{totalPrice.toFixed(2)}</span>
            </p>

            <div className="mb-1">
              <label className="block text-gray-700 font-medium mb-1">Delivery Address</label>
              <textarea
                rows="1"
                value={cart.deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value)
                  if(validationError) setValidationError("");
                }}

                className={`w-full border rounded p-2 focus:outline-none focus:ring
                            ${validationError ? "border-red-400 focus:border-red-500"
                                              : "focus:border-emerald-400"
                            }
                          `}
                placeholder="Enter your delivery address"
                required
              ></textarea>

              {validationError && (
                <p className="text-red-500 text-sm mt-1">{validationError}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Payment Method</label>
              <select
                value={cart.paymentMethod}
                onChange={(e) => {
                  if (e.target.value === "Online") {
                    // Prevent selecting online payment
                    alert("Online Payment is not available at this time");
                    return;
                  }
                  setPaymentMethod(e.target.value);
                }}
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-emerald-400"
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option
                  value="Online"
                  disabled
                  className="cursor-not-allowed text-gray-400"
                >
                  Online Payment (Not available)
                </option>
              </select>

              <p className="text-blue-500 text-center text-sm mt-1">
                Online payment will be available soon!
              </p>
            </div>


            <button
              onClick={handleCheckout}
              disabled={orderLoading}
              className={`w-full text-center py-2 rounded-lg transition ${
                orderLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              }`}
            >
              {orderLoading ? "Processing..." : "Proceed to Checkout"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
