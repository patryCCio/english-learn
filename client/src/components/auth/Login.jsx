import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        login: "",
        password: "",
    })

    const { login } = useContext(AuthContext);
    const { setPath } = useContext(AppContext);

    const handleInputs = async (event) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const mess = await login(inputs);

        if (mess.type === "success") {
            setPath("/");
        }
    }

    return (
        <section>
            <form action="POST" className="form">
                <input type="text" name="login" value={inputs.login} placeholder="Login" onChange={handleInputs} />
                <input type="password" name="password" value={inputs.password} placeholder="Hasło" onChange={handleInputs} />
                <button onClick={handleLogin}>Zaloguj</button>
            </form>
        </section>
    );
}

export default Login;
