import Post from "@/app/components/post";
import useSWR from "swr";

function FeedList({index}:{index:number}) {
    const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

    if (error) {
        return <div>falha ao carregar</div>
    }

    if (isLoading) {
        return <div>carregando...</div>
    }

    return (
        <ul>
            {data.data.map((post: PostI) => {
                return (
                    <li className="my-5" key="{post.id}">
                        <Post post={post} />
                    </li>
                );
            })}
        </ul>
    )
}

export default FeedList;