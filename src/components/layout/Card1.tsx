import{useNavigate} from "react-router-dom"
import React from "react";

export default function Card1({postId, postTitle, postBody }) {

    const navigate= useNavigate();

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 
  border border-slate-200 dark:border-slate-700 
  rounded-xl shadow-sm p-5 m-3

  transform transition-transform duration-300 
  hover:-translate-y-1 hover:shadow-lg">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {postTitle}
      </h2>

      {/* Body */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
        {postBody}
      </p>

      {/* Button */}
      <div className="flex justify-end mt-4">
        <button onClick={() => navigate(`/PostDetail/${postId}`)} className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Ver más
        </button>
      </div>

    </div>
  );
}
