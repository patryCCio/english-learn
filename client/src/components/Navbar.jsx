import { NavLink } from "react-router-dom";
import AddPS from "../assets/svg/AddPS";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <nav>
            <NavLink to="/">Main Page</NavLink>
            {currentUser === null && <NavLink to="/login">Login</NavLink>}
            {currentUser !== null && <NavLink to="/teach">Teach</NavLink>}
            {currentUser !== null && <NavLink to="/catalogs">Catalogs</NavLink>}
            {currentUser !== null && <NavLink to="/add"><AddPS className="add-ps" /></NavLink>}
        </nav>
    );
}

export default Navbar;