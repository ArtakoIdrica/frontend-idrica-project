import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl min-h-[600px] bg-white rounded-lg shadow-lg flex">
        
        {/* Columna izquierda (imagen) */}
        <div
          className="flex-1 rounded-l-lg bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413')`,
          }}
        />

        {/* Columna derecha (formulario) */}
        <div className="flex-1 p-8 flex flex-col justify-start">

          {/* FORMULARIO */}
          <form
            className="w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            aria-label="Login form"
          >
            {/* TÍTULO DEL LOGIN */}
            <div className="text-center mb-8 mt-4">
              <h1 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h1>
              <h2 className="text-sm text-gray-500 mt-2">Inicia sesión para continuar</h2>
            </div>

            {/* INPUT EMAIL */}
            <label htmlFor="email" className="block mb-4">
              <span className="text-gray-900 font-medium text-base block mb-2">
                Correo Electrónico
              </span>

              <div className="flex items-center rounded-lg bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-blue-200">
                <span className="flex items-center justify-center pl-4 pr-2 text-gray-500 text-lg">
                  👤
                </span>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu email"
                  className="flex-1 h-14 px-4 placeholder:text-gray-400 text-gray-900 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </label>

            {/* INPUT PASSWORD */}
            <label htmlFor="password" className="block mb-4">
              <span className="text-gray-900 font-medium text-base block mb-2">
                Contraseña
              </span>

              <div className="flex items-center rounded-lg bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-blue-200">
                <span className="flex items-center justify-center pl-4 pr-2 text-gray-500 text-lg">
                  🔒
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu contraseña"
                  className="flex-1 h-14 px-4 placeholder:text-gray-400 text-gray-900 bg-transparent focus:outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center pr-4 pl-2 text-gray-500 text-lg focus:outline-none"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>

            {/* RECORDAR SESIÓN + OLVIDÉ CONTRASEÑA */}
            <div className="flex justify-between items-center pt-2 mb-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Recordar sesión
                </label>
              </div>

              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            {/* BOTONES INICIAR SESION Y REGISTRARSE */}
            <div className="flex-col flex mt-6 gap-3 ">
                <button type="submit" className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200" >Iniciar sesión</button>
                <button type="button" className="w-full h-12 rounded-lg border  border-blue-500 text-blue-500 font-semibold hover:bg-blue-100 transition-colors duration-200">Resgistro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
