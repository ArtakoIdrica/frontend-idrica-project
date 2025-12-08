import axios from "axios";


const TOKEN = import.meta.env.VITE_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

export async function getPost(postId){

    return axios.get(`${API_URL}/posts/${postId}`,{
                headers: {
                Authorization: `Bearer ${TOKEN}`,
                },
                });


}

export async function createPost(post) {

    return axios.post(`${API_URL}/posts`,post,{
        headers:{
        Authorization:`Bearer ${TOKEN}`,
    },
    });
    
}

export async function getPostsHome(){

    return axios.get(`${API_URL}/posts`,{
                headers: {
                Authorization: `Bearer ${TOKEN}`,
                },
                });


}