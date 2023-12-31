"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string>("")
    const [password, setPassword] = useState<undefined | string>("")

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            })
        });

        if (res.ok) {
            router.push("/feed");
        } else {
            alert("log in failed");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg">
            <div className="head text-center">
                <h3 className="font-semibold">Sign in</h3>
            </div>
            <div className="my-3">
                <hr />
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <label>Username</label>
                    <input type="text"
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        id="username"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <input type="password"
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        placeholder="Password"
                        required    
                    />
                </div>
                <button type="submit"
                    className="mt-4 bg-slate-900 text-white p3 rounded-lg">
                    Sign In
                </button>
            </div>
        </form>
    )
}

export default Form;
