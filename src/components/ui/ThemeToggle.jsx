// components/ui/ThemeToggle.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {currentTheme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
