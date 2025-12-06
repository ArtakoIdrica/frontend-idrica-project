import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";

export default function App(){

    return(
        <Routes>
            <Route path = "/login" element={<Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/PostDetail/:postId" element={<PostDetail />} />
        </Routes>
    );
}