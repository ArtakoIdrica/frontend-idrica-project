import Header from "../components/layout/Header";
import Card1 from "../components/layout/Card1";
import Footer from "../components/layout/Footer";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import {
  fetchPaginatedPosts,
  setPage,
  deletePost,
  searchPost,
  clearSearch,
} from "../store/slices/posts.slice";

export default function Home(): JSX.Element {


  const [searchText, setSearchText] = useState("");

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

  if (loading) return <p>cargando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />

      <div className="m-10">
        <h1 className="font-semibold text-lg mb-4">
          Dashboard de publicaciones
        </h1>

        {/* BUSCADOR */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* POSTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* PAGINACIÓN (solo visible cuando NO se busca) */}
        {!isSearching && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => dispatch(setPage(Math.max(0, page - 1)))}
              disabled={page === 0}
            >
              Anterior
            </button>

            <span>
              Página {page + 1} de {totalPages}
            </span>

            <button
              disabled={page === totalPages - 1}
              className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              onClick={() => dispatch(setPage(page + 1))}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
