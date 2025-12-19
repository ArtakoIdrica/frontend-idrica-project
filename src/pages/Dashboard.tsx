import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchDashboardSummary } from "../store/slices/dashboard.slice";
import { useTranslation } from "react-i18next";



import DashboardSummaryChart from "../components/charts/DashboardSummaryChart";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { totalPosts, totalComments, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  
  const isDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading) {
    return <p className="p-10">{t("dashboard.loading")}</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  return (
    <>
      <Header />

      <main className="p-10 bg-slate-100 dark:bg-slate-900 min-h-screen transition-colors">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          {t("dashboard.title")}
        </h1>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
            <h2 className="text-sm text-slate-500 dark:text-slate-400">
              {t("dashboard.stats.totalPosts")}
            </h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-white">
              {totalPosts}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
            <h2 className="text-sm text-slate-500 dark:text-slate-400">
              {t("dashboard.stats.totalComments")}
            </h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-white">
              {totalComments}
            </p>
          </div>
        </div>

       
        <DashboardSummaryChart
          totalPosts={totalPosts}
          totalComments={totalComments}
          darkMode={isDarkMode}
        />
      </main>

      <Footer />
    </>
  );
}
