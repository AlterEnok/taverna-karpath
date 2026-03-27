import { Routes, Route, useLocation } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home"
import Catalog from "./pages/Catalog/Catalog"
import CartSideBar from "./components/CartSideBar/CartSidebar"
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />


      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>

      <CartSideBar />
    </>
  )
}

export default App