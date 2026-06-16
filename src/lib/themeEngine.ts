export class ThemeEngine {
  private static THEME_KEY = 'interaction-theme';
  private subscribers: Array<(isDark: boolean) => void> = [];
  public isDark: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Check local storage
      const stored = localStorage.getItem(ThemeEngine.THEME_KEY);
      if (stored) {
        this.isDark = stored === 'dark';
      } else {
        // 2. Check system preference
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      this.applyTheme();
    }
  }

  public toggle() {
    this.isDark = !this.isDark;
    this.applyTheme();
    if (typeof window !== 'undefined') {
      localStorage.setItem(ThemeEngine.THEME_KEY, this.isDark ? 'dark' : 'light');
    }
    this.notify();
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }

  public subscribe(callback: (isDark: boolean) => void) {
    this.subscribers.push(callback);
    // immediately call with current theme
    callback(this.isDark);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(cb => cb(this.isDark));
  }
}

// Singleton instance
export const themeEngine = new ThemeEngine();
