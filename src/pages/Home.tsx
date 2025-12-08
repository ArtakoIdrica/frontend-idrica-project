import  Header  from "../components/layout/Header";
import { useState,useEffect } from "react";
import Card1 from "../components/layout/Card1"
import axios from "axios";
import { getPostsHome } from "../service/posts.service";

export default function Home(){

    const [posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error,setError] = useState(null);

    useEffect(()=>{

        async function getPosts() {
            

            try {
                const response = await getPostsHome();

            setPosts(response.data.slice(0,8));
            setLoading(false);
            } catch (error) {
                setError("no se a podido cargar los posts ");
                setLoading(false);
            }

        }
        getPosts();
    },[]);

    if (loading) return <p>cargando posts...</p>;
    if (error)  return <p>{error}</p>;  

    return(
        <>
        <Header />
        <div className="m-10">
            <h1 className="font-semibold text-lg">Dashboard de publicaciones</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                
                {posts.map((post)=>
                <Card1
                key={post.id}
                postId={post.id}
                postTitle={post.title}
                postBody={post.body}
                />
                )}
            </div>
        </div>
       
        </>
    );

}