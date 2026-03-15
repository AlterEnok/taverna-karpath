import { createContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user")
        return savedUser ? JSON.parse(savedUser) : null
    })

    const [isAuthOpen, setIsAuthOpen] = useState(false)

    const login = (userData) => {

        const newUser = {
            id: Date.now(),
            name: userData.name || "User",
            email: userData.email || "",
            provider: userData.provider || "local"
        }

        setUser(newUser)

        localStorage.setItem("user", JSON.stringify(newUser))

        setIsAuthOpen(false)
    }

    const logout = () => {

        setUser(null)

        localStorage.removeItem("user")
    }

    const requireAuth = (callback) => {

        if (!user) {
            setIsAuthOpen(true)
            return
        }

        callback?.()
    }

    const updateUser = (updatedData) => {

        setUser((prev) => {

            if (!prev) return prev

            const updatedUser = {
                ...prev,
                ...updatedData
            }

            localStorage.setItem("user", JSON.stringify(updatedUser))

            return updatedUser
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthOpen,
                setIsAuthOpen,
                requireAuth,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext