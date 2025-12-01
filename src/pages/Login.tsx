import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE4MTM1ODAxNDYsImlhdCI6MTc2MTc0MDE0NywiYXV0aF90aW1lIjoxNzYxNzQwMTQ2LCJqdGkiOiJkOGZlOThjZi0zMDUxLTQwYTktOThhZS1iZGEyMDU2NzkyMWEiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJzdWIiOiI1NDQ3NzM2ZC04ZDYzLTQwNzEtYWE2MC05MmQ5MjMxNWNkNzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnby1haWd1YS1zb2MiLCJzZXNzaW9uX3N0YXRlIjoiOTRhZjg3ZTQtNWFjYi00ZWFhLWJkMjQtOGI4OWE0NDcwYzBiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgZ29haWd1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX25hbWUiOiJhcm1hbi50YWRldm9zeWFuQGlkcmljYS5jb20iLCJuYW1lIjoiQXJtYW4gVGFkZXZvc3lhbiB8IElkcmljYSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFybWFuLnRhZGV2b3N5YW5AaWRyaWNhLmNvbSIsImdpdmVuX25hbWUiOiJBcm1hbiBUYWRldm9zeWFuIHwiLCJmYW1pbHlfbmFtZSI6IklkcmljYSIsImVtYWlsIjoiYXJtYW4udGFkZXZvc3lhbkBpZHJpY2EuY29tIn0.XGh25QfwJXY2vg0CmB98DZccSstWJ3MRikBEV9wcl8zoBz19Hwzj3A1Y2ILnpoHGbr3rFSgAxFfIgjp_DPaRPqGP-97c3GQKsjRgc7BC_-XGYyjNN7jkssxoSySVk5gF9iNpbGtXr2A_Z6xqv6TScmf-VOj7rFZ6HHuZE0C-s3BQR3mE0E-ObghIt74KNChdUC4HcPqu59TVoPCoccTVYDVAysEy8EWNNWwNTzPGMk7JcILE6DWOVbpFttTqcDkcbs6o2Pm6Pd3vGUi0EAee2YNxQ5mv5xuAmtW-Z7n6nb7VGxUj90SUXgb313DjxVrEp2luB3YrhCoID60R0i8lpA";


  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {

    // 1. Llamamos a tu backend
    const response = await axios.post(
  "http://localhost:20001/users/login",
  { email, password },
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  }
);


    // 2. Imprimir la respuesta en consola (para probar)
    console.log("LOGIN OK:", response.data);

    // 3. Guardamos el usuario en localStorage (temporal)
    localStorage.setItem("user", JSON.stringify(response.data));

    // 4. Redirigir a una pantalla nueva
    window.location.href = "/home";

  } catch (err: any) {

    // Si el servidor respondió con un error (401 o 404)
    if (err.response) {
      const message = err.response.data;
      alert(message);
    } 
    // Error de red
    else {
      alert("No se pudo conectar con el servidor");
    }
  }
};

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
            onSubmit={handleLogin}
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
                <button type="button" className="w-full h-12 rounded-lg border  border-blue-500 text-blue-500 font-semibold hover:bg-blue-100 transition-colors duration-200">Registro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
