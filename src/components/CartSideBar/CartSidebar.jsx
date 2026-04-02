import { createPortal } from "react-dom";
import { FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";
import { useCart } from "../../context/useCart";
import { useNavigate } from "react-router-dom";
import "./CartSideBar.css";

export default function CartSideBar() {
    const {
        cartItems,
        removeFromCart,
        isCartOpen,
        setIsCartOpen,
        increaseQty,
        decreaseQty
    } = useCart();

    const navigate = useNavigate();

    // Блок скролла
    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isCartOpen]);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const goToCheckout = () => {
        setIsCartOpen(false);
        navigate("/checkout");
    };

    if (!isCartOpen) return null;

    return createPortal(
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>

                {/* HEADER */}
                <div className="cart-header">
                    <h2>Кошик</h2>
                    <button
                        className="cart-close"
                        onClick={() => setIsCartOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* ITEMS */}
                <div className="cart-items">
                    {cartItems.length === 0 && (
                        <p className="cart-empty">Кошик порожній</p>
                    )}

                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="cart-item-img"
                            />

                            <div className="cart-item-info">
                                <p className="cart-item-title">{item.title}</p>

                                <div className="cart-item-meta">
                                    <span>{item.price} грн</span>
                                </div>

                                {/* 🔥 QTY КОНТРОЛ */}
                                <div className="cart-qty">
                                    <button onClick={() => decreaseQty(item.id)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => increaseQty(item.id)}>+</button>
                                </div>
                            </div>

                            <div className="cart-item-right">


                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="cart-remove"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER */}
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Сума:</span>
                            <b>{total} грн</b>
                        </div>

                        <button className="cart-checkout" onClick={goToCheckout}>
                            Оформити покупку
                        </button>
                    </div>
                )}

            </div>
        </div>,
        document.body
    );
}