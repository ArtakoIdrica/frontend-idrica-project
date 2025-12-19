import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { registerUser } from "../service/user.service";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await registerUser({ username, email, password });

      navigate("/login");
    } catch (err: any) {
      setError("No se pudo crear el usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      

      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-4xl min-h-[600px] bg-white rounded-lg shadow-lg flex">

          {/* Imagen */}
          <div
            className="flex-1 rounded-l-lg bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
            }}
          />

          {/* Formulario */}
          <div className="flex-1 p-8 flex flex-col justify-start">
            <form
              className="w-full max-w-sm"
              onSubmit={handleRegister}
            >
              <div className="text-center mb-8 mt-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Crear cuenta
                </h1>
                <h2 className="text-sm text-gray-500 mt-2">
                  Regístrate para empezar
                </h2>
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              {/* USERNAME */}
              <label className="block mb-4">
                <span className="font-medium block mb-2">
                  Nombre de usuario
                </span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 px-4 border rounded-lg"
                  required
                />
              </label>

              {/* EMAIL */}
              <label className="block mb-4">
                <span className="font-medium block mb-2">
                  Correo electrónico
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
              <label className="block mb-6">
                <span className="font-medium block mb-2">
                  Contraseña
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 border rounded-lg"
                  required
                />
              </label>

              <button
                disabled={loading}
                className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
              >
                {loading ? "Creando cuenta..." : "Registrarse"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full h-12 mt-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                Volver a login
              </button>
            </form>
          </div>
        </div>
      </div>

     
    </>
  );
}
