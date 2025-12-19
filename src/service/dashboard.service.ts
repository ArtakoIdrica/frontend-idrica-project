import axios from "axios";


const TOKEN = import.meta.env.VITE_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;


/*
Obtener resumen global del dashboard
Promise.all ejecuta las llamadas en pararelo
*/ 
export async function getDashboardSummary() {
  const [postsRes, commentsRes] = await Promise.all([
    axios.get(`${API_URL}/posts`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }),
    axios.get(`${API_URL}/Comments/listAll`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }),
  ]);

  return {
    totalPosts: postsRes.data.length,
    totalComments: commentsRes.data.length,
  };
}