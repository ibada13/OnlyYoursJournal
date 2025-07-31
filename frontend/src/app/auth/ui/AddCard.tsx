import { BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddCard() {
  const { t } = useTranslation();

  return (
    <Link to="/new" className="no-underline">
      <div className="h-64  bg-secondary rounded-2xl border-2 border-dashed border-gray-300 hover:border-accent hover:bg-accent/10 transition-all duration-300 flex flex-col justify-center items-center shadow-md">
        <BiPlusCircle className="text-accent group-hover:text-accent-hover transition-colors duration-300" size={70} />
        <p className="text-lg font-semibold mt-4 text-accent">{t("new_journal")}</p>
      </div>
    </Link>
  );
}
