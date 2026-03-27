import "./ProductCard.css"
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart"
import { FiShoppingCart, FiCheck } from "react-icons/fi"

function ProductCard({ product }) {
    const { cartItems, addToCart, removeFromCart } = useCart()
    const navigate = useNavigate();

    const isInCart = cartItems.some(item => item.id === product.id)

    const handleToggle = (e) => {
        e.stopPropagation()

        if (isInCart) {
            removeFromCart(product.id)
        } else {
            addToCart(product)
        }
    }

    const handleNavigate = () => {
        navigate(`/product/${product.id}`)
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
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/product/${product.id}`)
                        }}
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