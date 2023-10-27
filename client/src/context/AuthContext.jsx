import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";


export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(0);



    useEffect(() => {
        const decodeToken = async () => {
            const decode = await jwt_decode(currentUser.accessToken);
            setRole(decode.role);
        };

        if (role === 0 && currentUser !== null) {
            decodeToken();
        }

        if (currentUser === null) {
            setRole(0);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`);
                setCurrentUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (currentUser === null) {
            getUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (inputs) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                login: inputs.login,
                password: inputs.password
            }, { withCredentials: false });

            setCurrentUser(res.data);
            return {
                mess: "Witaj ponownie!",
                type: "success",
            }
        } catch (err) {
            return { mess: err.response.data, type: "fail" }
        }
    }

    const logout = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, { token: currentUser.accessToken }, { withCredentials: false });
            setCurrentUser(null);

            return {
                mess: res.data,
                type: "success"
            }
        } catch (err) {
            return {
                mess: err.response.data, type: "fail"
            }
        }
    }

    return (<AuthContext.Provider value={{ setCurrentUser, currentUser, role, login, logout }}>{children}</AuthContext.Provider>);
}

export default AuthContextProvider;