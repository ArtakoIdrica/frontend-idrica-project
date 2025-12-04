import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-10 py-4">
      
      {/* LOGO + NOMBRE */}
      <div className="flex items-center gap-4 text-gray-900 dark:text-white">
        <div className="w-6 h-6 text-blue-600">
          <svg
            fill="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
            />
          </svg>
        </div>

        <h2 className="text-lg font-bold tracking-tight">
          Mi Blog
        </h2>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="flex gap-8">
        <Link
          to="/home"
          className="text-gray-700 dark:text-gray-300 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/create-post"
          className="text-gray-700 dark:text-gray-300 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Crear Post
        </Link>

        <Link
          to="/account"
          className="text-gray-700 dark:text-gray-300 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Cuenta
        </Link>
      </nav>
    </header>
  );
}
