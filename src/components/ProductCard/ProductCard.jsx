import "./ProductCard.css"
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart"
import { FiShoppingCart, FiCheck } from "react-icons/fi"

function ProductCard({ product }) {
    const { cartItems, addToCart, removeFromCart } = useCart()
    const navigate = useNavigate();

    const isInCart = cartItems.some(item => item.id === product.id)

    // Додавання в кошик + відразу перехід на чекаут
    const handleBuyNow = (e) => {
        e.stopPropagation();           // щоб не переходило на сторінку товару
        addToCart(product);            // додаємо товар (qty = 1)
        navigate("/checkout");         // відразу йдемо на чекаут
    }

    // Перехід на сторінку товару при кліку на карточку
    const handleNavigate = () => {
        navigate(`/product/${product.id}`)
    }

    // Додавання/видалення тільки через зелену кнопку
    const handleToggle = (e) => {
        e.stopPropagation()

        if (isInCart) {
            removeFromCart(product.id)
        } else {
            addToCart(product)
        }
    }

    return (
        <div className="product-card" onClick={handleNavigate}>

            <div className="product-card__image">
                <img src={product.image} alt={product.title} />
            </div>

            <div className="product-card__content">

                <h3 className="product-card__title">{product.title}</h3>

                <p className="product-card__price">{product.price} грн</p>

                <div className="product-card__actions">

                    <button
                        className="buy-btn"
                        onClick={handleBuyNow}
                    >
                        Купити зараз
                    </button>

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