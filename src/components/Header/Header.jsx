import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

import logo from "../../assets/logo.png";
import { useCart } from "../../context/useCart";
import products from "../../data/products";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);


    const [searchQuery, setSearchQuery] = useState("");
    const filteredProducts = searchQuery.trim() === ""
        ? []
        : products
            .filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5);

    const searchRef = useRef(null);

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




    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;

            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);


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


    const handleSelectProduct = (id) => {
        navigate(`/product/${id}`);
        setSearchQuery("");

        setSearchOpen(false);
    };

    return (
        <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
            <div className={`header__wrapper ${searchOpen ? "search-active" : ""}`}>


                <div
                    className="header__logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
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


                <div className="header__search" ref={searchRef}>

                    <input
                        type="text"
                        placeholder="Пошук"
                        className={`header__search-input ${searchOpen ? "active" : ""}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus={searchOpen}
                    />

                    <FiSearch
                        className="header__search-icon"
                        onClick={() => setSearchOpen(prev => !prev)}
                    />

                    {filteredProducts.length > 0 && (
                        <div className="search-dropdown">
                            {filteredProducts.map(item => (
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


                <button
                    className={`burger ${menuOpen ? "burger--active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* MOBILE MENU */}
                <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                    <a onClick={() => { navigate("/catalog"); setMenuOpen(false); }}>
                        Каталог
                    </a>

                    <a onClick={() => handleScrollTo("about")}>Про мене</a>
                    <a onClick={() => handleScrollTo("contact")}>Контакти</a>
                </div>

            </div>
        </header>
    );
}

export default Header;