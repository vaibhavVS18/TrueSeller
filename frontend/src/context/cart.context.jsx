import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    customer: null,
    products: [],
    totalPrice: 0,
    deliveryAddress: "",
    deliveryCharge: 0,
    paymentMethod: "COD",
    paymentStatus: "pending",
    status: "pending",
    notes: "",
  });

  const addToCart = (product, shopId, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.products.find(
        (item) => item.product === product._id
      );

      if (existingProduct) {
        return {
          ...prevCart,
          products: prevCart.products.map((item) =>
            item.product === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...prevCart,
        products: [
          ...prevCart.products,
          {
            product: product._id,
            quantity,
            priceAtPurchase: product.price,
            shop: shopId,
          },
        ],
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.filter((item) => item.product !== productId),
    }));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.map((item) =>
        item.product === productId ? { ...item, quantity } : item
      ),
    }));
  };

  const setDeliveryAddress = (address) => {
    setCart((prevCart) => ({ ...prevCart, deliveryAddress: address }));
  };

  const setPaymentMethod = (method) => {
    setCart((prevCart) => ({ ...prevCart, paymentMethod: method }));
  };

  const setPaymentStatus = (status) => {
    setCart((prevCart) => ({ ...prevCart, paymentStatus: status }));
  };

  const setCartStatus = (status) => {
    setCart((prevCart) => ({ ...prevCart, status }));
  };

  const setNotes = (text) => {
    setCart((prevCart) => ({ ...prevCart, notes: text }));
  };

  const setCustomer = (customerId) => {
    setCart((prevCart) => ({ ...prevCart, customer: customerId }));
  };

  const clearCart = () => {
    setCart({
      customer: null,
      products: [],
      totalPrice: 0,
      deliveryAddress: "",
      deliveryCharge: 0,
      paymentMethod: "COD",
      paymentStatus: "pending",
      status: "pending",
      notes: "",
    });
  };

  // Calculate total price
  const totalPrice = cart.products.reduce(
    (total, item) => total + item.priceAtPurchase * item.quantity,
    0
  );

  // Calculate total quantity of items
  const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setDeliveryAddress,
        setPaymentMethod,
        setPaymentStatus,
        setCartStatus,
        setNotes,
        setCustomer,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
