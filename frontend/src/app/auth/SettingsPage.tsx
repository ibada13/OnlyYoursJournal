
import { useTranslation } from "react-i18next"
import i18n from "../../i18n"

export default function SettingsPage() { 

    const { t} = useTranslation()
    const HandelLang = (lang: string) => {
            
    i18n.changeLanguage(lang)
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'
     }
    return (
    <div className="min-h-screen flex-1 bg-secondary rounded-lg shadow-xl flex justify-center items-start self-center">
            <div className="w-[90%] p-8  text-fg space-y-8">
                <p className="text-3xl text-accent uppercase">{ t("settings.languages.language")}</p>
                <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 justify-around items-center">

                    <p className="text-lg text-fg">{ t("settings.languages.select_language")}</p>
                    <select 
                        defaultValue={i18n.language}
                        onChange={(e)=>HandelLang(e.target.value )}
                        className="w-full sm:w-1/3 rounded-lg text-fg bg-bg px-4 py-2" name="" id="">
                        <option value="ar">{ t("settings.languages.arabic")}</option>
                        <option value="en">{ t("settings.languages.english")}</option>
                </select>
                </div>
      </div>
    </div>
    );
}