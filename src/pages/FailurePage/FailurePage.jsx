import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle"

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./FailurePage.css";

function FailurePage() {
    usePageTitle("Помилка оформлення замовлення");

    const navigate = useNavigate();

    return (
        <>
            <Header />

            <section className="failure">
                <div className="failure-container">


                    <div className="failure-icon">✕</div>

                    <h1 className="failure-title">
                        Помилка оформлення
                    </h1>

                    <p className="failure-subtitle">
                        Щось пішло не так під час оплати або оформлення замовлення.
                        Спробуйте ще раз або поверніться до каталогу.
                    </p>

                    {/* кнопки */}
                    <div className="failure-actions">
                        <button
                            className="failure-btn retry"
                            onClick={() => navigate("/checkout")}
                        >
                            Спробувати ще раз
                        </button>

                        <button
                            className="failure-btn secondary"
                            onClick={() => navigate("/catalog")}
                        >
                            До каталогу
                        </button>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default FailurePage;