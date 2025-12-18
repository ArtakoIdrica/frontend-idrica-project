import Header from "../components/layout/Header";
import CommentCard from "../components/layout/CommentCard";
import axios from "axios"
import {useEffect,useState} from "react"
import{useParams,useNavigate} from "react-router-dom"

export default function PostDetail(){
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState();
    const[post,setPost] = useState();
    const[comments,setComments] = useState([]);
    const[commentBody,setCommentBody]=useState("");
    const {postId} = useParams();
    const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE4MTM1ODAxNDYsImlhdCI6MTc2MTc0MDE0NywiYXV0aF90aW1lIjoxNzYxNzQwMTQ2LCJqdGkiOiJkOGZlOThjZi0zMDUxLTQwYTktOThhZS1iZGEyMDU2NzkyMWEiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJzdWIiOiI1NDQ3NzM2ZC04ZDYzLTQwNzEtYWE2MC05MmQ5MjMxNWNkNzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnby1haWd1YS1zb2MiLCJzZXNzaW9uX3N0YXRlIjoiOTRhZjg3ZTQtNWFjYi00ZWFhLWJkMjQtOGI4OWE0NDcwYzBiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgZ29haWd1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX25hbWUiOiJhcm1hbi50YWRldm9zeWFuQGlkcmljYS5jb20iLCJuYW1lIjoiQXJtYW4gVGFkZXZvc3lhbiB8IElkcmljYSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFybWFuLnRhZGV2b3N5YW5AaWRyaWNhLmNvbSIsImdpdmVuX25hbWUiOiJBcm1hbiBUYWRldm9zeWFuIHwiLCJmYW1pbHlfbmFtZSI6IklkcmljYSIsImVtYWlsIjoiYXJtYW4udGFkZXZvc3lhbkBpZHJpY2EuY29tIn0.XGh25QfwJXY2vg0CmB98DZccSstWJ3MRikBEV9wcl8zoBz19Hwzj3A1Y2ILnpoHGbr3rFSgAxFfIgjp_DPaRPqGP-97c3GQKsjRgc7BC_-XGYyjNN7jkssxoSySVk5gF9iNpbGtXr2A_Z6xqv6TScmf-VOj7rFZ6HHuZE0C-s3BQR3mE0E-ObghIt74KNChdUC4HcPqu59TVoPCoccTVYDVAysEy8EWNNWwNTzPGMk7JcILE6DWOVbpFttTqcDkcbs6o2Pm6Pd3vGUi0EAee2YNxQ5mv5xuAmtW-Z7n6nb7VGxUj90SUXgb313DjxVrEp2luB3YrhCoID60R0i8lpA";
    const navigate=useNavigate();
    const user =JSON.parse(localStorage.getItem("user"));

     

        async function getCommentsByPost() {

            try {
                
                const resultado = await axios.get(`http://localhost:20001/Comments/allCommentsPostId/${postId}`,{
                headers: {
                Authorization: `Bearer ${TOKEN}`,
                },
                });
                setComments(resultado?.data);
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
                const response = await axios.post(
                "http://localhost:20001/Comments/save",
                comment,
                {
                    headers: { Authorization: `Bearer ${TOKEN}` },
                }
                );

                
                setCommentBody("");

                
                getCommentsByPost();

            } catch (error) {
                console.error("Error enviando comentario:", error);
            }
        }

    useEffect(() =>{

        async function getPostById() {

            try {
                const resultado = await axios.get(`http://localhost:20001/posts/${postId}`,{
                headers: {
                Authorization: `Bearer ${TOKEN}`,
                },
                });
                setPost(resultado?.data);
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