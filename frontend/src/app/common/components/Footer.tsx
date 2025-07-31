import { useTranslation } from "react-i18next";
const Footer = () => {
    const { t} = useTranslation()
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary py-6 text-center shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <p className="text-sm font-semibold text-accent">
                  {t("landing_page.footer.right", { year })}
              
      </p>
    </footer>
  );
};

export default Footer;
