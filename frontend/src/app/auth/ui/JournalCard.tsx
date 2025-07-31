import { Link } from "react-router-dom";
import type { JournalCardInterface } from "../lib/types";
import { useTranslation } from "react-i18next";
export default function JournalCard({ journalData }: { journalData: JournalCardInterface }) {
  const createdDate = new Date(journalData.created_at);
  const updatedDate = new Date(journalData.updated_at);
  const { t } = useTranslation();
  return (
    <Link state={{title :journalData.title , created_at:journalData.created_at ,updated_at:journalData.updated_at}} to={`/journal/${journalData.id}`} className="no-underline block">
      <article className="min-h-64 flex flex-col justify-around text-center rounded-lg p-4 space-y-8 border-2 border-gray-300 hover:border-accent shadow-lg bg-secondary hover:bg-accent/30 text-fg hover:shadow-xl transition-all  duration-300">
        <h2 className="text-accent font-bold text-xl">{journalData.title}</h2>
        <div className="flex flex-col justify-around text-sm text-fg">
          <p>
            {t("created_at")} <time dateTime={journalData.created_at}>{createdDate.toLocaleString()}</time>
          </p>
          <p>
            {t("updated_at")} <time dateTime={journalData.updated_at}>{updatedDate.toLocaleString()}</time>
          </p>
        </div>
      </article>
    </Link>
  );
}
