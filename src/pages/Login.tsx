import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/slices/auth.slice";

export default function Login() {
 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 
  const { user, loading, error } = useAppSelector((state) => state.auth);

  
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

 
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl min-h-[600px] bg-white rounded-lg shadow-lg flex">
        
        {/* Columna izquierda */}
        <div
          className="flex-1 rounded-l-lg bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503264116251-35a269479413')",
          }}
        />

        {/* Columna derecha */}
        <div className="flex-1 p-8 flex flex-col justify-start">
          <form
            className="w-full max-w-sm"
            onSubmit={handleLogin}
            aria-label="Login form"
          >
            <div className="text-center mb-8 mt-4">
              <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
              <h2 className="text-sm text-gray-500 mt-2">
                Inicia sesión para continuar
              </h2>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            {/* EMAIL */}
            <label className="block mb-4">
              <span className="font-medium block mb-2">
                Correo Electrónico
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                required
              />
            </label>

            {/* PASSWORD */}
            <label className="block mb-4">
              <span className="font-medium block mb-2">
                Contraseña
              </span>

              <div className="flex items-center border rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 h-12 px-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

          <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full h-12 mt-3 rounded-lg border border-blue-500 text-blue-500 font-semibold hover:bg-blue-100 transition-colors duration-200"
            >
              Registro
          </button>

          </form>
        </div>
      </div>

      
    </div>
  );
}
