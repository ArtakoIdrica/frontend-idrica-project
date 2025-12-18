import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createNewPost } from "../store/slices/posts.slice";

export default function PostForm() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

const { loading, error } = useAppSelector((state) => state.posts);
const user = useAppSelector((state) => state.auth.user);





  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Título y body son obligatorios");
      return;
    }

    const post = {
      userId: user.id,
      title,
      body,
    };

    dispatch(createNewPost(post));
  }


  useEffect(() => {
    if (!loading && !error && title && body) {
      navigate("/home");
    }
  }, [loading, error, navigate]);

  return (
    <>
      <Header />

      <main>
        <div className="w-full flex justify-center px-4 mt-4">
          <div className="w-full max-w-3xl space-y-6 mb-10">
            <h1 className="text-3xl text-slate-900 font-bold">
              Creación de un nuevo post
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            <form
              className="bg-white shadow-xl rounded-lg p-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Título
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1.5 p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-500">
                  Body
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full mt-1.5 p-3 border rounded-lg"
                />
              </div>

              <button
                disabled={loading}
                className="bg-blue-700 px-3 py-1 mt-4 text-white rounded hover:bg-blue-900"
              >
                {loading ? "Creando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
