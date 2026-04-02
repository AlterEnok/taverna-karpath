import { Routes, Route, useLocation } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home"
import Catalog from "./pages/Catalog/Catalog"
import CartSideBar from "./components/CartSideBar/CartSidebar"
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

import SuccessPage from "./pages/SuccessPage/SuccessPage";
import FailurePage from "./pages/FailurePage/FailurePage";

import TermsPage from "./pages/TermsPage/TermsPage";
import CertificatesPage from "./pages/CertificatesPage/CertificatesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import ReturnPage from "./pages/ReturnPage/ReturnPage";

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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/failure" element={<FailurePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/return" element={<ReturnPage />} />
        </Routes>
      </div>

      <CartSideBar />
    </>
  )
}

export default App