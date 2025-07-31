import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="-mt-24 min-h-screen sm:min-h-[120vh] relative overflow-hidden">
      <img
        src="/HeroSectionImage.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-bg/70 via-bg/80 to-bg/100 z-10" />

    
      <div className="relative z-20 w-[90%] mx-auto pt-40 sm:pt-0 flex flex-col sm:flex-row items-center justify-center gap-8 min-h-screen">
        
        <div className="hidden sm:block flex-grow text-center">
          <p className="text-7xl rtl:text-9xl -rotate-30 text-accent" id="logo">
            {t("logo")}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-y-6 max-w-md sm:flex-grow p-6">
          <h1 className="text-4xl font-bold text-accent">
            {t("landing_page.hero.title")}
          </h1>

          <p className="text-lg font-bold text-fg">
            {t("landing_page.hero.subtitle")}
          </p>

          <Link
            to="/register"
            className="w-1/2 bg-accent text-bg font-bold px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors duration-300"
          >
            {t("landing_page.hero.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
