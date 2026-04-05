import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ProductPage.css";
import { useCart } from "../../context/useCart";
import products from "../../data/products";

import usePageTitle from "../../hooks/usePageTitle";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function ProductPage() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState("desc");

    const { addToCart, setIsCartOpen } = useCart();


    usePageTitle(
        product
            ? `${product.title} | Vitaminka`
            : "Товар | Vitaminka"
    );


    if (!product) return <h2>Товар не знайдено</h2>;

    const handleBuyNow = () => {
        addToCart({ ...product, qty });
        setIsCartOpen(true);
    };

    return (
        <>
            <Header />

            <section className="product">
                <div className="product__header-line">
                    <div className="product__header-inner">
                        <h1 className="product__title">{product.title}</h1>
                    </div>
                </div>

                <div className="product__container">
                    <div className="product__main">

                        <div className="product__image">
                            <img
                                src={product.image}
                                alt={product.title}
                            />
                        </div>

                        <div className="product__buy-block">
                            <div className="product__price">{product.price} грн</div>

                            <div className="product__qty">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(q => q + 1)}>+</button>
                            </div>

                            <button
                                className="product__btn-buy"
                                onClick={handleBuyNow}
                            >
                                Купити зараз
                            </button>
                        </div>
                    </div>

                    <div className="product__tabs">
                        <button
                            className={activeTab === "desc" ? "active" : ""}
                            onClick={() => setActiveTab("desc")}
                        >
                            Опис
                        </button>
                        <button
                            className={activeTab === "use" ? "active" : ""}
                            onClick={() => setActiveTab("use")}
                        >
                            Застосування
                        </button>
                        <button
                            className={activeTab === "comp" ? "active" : ""}
                            onClick={() => setActiveTab("comp")}
                        >
                            Склад
                        </button>
                    </div>

                    <div className="product__tab-content">
                        {activeTab === "desc" && (
                            <>
                                <p>ІННОВАЦІЙНА ТА ВИСОКОЕФЕКТИВНА ФОРМУЛА...</p>
                                <p>Олії оливи та авокадо зроблять волосся...</p>
                            </>
                        )}
                        {activeTab === "use" && <p>Приймати по 1-2 капсули на день під час їжі.</p>}
                        {activeTab === "comp" && <p>L-карнітин, допоміжні компоненти.</p>}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default ProductPage;