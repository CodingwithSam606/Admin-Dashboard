import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import UsersPage from './Pages/Users';
import Analytics from './Pages/Analytics';
import Settings from './Pages/Settings';
import Login from './Pages/Login';

function App() {
  // Can be 'light', 'dark', or 'system'
  const [theme, setTheme] = useState('light');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Function to check what the actual applied theme should be
    const applyTheme = () => {
      let shouldBeDark = false;
      if (theme === 'dark') {
        shouldBeDark = true;
      } else if (theme === 'system') {
        // This asks the browser/OS "are you in dark mode?"
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setIsDark(shouldBeDark);
    };

    applyTheme();

    // If the user picks "System", and then changes their OS theme mid-use, this updates it automatically
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e) => {
      if (theme === 'system') setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login isDark={isDark} setTheme={setTheme} />} />
          <Route path="/" element={<Layout isDark={isDark} theme={theme} setTheme={setTheme} />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings theme={theme} setTheme={setTheme} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;