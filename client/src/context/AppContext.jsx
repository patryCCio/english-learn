import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const setPath = (path) => {
        navigate(path);
    }

    return (<AppContext.Provider value={{ setPath }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;