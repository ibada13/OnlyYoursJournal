import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../lib/axios";
import { useAuth } from "../../../AuthContext";
import { encryptData, bytesToBase64 } from "../../lib/crypt";
import { toast } from "sonner";
import { mutate } from "swr";
type Journal = {
  id?: string;
  title: string;
  content: string;
};

const JournalForm = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialData = (state as Journal) || { title: "", content: "" };

  const { iv, key, salt } = useAuth();

  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const encryptedTitle = await encryptData(title, key as CryptoKey, iv as Uint8Array);
      const encryptedContent = await encryptData(content, key as CryptoKey, iv as Uint8Array);
      let id = initialData.id
      if (id) {
        await api.put(`/journals/${initialData.id}`, {
          title: encryptedTitle,
          content: encryptedContent,
          salt: bytesToBase64(salt as Uint8Array),
          iv: bytesToBase64(iv as Uint8Array),
        });
          
        toast.success(t("journal_updated_successfully"));
      } else {
        const res = await api.post("/journals", {
          title: encryptedTitle,
          content: encryptedContent,
          salt: bytesToBase64(salt as Uint8Array),
          iv: bytesToBase64(iv as Uint8Array),
        });
        id = res.data.id
        toast.success(t("journal_created_successfully"));
        setTitle("");
        setContent("");
      }
      await mutate(`journals/${id}`, undefined, {revalidate:true })  

            navigate(`/journal/${id}`, {
        state: {
          title,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
              },
              replace:true ,
            });

    } catch (err: any) {
      console.log(err)
      if (err.response) {
        toast.error(`${t("server_error")} (${err.response.status})`);
      } else if (err.request) {
        toast.error(t("no_response_from_server"));
      } else {
        toast.error(t("unexpected_error"));
      }
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center my-12">
      <form
        onSubmit={handleSubmit}
        className="w-5/6 min-h-[50vh] bg-secondary flex flex-col items-center justify-around rounded-lg py-8 space-y-6"
      >
        <div className="w-5/6">
          <label htmlFor="title" className="block text-fg font-semibold mb-4">
            {t("title")}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("enter_title")}
            className="p-4 text-fg border-2 border-gray-400 focus:outline-0 rounded w-full focus:border-accent"
          />
        </div>

        <div className="w-5/6">
          <label htmlFor="content" className="block text-fg font-semibold mb-4">
            {t("journal.journal")}
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("enter_journal")}
            className="p-4 text-fg border-2 border-gray-400 focus:outline-0 rounded w-full focus:border-accent min-h-[150px]"
          />
        </div>

        <Button content={initialData.id ? t("update_journal") : t("save_journal")} />
      </form>
    </div>
  );
};

export default JournalForm;
