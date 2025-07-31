import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import clsx from "clsx";

import Button from "../ui/Button";
import api from "../lib/axios";
import { handleApiError } from "../lib/errHandlers";

export default function DeleteAccountRequest() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setEmailError("");

    if (!email.trim()) {
      setEmailError(t("enter_email"));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t("auth.validation_failed"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      await api.post("/request-account-delete", {email})
      toast.success(t("email_sent"));
      setEmail("")
    } catch (err) {
      const errmsg = handleApiError(err, t , false)
      setError(errmsg)
    }
  };

  return (
    <div className="min-h-screen w-screen bg-bg flex flex-col space-y-8 items-center">
<h1 className="text-5xl sm:text-6xl font-bold text-accent drop-shadow mt-16 tracking-tight text-center">
  {t("delete_account_request_title")}
</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col space-y-6 p-8 bg-secondary min-h-[60vh] mb-12 rounded-lg shadow-lg text-fg"
      >
        {error && <p className="text-lg text-red-400 font-semibold">{error}</p>}

        <label htmlFor="email" className="text-xl font-semibold">
          {t("email")} :
        </label>
        <input
          id="email"
          type="email"
          placeholder={t("enter_email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx(
            "text-fg rounded-lg p-2 focus:outline-0 border focus:border-accent",
            {
              "border-red-400": emailError || error,
              "border-accent": email.trim() && !emailError,
              "border-gray-300": !email.trim() && !emailError,
            }
          )}
        />
        {emailError && (
          <p className="text-sm text-red-400 font-medium">{emailError}</p>
        )}

        <Button content={t("send_link")} />
      </form>
    </div>
  );
}
