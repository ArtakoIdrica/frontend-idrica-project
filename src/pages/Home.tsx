import  Header  from "../components/layout/Header";
import { useState,useEffect } from "react";
import Card1 from "../components/layout/Card1"
import axios from "axios";

export default function Home(){

    const [posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error,setError] = useState(null);
    const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE4MTM1ODAxNDYsImlhdCI6MTc2MTc0MDE0NywiYXV0aF90aW1lIjoxNzYxNzQwMTQ2LCJqdGkiOiJkOGZlOThjZi0zMDUxLTQwYTktOThhZS1iZGEyMDU2NzkyMWEiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJzdWIiOiI1NDQ3NzM2ZC04ZDYzLTQwNzEtYWE2MC05MmQ5MjMxNWNkNzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnby1haWd1YS1zb2MiLCJzZXNzaW9uX3N0YXRlIjoiOTRhZjg3ZTQtNWFjYi00ZWFhLWJkMjQtOGI4OWE0NDcwYzBiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgZ29haWd1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX25hbWUiOiJhcm1hbi50YWRldm9zeWFuQGlkcmljYS5jb20iLCJuYW1lIjoiQXJtYW4gVGFkZXZvc3lhbiB8IElkcmljYSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFybWFuLnRhZGV2b3N5YW5AaWRyaWNhLmNvbSIsImdpdmVuX25hbWUiOiJBcm1hbiBUYWRldm9zeWFuIHwiLCJmYW1pbHlfbmFtZSI6IklkcmljYSIsImVtYWlsIjoiYXJtYW4udGFkZXZvc3lhbkBpZHJpY2EuY29tIn0.XGh25QfwJXY2vg0CmB98DZccSstWJ3MRikBEV9wcl8zoBz19Hwzj3A1Y2ILnpoHGbr3rFSgAxFfIgjp_DPaRPqGP-97c3GQKsjRgc7BC_-XGYyjNN7jkssxoSySVk5gF9iNpbGtXr2A_Z6xqv6TScmf-VOj7rFZ6HHuZE0C-s3BQR3mE0E-ObghIt74KNChdUC4HcPqu59TVoPCoccTVYDVAysEy8EWNNWwNTzPGMk7JcILE6DWOVbpFttTqcDkcbs6o2Pm6Pd3vGUi0EAee2YNxQ5mv5xuAmtW-Z7n6nb7VGxUj90SUXgb313DjxVrEp2luB3YrhCoID60R0i8lpA";

    useEffect(()=>{

        async function getPosts() {
            

            try {
                const response = await axios.get("http://localhost:20001/posts",{
                headers: {
                Authorization: `Bearer ${TOKEN}`,
                },
                });

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