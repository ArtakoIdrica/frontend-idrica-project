

export default function Footer() {
  return (
    <footer
      className="
        w-full mt-10 
        border-t border-slate-200 dark:border-slate-700
        bg-white dark:bg-gray-900
        text-slate-600 dark:text-slate-400
        py-6 px-10
      "
    >
      <div className="max-w-3xl mx-auto text-center space-y-2">

        {/* Nombre del blog */}
        <p className="text-sm font-medium">
          Mi Blog © {new Date().getFullYear()}
        </p>

        {/* Subtexto */}
        <p className="text-xs">
          Creado con React, TailwindCSS y mucho café ☕
        </p>

        {/* Enlaces opcionales */}
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Términos
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
