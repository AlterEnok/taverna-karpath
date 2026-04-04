import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePageTitle from "./../hooks/usePageTitle";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import ProductsSection from "../components/ProductsSection/ProductsSection";
import ContactSection from "../components/ContactSection/ContactSection";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";

function Home() {
    usePageTitle("Головна | Vitaminka");
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => {
                document
                    .getElementById(location.state.scrollTo)
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            }, 100);
        }
    }, [location]);

    return (
        <>
            <Header />
            <Hero />
            <Categories />
            <ProductsSection />


            <div id="about">
                <About />
            </div>

            <div id="contact">
                <ContactSection />
            </div>

            <Footer />
        </>
    );
}

export default Home;