import React, { useContext } from "react";
import { CartContext } from "../context/cart.context";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-emerald-700">
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-4">
            {cart.products.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b py-4"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Product ID: {item.product}
                  </p>
                  <p className="text-gray-500">Price: ₹{item.priceAtPurchase}</p>
                  <p className="text-gray-500">Shop: {item.shop}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product, item.quantity + 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="mt-4 text-red-500 underline hover:text-red-700"
            >
              Clear Cart
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-gray-700 mb-2">
              Total Items: <span className="font-bold">{totalItems}</span>
            </p>
            <p className="text-gray-700 mb-4">
              Total Price:{" "}
              <span className="font-bold text-emerald-700">
                ₹{totalPrice.toFixed(2)}
              </span>
            </p>
            <Link
              to="/checkout"
              className="block text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-500 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
