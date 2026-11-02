(function () {
    const storageKey = 'cardgem-theme';
    const themes = {
        dark: 'dark',
        light: 'light'
    };

    function getStoredTheme() {
        const storedTheme = localStorage.getItem(storageKey);
        return themes[storedTheme] || themes.dark;
    }

    function applyTheme(theme) {
        const nextTheme = themes[theme] || themes.dark;
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem(storageKey, nextTheme);

        document.querySelectorAll('.theme-toggle').forEach(button => {
            const isLightTheme = nextTheme === themes.light;
            const isEnglishPage = document.documentElement.lang === 'en-US';
            const icon = button.querySelector('i');
            button.setAttribute('aria-label', isEnglishPage
                ? (isLightTheme ? 'Switch to dark theme' : 'Switch to light theme')
                : (isLightTheme ? 'Включить тёмную тему' : 'Включить светлую тему'));
            button.setAttribute('title', isEnglishPage
                ? (isLightTheme ? 'Dark theme' : 'Light theme')
                : (isLightTheme ? 'Тёмная тема' : 'Светлая тема'));
            button.setAttribute('aria-pressed', String(isLightTheme));
            if (icon) icon.className = `bi ${isLightTheme ? 'bi-moon-stars' : 'bi-sun'}`;
        });
    }

    applyTheme(getStoredTheme());

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const currentTheme = document.documentElement.dataset.theme || themes.dark;
                applyTheme(currentTheme === themes.light ? themes.dark : themes.light);
            });
        });

        applyTheme(document.documentElement.dataset.theme || getStoredTheme());
    });
})();
