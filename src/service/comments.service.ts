import axios from "axios";


const TOKEN = import.meta.env.VITE_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

export async function createComment(comment) {

  return axios.post(`${API_URL}/Comments/save`, comment, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  
}

export async function getComment(postId) {

  return axios.get(`${API_URL}/Comments/allCommentsPostId/${postId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  
}