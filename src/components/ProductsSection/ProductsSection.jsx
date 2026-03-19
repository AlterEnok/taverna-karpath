// src/components/ProductsSection/ProductsSection.jsx
// майже без змін, тільки додав class для кнопки "Побачити все"

import "./ProductsSection.css"
import ProductCard from "../ProductCard/ProductCard"
import products from "../../data/products"

function ProductsSection() {
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

                <button className="products__all-btn">
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