import { createContext, useReducer } from "react"
import AuthReducer from './AuthReducer'

const userLogin = JSON.parse(localStorage.getItem('user'))
const INITIAL_STATE = {
    user: {
        // _id:userLogin._id,
        // username: userLogin.username,
        // email: userLogin.email,
        // profilePic: userLogin.profilePic,
        // coverPic: userLogin.coverPic,
        // isAdmin: false,
        // followers: [],
        // followings: [],
        _id: userLogin ? userLogin._id : '',
        username: userLogin ? userLogin.username : '',
        email: userLogin ? userLogin.email : '',
        profilePic: userLogin ? userLogin.profilePic : '',
        coverPic: userLogin ? userLogin.coverPic : '',
        isAdmin: false,
        followers: [],
        followings: [],
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}