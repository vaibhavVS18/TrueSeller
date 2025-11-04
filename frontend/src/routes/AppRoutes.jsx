import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Layout from '../components/Layout.jsx';
import Home from "../pages/Home.jsx";
import ShopForm from '../pages/ShopForm.jsx';
import Shop from "../pages/Shop.jsx";
import Product from '../pages/Product.jsx';
import ProductsPage from '../pages/ProductsPage.jsx';
import ShopsPage from '../pages/ShopsPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import WishlistPage from '../pages/WishListPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
        {/* scroll to top when route changes */}
        <ScrollToTop/>   
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/start-shop" element={<ShopForm/>} />
                <Route path="/shop/:shopId" element={<Shop/>} />
                <Route path="/product/:productId" element={<Product/>} />
                <Route path="/productsPage" element={<ProductsPage/>} />
                <Route path="/shopsPage" element={<ShopsPage/>} />
                <Route path="/profilePage" element={<ProfilePage/>} />
                <Route path="/wishlistPage" element={<WishlistPage/>} />
                <Route path="/cartPage" element={<CartPage/>} />
                <Route path="/ordersPage" element={<OrdersPage/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
