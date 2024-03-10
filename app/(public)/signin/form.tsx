"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState, useEffect } from "react";

function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string>("")
    const [password, setPassword] = useState<undefined | string>("")
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [username, password]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });

        if (res.ok) {
            router.push("/feed");
        } else {
            setError('Credenciais inválidas');
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg">
            <div className="head text-center">
                <h3 className="font-semibold">Login</h3>
            </div>
            <div className="my-3">
                <hr />
            </div>
            <div>
                <div className="flex flex-col gap-2 mb-3">
                    <label className="-mb-2">Nome</label>
                    <input type="text"
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        id="username"
                        placeholder="Nome"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="-mb-2">Senha</label>
                    <input type="password"
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        placeholder="Senha"
                        required    
                    />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button type="submit"
                    className="mt-4 px-4 py-2 dark:bg-slate-900 bg-slate-400 text-white p3 rounded-lg">
                    Logar
                </button>
            </div>
        </form>
    )
}

export default Form;
