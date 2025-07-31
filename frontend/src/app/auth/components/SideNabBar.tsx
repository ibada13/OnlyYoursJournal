import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavLinkProps {
  to: string;
  content: string;
  active?: boolean;
}

const NavLink = ({ to, content, active = false }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={clsx(
        "text-accent text-sm sm:text-base px-3 py-2 text-center rounded-md block select-none transition-all duration-300",
        active
          ? "text-fg font-semibold bg-bg/70 shadow-inner border-b-2 border-accent"
          : "hover:text-accent-hover hover:bg-bg/40"
      )}
    >
      {content}
    </Link>
  );
};

export default function SideNavBar() {
  const location = useLocation();
  const { t } = useTranslation();

  const links: NavLinkProps[] = [
    // { to: "/dashbord", content: t("side_nav.dashboard") },
    { to: "/profile", content: t("side_nav.profile") },
    { to: "/actions", content: t("side_nav.actions") },
    { to: "/settings", content: t("side_nav.settings") },
  ];

  return (
    <nav className="w-full sm:w-1/5 flex flex-wrap sm:flex-col justify-around sm:justify-start bg-secondary sm:h-screen rounded-lg gap-2 py-3 px-2 sm:gap-y-3 overflow-x-auto sm:overflow-visible">
      {links.map((link, index) => (
        <NavLink
          key={`sidenav-${index}`}
          active={link.to === location.pathname}
          to={link.to}
          content={link.content}
        />
      ))}
    </nav>
  );
}
