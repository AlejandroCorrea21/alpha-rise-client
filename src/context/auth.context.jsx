import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";

// El componente context => el que comparte los estados por al app
const AuthContext = createContext()

// El componente wrapper => el que envuelve a la app y crea los estados
function AuthWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true)

    useEffect(() => {
        // Valida el token cuando el usuario entra a la app por primera vez.
        authenticateUser()
    }, [])

    async function authenticateUser() {
        // envia el token al backend, lo valida y recibe la información del usuario.

        try {

            // const authToken = localStorage.getItem("authToken")

            const response = await service.get(`/auth/verify`)

            console.log(response) // payload
            // si la llamada llega a este punto significa que el usuario fue correctamente validado
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setUserRole(response.data.payload.role)
            setIsAuthenticatingUser(false)

        } catch (error) {
            // si la llamada entra en el catch, significa que el usuario no pudo ser validado
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setUserRole(null)
            setIsAuthenticatingUser(false)
        }

    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser
    }

    if (isAuthenticatingUser === true) {
        return <h3>... validando usuario</h3>
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthWrapper,
    AuthContext
}