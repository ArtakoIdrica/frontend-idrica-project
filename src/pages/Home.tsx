import  Header  from "../components/layout/Header";
import { useState,useEffect } from "react";
import Card1 from "../components/layout/Card1"
import axios from "axios";
import { getPostsHome,getPaginatedPost  } from "../service/posts.service";
import  Footer  from "../components/layout/Footer";


export default function Home(){

    const [posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error,setError] = useState(null);
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(8);
    const [totalPages, setTotalPages] = useState<number>(0);


     useEffect(()=>{
        let cancelled = false;

        async function loadPage() {
           


         try {
             //empieza a cargar la pagina
            setLoading(true);
            setError(null);

            const res = await getPaginatedPost(page , pageSize);

            //si el user cambia de pagina antes de que carge todo ejecutamos el cleanup y asi no peta
            if(cancelled) return;

            setPosts(res.data.results);
            setTotalPages(res.data.page.totalPages);
            
         } catch (error) {
            if (cancelled) return;
            setError("No se pudieron cargar los posts");
            console.error(error);

         } finally{
             //aqui termina ya de cargar la pagina
             if (!cancelled) setLoading(false);
            
         }
            

        
        }

        loadPage();
        

        //el clean up
         return () => {
        cancelled = true;
            };

     },[page]);

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

                <div className="flex justify-center gap-4 mt-6">
                    <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>setPage(page-1)}>Anterior</button>
                    <span>Página {page + 1} de {totalPages}</span>
                    <button disabled={page === totalPages - 1 }  className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>setPage(page+1)}>Siguiente</button>
                </div>
        </div>
        <Footer />
        </>
    );

}