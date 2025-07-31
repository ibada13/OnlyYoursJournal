import { useAuth } from "../AuthContext"
import { useLogout } from "../app/lib/auth"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { FaSun, FaMoon, FaBars, FaTimes, FaUser } from "react-icons/fa"

export default function NavBar() {
  const logout = useLogout()
  const { user, token } = useAuth()
  const isAuth = !!user && !!token
  const { t, i18n } = useTranslation()

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light")
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState(() => i18n.language || "en")

  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark")
    } else {
      document.body.removeAttribute("data-theme")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en"
    setLanguage(newLang)
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    i18n.changeLanguage(newLang)

    setMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 bg-secondary text-accent mt-4 p-4 sm:p-6 rounded-xl w-[90%] max-w-3xl flex justify-between items-center shadow-xl z-50">
      <Link
        to={isAuth ? "/home" : "/"}
        id="logo"
        className="text-xl font-extrabold hover:text-accent-hover transition-colors duration-300"
      >
        {t("logo")}
      </Link>

      <div className="hidden sm:flex items-center gap-6">
        <button onClick={toggleTheme} className="transition duration-300 scale-100 hover:scale-110">
          {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} />}
        </button>


        {isAuth ? (
          <>
            <span className="font-semibold">{t("welcome")}, {user?.name}</span>
            <Link to="/profile" className="hover:text-accent-hover transition-colors">
              <FaUser />
            </Link>
            <button onClick={handleLogout} className="hover:text-red-500 transition-colors font-semibold">
              {t("logout")}
            </button>
          </>
        ) : (
          <>
        <button onClick={toggleLanguage} className="text-sm font-semibold transition-transform duration-300 hover:scale-110">
          {language === "en" ? "AR" : "EN"}
        </button>
            <Link to="/login" className="font-semibold hover:text-accent-hover transition-colors">
              {t("login")}
            </Link>
            <Link to="/register" className="font-semibold hover:text-accent-hover transition-colors">
              {t("register")}
            </Link>
          </>
        )}
      </div>

      <div className="sm:hidden">
        <button onClick={toggleMenu} className="hover:cursor-pointer">
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-secondary rounded-lg shadow-md sm:hidden z-40 overflow-hidden transition-all duration-500 ease-in-out transform origin-top mt-4 ${
          menuOpen
            ? "scale-100 opacity-100 max-h-[500px] py-6"
            : "scale-95 opacity-0 max-h-0 py-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-4 px-6 transition-opacity duration-500">
          <button onClick={toggleTheme}>
            {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>


          {isAuth ? (
            <>
              <span className="font-semibold">{t("welcome")}, {user?.name}</span>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-accent-hover">
                {t("profile")}
              </Link>
              <button onClick={handleLogout} className="hover:text-red-500 font-semibold">
                {t("logout")}
              </button>
            </>
          ) : (
            <>
          <button onClick={toggleLanguage} className="text-sm font-semibold transition-transform duration-300 hover:scale-110">
            {language === "en" ? "AR" : "EN"}
          </button>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-accent-hover">
                {t("login")}
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-accent-hover">
                {t("register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
