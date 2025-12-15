import Header from "../components/layout/Header";
import CommentCard from "../components/layout/CommentCard";
import Footer from "../components/layout/Footer";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPostById } from "../store/slices/posts.slice";
import {
  fetchGetComment,
  fetchCreateComment,
} from "../store/slices/comments.slice";

export default function PostDetail() {
 
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();

  
  const [commentBody, setCommentBody] = useState("");

  const {
  selectedPost: post,
  loading: postLoading,
  error: postError,
} = useAppSelector((state) => state.posts);

const {
  items: comments,
  loading: commentsLoading,
  error: commentsError,
} = useAppSelector((state) => state.comments);

const user = useAppSelector((state) => state.auth.user);

 

  useEffect(() => {
    if (!postId) return;

    dispatch(fetchPostById(postId));
    dispatch(fetchGetComment(postId));
  }, [dispatch, postId]);

  function submitComment() {
    if (!commentBody.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }

    const comment = {
      postId: Number(postId),
      userId: user.id,
      name: user.username,
      email: user.email,
      body: commentBody,
    };

    dispatch(fetchCreateComment(comment));
    setCommentBody("");
  }

  if (postLoading) return <p>Cargando el post...</p>;
  if (postError) return <p>{postError}</p>;

  return (
    <div>
      <Header />

      <div className="w-full flex justify-center px-4 py-1 mt-3">
        <div className="w-full max-w-3xl">
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-4"
            onClick={() => navigate(-1)}
          >
            Volver atrás
          </button>

          {/* POST */}
          <div className="bg-white dark:bg-slate-900 border border-slate-600 dark:border-slate-100 shadow-lg rounded-xl p-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {post?.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {post?.body}
            </p>
          </div>

          {/* NUEVO COMENTARIO */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Añadir comentario
            </h2>

            <textarea
              className="w-full p-3 border border-slate-300 rounded-lg"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Escribir comentario"
            />

            <button
              onClick={submitComment}
              className="mt-2 px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>

          {/* COMENTARIOS */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Comentarios</h3>

            {commentsLoading && <p>Cargando comentarios...</p>}
            {commentsError && <p>{commentsError}</p>}

            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                commentUsername={comment.name}
                commentBody={comment.body}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
