import Header from "../components/layout/Header";
import Card1 from "../components/layout/Card1";
import Footer from "../components/layout/Footer";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";

import {
  fetchPaginatedPosts,
  setPage,
  deletePost,
  searchPost,
  clearSearch,
} from "../store/slices/posts.slice";

export default function Home(): JSX.Element {
  const [searchText, setSearchText] = useState("");
   const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    items: posts,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    isSearching,
  } = useAppSelector((state) => state.posts);

  const user = useAppSelector((state) => state.auth.user);

  function handleDeletePost(postId: number) {
    if (window.confirm("¿Seguro que quieres eliminar este post?")) {
      dispatch(deletePost(postId));
    }
  }

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchPaginatedPosts({ page, pageSize }));
    }
  }, [dispatch, page, pageSize, isSearching]);

  useEffect(() => {
    const trimmedSearch = searchText.trim();

    if (trimmedSearch.length > 0) {
      dispatch(searchPost(trimmedSearch));
    } else {
      if (isSearching) {
        dispatch(clearSearch());
        dispatch(fetchPaginatedPosts({ page, pageSize }));
      }
    }
  }, [searchText, dispatch]);

  return (
    <>
      <Header />

      <main className="p-10 bg-slate-100 dark:bg-slate-900 min-h-screen transition-colors">
        <div className="max-w-7xl mx-auto ">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {t("home.publication")}
          </h1>

          {/* BUSCADOR */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder=
              {t("home.search")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="
                w-full max-w-md px-4 py-2 rounded-lg
                bg-white dark:bg-slate-800
                border border-slate-300 dark:border-slate-700
                text-slate-900 dark:text-slate-100
                placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition
              "
            />
          </div>

          {/* ESTADOS */}
          {loading && (
            <p className="text-center text-slate-500 dark:text-slate-400">
              {t("common.loading")}
            </p>
          )}

          {error && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {/* POSTS */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {posts.map((post: any) => {
                const isOwner = user && post.userId === user.id;

                return (
                  <Card1
                    key={post.id}
                    postId={post.id}
                    postTitle={post.title}
                    postBody={post.body}
                    isOwner={isOwner}
                    onDelete={handleDeletePost}
                  />
                );
              })}
            </div>
          )}

          {/* PAGINACIÓN */}
          {!isSearching && !loading && (
            <div className="flex justify-center items-center gap-6 mt-10 text-slate-700 dark:text-slate-300">
              <button
                className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                onClick={() => dispatch(setPage(Math.max(0, page - 1)))}
                disabled={page === 0}
              >
                {t("home.previous")}
              </button>

              <span>
                {t("home.page")} {page + 1} de {totalPages}
              </span>

              <button
                disabled={page === totalPages - 1}
                className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                onClick={() => dispatch(setPage(page + 1))}
              >
                {t("home.next")}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
