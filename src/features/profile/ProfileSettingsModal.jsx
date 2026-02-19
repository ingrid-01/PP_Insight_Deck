import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Palette,
  Globe,
  Sun,
  Moon,
  Upload,
  Check,
} from "lucide-react";
import { useProfile } from "../../context/ProfileContext";

const AVATAR_COLORS = [
  { hex: "B38F64", label: "Warm Gold" },
  { hex: "6B7FD4", label: "Indigo" },
  { hex: "6DBF8B", label: "Forest" },
  { hex: "D46B6B", label: "Rose" },
  { hex: "8B6FBF", label: "Grape" },
  { hex: "4F8DA8", label: "Ocean" },
  { hex: "D4956B", label: "Terracotta" },
  { hex: "5E9B7A", label: "Sage" },
];

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language", icon: Globe },
];

export default function ProfileSettingsModal({ isOpen, onClose }) {
  const {
    profileName,
    profileImg,
    profileColor,
    lang,
    theme,
    setTheme,
    setLang,
    saveName,
    saveColor,
    saveImage,
    getDiceBearUrl,
  } = useProfile();

  const [activeTab, setActiveTab] = useState("profile");
  const [nameInput, setNameInput] = useState(profileName);
  const [nameError, setNameError] = useState("");
  const [previewImg, setPreviewImg] = useState(profileImg);
  const [previewColor, setPreviewColor] = useState(profileColor);
  const [nameSaved, setNameSaved] = useState(false);
  const fileInputRef = useRef(null);

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setNameInput(profileName);
      setPreviewImg(profileImg);
      setPreviewColor(profileColor);
      setNameError("");
      setNameSaved(false);
    }
  }, [isOpen, profileName, profileImg, profileColor]);

  const handleSaveName = () => {
    const success = saveName(nameInput);
    if (!success) {
      setNameError("Name must be 2–20 characters.");
    } else {
      setNameError("");
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
      // Update preview to new DiceBear
      setPreviewImg(getDiceBearUrl(nameInput.trim(), previewColor));
    }
  };

  const handleColorSelect = (hex) => {
    setPreviewColor(hex);
    saveColor(hex);
    setPreviewImg(getDiceBearUrl(profileName, hex));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 200;
        let w = img.width,
          h = img.height;
        if (w > h) {
          if (w > max) {
            h *= max / w;
            w = max;
          }
        } else {
          if (h > max) {
            w *= max / h;
            h = max;
          }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPreviewImg(dataUrl);
        saveImage(dataUrl);
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-gray-700">
            <h2 className="font-black text-lg dark:text-white">
              Profile Settings
            </h2>
            <button
              onClick={onClose}
              className="size-8 rounded-full flex items-center justify-center text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border dark:border-gray-700 px-6">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-xs font-bold transition-colors border-b-2 mr-4 ${
                  activeTab === id
                    ? "border-primary text-primary dark:text-primary-light dark:border-primary-light"
                    : "border-transparent text-text-muted hover:text-text-main dark:text-gray-400"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Avatar Preview */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <img
                      src={previewImg}
                      alt="Profile"
                      className="size-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 size-7 bg-primary text-white rounded-full flex items-center justify-center shadow hover:bg-primary-dark transition-colors"
                      title="Upload photo"
                    >
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <p className="text-xs text-text-muted dark:text-gray-400">
                    Upload a photo or pick a color below
                  </p>
                </div>

                {/* Color Swatches */}
                <div>
                  <p className="text-xs font-bold text-text-sub dark:text-gray-400 mb-2 uppercase tracking-wider">
                    Avatar Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_COLORS.map(({ hex, label }) => (
                      <button
                        key={hex}
                        onClick={() => handleColorSelect(hex)}
                        title={label}
                        className={`size-8 rounded-full transition-transform hover:scale-110 relative ${
                          previewColor === hex
                            ? "ring-2 ring-offset-2 ring-primary scale-110"
                            : ""
                        }`}
                        style={{ backgroundColor: `#${hex}` }}
                      >
                        {previewColor === hex && (
                          <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider block mb-2">
                    Display Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                      maxLength={20}
                      placeholder="Your name"
                      className="flex-1 px-3 py-2 rounded-xl border border-border dark:border-gray-600 bg-background-section dark:bg-gray-700 text-sm font-medium dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary-light transition-colors"
                    />
                    <button
                      onClick={handleSaveName}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        nameSaved
                          ? "bg-green-500 text-white"
                          : "bg-primary text-white hover:bg-primary-dark"
                      }`}
                    >
                      {nameSaved ? <Check className="w-4 h-4" /> : "Save"}
                    </button>
                  </div>
                  {nameError && (
                    <p className="text-xs text-red-500 mt-1">{nameError}</p>
                  )}
                  <p className="text-[10px] text-text-muted dark:text-gray-500 mt-1">
                    {nameInput.length}/20 characters
                  </p>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">
                  Theme
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      theme === "light"
                        ? "border-primary bg-primary/5"
                        : "border-border dark:border-gray-600 hover:border-primary-light"
                    }`}
                  >
                    <div className="size-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200">
                      <Sun className="w-6 h-6 text-amber-400" />
                    </div>
                    <span
                      className={`text-sm font-bold ${theme === "light" ? "text-primary" : "text-text-sub dark:text-gray-400"}`}
                    >
                      Light
                    </span>
                    {theme === "light" && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      theme === "dark"
                        ? "border-primary bg-primary/10"
                        : "border-border dark:border-gray-600 hover:border-primary-light"
                    }`}
                  >
                    <div className="size-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-700">
                      <Moon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span
                      className={`text-sm font-bold ${theme === "dark" ? "text-primary dark:text-primary-light" : "text-text-sub dark:text-gray-400"}`}
                    >
                      Dark
                    </span>
                    {theme === "dark" && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full dark:text-white">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Language Tab */}
            {activeTab === "language" && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">
                  Display Language
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      code: "en",
                      label: "English",
                      flag: "🇬🇧",
                      sub: "English",
                    },
                    { code: "ko", label: "한국어", flag: "🇰🇷", sub: "Korean" },
                  ].map(({ code, label, flag, sub }) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        lang === code
                          ? "border-primary bg-primary/5"
                          : "border-border dark:border-gray-600 hover:border-primary-light"
                      }`}
                    >
                      <span className="text-3xl">{flag}</span>
                      <div className="text-center">
                        <p
                          className={`text-sm font-bold ${lang === code ? "text-primary dark:text-primary-light" : "text-text-main dark:text-white"}`}
                        >
                          {label}
                        </p>
                        <p className="text-[10px] text-text-muted dark:text-gray-400">
                          {sub}
                        </p>
                      </div>
                      {lang === code && (
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-text-muted dark:text-gray-500 text-center pt-2">
                  Your language preference is saved automatically.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-5">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-border dark:border-gray-600 text-sm font-bold text-text-sub dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
