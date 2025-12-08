import Header from "../components/layout/Header";
import CommentCard from "../components/layout/CommentCard";
import axios from "axios"
import {useEffect,useState} from "react"
import{useParams,useNavigate} from "react-router-dom"
import { createComment,getComment } from "../service/comments.service";
import { getPost } from "../service/posts.service";




export default function PostDetail(){
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState();
    const[post,setPost] = useState();
    const[comments,setComments] = useState([]);
    const[commentBody,setCommentBody]=useState("");
    const {postId} = useParams();
    const navigate=useNavigate();
    const user =JSON.parse(localStorage.getItem("user"));

     

        async function getCommentsByPost() {

            try {
                
                const resultado = await getComment(postId);
                setComments(resultado.data);
                console.log("COMENTARIOS DEL BACKEND:", resultado.data);


            } catch (error) {
                  setError("No se a podido cargar los comentarios...");
            }
            
        }

        async function submitComment() {
            if (!commentBody.trim()) {
                alert("El comentario no puede estar vacío");
                return;
            }

            const comment = {
                postId:postId,
                userId: user.id,
                name: user.username,
                email: user.email,
                body: commentBody,
            };

            try {
               const response = await createComment(comment);
                
                setCommentBody("");

                
                getCommentsByPost();

            } catch (error) {
                console.error("Error enviando comentario:", error);
            }
        }

    useEffect(() =>{

        async function getPostById() {

            try {
                const resultado = await getPost(postId);
                setPost(resultado.data);
                setLoading(false);
            } catch (error) {
                
                setError("No se a podido cargar la pagina del post");
                setLoading(false);

            }

        }

    
       

        getPostById();
        getCommentsByPost();

    },[]);

    if (loading)return <p>Cargando el post</p> ;
    if (error) return <p>{error}</p>;

    return(
        <div>
            <Header/>
                <div className="w-full flex justify-center px-4 py-1 mt-3 ">
                   
                    <div className="w-full max-w-3xl">
                         <button type="button" className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-4" onClick={()=> navigate(-1)}>Volver atrás</button>
                        <div className="bg-white dark:bg-slate-900 border border-slate-600 dark:border-slate-100 shadow-lg rounded-xl p-6">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
                            <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">{post.body}</p>
                        </div>

                        <div className =" mt-4">
                            <h2 className="text-xl font-semibold text-slate-900  mb-3">Añadir comentario</h2>
                            <textarea className ="w-full p-3 border border-slate-300 dark:border-slate-700 
                            rounded-lg bg-white dark:bg-slate-900
                            text-slate-800 dark:text-slate-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition"  value={commentBody} onChange={(e)=> setCommentBody(e.target.value)} placeholder="Escribir comentario" ></textarea>
                            <button onClick={submitComment} className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" type="button">Enviar</button>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-xl font-semibold text-slate-900  mb-3">Comentarios</h3>
                        </div>

                        {comments.map((comment)=>{
                            
                            return (<CommentCard
                            key={comment.id}
                            commentUsername ={comment.name}
                            commentBody ={comment.body}
                            />);

                        })}
                    </div>

                </div>
        </div>
         
    );
}