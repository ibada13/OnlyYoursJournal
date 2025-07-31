import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import TextHolder from "../TextHolder";
import { useTranslation } from "react-i18next";
type MiddlewareType = "auth" | "guest";

export default function Middleware({
  children,
  middleware = "auth",
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  middleware?: MiddlewareType;
  redirectTo?: string;
}) {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation()

  useEffect(() => {
    const isAuthenticated = !!token && !!user;

    if (middleware === "auth" && !isAuthenticated) {
      navigate(redirectTo);
    }

    if (middleware === "guest" && isAuthenticated) {
      navigate("/home");
    }

    setLoading(false);
  }, [middleware, token, user, navigate, redirectTo]);

  if (loading) {
    return (
      <TextHolder text={t("loading")}  />
    );
  }

  return <>{children}</>;
}
