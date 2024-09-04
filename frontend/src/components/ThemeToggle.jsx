import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleHandler = () => {
    const toggledIsDarkMode = !isDarkMode;
    setIsDarkMode(toggledIsDarkMode);
    if (toggledIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="form-control w-44 justify-end">
      <label className="label cursor-pointer">
        <span className="toggle-text text-gray-400">Dark Mode</span>
        <input
          type="checkbox"
          className="toggle toggle-accent"
          onClick={toggleHandler}
          checked={isDarkMode}
        />
      </label>
    </div>
  );
};

export default ThemeToggle;
