import "./ProductsSection.css"
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard"
import products from "../../data/products"

function ProductsSection() {
    const navigate = useNavigate();
    return (
        <section className="products">
            <div className="products__header">
                <div className="products__text-block">
                    <h2 className="products__title">Хіти продажу</h2>
                    <p className="products__subtitle">
                        Відкрийте найпопулярніші вітаміни, добавки та продукти
                        для підтримки здоров’я, енергії та гарного самопочуття.
                    </p>
                </div>

                <button
                    className="products__all-btn"
                    onClick={() => {
                        navigate("/catalog");

                    }}
                >
                    Побачити все
                </button>
            </div>

            <div className="products__grid">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    )
}

export default ProductsSection