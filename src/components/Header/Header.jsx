import { useEffect, useState } from "react"
import "./Header.css"

import { FiHeart } from "react-icons/fi"
import { FiShoppingCart } from "react-icons/fi"
import { FiSearch } from "react-icons/fi"

import logo from "../../assets/logo.png"

import { useCart } from "../../context/useCart"

function Header() {

    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const { setIsCartOpen } = useCart()

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)

    }, [])

    useEffect(() => {

        if (menuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

    }, [menuOpen])

    return (
        <header className={`header ${scrolled ? "header--scrolled" : ""}`}>

            <div className="header__wrapper">

                <div className="header__logo">
                    <img src={logo} alt="Рослина Карпат" className="header__logo-img" />
                </div>

                <nav className="header__nav">

                    <button className="header__nav-btn">
                        Про мене
                    </button>

                    <button className="header__nav-btn">
                        Контакти
                    </button>

                    <button className="header__nav-btn header__nav-btn--catalog">
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
                        className="header__icon-btn"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <FiShoppingCart />
                    </button>



                </div>

                {/* BURGER */}

                <button
                    className={`burger ${menuOpen ? "burger--active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                {/* MOBILE DROPDOWN */}

                <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>

                    <a href="#catalog" onClick={() => setMenuOpen(false)}>
                        Каталог
                    </a>

                    <a href="#about" onClick={() => setMenuOpen(false)}>
                        Про мене
                    </a>

                    <a href="#contact" onClick={() => setMenuOpen(false)}>
                        Контакти
                    </a>

                </div>




            </div>

        </header>
    )
}

export default Header