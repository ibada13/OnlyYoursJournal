import { useParams, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { get } from "../../lib/utils";
import { CiEdit, CiTrash } from "react-icons/ci";
import { handleJournalContent } from "../lib/utils";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogout } from "../../lib/auth";
type JournalMeta = {
  title: string;
  created_at: string;
  updated_at: string;
};

export default function JournalPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as JournalMeta | null;
const navigate = useNavigate()
  const title = state?.title ?? "Untitled";
  const created_at = state?.created_at ?? "";
  const updated_at = state?.updated_at ?? "";

  const { data, error, isLoading } = useSWR(`/journals/${id}`, get, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    dedupingInterval: 0,
  });

  const [content, setContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const logout = useLogout()

  useEffect(() => {
    const loadContent = async () => {
      if (data && !error) {
        try {
          const decrypted = await handleJournalContent(data);
          setContent(decrypted ?? t("no_journals"));
        } catch (err) {
          if (err instanceof Error && err.message === "Missing password for decryption.") {
            await logout()
          }
          console.log(err);
          setContent(t("error"));
        }
      }
    };
    loadContent();
  }, [data, t]);

  const createdAt = new Date(created_at);
  const updatedAt = new Date(updated_at);

  if (!id) { 
    navigate("/home")
    toast.info("u cannot access this page like that")
  }
  return (
    <div className="min-h-screen w-screen text-fg my-12 p-4 relative">

      {showDeleteModal && 
        <ConfirmDeleteModal route={`/journals/${id}`} to="/home" toast_msg_key="journal.delete_success" prompt={ { key:"journal.confirm_del_msg", prompt:title}} setShowDeleteModal={(show:boolean)=>setShowDeleteModal(show)} />
      }

      <div className="bg-secondary p-4 min-h-[80vh] flex flex-col justify-around rounded-lg space-y-5 md:space-y-0  relative">
        <div className="flex flex-col-reverse md:flex-row gap-y-8 md:gap-y-0 md:justify-between md:items-center">
          <h1 className="text-accent-hover text-2xl font-semibold">
            {t("title")} : <span className="text-accent">{title}</span>
          </h1>
          <div className="flex w-full justify-around items-center md:w-1/3">
            <Link
              state={{ id, title, content }}
              className="flex items-center gap-x-2 text-accent hover:text-accent-hover transition-colors duration-300"
              to={"/journal/edit"}
            >
              {t("edit")} <CiEdit size={30} className="inline" />
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="cursor-pointer flex items-center gap-x-2 text-red-500 hover:text-red-300 transition-colors duration-300"
            >
              {t("trash")} <CiTrash size={30} className="inline" />
            </button>
          </div>
        </div>

        <div>
          <p className="text-accent-hover text-2xl font-semibold mb-4">
            {t("journal.journal")} :
          </p>
          <p>
            {isLoading
              ? t("loading")
              : error
              ? t("error")
              : content || t("no_journals")}
          </p>
        </div>

        <div className="flex flex-col gap-y-6 md:flex-row md:gap-y-0 justify-around items-center">
          <p>
            <span className="text-accent-hover">{t("created_at")} :</span>{" "}
            {createdAt.toLocaleString()}
          </p>
          <p>
            <span className="text-accent-hover">{t("updated_at")} :</span>{" "}
            {updatedAt.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
