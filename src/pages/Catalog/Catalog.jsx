import { useState, useRef } from "react"
import "./Catalog.css"
import products from "../../data/products"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import ProductCard from "../../components/ProductCard/ProductCard"
import { FiChevronRight } from "react-icons/fi"

function Catalog() {
    const [showAll, setShowAll] = useState(false)
    const [activeCategory, setActiveCategory] = useState("Усі")
    const [currentPage, setCurrentPage] = useState(1)
    const [animateKey, setAnimateKey] = useState(0)

    const gridRef = useRef(null) // ✅ главный фикс

    const categories = [
        "Усі",
        "Вітаміни",
        "Мінерали",
        "Оздоровчі програми",
        "Косметика",
        "Добавки",
        "Імунітет",
    ]

    const visibleCategories = showAll ? categories : categories.slice(0, 4)

    const filteredProducts =
        activeCategory === "Усі"
            ? products
            : products.filter(p => p.category === activeCategory)

    const itemsPerPage = 3
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const getCategoryCount = (category) => {
        if (category === "Усі") return products.length
        return products.filter(p => p.category === category).length
    }

    const scrollToGrid = () => {
        if (!gridRef.current) return

        const yOffset = -100 // 🔥 подстрой под свой хедер
        const y =
            gridRef.current.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset

        window.scrollTo({
            top: y,
            behavior: "smooth"
        })
    }

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat)
        setCurrentPage(1)
        setAnimateKey(prev => prev + 1)

        setTimeout(scrollToGrid, 50) // ✅ сразу к товарам
    }

    const changePage = (page) => {
        if (page === currentPage) return

        setCurrentPage(page)
        setAnimateKey(prev => prev + 1)

        setTimeout(scrollToGrid, 50) // ✅ идеальный скролл
    }

    return (
        <>
            <Header />

            <section className="catalog">
                <div className="catalog__container">

                    <h1 className="catalog__title">
                        Каталог усіх товарів
                    </h1>

                    <div className="catalog__top">
                        <div className="catalog__info">
                            <p>У кнопці «Купити зараз» ви можете одразу придбати 1 товар</p>
                            <p>Якщо хочете купити кілька товарів — натисніть на іконку кошика на товарі, щоб додати його до корзини зверху.</p>
                        </div>

                        <div className="catalog__info-small">
                            <p>У вкладці «Категорії» ви обираєте 1 із напрямків, який шукаєте, після чого вам будуть показані товари лише цього напрямку-виду</p>
                        </div>
                    </div>

                    <div className="catalog__content">

                        {/* ✅ ВАЖНО: ref тут */}
                        <div
                            ref={gridRef}
                            key={animateKey}
                            className="catalog__grid animate"
                        >
                            {paginatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <aside className="catalog__sidebar">

                            <h4>Категорії</h4>

                            <div className="catalog__categories">
                                {visibleCategories.map((cat, i) => (
                                    <div
                                        key={i}
                                        className={`catalog__category ${activeCategory === cat ? "active" : ""}`}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        <span>{cat}</span>

                                        <div className="catalog__circle">
                                            {getCategoryCount(cat)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className={`catalog__more ${showAll ? "active" : ""}`}
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "Сховати" : "Показати більше"}
                                <FiChevronRight />
                            </button>

                        </aside>

                    </div>

                    {/* PAGINATION */}
                    <div className="catalog__pagination">

                        <button onClick={() => changePage(Math.max(currentPage - 1, 1))}>
                            {"<"}
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? "active" : ""}
                                onClick={() => changePage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button onClick={() => changePage(Math.min(currentPage + 1, totalPages))}>
                            {">"}
                        </button>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}

export default Catalog