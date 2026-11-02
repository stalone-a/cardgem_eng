let currentSearchQuery = '';

function searchProducts(query) {
    if (!query || query.trim() === '') {
        return products;
    }

    const searchTerm = query.toLowerCase().trim();
    const isEnglishPage = document.documentElement.lang === 'en-US';

    return products.filter(product => {
        const productName = isEnglishPage && typeof getHomeProductName === 'function'
            ? getHomeProductName(product)
            : product.name;
        const nameMatch = String(productName || '').toLowerCase().includes(searchTerm);

        const descriptionMatch = String(product.description || '').toLowerCase().includes(searchTerm);

        const categoryNames = isEnglishPage ? {
            debit: 'bank cards',
            bankaccounts: 'bank accounts',
            prepaid: 'prepaid cards',
            ewallet: 'e-wallets',
            accounts: 'accounts',
            vpnproxy: 'software'
        } : {
            debit: 'банковские карты',
            bankaccounts: 'банковские аккаунты',
            prepaid: 'предоплаченные карты',
            ewallet: 'электронные кошельки'
        };
        const categoryMatch = categoryNames[product.category] &&
            categoryNames[product.category].includes(searchTerm);

        return nameMatch || descriptionMatch || categoryMatch;
    });
}

function performSearch() {
    let searchQuery = '';

    const searchInputs = [
        document.getElementById('desktopSearchInput'),
        document.getElementById('mobileSearchInput'),
        document.getElementById('catalogDesktopSearchInput'),
        document.getElementById('catalogMobileSearchInput')
    ];

    for (let input of searchInputs) {
        if (input && input.value.trim() !== '') {
            searchQuery = input.value.trim();
            break;
        }
    }

    searchInputs.forEach(input => {
        if (input) {
            input.value = searchQuery;
        }
    });

    currentSearchQuery = searchQuery;

    if (searchQuery === '') {
        if (window.location.pathname.includes('catalog.html')) {
            const url = new URL(window.location);
            url.searchParams.delete('search');
            url.searchParams.delete('page');
            window.history.replaceState({}, '', url);
            executeSearchOnCatalog();
        }
        return;
    }

    if (!window.location.pathname.includes('catalog.html')) {
        const catalogPath = window.location.pathname.includes('/products/') ? '../catalog.html' : 'catalog.html';
        const redirectUrl = `${catalogPath}?search=${encodeURIComponent(searchQuery)}`;
        window.location.href = redirectUrl;
        return;
    }

    executeSearchOnCatalog();
}

function executeSearchOnCatalog() {
    if (typeof window !== 'undefined' && typeof window.currentPage !== 'undefined') {
        window.currentPage = 1;
    }

    if (typeof window !== 'undefined' && typeof window.updateCategoryTitle === 'function') {
        window.updateCategoryTitle();
    }

    if (typeof window !== 'undefined' && typeof window.loadProducts === 'function') {
        window.loadProducts();
    }
}

function clearSearch(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = '';

        const allInputs = [
            document.getElementById('desktopSearchInput'),
            document.getElementById('mobileSearchInput'),
            document.getElementById('catalogDesktopSearchInput'),
            document.getElementById('catalogMobileSearchInput')
        ];

        allInputs.forEach(searchInput => {
            if (searchInput) {
                searchInput.value = '';
            }
        });

    }
}

function initializeSearch() {

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');

    if (searchParam) {
        currentSearchQuery = searchParam;

        const searchInputs = [
            document.getElementById('desktopSearchInput'),
            document.getElementById('mobileSearchInput'),
            document.getElementById('catalogDesktopSearchInput'),
            document.getElementById('catalogMobileSearchInput')
        ];

        searchInputs.forEach(input => {
            if (input) {
                input.value = searchParam;
            }
        });

        if (window.location.pathname.includes('catalog.html')) {
            executeSearchOnCatalog();
        }
    }
}

function setSearchQuery(query) {
    currentSearchQuery = query || '';
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInputs = [
        document.getElementById('desktopSearchInput'),
        document.getElementById('mobileSearchInput'),
        document.getElementById('catalogDesktopSearchInput'),
        document.getElementById('catalogMobileSearchInput')
    ];

    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
        }
    });

    initializeSearch();
});

if (typeof window !== 'undefined') {
    window.searchProducts = searchProducts;
    window.performSearch = performSearch;
    window.clearSearch = clearSearch;
    window.executeSearchOnCatalog = executeSearchOnCatalog;
    window.setSearchQuery = setSearchQuery;

    Object.defineProperty(window, 'currentSearchQuery', {
        get: function () { return currentSearchQuery; },
        set: function (value) { currentSearchQuery = value; }
    });
}
