import { createPortal } from "react-dom"
import { useEffect } from "react"
import { useCart } from "../../context/useCart"
import "./CartSideBar.css"

export default function CartSideBar() {

    const {
        cartItems,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen
    } = useCart()

    // 🔒 блокировка скролла страницы
    useEffect(() => {

        if (isCartOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }

    }, [isCartOpen])

    if (!isCartOpen) return null

    return createPortal(

        <div
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
        >

            <div
                className="cart-drawer"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="cart-header">

                    <h2>Кошик</h2>

                    <button
                        className="cart-close"
                        onClick={() => setIsCartOpen(false)}
                    >
                        ✕
                    </button>

                </div>

                <div className="cart-items">

                    {cartItems.length === 0 && (
                        <p className="cart-empty">
                            Кошик порожній
                        </p>
                    )}

                    {cartItems.map(item => (

                        <div
                            key={item.id}
                            className="cart-item"
                        >

                            <div>

                                <p className="cart-item-name">
                                    {item.name}
                                </p>

                                <span className="cart-item-qty">
                                    x{item.qty}
                                </span>

                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="cart-remove"
                            >
                                Видалити
                            </button>

                        </div>

                    ))}

                </div>

                {cartItems.length > 0 && (

                    <div className="cart-footer">

                        <button
                            className="cart-clear"
                            onClick={clearCart}
                        >
                            Очистити кошик
                        </button>

                        <button className="cart-checkout">
                            Оформити
                        </button>

                    </div>

                )}

            </div>

        </div>,

        document.body
    )
}