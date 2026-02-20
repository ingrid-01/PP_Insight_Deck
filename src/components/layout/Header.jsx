import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Network,
  Archive,
  BarChart,
  Search,
  PlusCircle,
  Bell,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { useInsights } from "../../context/InsightContext";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import ProfileSettingsModal from "../../features/profile/ProfileSettingsModal";
import { translations } from "../../lib/translations";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { openCreateModal, setFilter } = useInsights();
  const { user, logout } = useAuth();
  const { profileName, profileImg, lang } = useProfile();

  const t = translations[lang]?.header || translations.en.header;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-colors ${isActive ? "text-primary dark:text-primary-light font-bold" : "text-text-sub hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"}`;

  const handleLogoClick = () => {
    setFilter("all");
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // For logged-in Firebase users, use their photo. For guests, use profile context.
  const avatarSrc = user?.photoURL || profileImg;
  const displayName = user?.displayName || profileName;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm dark:bg-gray-800/90 dark:border-gray-700 transition-all duration-300">
        {/* Logo & Mobile Menu */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-4 cursor-pointer group select-none"
        >
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Menu className="text-white w-6 h-6" />
          </div>
          <div className="hidden md:block">
            <h1 className="font-black text-xl tracking-tight text-text-main leading-none mb-0.5 dark:text-white">
              {t.title}
            </h1>
            <p className="text-[10px] text-text-sub font-bold tracking-widest uppercase dark:text-gray-400">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-3 lg:gap-8 text-sm font-semibold">
          <NavLink to="/" className={navLinkClass}>
            <Network className="w-5 h-5" />
            <span className="hidden lg:inline">{t.hub}</span>
          </NavLink>
          <NavLink to="/archive" className={navLinkClass}>
            <Archive className="w-5 h-5" />
            <span className="hidden lg:inline">{t.archive}</span>
          </NavLink>
          <NavLink to="/stats" className={navLinkClass}>
            <BarChart className="w-5 h-5" />
            <span className="hidden lg:inline">{t.stats}</span>
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search */}
          <div className="relative max-w-[240px] w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 bg-background-section border border-transparent rounded-full text-sm font-medium focus:outline-none focus:bg-white focus:border-primary-light transition-all placeholder:text-text-muted dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600 dark:placeholder-gray-400"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden size-9 rounded-full bg-background-section flex items-center justify-center text-text-sub hover:bg-border transition-all dark:bg-gray-700 dark:text-gray-300"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* New Insight Button */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-primary text-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm font-bold hover:bg-primary-dark transition-all shadow-sm active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="hidden lg:inline">{t.newInsight}</span>
          </button>

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative size-9 rounded-full bg-background-section flex items-center justify-center text-text-sub hover:bg-border transition-all focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <Bell className="w-5 h-5" />
              <span className="hidden absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="size-9 rounded-full border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all focus:outline-none dark:border-gray-600"
            >
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </button>

            {/* Profile Dropdown — click-driven, stable */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-border p-2 dark:bg-gray-800 dark:border-gray-700 z-[100]">
                {/* User Info */}
                <div className="px-3 py-2 border-b border-border mb-2 dark:border-gray-700 flex items-center gap-3">
                  <img
                    src={avatarSrc}
                    alt={displayName}
                    className="size-8 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-main dark:text-white truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {user?.email || t.guest}
                    </p>
                  </div>
                </div>

                {/* Settings Button */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsSettingsOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-text-main hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4" />
                  {t.profileSettings}
                </button>

                {/* Sign Out (only for Firebase users) */}
                {user && (
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    {t.signOut}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="absolute left-0 top-full w-full bg-white border-b border-border p-3 shadow-md z-40 dark:bg-gray-800 dark:border-gray-700 md:hidden animate-in slide-in-from-top-5">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder={t.search}
                className="w-full pl-10 pr-4 py-2.5 bg-background-section border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-primary-light transition-all placeholder:text-text-muted dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600 dark:placeholder-gray-400"
              />
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Profile Settings Modal (rendered outside header to avoid clipping) */}
      <ProfileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Header;
