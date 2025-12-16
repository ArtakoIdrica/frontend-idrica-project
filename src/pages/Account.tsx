import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/auth.slice";

export default function Account() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

 
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <Header />

      <main className="w-full flex justify-center px-4 mt-10">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">
            Cuenta
          </h1>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
