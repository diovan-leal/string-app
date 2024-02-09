import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function Form ({post}: {post: PostI}) {
    const router = useRouter();
    const [content, setContent] = useState(post.content);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log('----------debugging content------------');
        console.log(content);
        const res = await fetch("/api/posts/" + post.id, {
            method: "PATCH",
            body: JSON.stringify({content: content})
        });

        if (res.ok) {
            setContent("");
            router.push("/profile");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="bg-white text-black p-2 rounded-lg w-full my-2"
                placeholder="what is happening?"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <button type="submit" className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg">
                Update Post
            </button>
        </form>
    );
}

export default Form;