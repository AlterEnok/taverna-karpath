import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ProductPage.css";

import products from "../../data/products";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function ProductPage() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState("desc");
    const [isImageOpen, setIsImageOpen] = useState(false);

    if (!product) return <h2>Товар не знайдено</h2>;

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
                                onClick={() => setIsImageOpen(true)}
                            />
                        </div>


                        <div className="product__buy-block">
                            <div className="product__price">{product.price} грн</div>

                            <div className="product__qty">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(q => q + 1)}>+</button>
                            </div>

                            <button className="product__btn-buy">
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
                                <p>
                                    ІННОВАЦІЙНА ТА ВИСОКОЕФЕКТИВНА ФОРМУЛА ДЛЯ ЗМІЦНЕННЯ ТА РОСТУ ВОЛОССЯ НА ОСНОВІ ТРАВ, ФІТО-КОМПЛЕКСІВ ТА СПЕЦІАЛЬНИХ АКТИВІВ.
                                    Зміцнює та відновлює волосся завдяки спеціальним фіто компонентам та комплексам
                                    (екстракти зеленого чаю, кореню лопуха, яйця, натуральний кератин, нікотинамід та біотин).
                                </p>

                                <p>
                                    Олії оливи та авокадо зроблять волосся шовковистим і еластичним, додадуть поступливості неслухняним локонам і полегшать розчісування.
                                    Протеїни кашеміру та пивних дріжджів забезпечать волоссю щедре підживлення.
                                    Комплекс-активатор росту Ceramide A2 ідеально відновлює кератиновий шар та помітно зміцнює волосяні фолікули.
                                </p>
                            </>
                        )}
                        {activeTab === "use" && <p>Приймати по 1-2 капсули на день під час їжі.</p>}
                        {activeTab === "comp" && <p>L-карнітин, допоміжні компоненти.</p>}
                    </div>

                </div>
            </section>


            {isImageOpen && (
                <div className="product__modal" onClick={() => setIsImageOpen(false)}>
                    <div className="product__modal-content" onClick={e => e.stopPropagation()}>
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default ProductPage;