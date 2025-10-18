import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context.jsx'
import { ModalProvider } from './context/modal.context.jsx'
import { CartProvider } from './context/cart.context.jsx'

const App = () => {
  return (
    <UserProvider>
      <ModalProvider>
        <CartProvider>
          <AppRoutes/>
        </CartProvider>
      </ModalProvider>
    </UserProvider>
  )
}

export default App
