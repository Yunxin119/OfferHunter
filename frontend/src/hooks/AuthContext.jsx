import { useState, createContext, useContext } from "react"

export const AuthContext = createContext()

// the useContext is a react hook that will be used to get the user information from the AuthContext
// and we will use this custom hook in the components to get the user information
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    // This is to check if the user is logged in or not
    // If the user is logged in, we will get the user information from the local storage
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('userInfo')) || null)

    return (
        // The AuthContext.Provider is a wrapper that will provide the user information to all the components
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}