import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { FiTrash2 } from "react-icons/fi";
import "./CheckoutPage.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, clearCart, removeFromCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | online
    const [submitting, setSubmitting] = useState(false);

    // Нова Пошта
    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([]);
    const [citySearch, setCitySearch] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "+380 ",
        city: "",
        cityRef: "",
        branch: "",
        branchRef: "",
    });

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Пошук міст Нової Пошти
    useEffect(() => {
        if (citySearch.trim().length < 2) {
            setCities([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        apiKey: "ddd2edaac1ce80f62166e780011629dc",
                        modelName: "Address",
                        calledMethod: "getCities",
                        methodProperties: {
                            FindByString: citySearch,
                            Limit: 20
                        }
                    })
                });

                const data = await res.json();
                if (data.success) setCities(data.data || []);
            } catch (err) {
                console.error(err);
                setCities([]);
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [citySearch]);

    // Отримання відділень
    useEffect(() => {
        if (!form.cityRef) return;

        fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey: "ddd2edaac1ce80f62166e780011629dc",
                modelName: "AddressGeneral",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: form.cityRef,
                    Limit: 50
                }
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) setBranches(data.data || []);
            })
            .catch(() => setBranches([]));
    }, [form.cityRef]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cartItems.length) {
            alert("Кошик порожній");
            return;
        }

        if (!form.name || !form.surname || !form.email || !form.phone) {
            alert("Заповніть контактні дані");
            return;
        }

        if (!form.cityRef || !form.branchRef) {
            alert("Оберіть місто та відділення Нової Пошти");
            return;
        }

        setSubmitting(true);

        try {
            const orderData = {
                items: cartItems,
                total: totalPrice,
                customer: form,
                paymentMethod
            };

            clearCart();

            navigate("/success", {
                state: orderData
            });

        } catch {
            alert("Помилка оформлення замовлення");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />

            <section className="checkout">
                <div className="checkout-container">

                    {/* Ліва колонка */}
                    <div className="checkout-left">
                        <div className="checkout-info-box">
                            <p>
                                У розділі «Checkout» потрібно ввести ваші дані та вказати місце,
                                куди має бути доставлений обраний вами товар.
                            </p>
                        </div>

                        <h2 className="checkout-section-title">Чекаут</h2>

                        <div className="checkout-form">
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder="Ім'я"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Прізвище"
                                    value={form.surname}
                                    onChange={(e) => setForm({ ...form, surname: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <input
                                    type="email"
                                    placeholder="Електронна пошта"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    placeholder="Телефон (+380 ...)"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            <h3 className="checkout-section-title">Доставка Новою Поштою</h3>

                            <input
                                type="text"
                                placeholder="Місто"
                                value={citySearch}
                                onChange={(e) => {
                                    setCitySearch(e.target.value);
                                    setShowCityDropdown(true);
                                }}
                                className="city-input"
                            />

                            {showCityDropdown && cities.length > 0 && (
                                <div className="city-dropdown">
                                    {cities.map((city) => (
                                        <div
                                            key={city.Ref}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    city: city.Description,
                                                    cityRef: city.Ref,
                                                });
                                                setCitySearch(city.Description);
                                                setShowCityDropdown(false);
                                            }}
                                        >
                                            {city.Description}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <select
                                className="branch-select"
                                value={form.branchRef}
                                onChange={(e) => {
                                    const selected = branches.find(b => b.Ref === e.target.value);
                                    setForm({
                                        ...form,
                                        branch: selected?.Description || "",
                                        branchRef: e.target.value,
                                    });
                                }}
                            >
                                <option value="">Оберіть відділення</option>
                                {branches.map((branch) => (
                                    <option key={branch.Ref} value={branch.Ref}>
                                        {branch.Description}
                                    </option>
                                ))}
                            </select>

                            <h3 className="checkout-section-title">Спосіб оплати</h3>
                            <div className="payment-methods">
                                <button
                                    className={`payment-btn ${paymentMethod === "cod" ? "active" : ""}`}
                                    onClick={() => setPaymentMethod("cod")}
                                >
                                    Накладений платіж
                                </button>
                                <button
                                    className={`payment-btn ${paymentMethod === "online" ? "active" : ""}`}
                                    onClick={() => setPaymentMethod("online")}
                                >
                                    Онлайн-оплата (NovaPay)
                                </button>
                            </div>

                            <button
                                className="checkout-submit-btn"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {paymentMethod === "cod"
                                    ? "Оформити замовлення"
                                    : "Перейти до оплати (NovaPay)"}
                            </button>
                        </div>
                    </div>

                    {/* Права колонка — товари */}
                    <div className="checkout-right">
                        <h3 className="summary-title">Ваше замовлення</h3>

                        <div className="checkout-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="checkout-item">
                                    <div className="checkout-item-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="checkout-item-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.price} грн × {item.qty}</p>
                                    </div>
                                    <div className="checkout-item-total">

                                    </div>

                                    {/* Смітник */}
                                    <button
                                        className="checkout-item-remove"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-total">
                            <span>Ціна загалом:</span>
                            <strong>{totalPrice} грн</strong>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default CheckoutPage;