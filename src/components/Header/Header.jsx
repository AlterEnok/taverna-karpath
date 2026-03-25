import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

import logo from "../../assets/logo.png";
import { useCart } from "../../context/useCart";

function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ перенёс сюда (важно)

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { cartItems, setIsCartOpen } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    // ✅ ЯКОРНАЯ ЛОГИКА
    const handleScrollTo = (id) => {
        if (location.pathname === "/") {
            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            navigate("/", { state: { scrollTo: id } });
        }

        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
            <div className="header__wrapper">

                <div
                    className="header__logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    <img
                        src={logo}
                        alt="Рослина Карпат"
                        className="header__logo-img"
                    />
                </div>

                <nav className="header__nav">
                    <button
                        className="header__nav-btn"
                        onClick={() => handleScrollTo("about")}
                    >
                        Про мене
                    </button>

                    <button
                        className="header__nav-btn"
                        onClick={() => handleScrollTo("contact")}
                    >
                        Контакти
                    </button>

                    <button
                        className="header__nav-btn header__nav-btn--catalog"
                        onClick={() => navigate("/catalog")}
                    >
                        Каталог
                    </button>
                </nav>

                <div className="header__search">
                    <input
                        className="header__search-input"
                        type="text"
                        placeholder="Пошук"
                    />
                    <FiSearch className="header__search-icon" />
                </div>

                <div className="header__actions">
                    <button
                        className="header__icon-btn header__cart-btn"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <FiShoppingCart />
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </button>
                </div>

                {/* Burger */}
                <button
                    className={`burger ${menuOpen ? "burger--active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile menu */}
                <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                    <a
                        onClick={() => {
                            navigate("/catalog");
                            setMenuOpen(false);
                        }}
                    >
                        Каталог
                    </a>

                    <a onClick={() => handleScrollTo("about")}>
                        Про мене
                    </a>

                    <a onClick={() => handleScrollTo("contact")}>
                        Контакти
                    </a>
                </div>

            </div>
        </header>
    );
}

export default Header;