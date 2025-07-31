import { useState } from "react";
import { useTranslation } from "react-i18next";
import { register } from "../lib/auth";

import Button from "../ui/Button";
export default function Register() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    try {
      await register(name, email, password, confirm);
    } catch (err) {
      
    }
  };

  return (


    <div className="min-h-screen w-screen bg-bg flex flex-col space-y-8 items-center">
      <p className="text-6xl mt-12 text-accent">{t("register")}</p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col space-y-5 justify-around p-8 bg-secondary min-h-[80vh] mb-12 rounded-lg shadow-lg text-fg"
      >
        <label className="text-xl font-semibold">{t("name")}:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("enter_name")}
          className="text-fg rounded-lg p-2 border-2 border-gray-300 focus:border-accent focus:outline-0"
        />
        <label className="text-xl font-semibold">{t("email")}:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("enter_email")}
          className="text-fg rounded-lg p-2 border-2 border-gray-300 focus:border-accent focus:outline-0"
          />
        <label className="text-xl font-semibold">{t("password")}:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("enter_password")}
          className="text-fg rounded-lg p-2 border-2 border-gray-300 focus:border-accent focus:outline-0"
          />
        <label className="text-xl font-semibold">{t("confirm_password")}:</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={t("enter_confirm_password")}
          className="text-fg rounded-lg p-2 border-2 border-gray-300 focus:border-accent focus:outline-0"
          />
          <Button content={t("register")} />

      </form>
    </div>
         
  );
}
