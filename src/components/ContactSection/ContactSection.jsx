import "./ContactSection.css";

import instagramIcon from "../../assets/icons/instagram.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import emailIcon from "../../assets/icons/email.svg";


import { FiArrowUpRight } from "react-icons/fi";

function ContactSection() {
    return (
        <section className="contact-section">
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">Дізнайтесь про нас більше</h2>
                    <p className="contact-subtitle">
                        Ми завжди раді спілкуванню з вами! Оберіть зручний для вас канал
                        зв’язку, щоб ми могли швидко відповісти на ваші запитання та надати
                        необхідну допомогу.
                    </p>
                </div>

                <div className="contact-buttons">
                    <a
                        href="https://www.instagram.com/vitaminka_av?igsh=OG5tYnF6NncxMzd0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-btn instagram"
                    >
                        <img src={instagramIcon} alt="Instagram" className="contact-icon" />
                        INSTAGRAM
                        <FiArrowUpRight className="arrow" />
                    </a>

                    <a
                        href="https://t.me/vitaminka_av"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-btn telegram"
                    >
                        <img src={telegramIcon} alt="Telegram" className="contact-icon" />
                        TELEGRAM
                        <FiArrowUpRight className="arrow" />
                    </a>

                    <a
                        href="mailto:alona092017@ukr.net"
                        className="contact-btn email"
                    >
                        <img src={emailIcon} alt="Email" className="contact-icon" />
                        EMAIL
                        <FiArrowUpRight className="arrow" />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;