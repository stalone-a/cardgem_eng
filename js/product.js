let currentProduct = null;

function isEnglishProductPage() {
    return document.documentElement.lang === 'en-US';
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        loadProduct(parseInt(productId));
    } else {
        window.location.href = '../catalog.html';
    }

    updateCartBadge();
    updateFavoritesBadge();
});

function loadProduct(productId) {

    currentProduct = window.getProductById(productId);

    if (!currentProduct) {

        window.location.href = '../catalog.html';
        return;
    }

    const productName = isEnglishProductPage() && typeof getHomeProductName === 'function'
        ? getHomeProductName(currentProduct)
        : currentProduct.name;
    document.title = `${productName} - CardGem`;
    document.getElementById('productTitle').textContent = `${productName} - CardGem`;

    document.getElementById('breadcrumbProduct').textContent = productName;

    document.getElementById('productName').textContent = productName;
    document.getElementById('productPrice').textContent = `$${currentProduct.price.toLocaleString('en-US')}`;
    document.getElementById('productDescription').innerHTML = `
        <p>${currentProduct.description}</p>
        <div class="mt-4">
            <h6>${isEnglishProductPage() ? 'Key Details:' : 'Основные характеристики:'}</h6>
            <ul>
                <li>${isEnglishProductPage() ? 'Type' : 'Тип'}: ${getCategoryName(currentProduct.category)}</li>
                <li>${isEnglishProductPage() ? 'Status: Verified' : 'Статус: Верифицированный'}</li>
                <li>${isEnglishProductPage() ? 'Free replacement for covered issues' : 'Бесплатная замена при подтвержденной проблеме'}</li>
                <li>${isEnglishProductPage() ? 'Support: 24/7' : 'Поддержка: 24/7'}</li>
            </ul>
        </div>
    `;

    loadProductImages();

    loadProductReviews();

    document.getElementById('addToCartBtn').addEventListener('click', () => addProductToCart(currentProduct.id));
    document.getElementById('addToFavoritesBtn').addEventListener('click', () => addProductToFavorites(currentProduct.id));

    initializeProductCartButtonState(currentProduct.id);
}

function getCategoryName(category) {
    if (isEnglishProductPage()) {
        const englishNames = {
            debit: 'Bank Card',
            prepaid: 'Prepaid Card',
            ewallet: 'Digital Wallet',
            bankaccounts: 'Bank Account',
            accounts: 'Online Account',
            vpnproxy: 'Software'
        };
        return englishNames[category] || 'Product';
    }

    const names = {
        'debit': 'Дебетовая карта',
        'prepaid': 'Предоплаченная карта',
        'ewallet': 'Электронный кошелек'
    };
    return names[category] || 'Неизвестно';
}

function loadProductImages() {
    const imageContainer = document.getElementById('productImageContainer');

    const imageSrc = currentProduct.image || 'images/placeholder.svg';

    const imageElement = `
        <img src="../${imageSrc}" alt="${isEnglishProductPage() && typeof getHomeProductName === 'function' ? getHomeProductName(currentProduct) : currentProduct.name}" 
             class="product-image active"
             onerror="this.src='../images/placeholder.svg'">
    `;

    imageContainer.innerHTML = imageElement;
}

function loadProductReviews() {
    const reviewsContainer = document.getElementById('productReviews');
    const reviews = currentProduct.reviews || [];

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="text-center text-muted">
                <i class="bi bi-chat-dots fs-1 mb-3"></i>
                <p>${isEnglishProductPage() ? 'There are no reviews for this product yet.' : 'Пока нет отзывов об этом товаре.'}</p>
                <p>${isEnglishProductPage() ? 'Be the first to leave a review!' : 'Станьте первым, кто оставит отзыв!'}</p>
            </div>
        `;
        return;
    }

    const reviewsHTML = reviews.map(review => `
        <div class="review-item">
            ${review.isDemo ? `<span class="badge bg-secondary mb-2">${isEnglishProductPage() ? 'Sample Review' : 'Демонстрационный отзыв'}</span>` : ''}
            <div class="review-author">${review.author}</div>
            <div class="review-rating">
                ${generateStars(review.rating)}
                <span class="ms-2">${review.rating}/5</span>
            </div>
            <div class="review-text">${review.text}</div>
            <div class="review-date">${formatDate(review.date)}</div>
        </div>
    `).join('');

    reviewsContainer.innerHTML = reviewsHTML;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    return stars;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function addProductToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const isAlreadyInCart = cart.some(item => item.id === productId);

    if (isAlreadyInCart) {
        showNotification('This product is already in your cart.', 'warning');
        return;
    }

    cart.push(currentProduct);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartBadge();

    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.classList.add('btn-added-to-cart');
        addToCartBtn.innerHTML = `<i class="bi bi-check-circle"></i> ${isEnglishProductPage() ? 'Added' : 'Добавлено'}`;
    }

    window.dispatchEvent(new CustomEvent('cartChanged', {
        detail: { productId: productId, action: 'added', cart: cart }
    }));

    showNotification('Added to your cart.', 'success');
}

function addProductToFavorites(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.find(f => f.id === productId)) {
        showNotification('This product is already in your favorites.', 'warning');
        return;
    }

    favorites.push(currentProduct);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoritesBadge();

    showNotification('Added to your favorites.', 'success');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 250px;
        animation: slideInRight 0.3s ease;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;

    const icon = type === 'success' ? 'check-circle' :
        type === 'warning' ? 'exclamation-triangle' : 'info-circle';

    notification.innerHTML = `
        <i class="bi bi-${icon} me-2"></i>
        ${message}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.querySelector('.btn-cart .badge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

function updateFavoritesBadge() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const badge = document.querySelector('.btn-favorites .badge');
    if (badge) {
        badge.textContent = favorites.length;
    }
}

function initializeProductCartButtonState(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cart.some(item => item.id === productId);
    const addToCartBtn = document.getElementById('addToCartBtn');

    if (addToCartBtn && isInCart) {
        addToCartBtn.classList.add('btn-added-to-cart');
        addToCartBtn.innerHTML = `<i class="bi bi-check-circle"></i> ${isEnglishProductPage() ? 'Added' : 'Добавлено'}`;
    }
}

window.addEventListener('storage', function (e) {
    if (e.key === 'cart' && currentProduct) {
        initializeProductCartButtonState(currentProduct.id);
    }
});

window.addEventListener('cartChanged', function (e) {
    if (currentProduct && e.detail.productId === currentProduct.id) {
        initializeProductCartButtonState(currentProduct.id);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .breadcrumb-item a {
        color: var(--tg-theme-link);
    }
    
    .breadcrumb-item.active {
        color: var(--tg-theme-hint);
    }
`;
document.head.appendChild(style);