import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    // 🔥 загрузка корзины при старте
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart")
        return saved ? JSON.parse(saved) : []
    })

    const [isCartOpen, setIsCartOpen] = useState(false)

    // 🔥 сохранение при каждом изменении
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])


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
                .filter(item => item.qty > 0)
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