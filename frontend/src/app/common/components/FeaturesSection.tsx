import { useTranslation } from "react-i18next"
import { FaLock, FaCalendarAlt, FaChartLine } from "react-icons/fa"

const FeaturesSection = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: <FaLock className="text-4xl text-accent" />,
      title: t("landing_page.features.privacy.title"),
      desc: t("landing_page.features.privacy.desc"),
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-accent" />,
      title: t("landing_page.features.dailyLogs.title"),
      desc: t("landing_page.features.dailyLogs.desc"),
    },
    {
      icon: <FaChartLine className="text-4xl text-accent" />,
      title: t("landing_page.features.insights.title"),
      desc: t("landing_page.features.insights.desc"),
    },
  ]

  return (
    <section className="bg-bg py-20 text-fg px-6">
      <div className="max-w-6xl mx-auto text-start flex flex-col gap-y-6">
        <h2 className="text-4xl font-bold text-accent mb-4">
          {t("landing_page.features.title")}
        </h2>
        <p className="text-lg text-fg/80 mb-12">
          {t("landing_page.features.subtitle")}
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-secondary p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 border border-white/10 flex flex-col gap-y-3"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-accent mb-2">
                {feature.title}
              </h3>
              <p className="text-lg font-semibold text-fg">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
