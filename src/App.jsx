import { Routes, Route, useLocation } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home"
import Catalog from "./pages/Catalog/Catalog"
import CartSideBar from "./components/CartSideBar/CartSidebar"

function App() {
  const location = useLocation(); // 🔥 важно

  return (
    <>
      <ScrollToTop />

      {/* 🔥 ОБЕРТКА С АНИМАЦИЕЙ */}
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </div>

      <CartSideBar />
    </>
  )
}

export default App