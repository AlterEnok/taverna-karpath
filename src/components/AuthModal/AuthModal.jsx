import { useContext, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import "./AuthModal.css"

import AuthContext from "../../context/AuthContext"

export default function AuthModal() {

    const { isAuthOpen, setIsAuthOpen, login } = useContext(AuthContext)

    const [mode, setMode] = useState("login")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {

        if (isAuthOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }

    }, [isAuthOpen])

    if (!isAuthOpen) return null

    const handleLogin = () => {
        login({
            name: name || "User",
            email
        })
    }

    const handleRegister = () => {
        login({
            name,
            email
        })
    }

    return createPortal(

        <div className="auth-overlay" onClick={() => setIsAuthOpen(false)}>

            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

                <button
                    className="auth-close"
                    onClick={() => setIsAuthOpen(false)}
                >
                    ×
                </button>

                <h2 className="auth-title">
                    {mode === "login" && "Вхід в акаунт"}
                    {mode === "register" && "Створити акаунт"}
                    {mode === "reset" && "Відновлення паролю"}
                </h2>

                {/* LOGIN */}

                {mode === "login" && (
                    <>
                        <input
                            placeholder="Електронна пошта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="auth-btn" onClick={handleLogin}>
                            Увійти
                        </button>

                        <span
                            className="auth-link"
                            onClick={() => setMode("reset")}
                        >
                            Забули пароль?
                        </span>

                        <div className="auth-divider">
                            <span>або</span>
                        </div>

                        <button
                            className="auth-google"
                            onClick={() => login({ name: "Google User" })}
                        >
                            Увійти через Google
                        </button>

                        <p className="auth-switch">
                            Немає акаунта?
                            <span onClick={() => setMode("register")}>
                                Реєстрація
                            </span>
                        </p>
                    </>
                )}

                {/* REGISTER */}

                {mode === "register" && (
                    <>
                        <input
                            placeholder="Імʼя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            placeholder="Електронна пошта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="auth-btn" onClick={handleRegister}>
                            Зареєструватися
                        </button>

                        <p className="auth-switch">
                            Вже є акаунт?
                            <span onClick={() => setMode("login")}>
                                Увійти
                            </span>
                        </p>
                    </>
                )}

                {/* RESET */}

                {mode === "reset" && (
                    <>
                        <input placeholder="Електронна пошта" />

                        <button className="auth-btn">
                            Відправити
                        </button>

                        <span
                            className="auth-link"
                            onClick={() => setMode("login")}
                        >
                            ← Назад до входу
                        </span>
                    </>
                )}

            </div>

        </div>,

        document.body
    )
}