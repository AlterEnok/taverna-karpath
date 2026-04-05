import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { FiShoppingCart, FiSearch, FiX } from "react-icons/fi";

import logo from "../../assets/logo.png";
import { useCart } from "../../context/useCart";
import products from "../../data/products";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);        // ← новое
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const searchRef = useRef(null);
    const lastScrollY = useRef(0);                       // ← новое

    const { cartItems, setIsCartOpen } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

    const filteredProducts =
        searchQuery.trim() === ""
            ? []
            : products
                .filter((p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5);

    // Скролл для изменения фона
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Новый эффект: скрывать при скролле вниз, показывать при скролле вверх
    useEffect(() => {
        const handleHideHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleHideHeader, { passive: true });
        return () => window.removeEventListener("scroll", handleHideHeader);
    }, []);

    useEffect(() => {
        document.body.style.overflowY =
            menuOpen || mobileSearchOpen ? "hidden" : "auto";
    }, [menuOpen, mobileSearchOpen]);

    const handleScrollTo = (id) => {
        if (location.pathname === "/") {
            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            navigate("/", { state: { scrollTo: id } });
        }
        setMenuOpen(false);
    };

    const handleSelectProduct = (id) => {
        navigate(`/product/${id}`);
        setSearchQuery("");
        setMobileSearchOpen(false);
    };

    return (
        <>
            <header className={`header ${scrolled ? "header--scrolled" : ""} ${hidden ? "header--hidden" : ""}`}>
                <div className="header__wrapper">
                    <div
                        className="header__logo"
                        onClick={() => navigate("/")}
                    >
                        <img src={logo} alt="" className="header__logo-img" />
                    </div>

                    <nav className="header__nav">
                        <button onClick={() => handleScrollTo("about")} className="header__nav-btn">
                            Про мене
                        </button>

                        <button onClick={() => handleScrollTo("contact")} className="header__nav-btn">
                            Контакти
                        </button>

                        <button
                            className="header__nav-btn header__nav-btn--catalog"
                            onClick={() => navigate("/catalog")}
                        >
                            Каталог
                        </button>
                    </nav>

                    <div className="header__search desktop-search" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Пошук"
                            className="header__search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <FiSearch className="header__search-icon" />

                        {filteredProducts.length > 0 && (
                            <div className="search-dropdown">
                                {filteredProducts.map((item) => (
                                    <div
                                        key={item.id}
                                        className="search-item"
                                        onClick={() => handleSelectProduct(item.id)}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <FiSearch
                        className="mobile-search-icon"
                        onClick={() => setMobileSearchOpen(true)}
                    />

                    <div className="header__actions">
                        <button
                            className="header__icon-btn header__cart-btn"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <FiShoppingCart />
                            {cartCount > 0 && (
                                <span className="cart-badge">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    <button
                        className={`burger ${menuOpen ? "burger--active" : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                        <a onClick={() => { navigate("/catalog"); setMenuOpen(false); }}>
                            Каталог
                        </a>
                        <a onClick={() => handleScrollTo("about")}>Про мене</a>
                        <a onClick={() => handleScrollTo("contact")}>Контакти</a>
                    </div>
                </div>
            </header>

            <div className={`search-modal ${mobileSearchOpen ? "active" : ""}`}>
                <div className="search-modal__header">
                    <input
                        type="text"
                        placeholder="Пошук..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />

                    <FiX onClick={() => setMobileSearchOpen(false)} />
                </div>

                <div className="search-modal__results">
                    {filteredProducts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleSelectProduct(item.id)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Header;