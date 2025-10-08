import React, {useContext, useState} from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import { UserContext } from "../context/user.context";
import { ModalContext } from "../context/modal.context.jsx";

import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import RegisterModal from "./home/RegisterModal.jsx";
import LoginModal from "./home/LoginModal.jsx";


const Layout = ()=>{
      const {user} = useContext(UserContext);
      const { isRegisterOpen, setIsRegisterOpen, isLoginOpen, setIsLoginOpen } =useContext(ModalContext);

    return(
        <div className="min-h-screen flex flex-col bg-blue-100">
            {/* Navbar shared across all pages */}
            <Navbar
                user={user}
                // onSignupClick={() => setIsRegisterOpen(true)}
                onLoginClick={() => setIsLoginOpen(true)}   
            />

            {/* Main page content */}
            <main className="flex-1">
                <Outlet/>
            </main>

            {/* Footer shared across all pages */}
            <Footer 
                onLoginClick={() => setIsLoginOpen(true)} 
            />

            
            {/* Global Modals */}
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onLoginClick={() => setIsLoginOpen(true)}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSignupClick={() => setIsRegisterOpen(true)}
            />

        </div>

    )
}

export default Layout;