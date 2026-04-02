import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (product) => {
        setCartItems(prev => {

            const exist = prev.find(item => item.id === product.id)

            const qtyToAdd = product.qty || 1

            if (exist) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + qtyToAdd }
                        : item
                )
            }

            return [...prev, { ...product, qty: qtyToAdd }]
        })
    }

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        )
    }

    const decreaseQty = (id) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0) // 💥 если 0 → удаляем
        )
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                increaseQty,
                decreaseQty
            }}
        >
            {children}
        </CartContext.Provider>
    )
}