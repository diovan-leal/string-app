"use client";

import { useState } from "react";
import FeedList from "./feed-list";

function FeedContainer() {
    const [cnt, setCont] = useState(1);
    const pages = [];

    for (let i = 0; i < cnt; i++) {
        pages.push(<FeedList index={i} key={i} />);
    }

    return (
        <div>
            {pages}
            <div className="flex justify-center">
                <button className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg self-center"
                    onClick={() => setCont(cnt + 1)}>Load more</button>
            </div>
        </div>
    );
}

export default FeedContainer;