import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Catalog from "./pages/Catalog/Catalog"
import CartSideBar from "./components/CartSideBar/CartSidebar"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>

      <CartSideBar />
    </>
  )
}

export default App