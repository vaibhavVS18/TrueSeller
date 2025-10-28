import React, { createContext, useState ,useContext, useEffect} from "react";
import { UserContext } from "./user.context";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {user} = useContext(UserContext);

  const [cart, setCart] = useState({    // this cart will be used as a new order (see order model)
    customer: null,
    products: [],
    totalPrice: 0,
    deliveryAddress: "",
    deliveryCharge: 0,
    paymentMethod: "COD",
    paymentStatus: "pending",
    status: "ordered",
    notes: "",
  });

  const [productsData, setProductsData] = useState([]);   // full product details

  useEffect(()=>{
    if(user && user._id){
      setCart((prevCart)=>({...prevCart, customer: user._id}))
    }
  }, [user])

  const addToCart = (product, shopId, quantity = 1) => {
    setCart((prevCart) => {
      prevCart.totalPrice += product.price;

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

      // If product is new, also add full product info to productsData
      setProductsData((prevData) => [
        ...prevData,
        {
          _id: product._id,
          name: product.name,
          images: product.images || [],
          price: product.price,
          category: product.category,
          shop: product.shop?.shopname || "",
        },
      ]);

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

    // Remove from productsData as well
    setProductsData((prevData) =>
      prevData.filter((item) => item._id !== productId)
    );
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
      status: "ordered",
      notes: "",
    });
    setProductsData([]);
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
        productsData,
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
