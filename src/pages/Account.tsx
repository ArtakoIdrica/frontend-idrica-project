import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/auth.slice";
import { fetchAccountDashboard } from "../store/slices/accountDashboard.slice";

import DashboardSummaryChart from "../components/charts/DashboardSummaryChart";
import { useTranslation } from "react-i18next";

export default function Account() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const {
    postsCount,
    commentsCount,
    loading,
    error,
  } = useAppSelector((state) => state.accountDashboard);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAccountDashboard(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <Header />

      <main className="p-10 bg-slate-100 dark:bg-slate-900 min-h-screen transition-colors">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t("account.title")}
          </h1>

          {/* INFO USUARIO */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 dark:text-white">
            <h2 className="text-lg font-semibold mb-2">
              {t("account.userInfo.title")}
            </h2>

            <p>
              <span className="font-medium dark:text-white">
                {t("account.userInfo.username")}:
              </span>{" "}
              {user?.username}
            </p>

            <p>
              <span className="font-medium dark:text-white">
                {t("account.userInfo.email")}:
              </span>{" "}
              {user?.email}
            </p>
          </div>

          {/* DASHBOARD */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 dark:text-white">
            <h2 className="text-lg font-semibold mb-6">
              {t("account.activity.title")}
            </h2>

            {loading && <p>{t("account.activity.loading")}</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-500">
                      {t("account.activity.posts")}
                    </p>
                    <p className="text-3xl font-bold">{postsCount}</p>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-500">
                      {t("account.activity.comments")}
                    </p>
                    <p className="text-3xl font-bold">{commentsCount}</p>
                  </div>
                </div>

                <DashboardSummaryChart
                  totalPosts={postsCount}
                  totalComments={commentsCount}
                />
              </>
            )}
          </div>

          {/* LOGOUT */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              {t("account.actions.logout")}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
