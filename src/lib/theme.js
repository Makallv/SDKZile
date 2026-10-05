const THEME_KEY = 'sdk_zile_theme';

// Returns explicit user preference ('dark' | 'light') or null (= follow system setting)
export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (!stored) return null;
    const clean = stored.replace(/^"|"$/g, '').trim();
    if (clean === 'dark' || clean === 'light') return clean;
    return null;
  } catch (e) {
    return null;
  }
}

export function storeThemePreference(preference) {
  try {
    if (preference === 'dark' || preference === 'light') {
      localStorage.setItem(THEME_KEY, preference);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
  } catch (e) {
    console.warn('Failed to store theme preference:', e);
  }
}

export function systemPrefersDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Applies the active theme to <html> and <body> and returns cleanup fn that stops watching OS settings
export function initTheme() {
  const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  const apply = () => {
    const preference = getStoredTheme();
    const isDark = preference === null ? systemPrefersDark() : preference === 'dark';

    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'dark', 'light');
    root.classList.add(isDark ? 'theme-dark' : 'theme-light');
    root.classList.add(isDark ? 'dark' : 'light');
    root.style.colorScheme = isDark ? 'dark' : 'light';

    if (document.body) {
      if (isDark) {
        document.body.classList.remove('theme-light', 'light');
        document.body.classList.add('theme-dark', 'dark');
      } else {
        document.body.classList.remove('theme-dark', 'dark');
        document.body.classList.add('theme-light', 'light');
      }
    }
  };

  apply();

  // Re-check the OS setting whenever it changes (only relevant when preference is null)
  const onChange = () => {
    if (getStoredTheme() === null) apply();
  };
  if (mq) mq.addEventListener('change', onChange);

  return () => {
    if (mq) mq.removeEventListener('change', onChange);
  };
}
