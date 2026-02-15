import React, { useState } from "react";
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
} from "lucide-react";
import { useInsights } from "../../context/InsightContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { openCreateModal, setFilter } = useInsights();
  const { user, logout } = useAuth(); // Use real auth data

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-colors ${isActive ? "text-primary dark:text-primary-light font-bold" : "text-text-sub hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"}`;

  const handleLogoClick = (e) => {
    // Prevent default link navigation to ensure our logic runs first/exclusively if needed
    // However, since we are using <Link>, we might want to let it handle the URL change
    // BUT we need to reset the filter.
    // Actually, asking the user to click a div vs a link:
    // The previous "crash" was likely due to missing useNavigate.
    // Now that we have useNavigate via the hook, we can use the div approach OR the Link approach.
    // The Link approach with onClick is standard.
    // reset filter
    setFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm dark:bg-gray-800/90 dark:border-gray-700 transition-all duration-300">
      {/* Logo & Mobile Menu */}
      <Link
        to="/"
        onClick={handleLogoClick}
        className="flex items-center gap-4 cursor-pointer group select-none"
      >
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <Menu className="text-white w-6 h-6" />
        </div>
        <div className="hidden md:block">
          <h1 className="font-black text-xl tracking-tight text-text-main leading-none mb-0.5 dark:text-white">
            Insight Deck
          </h1>
          <p className="text-[10px] text-text-sub font-bold tracking-widest uppercase dark:text-gray-400">
            Know Thyself
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-3 lg:gap-8 text-sm font-semibold">
        <NavLink to="/" className={navLinkClass}>
          <Network className="w-5 h-5" />
          <span className="hidden lg:inline">Conversation Hub</span>
        </NavLink>
        <NavLink to="/archive" className={navLinkClass}>
          <Archive className="w-5 h-5" />
          <span className="hidden lg:inline">Archive</span>
        </NavLink>
        <NavLink to="/stats" className={navLinkClass}>
          <BarChart className="w-5 h-5" />
          <span className="hidden lg:inline">Statistics</span>
        </NavLink>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative max-w-[240px] w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
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
          <span className="hidden lg:inline">New Insight</span>
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
        <div className="relative group">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="size-9 rounded-full bg-accent-fiction/20 border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all focus:outline-none dark:border-gray-600"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
                {user?.displayName?.charAt(0) || "U"}
              </div>
            )}
          </button>

          {/* Create a simple dropdown for logout */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border p-2 hidden group-hover:block dark:bg-gray-800 dark:border-gray-700 z-[100]">
            <div className="px-3 py-2 border-b border-border mb-2 dark:border-gray-700">
              <p className="text-sm font-bold text-text-main dark:text-white">
                {user?.displayName}
              </p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="absolute left-0 top-full w-full bg-white border-b border-border p-3 shadow-md z-40 dark:bg-gray-800 dark:border-gray-700 md:hidden animate-in slide-in-from-top-5">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
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
  );
};

export default Header;
