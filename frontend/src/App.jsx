import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context.jsx'
import { ModalProvider } from './context/modal.context.jsx'

const App = () => {
  return (
    <UserProvider>
      <ModalProvider>
        <AppRoutes/>
      </ModalProvider>
    </UserProvider>
  )
}

export default App
