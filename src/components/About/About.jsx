import "./About.css";

import aboutLeaf from "../../assets/about-leaf.png";
import aboutLeaf2 from "../../assets/about-leaf2.png";
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";
import about3 from "../../assets/about3.jpg";

function About() {
    return (
        <section className="about">
            <div className="about-container">

                <div className="about-content">
                    <div className="about-badge">Про мене</div>

                    <h2 className="about-title">
                        Мене звати Олена Гаврищук
                    </h2>

                    <p className="about-text">
                        Я — нутріціолог і фітоконсультант, експерт з натурального оздоровлення
                        та індивідуального підбору вітамінів.
                    </p>

                    <p className="about-text">
                        А також офіційний представник компанії «Рослина Карпат».
                    </p>

                    <p className="about-text">
                        Вже 9 років я допомагаю людям дбати про своє здоров’я, відновлювати
                        організм зсередини та знаходити внутрішній баланс. У своїй практиці
                        я працюю комплексно, враховуючи харчування, стан травної системи,
                        рівень дефіцитів, гормональний і емоційний баланс.
                    </p>

                    <p className="about-text highlight">
                        Моя мета — не лише покращити ваше самопочуття, а й підняти настрій,
                        повернути енергію та підвищити якість життя.
                    </p>
                </div>


                <div className="about-sidebar">
                    <div className="about-oval">
                        <p className="about-oval-text">
                            Я щиро вірю, що здоров’я — це<br />
                            найбільший скарб, а<br />
                            справжня краса<br />
                            починається зсередини
                        </p>
                        <img src={aboutLeaf} alt="leaf" className="about-leaf1" />
                        <img src={aboutLeaf2} alt="leaf" className="about-leaf2" />
                    </div>
                </div>
            </div>


            <div className="about-photos">
                <div className="about-photo about-photo--small">
                    <img src={about1} alt="Олена Гаврищук" />
                </div>
                <div className="about-photo about-photo--medium">
                    <img src={about2} alt="Олена Гаврищук" />
                </div>
                <div className="about-photo about-photo--large">
                    <img src={about3} alt="Олена Гаврищук" />
                </div>
            </div>
        </section>
    );
}

export default About;