import Header from "../components/layout/Header"
import axios from "axios";
import {useState, useEffect} from "react";
import { createPost } from "../service/posts.service";

export default function PostForm() {

    const[title,setTitle] = useState();
    const[body,setBody] = useState();
    const [error,setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    


  async function handleSubmit() {
   
    try {
        const post={

            userId:user.id,
            title:title,
            body:body

        };

        const res = await createPost(post);
        
    } catch (error) {
        setError("No se a podido crear un nuevo post");
    }
    
  }

    if (error) return(error);
        
    
    return(
        <>

       <Header/>
       <main >

        <div className="w-full flex justify-center  px-4 mt-4 ">
            <div className="w-full max-w-3xl space-y-6 mt-30 ">
                <div className="mb-5">
                     <h1 className="text-3xl text-slate-900 font-bold">Creacion de un nuevo post</h1>
                </div>

                <form className="bg-white dark:bg-slate-900 shadow-xl rounded-lg p-6 " >
                    <div>
                        <label className="text-sm font-medium text-slate-500 mb-1.5" htmlFor="title">Titulo</label>
                        <input onChange={(e)=>setTitle(e.target.value)} className="w-full mt-1.5 p-3 border border-slate-300 text-slate-900 rounded-lg dark:bg-slate-800 dark:text-white bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="title" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-500 mb-3" htmlFor="body">Body</label>
                        <textarea onChange={(e)=>setBody(e.target.value) } className="w-full mt-1.5 p-3 border border-slate-300 text-slate-900 rounded-lg dark:bg-slate-800 dark:text-white bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="body" placeholder="Texto"></textarea>
                    </div>

                    <div>
                        <button className="bg-blue-700 px-3 py-1 mt-2 text-white font-medium rounded hover:bg-blue-900 transition duration-200" onClick={handleSubmit} type="submit">Enviar</button>
                    </div>
                    

                </form>
            </div>
        </div>
        
       </main>

       </>
    );
}