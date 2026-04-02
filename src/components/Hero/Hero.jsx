import "./Hero.css"
import { FiArrowUpRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

import sosna from "../../assets/sosna.png"
import leaf from "../../assets/leaf.png"
import pill from "../../assets/pill.png"
import bg from "../../assets/hero-bg.png"

function Hero() {

    const navigate = useNavigate()

    return (
        <section className="hero">

            <img src={sosna} className="hero__floating hero__leaf1" />
            <img src={leaf} className="hero__floating hero__leaf2" />
            <img src={pill} className="hero__floating hero__pill" />
            <img src={leaf} className="hero__floating hero__leaf3" />
            <img src={sosna} className="hero__floating hero__leaf6" />
            <img src={pill} className="hero__floating hero__pill3" />

            <div className="hero__container">

                <h1 className="hero__title">
                    Ваш шлях до <br />
                    <span>кращого здоров’я</span>
                </h1>

                <div className="hero__buttons">


                    <button
                        className="hero__btn hero__btn--catalog"
                        onClick={() => {
                            navigate("/catalog")
                            window.scrollTo(0, 0)
                        }}
                    >
                        До каталогу
                        <FiArrowUpRight className="hero__btn-icon" />
                    </button>


                    <a
                        href="https://t.me/alonka_vitaminka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero__btn hero__btn--contact"
                    >
                        Зв’язатися з нами
                        <FiArrowUpRight className="hero__btn-icon" />
                    </a>

                </div>

                <div className="hero__image">
                    <img src={bg} alt="vitamins" />
                </div>

            </div>
        </section>
    )
}

export default Hero