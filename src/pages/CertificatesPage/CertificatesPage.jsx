import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CertificatesPage.css";

import cert1 from "../../assets/cert-1.jpg";
import cert2 from "../../assets/cert-2.jpg";
import cert3 from "../../assets/cert-3.jpg";
import cert4 from "../../assets/cert-4.jpg";
import cert5 from "../../assets/cert-5.jpg";

function CertificatesPage() {
    const certificates = [cert1, cert2, cert3, cert4, cert5];

    return (
        <>
            <Header />

            <section className="certificates">
                <div className="certificates-container">
                    <h1 className="certificates-title">
                        Сертифікати якості
                    </h1>

                    <p className="certificates-subtitle">
                        Ми гарантуємо якість та безпечність продукції.
                        Усі товари мають відповідні сертифікати.
                    </p>

                    <div className="certificates-grid">
                        {certificates.map((img, index) => (
                            <div
                                key={index}
                                className={`certificates-item ${index === 0 ? "big" : ""}`}
                            >
                                <img src={img} alt={`certificate-${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default CertificatesPage