import "./Categories.css"

import vitamins from "../../assets/vitamins.jpg"
import minerals from "../../assets/minerals.jpg"
import programs from "../../assets/programs.jpg"
import cosmetics from "../../assets/cosmetics.jpg"

function Categories() {

    const categories = [
        {
            title: "Вітаміни",
            image: vitamins
        },
        {
            title: "Мінерали",
            image: minerals
        },
        {
            title: "Програми оздоровлення",
            image: programs
        },
        {
            title: "Косметика",
            image: cosmetics
        },
    ]

    return (
        <section className="categories">
            <div className="categories__container">
                {categories.map((item, index) => (
                    <div key={index} className="categories__item">
                        <div className="categories__image">
                            <img src={item.image} alt={item.title} />
                        </div>

                        <h3 className="categories__title">
                            {item.title}
                        </h3>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default Categories