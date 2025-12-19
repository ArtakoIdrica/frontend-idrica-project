import Header from "../components/layout/Header";
import CommentCard from "../components/layout/CommentCard";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";


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
  const { t } = useTranslation();

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
      alert(t("posts.alert"));
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

  return (
    <>
      <Header />

      <main className="p-10 bg-slate-100 dark:bg-slate-900 min-h-screen transition-colors">
        <div className="max-w-3xl mx-auto">
          {/* BOTÓN VOLVER */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mb-6 inline-flex items-center gap-2
              px-4 py-1.5 text-sm font-medium
              bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition
            "
          >
           {t("posts.back")}
          </button>

          {/* ESTADOS */}
          {postLoading && (
            <p className="text-center text-slate-500 dark:text-slate-400">
              {t("common.loading")}
            </p>
          )}

          {postError && (
            <p className="text-center text-red-500">{postError}</p>
          )}

          {/* POST */}
          {!postLoading && post && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 mb-10 transition-colors">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {post.title}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {post.body}
              </p>
            </div>
          )}

          {/* NUEVO COMENTARIO */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              {t("posts.addComment")}
            </h2>

            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder={t("posts.writeComment")}
              className="
                w-full p-3 rounded-lg
                bg-white dark:bg-slate-800
                border border-slate-300 dark:border-slate-700
                text-slate-900 dark:text-slate-100
                placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition
              "
            />

            <button
              onClick={submitComment}
              className="
                mt-3 px-4 py-1.5 text-sm font-medium
                bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition
              "
            >
              {t("posts.sendComment")}
            </button>
          </div>

          {/* COMENTARIOS */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {t("posts.comment")}
            </h3>

            {commentsLoading && (
              <p className="text-slate-500 dark:text-slate-400">
                Cargando comentarios...
              </p>
            )}

            {commentsError && (
              <p className="text-red-500">{commentsError}</p>
            )}

            <div className="space-y-4">
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
      </main>

      <Footer />
    </>
  );
}
