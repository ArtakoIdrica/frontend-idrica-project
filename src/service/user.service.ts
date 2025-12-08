import axios from "axios";


const TOKEN = import.meta.env.VITE_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

export async function login(email,password) {

    return axios.post(`${API_URL}/users/login`,{email,password},{headers:{
        Authorization: `Bearer ${TOKEN}`
    },
    
    });
    
}