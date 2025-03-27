import { createContext, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "../store/action/authAction";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(null);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            setValid(true);
            navigate('/dashboard')
        }else{
            setValid(false);
            dispatch(getAccessToken());
        }
    }, [token]);



    const useIsAuthenticate = (token) => {
        setToken(token);
        setValid(true);
    };

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };


    useEffect(() =>{
        if(valid)  navigate('/dashboard');
    },[valid])

    return (
        <AuthContext.Provider value={{ token, useIsAuthenticate, logout, updateToken, setToken, valid }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};