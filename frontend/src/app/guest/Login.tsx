import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import clsx from "clsx";

import { useAuth } from "../../AuthContext";
import { login } from "../lib/auth";
import { KeyGen } from "../lib/crypt";
import { setPassword as set_hash_passowrd } from "../lib/keystore";
import { handleApiError } from "../lib/errHandlers";
import Button from "../ui/Button";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setToken, setUser, setKey, setIv, setSalt } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError(t("enter_email"));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t("auth.validation_failed"));
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(t("enter_password"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const { token, user } = await login(email, password);
      setToken(token);
      setUser(user);

      const hashedPassword = await set_hash_passowrd(password);
      const { key, salt, iv } = await KeyGen(hashedPassword);
       setIv(iv);
      setSalt(salt);
      setKey(key);

      toast.success(t("welcome"));
      navigate("/home", { replace: true });
    } catch (err) {
      const msg = handleApiError(err, t,false );
      setError(msg)

    }
  };

  return (

      <div className="min-h-screen w-screen bg-bg flex flex-col space-y-8 items-center">
        <p className="text-6xl mt-12 text-accent">{t("login")}</p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col space-y-6 p-8 bg-secondary min-h-[80vh] mb-12 rounded-lg shadow-lg text-fg"
        >
          {error && (
            <p className="text-lg text-red-400 font-semibold">{error}</p>
          )}

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

          <label htmlFor="password" className="text-xl font-semibold">
            {t("password")} :
          </label>
          <input
            id="password"
            type="password"
            placeholder={t("enter_password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={clsx(
              "text-fg rounded-lg p-2 focus:outline-0 border focus:border-accent",
              {
                "border-red-400": passwordError || error,
                "border-accent": password.trim() && !passwordError,
                "border-gray-300": !password.trim() && !passwordError,
              }
            )}
          />
          {passwordError && (
            <p className="text-sm text-red-400 font-medium">{passwordError}</p>
          )}
        <Link to={"/delete_account"} className="text-accent hover:text-accent-hover transition-colors duration-300 font-semibold">{t("delete_account_request") }</Link>
          <Button content={t("login")} />
        </form>
      </div>

  );
}
