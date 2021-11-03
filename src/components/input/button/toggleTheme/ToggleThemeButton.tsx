import { useState } from "react";
import s from "./ToggleThemeButton.module.scss";

const ToggleThemeButton = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.theme || "light"
  );

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    if (theme === "dark") {
      localStorage.theme = "light";
      setTheme("light");
      return;
    }
    localStorage.theme = "dark";
    setTheme("dark");
  };

  return (
    <button className={s.button} onClick={() => toggleTheme()}>
      {theme === "dark" ? "🌞" : "🌛"}
    </button>
  );
};

export default ToggleThemeButton;
