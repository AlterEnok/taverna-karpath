/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (product) => {

        setCartItems(prev => {

            const exist = prev.find(item => item.id === product.id)

            if (exist) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            }

            return [...prev, { ...product, qty: 1 }]
        })

    }

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                isCartOpen,
                setIsCartOpen
            }}
        >
            {children}
        </CartContext.Provider>
    )
}