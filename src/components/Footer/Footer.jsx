import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
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
                        <a href="/" className="footer-nav-link">Головна</a>
                        <a href="#about" className="footer-nav-link">Про нас</a>
                        <a href="#catalog" className="footer-nav-link">Каталог</a>
                        <a href="#contacts" className="footer-nav-link">Контакти</a>
                    </nav>
                </div>

                <div className="footer-info">
                    <div className="footer-links">
                        <a href="/terms" className="footer-link-small">Умови використання</a>
                        <a href="/return" className="footer-link-small">Повернення та обмін</a>
                        <a href="/privacy" className="footer-link-small">Політика конфіденційності</a>
                        <a href="/certificates" className="footer-link-small">Сертифікати</a>
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

                <div className="footer-copyright-wrapper">
                    <div className="footer-copyright">
                        <p>
                            © Vitaminka.2026. All rights reserved. Designed by{" "}
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

            </div>
        </footer>
    );
}

export default Footer;