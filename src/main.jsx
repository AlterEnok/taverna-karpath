import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/colors.css'
import App from './App.jsx'

import { CartProvider } from "./context/CartContext"
import "@fontsource/ubuntu-sans-mono"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
