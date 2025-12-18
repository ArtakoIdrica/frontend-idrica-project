import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createNewPost } from "../store/slices/posts.slice";

export default function PostForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { loading, error } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert(t("postsForm.alert"));
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

      <main className="p-10 bg-slate-100 dark:bg-slate-900 min-h-screen transition-colors">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {t("postsForm.create")}
          </h1>

          {error && (
            <p className="mb-4 text-red-500">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="
              bg-white dark:bg-slate-800
              rounded-xl shadow p-6
              space-y-6 transition-colors
            "
          >
            {/* TÍTULO */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                {t("postsForm.title")}
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("postsForm.titleBox")}
                className="
                  w-full p-3 rounded-lg
                  bg-white dark:bg-slate-900
                  border border-slate-300 dark:border-slate-700
                  text-slate-900 dark:text-slate-100
                  placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                "
              />
            </div>

            {/* BODY */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                {t("postsForm.content")}
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t("postsForm.contentBox")}
                rows={6}
                className="
                  w-full p-3 rounded-lg
                  bg-white dark:bg-slate-900
                  border border-slate-300 dark:border-slate-700
                  text-slate-900 dark:text-slate-100
                  placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                "
              />
            </div>

            {/* BOTÓN */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="
                  px-6 py-2 text-sm font-medium
                  bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 transition
                  disabled:opacity-50
                "
              >
                {loading ? t("postsForm.creating") : t("postsForm.create")}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
