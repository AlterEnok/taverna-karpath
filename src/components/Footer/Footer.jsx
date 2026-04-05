import { useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.png";

import visa from "../../assets/icons/visa.svg";
import mastercard from "../../assets/icons/mastercard.svg";

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleScrollTo = (id) => {
        if (location.pathname === "/") {

            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } else {

            navigate("/", {
                state: { scrollTo: id },
                replace: false
            });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-logo-wrapper">
                    <div className="footer-logo-circle">
                        <img src={logo} alt="Vitaminka" className="footer-logo" />
                    </div>
                </div>

                <div className="footer-top">
                    <h3 className="footer-main-title">
                        Вітаміни та фітопрепарати
                    </h3>

                    <nav className="footer-nav">

                        <a
                            href="/"
                            className="footer-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/");
                            }}
                        >
                            Головна
                        </a>

                        <a
                            href="#about"
                            className="footer-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollTo("about");
                            }}
                        >
                            Про мене
                        </a>

                        <a
                            href="/catalog"
                            className="footer-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/catalog");
                            }}
                        >
                            Каталог
                        </a>

                        <a
                            href="#contacts"
                            className="footer-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollTo("contact");
                            }}
                        >
                            Контакти
                        </a>
                    </nav>
                </div>


                <div className="footer-info">
                    <div className="footer-links">
                        <a
                            href="/terms"
                            className="footer-link-small"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/terms");
                            }}
                        >
                            Договір публічної оферти
                        </a>

                        <a
                            href="/return"
                            className="footer-link-small"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/return");
                            }}
                        >
                            Повернення та обмін
                        </a>

                        <a
                            href="/privacy"
                            className="footer-link-small"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/privacy");
                            }}
                        >
                            Політика конфіденційності
                        </a>

                        <a
                            href="/certificates"
                            className="footer-link-small"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/certificates");
                            }}
                        >
                            Сертифікати
                        </a>
                    </div>

                    <div className="footer-schedule">
                        <p className="footer-schedule-line">
                            Відчиняється о 10:00 Пн-Сб: 10:00 - 18:00
                        </p>
                        <p className="footer-schedule-line">Нд: вихідний</p>
                        <p className="footer-address">
                            вул. Івана Мазепи 46, Кам'янець-Подільський
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright-wrapper">
                        <div className="footer-copyright">
                            <p>
                                © Vitaminka.2026. Усі права захищені. Розроблено студією{" "}
                                <a
                                    href="https://www.novateamweb.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="designed-link"
                                >
                                    NovaTeam
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="footer-payments">
                        <img src={visa} alt="Visa" />
                        <img src={mastercard} alt="Mastercard" />
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;