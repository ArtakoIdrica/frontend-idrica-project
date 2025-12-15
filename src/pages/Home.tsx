import Header from "../components/layout/Header";
import Card1 from "../components/layout/Card1";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPaginatedPosts, setPage } from "../store/slices/posts.slice";

export default function Home(): JSX.Element {
  
  const dispatch = useAppDispatch();


  const { items: posts, loading, error, page, pageSize, totalPages } =
    useAppSelector((state) => state.posts);


  useEffect(() => {
    
    dispatch(fetchPaginatedPosts({ page, pageSize }));
  }, [dispatch, page, pageSize]);

 
  if (loading) return <p>cargando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <div className="m-10">
        <h1 className="font-semibold text-lg">Dashboard de publicaciones</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post: any) => (
            <Card1
              key={post.id}
              postId={post.id}
              postTitle={post.title}
              postBody={post.body}
            />
          ))}
        </div>

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
      </div>
      <Footer />
    </>
  );
}
