import "./ProductCard.css"
import { useCart } from "../../hooks/useCart"   // або твій шлях до хука
import { FiShoppingCart, FiCheck } from "react-icons/fi"

function ProductCard({ product }) {
    const { cartItems, addToCart, removeFromCart } = useCart()

    // Перевіряємо, чи товар вже в кошику
    const isInCart = cartItems.some(item => item.id === product.id)

    const handleToggle = (e) => {
        e.stopPropagation()

        if (isInCart) {
            // Видаляємо товар повністю
            removeFromCart(product.id)
        } else {
            // Додаємо (або збільшуємо qty)
            addToCart(product)
        }
    }

    return (
        <div className="product-card">
            <div className="product-card__image">
                <img src={product.image} alt={product.title} />
            </div>

            <div className="product-card__content">
                <h3 className="product-card__title">{product.title}</h3>

                <p className="product-card__price">{product.price} грн</p>

                <div className="product-card__actions">
                    <button className="buy-btn">Купити зараз</button>

                    <button
                        className={`cart-btn ${isInCart ? "cart-btn--in-cart" : ""}`}
                        onClick={handleToggle}
                        title={isInCart ? "Прибрати з кошика" : "Додати в кошик"}
                    >
                        {isInCart ? <FiCheck /> : <FiShoppingCart />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard