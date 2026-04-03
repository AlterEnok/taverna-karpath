import { useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./SuccessPage.css";

function SuccessPage() {
    usePageTitle("Замовлення успішно оформлено | Vitaminka");

    const { state } = useLocation();
    const navigate = useNavigate();

    const order = state || {};
    const customer = order.customer || {};

    return (
        <>
            <Header />

            <section className="success">
                <div className="success-container">

                    {/* ✅ Галочка */}
                    <div className="success-icon">✓</div>

                    <h1 className="success-title">
                        {order.paymentMethod === "cod"
                            ? "Дякуємо за замовлення!"
                            : "Оплата успішна!"}
                    </h1>

                    <p className="success-subtitle">
                        Ми вже обробляємо ваше замовлення 🚀
                    </p>

                    {/* ✅ Деталі */}
                    <div className="success-box">
                        <p><b>Ім’я:</b> {customer.name} {customer.surname}</p>
                        <p><b>Телефон:</b> {customer.phone}</p>
                        <p><b>Місто:</b> {customer.city}</p>
                        <p><b>Відділення:</b> {customer.branch}</p>

                        <p><b>Спосіб оплати:</b> {
                            order.paymentMethod === "cod"
                                ? "Накладений платіж"
                                : "Онлайн оплата"
                        }</p>

                        <p><b>Сума:</b> {order.total} грн</p>


                        {order.items?.length > 0 && (
                            <div className="success-products">
                                <b>Товари:</b>

                                {order.items.map(item => (
                                    <div key={item.id} className="success-product">
                                        {item.title} × {item.qty}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="success-btn"
                        onClick={() => navigate("/catalog")}
                    >
                        Повернутись до покупок
                    </button>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default SuccessPage;