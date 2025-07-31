import { useTranslation } from "react-i18next"
import { FaSeedling } from "react-icons/fa6"
import { GiThink, GiPeaceDove } from "react-icons/gi"

const WhySection = () => {
  const { t } = useTranslation()

  const cards = [
    {
      icon: <GiThink size={40} className="text-accent" />,
      title: t("landing_page.why.points.reflect.title"),
      desc: t("landing_page.why.points.reflect.desc"),
    },
    {
      icon: <FaSeedling size={40} className="text-accent" />,
      title: t("landing_page.why.points.growth.title"),
      desc: t("landing_page.why.points.growth.desc"),
    },
    {
      icon: <GiPeaceDove size={40} className="text-accent" />,
      title: t("landing_page.why.points.peace.title"),
      desc: t("landing_page.why.points.peace.desc"),
    },
  ]

  return (
    <section className="bg-bg text-fg py-20 px-8">
      <div className="max-w-5xl mx-auto text-center flex flex-col gap-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-6">
          {t("landing_page.why.title")}
        </h2>

        <p className="text-lg sm:text-xl text-fg/80 mb-12">
          {t("landing_page.why.subtitle")}
        </p>

        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group bg-secondary flex flex-col items-center text-center gap-y-5 p-6 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300  border border-white/10"
            >
              {card.icon}
              <h3 className="text-2xl font-bold text-accent ">{card.title}</h3>
              <p className="text-lg font-semibold text-fg">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySection
