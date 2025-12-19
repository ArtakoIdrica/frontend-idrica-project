import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="
        w-full 
        border-t border-slate-200 dark:border-slate-700
        bg-white dark:bg-gray-900
        text-slate-600 dark:text-slate-400
        py-6 px-10
      "
    >
      <div className="max-w-3xl mx-auto text-center space-y-2">

        {/* Nombre del blog */}
        <p className="text-sm font-medium">
          {t("footer.title", { year: new Date().getFullYear() })}
        </p>

        {/* Subtexto */}
        <p className="text-xs">
          {t("footer.subtitle")}
        </p>

        {/* Enlaces */}
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.links.privacy")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.links.terms")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("footer.links.contact")}
          </a>
        </div>
      </div>
    </footer>
  );
}
