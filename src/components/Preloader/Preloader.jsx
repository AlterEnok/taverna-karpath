import { useEffect, useState } from "react";
import "./Preloader.css";

function Preloader() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // === БЛОКУЄМО СКРОЛ ===
        document.documentElement.classList.add("no-scroll");

        // Запускаємо fade-out
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2800);

        // Повністю прибираємо прелоадер
        const removeTimer = setTimeout(() => {
            setVisible(false);
            document.documentElement.classList.remove("no-scroll");
        }, 3600);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
            document.documentElement.classList.remove("no-scroll");
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`preloader ${fadeOut ? "preloader--fade" : ""}`}>
            <div className="preloader__capsule">
                <div className="capsule-left"></div>
                <div className="capsule-right"></div>
                <div className="capsule-text">VITAMINKA</div>
            </div>
        </div>
    );
}

export default Preloader;