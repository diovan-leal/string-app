"use client";

import useSWR from "swr";
import fetcher from "../util/fetcher";
import User from "../components/user";

export default function Header() {
    const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);

    if (error) {
        return <div>failed to load</div>;
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <header className="flex flex-row w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2 justiy-between items-center">
            <div>
                <h1 className="font-mono text-lg">Strings</h1>
            </div>
            <div>
                {<User user={data.data} href="account"/>}
            </div>
        </header>
    );
}