import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import './index.css'
import './styles/colors.css'
import App from './App.jsx'

import { CartProvider } from "./context/CartContext"
import "@fontsource/ubuntu-sans-mono"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/taverna-karpath/">
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)