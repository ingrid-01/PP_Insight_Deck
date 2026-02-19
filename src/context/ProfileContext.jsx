import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

const AVATAR_BASE = "https://api.dicebear.com/7.x/initials/svg";

const getDiceBearUrl = (name, color) =>
  `${AVATAR_BASE}?seed=${encodeURIComponent(name)}&backgroundColor=${color}&textColor=ffffff&chars=1`;

export const ProfileProvider = ({ children }) => {
  const [profileName, setProfileName] = useState(
    () => localStorage.getItem("userName") || "Guest",
  );
  const [profileColor, setProfileColor] = useState(
    () => localStorage.getItem("userProfileColor") || "B38F64",
  );
  const [profileImg, setProfileImg] = useState(() => {
    const saved = localStorage.getItem("userProfileImg");
    if (saved) return saved;
    const name = localStorage.getItem("userName") || "Guest";
    const color = localStorage.getItem("userProfileColor") || "B38F64";
    return getDiceBearUrl(name, color);
  });
  const [lang, setLangState] = useState(
    () => localStorage.getItem("userLang") || "en",
  );
  const [theme, setThemeState] = useState(
    () => localStorage.getItem("userTheme") || "light",
  );

  // Apply theme to DOM on mount and whenever it changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("userTheme", newTheme);
  };

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("userLang", newLang);
  };

  const saveName = (newName) => {
    const trimmed = newName.trim();
    if (trimmed.length < 2 || trimmed.length > 20) return false;
    const newUrl = getDiceBearUrl(trimmed, profileColor);
    setProfileName(trimmed);
    setProfileImg(newUrl);
    localStorage.setItem("userName", trimmed);
    localStorage.setItem("userProfileImg", newUrl);
    return true;
  };

  const saveColor = (color) => {
    const newUrl = getDiceBearUrl(profileName, color);
    setProfileColor(color);
    setProfileImg(newUrl);
    localStorage.setItem("userProfileColor", color);
    localStorage.setItem("userProfileImg", newUrl);
  };

  const saveImage = (dataUrl) => {
    setProfileImg(dataUrl);
    localStorage.setItem("userProfileImg", dataUrl);
  };

  return (
    <ProfileContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
