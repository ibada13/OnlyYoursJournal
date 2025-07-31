import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthContext";
import api from "../lib/axios";
import { handleApiError } from "../lib/errHandlers";
import { toast } from "sonner";

interface ButtonProps {
  content: string;
  muted: boolean;
}

const Button = ({ content, muted }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={clsx(
        "bg-accent transition duration-300 py-2 rounded-lg w-1/2 sm:w-1/4",
        {
          "hover:bg-accent-hover cursor-pointer": !muted,
          "bg-muted cursor-not-allowed ": muted,
        }
      )}
      disabled={ muted}
    >
      {content}
    </button>
  );
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user ,setUser} = useAuth();

  const [prevname, SetPrevName] = useState<string | undefined>(user?.name);
  const [prevemail, SetPrevEmail] = useState<string | undefined>(user?.email);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [email, setEmail] = useState<string | undefined>(user?.email);

  const handleSave = async (e: React.FormEvent, field: "name" | "email") => {
    e.preventDefault();
    const data: { email?: string; name?: string } = {};

    if (field === "email" && email !== prevemail) {
      data.email = email;
    } else if (field === "name" && name !== prevname) {
      data.name = name;
    } else {
      return;
    }

    try {
      const res = await api.put("/me", data);
      if (data.email) {
        SetPrevEmail(email);
        toast.success(t("settings.profile.email_saved"))
      }
      if (data.name) {
        SetPrevName(name);
        toast.success(t("settings.profile.name_saved"))
      }
      console.log(res.data)
      setUser(res.data.user)
    } catch (err) {
      handleApiError(err, t);
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-secondary rounded-lg shadow-xl flex justify-center items-start self-center">
      <div className="w-[90%] p-8  text-fg space-y-8">
        <div className="space-y-4">
          <p className="text-lg text-accent">{t("settings.profile.change_name")}</p>
          <form
            onSubmit={(e) => handleSave(e, "name")}
            className="flex gap-y-4 sm:gap-y-4 flex-col sm:flex-row items-start sm:items-center sm:justify-between"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("enter_name")}
              className="w-full sm:w-2/3 bg-bg/50 text-fg rounded-md px-4 py-2 border-2 border-gray-300 focus:border-accent focus:outline-none"
            />
            <Button muted={prevname === name} content={t("settings.profile.save_changes")} />
          </form>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-accent">{t("settings.profile.change_email")}</p>
          <form
            onSubmit={(e) => handleSave(e, "email")}
            className="flex gap-y-4 sm:gap-y-4 flex-col sm:flex-row items-start sm:items-center sm:justify-between"

          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("enter_email")}
              className="w-full sm:w-2/3 bg-bg/50 text-fg rounded-md px-4 py-2 border-2 border-gray-300 focus:border-accent focus:outline-none"
            />
            <Button muted={prevemail === email} content={t("settings.profile.save_changes")} />
          </form>
        </div>
      </div>
    </div>
  );
}
