import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Categories from "../components/Categories/Categories"
import ProductsSection from "../components/ProductsSection/ProductsSection"
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";


function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Categories />
            <ProductsSection />
            <ContactSection />
            <Footer />
        </>
    )
}

export default Home