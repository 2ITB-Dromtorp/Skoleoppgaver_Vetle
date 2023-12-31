import { useState } from "react";
import { FetchRegister } from "./Fetch";

function Register(): JSX.Element {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setmessage] = useState("")

    async function HandleSubmit(): Promise<void> {
        const res = await FetchRegister(name, mail, password)
        setmessage(res.message)
    }

    return(
        <div className="h-10/12 w-5/12 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Lag en ny bruker</h2>
            <form onSubmit={e => {e.preventDefault();console.log("b");HandleSubmit()}}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Navn
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    E-post
                    <input type="email" value={mail} onChange={e => setMail(e.target.value)} required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Passord
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <p>{message}</p>
                <input type="submit" className="px-4 py-3 rounded-md bg-green-500 cursor-pointer duration-200 hover:bg-green-600 shadow" />
            </form>
        </div>
    )
}

export default Register