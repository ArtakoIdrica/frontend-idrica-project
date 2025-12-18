import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import Account from "./pages/Account";
import Register from "./pages/Register";

export default function App(){

    return(
        <Routes>
            <Route path = "/login" element={<Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/PostDetail/:postId" element={<PostDetail />} />
            <Route path="/PostForm" element={<PostForm/>} />
            <Route path="/Account" element={<Account/>} />
            <Route path="/Register" element={<Register/>} />
        </Routes>
    );
}