import { useState } from "react";
import Input from "../assets/components/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const [message, setMessage] = useState<string>("");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const res = await axios.post("/api/login", { username, password });
            if (res.status === 200) {
                localStorage.setItem("token", res.data);
                navigate("/");
                window.location.reload();
            } else {
                setMessage("Feil brukernavn eller passord");
            }
        } catch (err) {
            setMessage("Feil brukernavn eller passord");
        } finally {
            setUsername("");
            setPassword("");
        }
    }

    return (
        <div className="flex flex-col text-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col self-center mb-8 space-y-4 w-1/6">
                <h1 className="font-bold text-4xl">Logg inn</h1>
                <Input
                    label="Navn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Navn"
                />
                <Input
                    label="Passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Passord"
                />
                <p>{message}</p>
                <button className="p-2">Logg inn</button>
            </form>
            <Link to={"/register"}>
                <button className="p-2">Registrer en ny bruker</button>
            </Link>
        </div>
    );
}

export default Login;
