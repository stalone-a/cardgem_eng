document.addEventListener('DOMContentLoaded', function () {
    const removedProductIds = new Set([
        '2', '25', '102', '201', '202', '205', '310', '311', '312', '313',
        '3', '7', '12', '213', '212', '220', '221', '227', '214', '215',
        '216', '217', '218', '219'
    ]);
    ['cart', 'favorites'].forEach(storageKey => {
        const storedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const availableItems = storedItems.filter(item => !removedProductIds.has(String(item.id)));
        if (availableItems.length !== storedItems.length) {
            localStorage.setItem(storageKey, JSON.stringify(availableItems));
        }
    });

    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const mobileSearchOverlay = document.querySelector('.mobile-search-overlay');
    const mobileSearchClose = document.querySelector('.mobile-search-close');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    const navbar = document.querySelector('.navbar');

    const currentPath = window.location.pathname;
    const homeLink = document.querySelector('.navbar-nav a[href="index.html"]');
    const catalogLink = document.querySelector('.navbar-nav .dropdown-toggle');
    const faqLink = document.querySelector('.navbar-nav a[href="faq.html"]');
    const guaranteesLink = document.querySelector('.navbar-nav a[href="guarantees.html"]');

    [homeLink, catalogLink, faqLink, guaranteesLink].forEach(link => {
        link?.classList.remove('active');
    });

    if (currentPath.endsWith('/index.html') || currentPath.endsWith('/')) {
        homeLink?.classList.add('active');
    } else if (currentPath.endsWith('/catalog.html')) {
        catalogLink?.classList.add('active');
    } else if (currentPath.endsWith('/faq.html')) {
        faqLink?.classList.add('active');
    } else if (currentPath.endsWith('/guarantees.html')) {
        guaranteesLink?.classList.add('active');
    }

    if (window.location.pathname.includes('/products/')) {
        updateBreadcrumbsFromState();
    }


    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const navbarCollapse = document.querySelector('#navbarContent');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    let isMenuOpen = false;

    const openMenu = () => {
        if (!navbarCollapse || !mobileMenuOverlay) return;

        isMenuOpen = true;
        navbarCollapse.classList.add('mobile-menu-open');
        mobileMenuOverlay.classList.add('show');
        document.body.classList.add('menu-open');
        navbarCollapse.style.height = 'auto';
        navbarCollapse.style.minHeight = 'auto';
        navbarCollapse.style.maxHeight = '100vh';
    };


    const closeMenu = () => {
        if (!navbarCollapse || !mobileMenuOverlay) return;

        isMenuOpen = false;
        navbarCollapse.classList.remove('mobile-menu-open');
        mobileMenuOverlay.classList.remove('show');
        document.body.classList.remove('menu-open');

        navbarCollapse.style.height = 'auto';
        navbarCollapse.style.minHeight = 'auto';
        navbarCollapse.style.maxHeight = '100vh';
    };


    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };


    if (navbarToggler) {
        navbarToggler.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }


    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });


    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992 && isMenuOpen) {
            closeMenu();
        }
    });


    if (navbarCollapse) {
        navbarCollapse.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }


    document.addEventListener('click', function (e) {
        if (isMenuOpen &&
            navbarCollapse && navbarToggler &&
            !navbarCollapse.contains(e.target) &&
            !navbarToggler.contains(e.target)) {
            closeMenu();
        }
    });


    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function () {
            mobileSearchOverlay.classList.remove('d-none');
            navbar.classList.add('search-active');


            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('show');
                document.body.classList.add('input-focused');
            }

            mobileSearchInput.focus();
        });
    }

    if (mobileSearchClose) {
        mobileSearchClose.addEventListener('click', function () {
            mobileSearchOverlay.classList.add('d-none');
            navbar.classList.remove('search-active');
            mobileSearchInput.value = '';

            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('show');
                document.body.classList.remove('input-focused');
            }
        });
    }


    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function (e) {

            if (e.target !== mobileMenuOverlay) return;


            if (!mobileSearchOverlay.classList.contains('d-none')) {
                mobileSearchOverlay.classList.add('d-none');
                navbar.classList.remove('search-active');
                mobileSearchInput.value = '';
                mobileMenuOverlay.classList.remove('show');
                document.body.classList.remove('input-focused');
            }
            else if (isMenuOpen) {
                closeMenu();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {

            if (!mobileSearchOverlay.classList.contains('d-none')) {
                mobileSearchOverlay.classList.add('d-none');
                navbar.classList.remove('search-active');
                mobileSearchInput.value = '';

                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('show');
                    document.body.classList.remove('input-focused');
                }
            }

            else if (isMenuOpen) {
                closeMenu();
            }
        }
    });

    updateCartBadge();
    updateFavoritesBadge();

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const category = this.dataset.category;
            if (category) {
                window.location.href = `catalog.html?category=${category}`;
            }
        });
    });

    const favoritesButtons = document.querySelectorAll('.btn-favorites');
    favoritesButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            openFavoritesModal();
        });
    });

    const cartButtons = document.querySelectorAll('.btn-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            openCartModal();
        });
    });
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badges = document.querySelectorAll('.btn-cart .badge');
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = cart.length;
        }
    });
}

function updateFavoritesBadge() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const badges = document.querySelectorAll('.btn-favorites .badge');
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = favorites.length;
        }
    });
}

function isEnglishPage() {
    return document.documentElement.lang === 'en-US';
}

function isEnglishHomePage() {
    return isEnglishPage() &&
        (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/'));
}

function getHomeProductName(product, forceEnglish = false) {
    if (!isEnglishPage() && !forceEnglish) return product.title || product.name || 'Товар без названия';

    const names = {
        1: "Mastercard Ziraat Card",
        4: "Verified PayPal Account",
        8: "Mastercard Kaspi Gold Card",
        9: "Verified OlduBil Account",
        10: "Verified Wise Account",
        11: "Verified Pyypl Account",
        16: "Verified Revolut Account",
        17: "Verified Volet (Advcash) Account",
        18: "Verified Skrill Account",
        19: "Verified Bybit Account",
        20: "Verified Binance Account",
        21: "Verified OKX Account",
        24: "Mastercard Royal Bank of Scotland",
        26: "Verified MEXC Account",
        27: "Verified BingX Account",
        28: "Verified Coinbase Account",
        29: "PayPal Account with $500-$1,000 Balance",
        30: "PayPal Account with $1,000+ Balance",
        75: "OnlyFans Account with $400-$800 Balance",
        210: "Virtual Visa Prepaid Card | EUR 100 (EU)",
        211: "Virtual Mastercard Prepaid Card | $100 (US)",
        224: "Verified eBay Account",
        225: "Amazon Account",
        226: "Verified WeChat Account",
        228: "GitHub Copilot Pro Account | 1 Month",
        229: "GitHub Copilot Pro+ Account | 1 Month",
        230: "GitHub Copilot Max Account | 1 Month",
        231: "Claude AI Pro Account | 1 Month",
        232: "Claude AI Max Account | 1 Month",
        233: "Fortnite Account with 300+ Skins",
        234: "Facebook Account | 2016-2020",
        235: "X (Twitter) Account | 2008-2014",
        236: "Personal Google Gmail Account",
        237: "Reddit Account | 1,000 Karma, Global",
        238: "1Xbet Account",
        239: "Verified Stake Account",
        240: "BlackHatWorld Account",
        242: "Verified Payoneer Account",
        243: "Verified Paysera Account",
        244: "Verified Stripe Account",
        301: "NordVPN Premium Complete Account | 1 Year",
        302: "Dedicated Proxy Service",
        303: "Binance Account with $1,000+ Crypto Balance | Full Access",
        304: "Coinbase Account with $1,200-$2,000 Balance",
        305: "Bybit Account with $500-$1,000 Balance",
        306: "Verified Kraken Account",
        307: "Verified Crypto.com Account",
        308: "Verified Bitget Account",
        309: "Verified Gate.io Account",
        314: "Verified Kaspi Bank Account",
        315: "Verified Halyk Bank Account",
        316: "Google AdSense Account",
        317: "Verified N26 Account",
        318: "Verified Zelle Account"
    };
    const categoryNames = {
        debit: 'Bank Card',
        bankaccounts: 'Bank Account',
        prepaid: 'Prepaid Card',
        ewallet: 'Digital Wallet',
        accounts: 'Online Account',
        vpnproxy: 'Software'
    };

    return names[product.id] || (forceEnglish && (product.title || product.name)) ||
        categoryNames[product.category] || 'Digital Product';
}

function addToCart(productOrId) {
    const productId = typeof productOrId === 'object' ? productOrId?.id : productOrId;
    const product = typeof productOrId === 'object'
        ? productOrId
        : window.products?.find(item => String(item.id) === String(productId));
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cart.some(item => String(item.id) === String(productId));
    const nextCart = isInCart
        ? cart.filter(item => String(item.id) !== String(productId))
        : [...cart, product];

    localStorage.setItem('cart', JSON.stringify(nextCart));
    updateCartBadge();
    updateGlobalCartButtonState(productId, !isInCart);

    window.dispatchEvent(new CustomEvent('cartChanged', {
        detail: { productId, action: isInCart ? 'removed' : 'added', cart: nextCart }
    }));

    if (document.getElementById('cartModal')?.classList.contains('show')) renderCart();
    showNotification(isInCart ? 'Removed from your cart.' : 'Added to your cart.');
}

function addToFavorites(product) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.find(f => f.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesBadge();
        updateGlobalFavoriteButtonState(product.id, true);
        showNotification('Added to your favorites.');
    } else {
        showNotification('This product is already in your favorites.', 'warning');
    }
}

function showNotification(message, type = 'success') {
    const translations = {
        'Added to your cart.': 'Added to your cart.',
        'Item added to cart!': 'Added to your cart.',
        'Product added to cart!': 'Added to your cart.',
        'Added to cart.': 'Added to your cart.',
        'This item is already in your cart!': 'This product is already in your cart.',
        'This product is already in your cart!': 'This product is already in your cart.',
        'This product is already in your cart.': 'This product is already in your cart.',
        'Item removed from cart.': 'Removed from your cart.',
        'Added to your favorites.': 'Added to your favorites.',
        'Item added to favorites!': 'Added to your favorites.',
        'Product added to favorites!': 'Added to your favorites.',
        'This item is already in your favorites!': 'This product is already in your favorites.',
        'This product is already in your favorites!': 'This product is already in your favorites.',
        'This product is already in your favorites.': 'This product is already in your favorites.',
        'Item removed from favorites!': 'Removed from your favorites.',
        'Item removed from favorites.': 'Removed from your favorites.',
        'Product removed from favorites!': 'Removed from your favorites.',
        'Removed from your favorites.': 'Removed from your favorites.',
        'Item removed from cart!': 'Removed from your cart.',
        'Товар удален из корзины!': 'Removed from your cart.',
        'Товар добавлен в корзину!': 'Added to your cart.',
        'Товар добавлен в избранное!': 'Added to your favorites.',
        'Товар уже в избранном!': 'This product is already in your favorites.',
        'Товар удален из избранного!': 'Removed from your favorites.',
        'Товар удален из избранного': 'Removed from your favorites.',
        'Товар удален из корзины': 'Removed from your cart.',
        'Товар уже в корзине!': 'This product is already in your cart.'
    };
    message = translations[message] || message;

    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 250px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        animation: slideInFromRight 0.3s ease;
    `;

    const icon = type === 'success' ? 'check-circle' :
        type === 'warning' ? 'exclamation-triangle' : 'info-circle';

    notification.innerHTML = `
        <i class="bi bi-${icon} me-2"></i>
        ${message}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initializeDemoPurchaseNotifications() {
    const currentPath = window.location.pathname;
    const isSupportedPage = currentPath.endsWith('/index.html') ||
        currentPath.endsWith('/') ||
        currentPath.endsWith('/catalog.html') ||
        currentPath.includes('/products/');

    if (!isSupportedPage || !Array.isArray(window.products)) return;

    const categoryWeights = [
        { category: 'ewallet', weight: 39 },
        { category: 'accounts', weight: 39 },
        { category: 'prepaid', weight: 4 },
        { category: 'vpnproxy', weight: 5 },
        { category: 'debit', weight: 3 },
        { category: 'bankaccounts', weight: 10 }
    ];
    const purchaseTimes = isEnglishPage() ? [
    'just now', '5 minutes ago', '10 minutes ago', '15 minutes ago',
    '30 minutes ago', '45 minutes ago', 'about an hour ago', '2 hours ago',
    '3 hours ago', '4 hours ago', '5 hours ago', '6 hours ago', 'yesterday'
    ] : [
        'только что',
        '5 минут назад',
        '15 минут назад',
        '10 минут назад',
        '30 минут назад',
        '45 минут назад',
        'около часа назад',
        '1 час назад',
        '2 часа назад',
        '3 часа назад',
        '4 часа назад',
        '5 часов назад',
        '6 часов назад',
        '7 часов назад',
        '8 часов назад',
        '9 часов назад',
        '10 часов назад',
        '11 часов назад',
        '12 часов назад',
        '13 часов назад',
        '14 часов назад',
        '15 часов назад',
        '16 часов назад',
        '17 часов назад',
        '18 часов назад',
        '19 часов назад',
        '20 часов назад',
        '21 час назад',
        '22 часа назад',
        '23 часа назад',
        'вчера'
    ];
    const maskedContacts = ['***********@*******', '@********'];
    const maxNotificationsPerSession = 4;
    const notificationSessionKey = 'demoPurchaseNotificationsShown';
    let notificationsShown = Number(sessionStorage.getItem(notificationSessionKey)) || 0;

    const weightedCategory = () => {
        const totalWeight = categoryWeights.reduce((sum, item) => sum + item.weight, 0);
        let target = Math.random() * totalWeight;

        for (const item of categoryWeights) {
            target -= item.weight;
            if (target < 0) return item.category;
        }

        return categoryWeights[0].category;
    };

    const showDemoNotification = () => {
        if (notificationsShown >= maxNotificationsPerSession) return false;

        const category = weightedCategory();
        const categoryProducts = window.products.filter(product => product.category === category);
        const availableProducts = categoryProducts.length ? categoryProducts : window.products;
        const product = availableProducts[Math.floor(Math.random() * availableProducts.length)];
        const contact = maskedContacts[Math.floor(Math.random() * maskedContacts.length)];
        const time = purchaseTimes[Math.floor(Math.random() * purchaseTimes.length)];
        notificationsShown += 1;
        sessionStorage.setItem(notificationSessionKey, String(notificationsShown));

        const notification = document.createElement('div');
        notification.className = 'demo-purchase-notice';
        notification.setAttribute('role', 'status');
        notification.innerHTML = `
            <button class="demo-purchase-close" type="button" aria-label="${isEnglishPage() ? 'Close notification' : 'Закрыть уведомление'}">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
            <div class="demo-purchase-label">${isEnglishPage() ? 'Purchase Update' : 'Уведомление'}</div>
            <div class="demo-purchase-message">
                <i class="bi bi-bag-check"></i>
                <span><span class="demo-purchase-mainline"><strong>${contact}</strong> ${isEnglishPage() ? 'purchased a product' : 'приобрёл товар'}</span><br>${getHomeProductName(product)}</span>
            </div>
            <div class="demo-purchase-time">${time}</div>
        `;

        notification.querySelector('.demo-purchase-close').addEventListener('click', () => {
            notification.classList.add('is-hidden');
            setTimeout(() => notification.remove(), 300);
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('is-hidden');
            setTimeout(() => notification.remove(), 300);
        }, 10000);

        return true;
    };

    const scheduleNextNotification = () => {
        if (notificationsShown >= maxNotificationsPerSession) return;

        const delay = 50000 + Math.random() * 40000;
        setTimeout(() => {
            if (showDemoNotification()) scheduleNextNotification();
        }, delay);
    };

    const firstNotificationDelay = 10000 + Math.random() * 10000;
    setTimeout(() => {
        if (showDemoNotification()) scheduleNextNotification();
    }, firstNotificationDelay);
}

document.addEventListener('DOMContentLoaded', initializeDemoPurchaseNotifications);

async function initializeProductGallery() {
    if (!window.location.pathname.includes('/products/') || !Array.isArray(window.products)) return;

    const imageContainer = document.getElementById('productImageContainer');
    const productButton = document.querySelector('[onclick*="addProductToCart("]');
    if (!imageContainer || !productButton) return;

    const productIdMatch = productButton.getAttribute('onclick').match(/addProductToCart\((\d+)\)/);
    const product = productIdMatch
        ? window.products.find(item => item.id === Number(productIdMatch[1]))
        : null;
    const imageSources = product?.images?.length ? product.images : product?.image ? [product.image] : [];

    if (!product || imageSources.length <= 1) return;

    const images = (await Promise.all(imageSources.map(imageSource => new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(imageSource);
        image.onerror = () => resolve(null);
        image.src = `../${imageSource}`;
    })))).filter(Boolean);

    if (images.length <= 1) return;

    let activeImageIndex = 0;
    const productName = isEnglishPage() ? getHomeProductName(product) : product.name;
    imageContainer.innerHTML = `
        <img src="../${images[0]}" alt="${productName}" class="product-image active"
            onerror="this.src='../images/placeholder.svg'">
        <button class="image-controls image-prev" type="button" aria-label="${isEnglishPage() ? 'Previous image' : 'Предыдущее изображение'}">
            <i class="bi bi-chevron-left"></i>
        </button>
        <button class="image-controls image-next" type="button" aria-label="${isEnglishPage() ? 'Next image' : 'Следующее изображение'}">
            <i class="bi bi-chevron-right"></i>
        </button>
    `;

    const imageElement = imageContainer.querySelector('.product-image');
    const updateImage = index => {
        activeImageIndex = (index + images.length) % images.length;
        imageElement.src = `../${images[activeImageIndex]}`;
    };

    imageContainer.querySelector('.image-prev').addEventListener('click', () => {
        updateImage(activeImageIndex - 1);
    });
    imageContainer.querySelector('.image-next').addEventListener('click', () => {
        updateImage(activeImageIndex + 1);
    });
}

document.addEventListener('DOMContentLoaded', initializeProductGallery);

function initializeHomePopular() {
    const section = document.getElementById('homePopular');
    const track = document.getElementById('homePopularTrack');
    const previousButton = document.getElementById('homePopularPrev');
    const nextButton = document.getElementById('homePopularNext');

    if (!section || !track || !previousButton || !nextButton ||
        !Array.isArray(window.products) || typeof createProductHTML !== 'function') return;

    const featuredProductIds = [30, 305, 20, 210, 4, 16, 29, 316];
    const featuredProducts = featuredProductIds
        .map(productId => window.products.find(product => String(product.id) === String(productId)))
        .filter(Boolean)
        .map(product => ({ ...product, homePageName: getHomeProductName(product) }));

    track.innerHTML = featuredProducts
        .map(product => `<div class="home-popular-item">${createProductHTML(product)}</div>`)
        .join('');

    if (!track.children.length) return;
    section.hidden = false;

    const autoplayDelay = 5000;
    let autoplayTimer;
    let autoplayPaused = false;

    const updateControls = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        previousButton.disabled = track.scrollLeft <= 1;
        nextButton.disabled = maxScroll <= 1 || track.scrollLeft >= maxScroll - 1;
    };

    const scheduleAutoAdvance = () => {
        window.clearTimeout(autoplayTimer);
        if (autoplayPaused || document.visibilityState !== 'visible' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        autoplayTimer = window.setTimeout(() => {
            const hasHover = window.matchMedia('(hover: hover)').matches && section.matches(':hover');
            const hasFocus = section.contains(document.activeElement);
            if (hasHover || hasFocus) {
                scheduleAutoAdvance();
                return;
            }

            const maxScroll = track.scrollWidth - track.clientWidth;
            if (maxScroll <= 1) return;

            if (track.scrollLeft >= maxScroll - 1) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: track.clientWidth * 0.9, behavior: 'smooth' });
            }
            scheduleAutoAdvance();
        }, autoplayDelay);
    };

    const pauseAutoplay = () => {
        autoplayPaused = true;
        window.clearTimeout(autoplayTimer);
    };

    const resumeAutoplay = () => {
        autoplayPaused = false;
        scheduleAutoAdvance();
    };

    previousButton.addEventListener('click', () => {
        track.scrollBy({ left: -track.clientWidth * 0.9, behavior: 'smooth' });
    });
    nextButton.addEventListener('click', () => {
        track.scrollBy({ left: track.clientWidth * 0.9, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    section.addEventListener('pointerenter', pauseAutoplay);
    section.addEventListener('pointerleave', resumeAutoplay);
    section.addEventListener('focusin', pauseAutoplay);
    section.addEventListener('focusout', event => {
        if (!section.contains(event.relatedTarget)) resumeAutoplay();
    });
    section.addEventListener('touchstart', pauseAutoplay, { passive: true });
    section.addEventListener('touchend', resumeAutoplay, { passive: true });
    section.addEventListener('touchcancel', resumeAutoplay, { passive: true });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') resumeAutoplay();
        else pauseAutoplay();
    });
    updateControls();
    scheduleAutoAdvance();
}

document.addEventListener('DOMContentLoaded', initializeHomePopular);

function initializeHomeReviews() {
    const reviewsSection = document.getElementById('homeReviews');
    const reviewsGrid = document.getElementById('homeReviewsGrid');
    const reviewsDots = document.getElementById('homeReviewsDots');
    const previousButton = document.getElementById('homeReviewsPrev');
    const nextButton = document.getElementById('homeReviewsNext');

    if (!reviewsSection || !reviewsGrid || !reviewsDots || !Array.isArray(window.products)) return;

    const latestReviews = window.products
        .flatMap(product => {
            const reviews = typeof getUniqueProductReviews === 'function'
                ? getUniqueProductReviews(product.reviews)
                : product.reviews || [];

            return reviews.map(review => ({ ...review, product }));
        })
        .filter(review => review.date && !review.isDemo)
        .sort((firstReview, secondReview) => new Date(secondReview.date) - new Date(firstReview.date))
        .slice(0, 6);

    if (latestReviews.length === 0) return;

    reviewsGrid.innerHTML = latestReviews.map(review => {
        const stars = Array.from({ length: 5 }, (_, index) =>
            `<i class="bi ${index < review.rating ? 'bi-star-fill' : 'bi-star'}"></i>`
        ).join('');

        const date = new Date(review.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return `
            <article class="home-review-slide">
                <div class="home-review-card">
                    ${review.isDemo ? `<span class="badge bg-secondary mb-2">${isEnglishPage() ? 'Sample Review' : 'Демонстрационный отзыв'}</span>` : ''}
                    <div class="home-review-meta">
                        <strong>${review.author}</strong>
                        <time datetime="${review.date}">${date}</time>
                    </div>
                    <div class="home-review-rating" aria-label="${isEnglishPage() ? `Rated ${review.rating} out of 5` : `Оценка ${review.rating} из 5`}">
                        ${stars}
                    </div>
                    <p class="home-review-text">${review.text}</p>
                    <a class="home-review-product" href="#" onclick="openProduct(${review.product.id}); return false;">
                        ${getHomeProductName(review.product)}
                        <i class="bi bi-arrow-up-right"></i>
                    </a>
                </div>
            </article>
        `;
    }).join('');

    reviewsDots.innerHTML = latestReviews.map((review, index) => `
        <button class="home-reviews-dot${index === 0 ? ' is-active' : ''}" type="button"
            aria-label="${isEnglishPage() ? `Show review ${index + 1}` : `Показать отзыв ${index + 1}`}" data-review-index="${index}"></button>
    `).join('');

    let activeReviewIndex = 0;
    let autoplayTimer;

    const updateCarousel = index => {
        activeReviewIndex = (index + latestReviews.length) % latestReviews.length;
        reviewsGrid.style.transform = `translateX(-${activeReviewIndex * 100}%)`;
        reviewsDots.querySelectorAll('.home-reviews-dot').forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === activeReviewIndex);
        });
    };

    const startAutoplay = () => {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => updateCarousel(activeReviewIndex + 1), 4500);
    };

    previousButton?.addEventListener('click', () => {
        updateCarousel(activeReviewIndex - 1);
        startAutoplay();
    });

    nextButton?.addEventListener('click', () => {
        updateCarousel(activeReviewIndex + 1);
        startAutoplay();
    });

    reviewsDots.querySelectorAll('.home-reviews-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            updateCarousel(Number(dot.dataset.reviewIndex));
            startAutoplay();
        });
    });

    const carousel = reviewsSection.querySelector('.home-reviews-carousel');
    carousel?.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    carousel?.addEventListener('mouseleave', startAutoplay);
    carousel?.addEventListener('focusin', () => clearInterval(autoplayTimer));
    carousel?.addEventListener('focusout', event => {
        if (!carousel.contains(event.relatedTarget)) startAutoplay();
    });

    startAutoplay();

    reviewsSection.hidden = false;
}

document.addEventListener('DOMContentLoaded', initializeHomeReviews);

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutToRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);

function initializeClearInputs() {

    const inputWrappers = document.querySelectorAll('.input-wrapper');

    inputWrappers.forEach(wrapper => {
        const input = wrapper.querySelector('input');
        const clearBtn = wrapper.querySelector('.clear-input-btn');

        if (!input || !clearBtn) return;

        const toggleClearButton = () => {
            if (input.value.trim() !== '') {
                clearBtn.classList.add('show');
            } else {
                clearBtn.classList.remove('show');
            }
        };

        input.addEventListener('input', toggleClearButton);
        input.addEventListener('focus', toggleClearButton);

        clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.classList.remove('show');
            input.focus();

            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
        });

        toggleClearButton();
    });
}

initializeClearInputs();

function openFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    const content = document.getElementById('favoritesContent');

    if (modal && content) {
        renderFavorites();
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

function closeFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    const content = document.getElementById('cartContent');

    if (modal && content) {
        renderCart();
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const content = document.getElementById('favoritesContent');

    if (!content) return;

    if (favorites.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-heart text-muted"></i>
                <p>Your favorites list is empty</p>
                <small class="text-muted">Save products here so you can find them later.</small>
            </div>
        `;
        return;
    }

    const isProductPage = window.location.pathname.includes('/products/');
    const imageBasePath = isProductPage ? '../' : '';
    const placeholderPath = isProductPage ? '../images/placeholder.svg' : 'images/placeholder.svg';

    content.innerHTML = favorites.map(product => {

        const title = getHomeProductName(product, true);
        let image = product.image || 'images/placeholder.svg';

        if (isProductPage && !image.startsWith('../') && !image.startsWith('http')) {
            image = '../' + image;
        }

        const category = getCategoryName(product.category, true);
        const price = formatPrice(product.price);

        return `
            <div class="modal-product-item" onclick="openProduct(${product.id})" style="cursor: pointer;">
                <img src="${image}" alt="${title}" class="modal-product-image" onerror="this.src='${placeholderPath}'">
                <div class="modal-product-info">
                    <div class="modal-product-category">${category}</div>
                    <div class="modal-product-title">${title}</div>
                    <div class="modal-product-price">${price}</div>
                </div>
                <div class="modal-product-actions">
                    <button class="remove-btn" onclick="event.stopPropagation(); removeFromFavorites('${product.id}')">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const content = document.getElementById('cartContent');
    const totalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.btn-checkout');

    if (!content) {
        return;
    }

    if (cart.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-cart text-muted"></i>
                <p>Your cart is empty</p>
                <small class="text-muted">Add products to your cart to get started.</small>
            </div>
        `;
        if (totalElement) totalElement.textContent = '$0';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    const groupedCart = cart.reduce((acc, item) => {
        const itemId = String(item.id);
        if (acc[itemId]) {
            acc[itemId].quantity += 1;
        } else {
            acc[itemId] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    const cartItems = Object.values(groupedCart);

    const isProductPage = window.location.pathname.includes('/products/');
    const placeholderPath = isProductPage ? '../images/placeholder.svg' : 'images/placeholder.svg';

    content.innerHTML = cartItems.map(product => {

        const title = getHomeProductName(product, true);
        let image = product.image || 'images/placeholder.svg';

        if (isProductPage && !image.startsWith('../') && !image.startsWith('http')) {
            image = '../' + image;
        }

        const category = getCategoryName(product.category, true);
        const price = formatPrice(product.price);

        return `
            <div class="modal-product-item" onclick="openProduct(${product.id})" style="cursor: pointer;">
                <img src="${image}" alt="${title}" class="modal-product-image" onerror="this.src='${placeholderPath}'">
                <div class="modal-product-info">
                    <div class="modal-product-category">${category}</div>
                    <div class="modal-product-title">${title}</div>
                    <div class="modal-product-price">${price}</div>
                </div>
                <div class="modal-product-actions" onclick="event.stopPropagation();">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity('${product.id}', ${product.quantity - 1})" ${product.quantity <= 1 ? 'disabled' : ''}>
                            <i class="bi bi-dash"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${product.quantity}" min="1" max="99" 
                               onchange="updateCartQuantity('${product.id}', parseInt(this.value))" readonly>
                        <button class="quantity-btn" onclick="updateCartQuantity('${product.id}', ${product.quantity + 1})" ${product.quantity >= 99 ? 'disabled' : ''}>
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${product.id}')">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const total = cartItems.reduce((sum, item) => {
        let price = 0;
        if (typeof item.price === 'string') {
            price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        } else if (typeof item.price === 'number') {
            price = item.price;
        }
        return sum + (price * item.quantity);
    }, 0);

    if (totalElement) totalElement.textContent = `$${total.toLocaleString('en-US')}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
}

function openProduct(productId) {
    const productPages = {
        1: 'products/mastercard-ziraat.html',
        4: 'products/paypal-verified.html',
        29: 'products/paypal-balance-500-1000.html',
        30: 'products/paypal-balance-1000-plus.html',
        8: 'products/mastercard-kaspi-gold.html',
        9: 'products/oldubil-verified.html',
        10: 'products/wise-verified.html',
        11: 'products/pyypl-verified.html',
        16: 'products/revolut-verified.html',
        17: 'products/volet-advcash-verified.html',
        18: 'products/skrill-verified.html',
        242: 'products/payoneer-verified.html',
        243: 'products/paysera-verified.html',
        244: 'products/stripe-verified.html',
        19: 'products/bybit-verified.html',
        20: 'products/binance-verified.html',
        21: 'products/okx-verified.html',
        306: 'products/kraken-verified.html',
        307: 'products/crypto-com-wallet.html',
        308: 'products/bitget-wallet.html',
        309: 'products/gateio-wallet.html',
        317: 'products/n26-account.html',
        318: 'products/zelle-account.html',
        26: 'products/mexc-verified.html',
        305: 'products/bybit-account-with-balance.html',
        27: 'products/bingx-verified.html',
        28: 'products/coinbase-verified.html',
        304: 'products/coinbase-account-with-balance.html',
        24: 'products/mastercard-rbs.html',
        314: 'products/kaspi-bank-verified.html',
        315: 'products/halyk-bank-verified.html',
        316: 'products/google-adsense-account.html',
        210: 'products/visa-prepaid-virtual-100-eur.html',
        211: 'products/mastercard-prepaid-virtual-100-usd.html',
        224: 'products/ebay-account.html',
        225: 'products/amazon-account.html',
        226: 'products/wechat-account.html',
        228: 'products/github-copilot-pro.html',
        229: 'products/github-copilot-proplus.html',
        230: 'products/github-copilot-max.html',
        231: 'products/claude-ai-pro.html',
        232: 'products/claude-ai-max.html',
        233: 'products/fortnite-300-plus-skins.html',
        234: 'products/facebook-old-2016-2020.html',
        235: 'products/x-twitter-old-2008-2014.html',
        236: 'products/google-usa-gmail-2020-6-years-personal.html',
        237: 'products/reddit-karma-1000-global.html',
        240: 'products/blackhatworld-account.html',
        238: 'products/1xbet-account.html',
        239: 'products/stake-account.html',
        75: 'products/onlyf-account.html',
        303: 'products/binance-account-with-balance.html',
        301: 'products/vpn.html',
        302: 'products/proxy.html'
    };

    if (window.location.pathname.includes('catalog.html') &&
        typeof currentPage !== 'undefined' &&
        typeof currentCategory !== 'undefined' &&
        typeof currentSort !== 'undefined') {

        const catalogState = {
            page: currentPage,
            category: currentCategory,
            sort: currentSort,
            search: typeof currentSearchQuery !== 'undefined' ? currentSearchQuery : ''
        };

        sessionStorage.setItem('catalogState', JSON.stringify(catalogState));
    }

    const isProductPage = window.location.pathname.includes('/products/');
    const basePath = isProductPage ? '../' : '';

    const page = productPages[productId] || `products/product.html?id=${productId}`;
    window.location.href = basePath + page;
}

function getCategoryName(category, forceEnglish = false) {
    const categoryNames = {
        'debit': forceEnglish || isEnglishPage() ? 'Bank Cards' : 'Банковские карты',
        'prepaid': forceEnglish || isEnglishPage() ? 'Prepaid Cards' : 'Предоплаченные карты',
        'ewallet': forceEnglish || isEnglishPage() ? 'E-Wallets' : 'Электронные кошельки',
        'accounts': forceEnglish || isEnglishPage() ? 'Accounts' : 'Аккаунты',
        'vpnproxy': forceEnglish || isEnglishPage() ? 'Software' : 'Программы',
        'bankaccounts': forceEnglish || isEnglishPage() ? 'Bank Accounts' : 'Банковские аккаунты',
        'all': forceEnglish || isEnglishPage() ? 'All Products' : 'Все товары'
    };
    return categoryNames[category] || (forceEnglish || isEnglishPage() ? 'Products' : 'Товары');
}

function formatPrice(price) {
    if (typeof price === 'number') {
        return `$${price.toLocaleString('en-US')}`;
    } else if (typeof price === 'string') {

        if (price.includes('$')) {
            return price;
        }

        const numPrice = parseFloat(price);
        if (!isNaN(numPrice)) {
            return `$${numPrice.toLocaleString('en-US')}`;
        }
    }
    return '$0';
}

function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoritesBadge();
    updateGlobalFavoriteButtonState(productId, false);
    renderFavorites();
    showNotification('Removed from your favorites.');
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartBadge();
    renderCart();

    updateGlobalCartButtonState(productId, false);

    window.dispatchEvent(new CustomEvent('cartChanged', {
        detail: { productId: productId, action: 'removed', cart: cart }
    }));

    showNotification('Removed from your cart.');
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    if (newQuantity > 99) {
        newQuantity = 99;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const currentCount = cart.filter(item => String(item.id) === String(productId)).length;

    if (newQuantity > currentCount) {

        const product = cart.find(item => String(item.id) === String(productId));
        if (product) {
            for (let i = currentCount; i < newQuantity; i++) {
                cart.push({ ...product });
            }
        }
    } else if (newQuantity < currentCount) {

        const itemsToRemove = currentCount - newQuantity;
        for (let i = 0; i < itemsToRemove; i++) {
            const index = cart.findIndex(item => String(item.id) === String(productId));
            if (index !== -1) {
                cart.splice(index, 1);
            }
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();

    window.dispatchEvent(new CustomEvent('cartChanged', {
        detail: { productId: productId, action: 'updated', cart: cart }
    }));
}

document.addEventListener('click', function (event) {
    const favoritesModal = document.getElementById('favoritesModal');
    const cartModal = document.getElementById('cartModal');

    if (event.target === favoritesModal) {
        closeFavoritesModal();
    }

    if (event.target === cartModal) {
        closeCartModal();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeFavoritesModal();
        closeCartModal();
    }
});

function updateGlobalCartButtonState(productId, isInCart) {

    const buttons = document.querySelectorAll(`[onclick*="addToCart(${productId})"], [onclick*="addProductToCart(${productId})"]`);
    buttons.forEach(button => {
        if (isInCart) {
            button.classList.add('btn-added-to-cart');
            button.innerHTML = `<i class="bi bi-check-circle"></i> ${isEnglishPage() ? 'Added' : 'Добавлено'}`;
        } else {
            button.classList.remove('btn-added-to-cart');
            button.innerHTML = `<i class="bi bi-cart-plus"></i> ${isEnglishPage() ? 'Add to Cart' : 'В корзину'}`;
        }
    });
}

function updateGlobalFavoriteButtonState(productId, isFavorite) {
    const buttons = document.querySelectorAll(`[onclick*="toggleProductFavorite(${productId})"]`);

    buttons.forEach(button => {
        const icon = button.querySelector('i') || button.querySelector('.bi');

        if (isFavorite) {
            button.classList.add('btn-favorite-active');
            if (icon) {
                icon.className = 'bi bi-heart-fill';
            }
        } else {
            button.classList.remove('btn-favorite-active');
            if (icon) {
                icon.className = 'bi bi-heart';
            }
        }
    });
}

window.addEventListener('storage', function (e) {
    if (e.key === 'cart') {

        const cart = JSON.parse(e.newValue || '[]');
        const cartProductIds = cart.map(item => item.id);

        const allButtons = document.querySelectorAll('[onclick*="addToCart"], [onclick*="addProductCart"]');
        allButtons.forEach(button => {

            const onclickValue = button.getAttribute('onclick');
            const match = onclickValue.match(/addToCart\((\d+)\)|addProductToCart\((\d+)\)/);
            if (match) {
                const productId = parseInt(match[1] || match[2]);
                const isInCart = cartProductIds.includes(productId);
                updateGlobalCartButtonState(productId, isInCart);
            }
        });

        updateCartBadge();
    }

    if (e.key === 'favorites') {
        const favorites = JSON.parse(e.newValue || '[]');
        const favoriteProductIds = favorites.map(item => String(item.id));

        const allFavoriteButtons = document.querySelectorAll('[onclick*="toggleProductFavorite"]');
        allFavoriteButtons.forEach(button => {
            const onclickValue = button.getAttribute('onclick');
            const match = onclickValue.match(/toggleProductFavorite\((\d+)\)/);
            if (match) {
                const productId = parseInt(match[1]);
                updateGlobalFavoriteButtonState(productId, favoriteProductIds.includes(String(productId)));
            }
        });

        updateFavoritesBadge();
    }
});

window.addEventListener('cartChanged', function (e) {
    const { productId, action, cart } = e.detail;

    const isInCart = action === 'added' || cart.some(item => item.id === productId);
    updateGlobalCartButtonState(productId, isInCart);
});

document.addEventListener('DOMContentLoaded', function () {
    const checkoutButtons = document.querySelectorAll('.btn-checkout');

    checkoutButtons.forEach(button => {
        button.addEventListener('click', function (e) {

            if (!this.disabled) {

                closeCartModal();

                const path = window.location.pathname.includes('/products/') ? '../checkout.html' : 'checkout.html';
                window.location.href = path;
            }
        });
    });
});

function initializeReviewValidation() {
    let originalReviewDialogMarkup = null;

    document.addEventListener('click', function (event) {
        const submitButton = event.target.closest('#submitReview');
        if (!submitButton) return;

        const reviewForm = document.getElementById('reviewForm');
        if (!reviewForm) return;
        const firstName = document.getElementById('reviewFirstName');
        const reviewText = document.getElementById('reviewText');
        const reviewRating = document.getElementById('reviewRating');
        const ratingGroup = reviewForm.querySelector('.star-rating');
        const invalidFields = [];

        [firstName, reviewText].forEach(field => {
            if (field && !field.value.trim()) {
                field.classList.add('review-field-invalid');
                field.setAttribute('aria-invalid', 'true');
                invalidFields.push(field);
            }
        });

        if (ratingGroup && (!reviewRating || !reviewRating.value)) {
            ratingGroup.classList.add('review-rating-invalid');
            invalidFields.push(ratingGroup);
        }

        const existingMessage = reviewForm.querySelector('.review-validation-message');
        if (invalidFields.length === 0) {
            existingMessage?.remove();

            event.preventDefault();
            event.stopImmediatePropagation();

            const reviewModalElement = document.getElementById('reviewModal');
            const reviewDialog = reviewModalElement?.querySelector('.modal-dialog');
            const successDialog = document.querySelector('#reviewSuccessModal .modal-dialog');
            if (!reviewDialog || !successDialog) return;

            originalReviewDialogMarkup ??= reviewDialog.innerHTML;
            reviewDialog.innerHTML = successDialog.innerHTML;
            reviewModalElement.classList.add('review-success-state');
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        const message = existingMessage || document.createElement('div');
        message.className = 'review-validation-message';
        message.setAttribute('role', 'alert');
        message.textContent = 'Please complete the required fields and select a rating.';
        if (!existingMessage) reviewForm.append(message);
        invalidFields[0].focus({ preventScroll: true });
    }, true);

    document.addEventListener('input', function (event) {
        if (!event.target.matches('#reviewFirstName, #reviewText')) return;
        if (event.target.value.trim()) {
            event.target.classList.remove('review-field-invalid');
            event.target.removeAttribute('aria-invalid');
        }
    });

    document.addEventListener('click', function (event) {
        const star = event.target.closest('.star-rating .star');
        if (!star) return;

        const ratingGroup = star.closest('.star-rating');
        const stars = [...ratingGroup.querySelectorAll('.star')];
        const rating = stars.indexOf(star) + 1;
        const ratingInput = document.getElementById('reviewRating');

        if (ratingInput) ratingInput.value = rating;
        stars.forEach((item, index) => {
            item.classList.toggle('active', index < rating);
            item.classList.toggle('bi-star-fill', index < rating);
            item.classList.toggle('bi-star', index >= rating);
        });
        ratingGroup.classList.remove('review-rating-invalid');
    });

    document.getElementById('reviewModal')?.addEventListener('hidden.bs.modal', function () {
        const reviewForm = document.getElementById('reviewForm');
        reviewForm?.querySelectorAll('.review-field-invalid').forEach(field => {
            field.classList.remove('review-field-invalid');
            field.removeAttribute('aria-invalid');
        });
        reviewForm?.querySelector('.review-rating-invalid')?.classList.remove('review-rating-invalid');
        reviewForm?.querySelector('.review-validation-message')?.remove();

        const reviewDialog = this.querySelector('.modal-dialog');
        if (originalReviewDialogMarkup && reviewDialog) {
            reviewDialog.innerHTML = originalReviewDialogMarkup;
            this.classList.remove('review-success-state');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReviewValidation);
} else {
    initializeReviewValidation();
}

document.addEventListener('click', function (event) {
    const button = event.target.closest('.product-actions .btn-primary.btn-added-to-cart');
    if (!button) return;

    const onclickValue = button.getAttribute('onclick') || '';
    const match = onclickValue.match(/addProductToCart\((\d+)\)/);
    if (!match) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    removeFromCart(parseInt(match[1], 10));
}, true);

document.addEventListener('click', function (event) {
    const favoriteButton = event.target.closest(
        '.product-actions .btn-favorite-toggle, .product-card .btn-favorite-toggle'
    );
    if (!favoriteButton) return;

    setTimeout(() => favoriteButton.blur(), 0);
}, true);

function initializeProductActionNotifications() {
    const originalNotify = window.showNotification;
    if (typeof originalNotify !== 'function') return;

    function wrapAction(name, getMessage) {
        const originalAction = window[name];
        if (typeof originalAction !== 'function' || originalAction.__notificationsWrapped) return;

        const wrappedAction = function (productId) {
            const beforeCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const beforeFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            let notificationShown = false;

            window.showNotification = function (...args) {
                notificationShown = true;
                return originalNotify(...args);
            };

            try {
                originalAction.call(this, productId);
            } finally {
                window.showNotification = originalNotify;
            }

            const afterCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const afterFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const message = getMessage({
                productId,
                beforeCart,
                afterCart,
                beforeFavorites,
                afterFavorites
            });

            if (!notificationShown && message) {
                originalNotify(message.text, message.type);
            }
        };

        wrappedAction.__notificationsWrapped = true;
        window[name] = wrappedAction;
    }

    wrapAction('addProductToCart', ({ productId, beforeCart, afterCart }) => {
        const wasInCart = beforeCart.some(item => String(item.id) === String(productId));
        const isInCart = afterCart.some(item => String(item.id) === String(productId));

        if (!wasInCart && isInCart) return { text: 'Added to your cart.' };
        if (wasInCart && isInCart) return { text: 'This product is already in your cart.', type: 'warning' };
        return null;
    });

    wrapAction('toggleProductFavorite', ({ productId, beforeFavorites, afterFavorites }) => {
        const wasFavorite = beforeFavorites.some(item => String(item.id) === String(productId));
        const isFavorite = afterFavorites.some(item => String(item.id) === String(productId));

        if (!wasFavorite && isFavorite) return { text: 'Added to your favorites.' };
        if (wasFavorite && !isFavorite) return { text: 'Removed from your favorites.' };
        return null;
    });

    wrapAction('addProductToFavorites', ({ productId, beforeFavorites, afterFavorites }) => {
        const wasFavorite = beforeFavorites.some(item => String(item.id) === String(productId));
        const isFavorite = afterFavorites.some(item => String(item.id) === String(productId));

        if (!wasFavorite && isFavorite) return { text: 'Added to your favorites.' };
        if (wasFavorite && isFavorite) return { text: 'This product is already in your favorites.', type: 'warning' };
        return null;
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProductActionNotifications);
} else {
    initializeProductActionNotifications();
}

function updateBreadcrumbsFromState() {
    const savedState = sessionStorage.getItem('catalogState');
    if (!savedState) return;

    try {
        const catalogState = JSON.parse(savedState);
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb .breadcrumb-item a');

        breadcrumbLinks.forEach(link => {
            if (link.href.includes('catalog.html')) {
                let catalogUrl = '../catalog.html';
                const params = new URLSearchParams();

                if (catalogState.category && catalogState.category !== 'all') {
                    params.set('category', catalogState.category);
                }
                if (catalogState.search && catalogState.search.trim() !== '') {
                    params.set('search', catalogState.search);
                }
                if (catalogState.page && catalogState.page > 1) {
                    params.set('page', catalogState.page);
                }

                if (params.toString()) {
                    catalogUrl += '?' + params.toString();
                }

                link.href = catalogUrl;
            }
        });
    } catch (e) {
    }
}