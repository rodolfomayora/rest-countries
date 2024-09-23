// type Theme = 'dark' | 'light';
type Theme = 'default' | 'light';

export class ThemeStorage {
  static get () {
    const theme = window.localStorage.getItem('theme');
    return theme;
  }

  static set (theme: Theme) {
    window.localStorage.setItem('theme', theme);
    return theme;
  }
}