import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <div>
            <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-2" onClick={() => i18n.changeLanguage("en")}>
                EN
            </button>

            <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={() => i18n.changeLanguage("es")}>
                ES
            </button>
        </div>
    );
};

export default LanguageSwitcher;
