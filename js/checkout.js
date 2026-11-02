document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showEmptyCartNotice(document.documentElement.lang === 'en-US'
            ? 'Your cart is empty. Add products before checking out.'
            : 'Ваша корзина пуста. Добавьте товары для оформления заказа.');
        return;
    }

    loadOrderItems();
    updateCartBadge();
    initDeliveryMethodHandlers();
    initFormValidation();

    window.addEventListener('storage', function (e) {
        if (e.key === 'cart') {
            const updatedCart = JSON.parse(e.newValue || '[]');
            if (updatedCart.length === 0) {
                showEmptyCartNotice(document.documentElement.lang === 'en-US'
                    ? 'Your cart is empty. Redirecting to the catalog.'
                    : 'Корзина пуста. Перенаправляем в каталог.');
                return;
            }
            loadOrderItems();
            updateCartBadge();
        }
    });

    window.addEventListener('cartChanged', function () {
        const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (updatedCart.length === 0) {
            showEmptyCartNotice(document.documentElement.lang === 'en-US'
                ? 'Your cart is empty. Redirecting to the catalog.'
                : 'Корзина пуста. Перенаправляем в каталог.');
            return;
        }
        loadOrderItems();
        updateCartBadge();
    });
});

function showEmptyCartNotice(message) {
    if (document.querySelector('.checkout-cart-notice')) return;

    const notice = document.createElement('div');
    notice.className = 'alert alert-info checkout-cart-notice';
    notice.setAttribute('role', 'status');
    notice.innerHTML = `<i class="bi bi-cart-x me-2"></i>${message}`;
    document.body.appendChild(notice);

    setTimeout(() => {
        window.location.href = 'catalog.html';
    }, 1400);
}

function loadOrderItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsList = document.getElementById('orderItemsList');
    const orderTotal = document.getElementById('orderTotal');

    if (cart.length === 0) {
        orderItemsList.innerHTML = `<p class="text-muted">${document.documentElement.lang === 'en-US' ? 'Your cart is empty.' : 'Корзина пуста'}</p>`;
        orderTotal.textContent = '$0';
        return;
    }

    let html = '<div class="order-items">';
    let total = 0;

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

    cartItems.forEach(item => {
        let price = 0;
        if (typeof item.price === 'string') {
            price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        } else if (typeof item.price === 'number') {
            price = item.price;
        }

        if (price <= 0) return;

        const itemTotal = price * item.quantity;
        total += itemTotal;

        const itemName = document.documentElement.lang === 'en-US'
            ? getHomeProductName(item)
            : item.title || item.name || 'Товар';
        let image = item.image || 'images/placeholder.svg';

        html += `
            <div class="order-item mb-3" onclick="openProductFromCheckout(${item.id})" style="cursor: pointer;">
                <div class="d-flex align-items-center">
                    <img src="${image}" alt="${itemName}" class="order-item-image" onerror="this.src='images/placeholder.svg'">
                    <div class="flex-grow-1 ms-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="order-item-info">
                                <div class="order-item-name fw-medium mb-1">${itemName}</div>
                                <div class="order-item-price text-primary fw-bold">$${itemTotal.toLocaleString('en-US')}</div>
                            </div>
                            <div class="order-item-actions" onclick="event.stopPropagation();">
                                <div class="quantity-controls-checkout">
                                    <button class="quantity-btn-checkout" onclick="updateCheckoutQuantity('${item.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <span class="quantity-display">${item.quantity}</span>
                                    <button class="quantity-btn-checkout" onclick="updateCheckoutQuantity('${item.id}', ${item.quantity + 1})" ${item.quantity >= 99 ? 'disabled' : ''}>
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                                <button class="btn-remove-checkout" onclick="removeFromCheckout('${item.id}')">
                                    <i class="bi bi-trash"></i> ${document.documentElement.lang === 'en-US' ? 'Remove' : 'Удалить'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';

    orderItemsList.innerHTML = html;
    updateTotalPrice(total);
}

function updateTotalPrice(baseTotal) {
    const orderTotal = document.getElementById('orderTotal');
    const subtotalElement = document.getElementById('subtotal');
    const deliveryElement = document.getElementById('deliveryCost');

    if (subtotalElement) {
        subtotalElement.textContent = '$' + baseTotal.toLocaleString('en-US');
    }

    if (deliveryElement) {
        deliveryElement.textContent = '$0';
    }

    if (orderTotal) {
        orderTotal.textContent = '$' + baseTotal.toLocaleString('en-US');
    }
}

function updateCheckoutQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndices = [];
    cart.forEach((item, index) => {
        if (String(item.id) === String(productId)) {
            productIndices.push(index);
        }
    });

    const currentQuantity = productIndices.length;

    if (newQuantity > currentQuantity) {

        const itemToAdd = cart.find(item => String(item.id) === String(productId));
        if (itemToAdd) {
            for (let i = 0; i < (newQuantity - currentQuantity); i++) {
                cart.push({ ...itemToAdd });
            }
        }
    } else if (newQuantity < currentQuantity) {

        const itemsToRemove = currentQuantity - newQuantity;
        for (let i = 0; i < itemsToRemove; i++) {
            const indexToRemove = productIndices.pop();
            cart.splice(indexToRemove, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    loadOrderItems();

    updateCartBadge();

    window.dispatchEvent(new Event('storage'));
}

function openProductFromCheckout(productId) {
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

    const page = productPages[productId];
    if (page) {
        window.location.href = page;
    }
}

function removeFromCheckout(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => String(item.id) !== String(productId));

    localStorage.setItem('cart', JSON.stringify(cart));

    if (cart.length === 0) {
        showEmptyCartNotice(document.documentElement.lang === 'en-US'
            ? 'Your cart is empty. Redirecting to the catalog.'
            : 'Корзина пуста. Перенаправляем в каталог.');
        return;
    }

    loadOrderItems();

    updateCartBadge();

    window.dispatchEvent(new Event('storage'));
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;

    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = cartCount;

        const badge = element.closest('.badge');
        if (badge) {
            badge.style.display = cartCount > 0 ? 'inline-block' : 'none';
        }
    });
}

function initDeliveryMethodHandlers() {
    const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
    const deliveryAddressPanel = document.getElementById('deliveryAddressPanel');
    const deliveryAddressColumn = document.getElementById('deliveryAddressColumn');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const firstNameLabel = firstNameInput.previousElementSibling;
    const lastNameLabel = lastNameInput.previousElementSibling;

    const firstNameContainer = firstNameInput.closest('.mb-3');
    const lastNameContainer = lastNameInput.closest('.mb-3');

    const isMobile = () => window.innerWidth < 992;

    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', function () {

            const cart = JSON.parse(localStorage.getItem('cart')) || [];

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

            let baseTotal = 0;
            cartItems.forEach(item => {
                let price = 0;
                if (typeof item.price === 'string') {
                    price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
                } else if (typeof item.price === 'number') {
                    price = item.price;
                }
                baseTotal += price * item.quantity;
            });
            updateTotalPrice(baseTotal);

            if (this.value === 'virtual') {

                deliveryAddressPanel.style.display = 'none';

                firstNameInput.removeAttribute('required');
                lastNameInput.removeAttribute('required');

                const firstNameRequiredMark = firstNameLabel.querySelector('.required-mark');
                const lastNameRequiredMark = lastNameLabel.querySelector('.required-mark');

                if (firstNameRequiredMark) {
                    firstNameRequiredMark.style.display = 'none';
                }
                if (lastNameRequiredMark) {
                    lastNameRequiredMark.style.display = 'none';
                }

                if (isMobile()) {
                    deliveryAddressColumn.style.display = 'none';
                }

                const addressFields = deliveryAddressPanel.querySelectorAll('input[required], select[required], textarea[required]');
                addressFields.forEach(field => {
                    field.removeAttribute('required');
                    field.classList.remove('is-valid', 'is-invalid');
                });
            } else {

                deliveryAddressPanel.style.display = 'block';
                deliveryAddressColumn.style.display = 'block';

                document.getElementById('country').setAttribute('required', 'required');
                document.getElementById('region').setAttribute('required', 'required');
                document.getElementById('city').setAttribute('required', 'required');
                document.getElementById('address').setAttribute('required', 'required');

                firstNameInput.setAttribute('required', 'required');
                lastNameInput.setAttribute('required', 'required');

                const firstNameRequiredMark = firstNameLabel.querySelector('.required-mark');
                const lastNameRequiredMark = lastNameLabel.querySelector('.required-mark');

                if (firstNameRequiredMark) {
                    firstNameRequiredMark.style.display = 'inline';
                }
                if (lastNameRequiredMark) {
                    lastNameRequiredMark.style.display = 'inline';
                }
            }
        });
    });
}

function initFormValidation() {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('invalid', function (event) {
        const field = event.target;
        if (!field.validity.valueMissing) return;

        const feedback = field.closest('.mb-3')?.querySelector('.invalid-feedback');
        if (feedback) {
            field.setCustomValidity(feedback.textContent.trim());
        }
    }, true);

    form.addEventListener('input', function (event) {
        event.target.setCustomValidity('');
    });

    form.addEventListener('change', function (event) {
        event.target.setCustomValidity('');
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;

        let isValid = true;

        const contactInfo = document.getElementById('contactInfo');
        contactInfo.value = contactInfo.value.trim();
        if (!contactInfo.value) {
            contactInfo.classList.add('is-invalid');
            contactInfo.classList.remove('is-valid');
            isValid = false;
        } else {
            contactInfo.classList.remove('is-invalid');
            contactInfo.classList.add('is-valid');
        }

        if (deliveryMethod !== 'virtual') {
            const fields = [
                document.getElementById('firstName'),
                document.getElementById('lastName'),
                document.getElementById('country'),
                document.getElementById('region'),
                document.getElementById('city'),
                document.getElementById('address')
            ];

            fields.forEach(field => {
                const value = field.tagName === 'SELECT' ? field.value : field.value.trim();
                field.classList.toggle('is-invalid', !value);
                field.classList.toggle('is-valid', Boolean(value));
                if (!value) isValid = false;
            });
        }

        if (isValid) {

            processOrder();
        } else {

            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        form.classList.add('was-validated');
    });
}

let currentOrderTotalUsd = 0;
let selectedCrypto = null;
let cryptoRates = {};
let lastRateUpdate = null;
let rateUpdateInterval = null;
let ratesLoaded = false;
const cryptoRateCacheKey = 'cardgem-crypto-usd-rates-v1';
const cryptoRateCacheMaxAge = 5 * 60 * 1000;
const cryptoCoinIds = {
    USDT: 'tether',
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDC: 'usd-coin',
    BNB: 'binancecoin',
    XMR: 'monero',
    SOL: 'solana',
    TON: 'the-open-network'
};

function processOrder() {
    const contactInfo = document.getElementById('contactInfo').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;

    const orderData = {
        contactInfo: contactInfo,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        items: JSON.parse(localStorage.getItem('cart')) || []
    };

    if (deliveryMethod !== 'virtual') {
        orderData.deliveryAddress = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            country: document.getElementById('country').value,
            region: document.getElementById('region').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            address: document.getElementById('address').value
        };
    }

    const groupedCart = orderData.items.reduce((acc, item) => {
        const itemId = String(item.id);
        if (acc[itemId]) {
            acc[itemId].quantity += 1;
        } else {
            acc[itemId] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    const cartItems = Object.values(groupedCart);

    let total = 0;
    cartItems.forEach(item => {
        let price = 0;
        if (typeof item.price === 'string') {
            price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        } else if (typeof item.price === 'number') {
            price = item.price;
        }
        total += price * item.quantity;
    });

    const totalUsd = total;
    orderData.total = totalUsd;
    orderData.currency = 'USD';
    currentOrderTotalUsd = totalUsd;

    localStorage.setItem('currentOrder', JSON.stringify(orderData));

    showCryptoPaymentPanel();
}

function showCryptoPaymentPanel() {

    document.getElementById('checkoutForm').style.display = 'none';
    document.querySelector('.checkout-summary-panel').style.display = 'none';
    document.querySelector('.main-bg h2').style.display = 'none';

    const cryptoPanel = document.getElementById('cryptoPaymentPanel');
    cryptoPanel.style.display = 'block';

    document.getElementById('paymentTotalUsd').textContent = currentOrderTotalUsd.toLocaleString('en-US');

    loadCachedCryptoRates();
    fetchCryptoRates();
    startAutoRateUpdate();

    initCryptoOptions();

    window.scrollTo(0, 0);
}

async function fetchCryptoRates(retryCount = 0) {
    const maxRetries = 3;

    try {
        const rates = await fetchCoinGeckoRates();
        setCryptoRates(rates, 'CoinGecko');

    } catch (error) {
        console.warn('CoinGecko rates are unavailable; trying Binance.', error);
        try {
            const rates = await fetchBinanceRates();
            setCryptoRates(rates, 'Binance');
        } catch (fallbackError) {
            console.error('Could not load cryptocurrency exchange rates.', fallbackError);

            if (retryCount < maxRetries) {
                updateRateStatusDisplay();
                setTimeout(() => fetchCryptoRates(retryCount + 1), 5000 * (retryCount + 1));
            } else {
                showRateError(fallbackError);
            }
        }
    }
}

async function fetchCoinGeckoRates() {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(cryptoCoinIds).join(',')}&vs_currencies=usd`, {
        cache: 'no-cache',
        signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) throw new Error(`CoinGecko returned status ${response.status}.`);

    const data = await response.json();
    const rates = Object.fromEntries(
        Object.entries(cryptoCoinIds).map(([symbol, coinId]) => [symbol, data[coinId]?.usd])
    );
    validateCryptoRates(rates);
    return rates;
}

async function fetchBinanceRates() {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XMRUSDT', 'SOLUSDT', 'TONUSDT'];
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbols=${encodeURIComponent(JSON.stringify(symbols))}`, {
        cache: 'no-cache',
        signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) throw new Error(`Binance returned status ${response.status}.`);

    const data = await response.json();
    const prices = Object.fromEntries(data.map(ticker => [ticker.symbol, Number(ticker.price)]));
    const rates = {
        USDT: 1,
        USDC: 1,
        BTC: prices.BTCUSDT,
        ETH: prices.ETHUSDT,
        BNB: prices.BNBUSDT,
        XMR: prices.XMRUSDT,
        SOL: prices.SOLUSDT,
        TON: prices.TONUSDT
    };
    validateCryptoRates(rates);
    return rates;
}

function validateCryptoRates(rates) {
    const missingRates = Object.keys(cryptoCoinIds)
        .filter(symbol => !Number.isFinite(rates[symbol]) || rates[symbol] <= 0);
    if (missingRates.length > 0) {
        throw new Error(`Missing cryptocurrency rates: ${missingRates.join(', ')}.`);
    }
}

function setCryptoRates(rates, provider) {
    cryptoRates = rates;
    lastRateUpdate = new Date();
    ratesLoaded = true;

    try {
        localStorage.setItem(cryptoRateCacheKey, JSON.stringify({
            rates,
            updatedAt: lastRateUpdate.getTime(),
            provider
        }));
    } catch (error) {
        console.error('Could not save cryptocurrency rates to local storage.', error);
    }

    updateRateStatusDisplay(provider);
    enableCheckoutIfReady();
    updateSelectedCryptoAmount();
}

function loadCachedCryptoRates() {
    try {
        const cached = JSON.parse(localStorage.getItem(cryptoRateCacheKey) || 'null');
        const cacheAge = Date.now() - cached?.updatedAt;
        if (!Number.isFinite(cacheAge) || cacheAge < 0 || cacheAge > cryptoRateCacheMaxAge) return;

        validateCryptoRates(cached.rates);
        cryptoRates = cached.rates;
        lastRateUpdate = new Date(cached.updatedAt);
        ratesLoaded = true;
        updateRateStatusDisplay(cached.provider, true);
        enableCheckoutIfReady();
    } catch (error) {
        console.error('Could not read cached cryptocurrency rates.', error);
    }
}

function updateRateStatusDisplay(provider, usingCache = false) {
    const statusElement = document.getElementById('rateStatus');
    if (!statusElement) return;

    if (ratesLoaded && lastRateUpdate) {
        const timeStr = lastRateUpdate.toLocaleTimeString('en-US');
        const sourceText = provider ? ` via ${provider}` : '';
        const cacheText = usingCache ? ' (recently cached; refreshing)' : '';
        statusElement.innerHTML = `
            <div class="alert alert-success d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2"></i>
                <span>Exchange rates updated at ${timeStr}${sourceText}${cacheText}.</span>
            </div>
        `;
    } else {
        statusElement.innerHTML = `
            <div class="alert alert-warning d-flex align-items-center">
                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                <span>Loading current exchange rates...</span>
            </div>
        `;
    }
}

function showRateError(error) {
    const statusElement = document.getElementById('rateStatus');
    if (!statusElement) return;

    statusElement.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div class="flex-grow-1">
                <span>Could not load cryptocurrency rates. ${error?.message || 'Please try again.'}</span>
                <button class="btn btn-sm btn-outline-danger ms-2" onclick="fetchCryptoRates(0)">
                    <i class="bi bi-arrow-clockwise me-1"></i>Retry
                </button>
            </div>
        </div>
    `;
}

function enableCheckoutIfReady() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        if (ratesLoaded) {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = 'Place order';
        } else {
            checkoutBtn.disabled = true;
            checkoutBtn.innerHTML = 'Loading rates...';
        }
    }
}

function startAutoRateUpdate() {
    if (rateUpdateInterval) {
        clearInterval(rateUpdateInterval);
    }

    rateUpdateInterval = setInterval(() => {
        fetchCryptoRates();
    }, 300000);
}

window.addEventListener('beforeunload', () => {
    if (rateUpdateInterval) {
        clearInterval(rateUpdateInterval);
    }
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && ratesLoaded) {
        if (lastRateUpdate && (new Date() - lastRateUpdate) > 600000) {
            fetchCryptoRates();
        }
    }
});

function initCryptoOptions() {
    const cryptoOptions = document.querySelectorAll('.crypto-option');

    cryptoOptions.forEach(option => {
        option.addEventListener('click', function () {

            cryptoOptions.forEach(opt => opt.classList.remove('selected'));

            this.classList.add('selected');

            const crypto = this.getAttribute('data-crypto');
            const cryptoName = this.getAttribute('data-name');

            if (!ratesLoaded) {
                alert('Cryptocurrency rates are still loading. Please wait.');
                return;
            }

            selectedCrypto = crypto;

            const rate = cryptoRates[crypto];
            if (!rate) {
                alert(`The exchange rate for ${cryptoName} is unavailable. Please try again.`);
                return;
            }

            const cryptoAmount = formatCryptoAmount(currentOrderTotalUsd, rate, crypto);
            const displayCrypto = crypto === 'TON' ? 'GRAM' : crypto;

            document.getElementById('paymentTotalCrypto').textContent = cryptoAmount;
            document.getElementById('cryptoSymbol').textContent = displayCrypto;

            showPaymentDetails(crypto, cryptoAmount, displayCrypto);
        });
    });
}

function updateSelectedCryptoAmount() {
    if (!selectedCrypto || !ratesLoaded) return;

    const rate = cryptoRates[selectedCrypto];
    if (!rate) return;

    const amount = formatCryptoAmount(currentOrderTotalUsd, rate, selectedCrypto);
    const displayCrypto = selectedCrypto === 'TON' ? 'GRAM' : selectedCrypto;
    document.getElementById('paymentTotalCrypto').textContent = amount;
    document.getElementById('cryptoSymbol').textContent = displayCrypto;
    document.getElementById('exactAmount').textContent = `${amount} ${displayCrypto}`;
}

function formatCryptoAmount(total, rate, crypto) {
    const precision = crypto === 'USDC' ? 6 : crypto === 'SOL' ? 9 : 8;
    return (total / rate).toFixed(precision);
}

function showPaymentDetails(crypto, amount, displayCrypto = crypto) {
    const paymentDetails = document.getElementById('paymentDetails');
    paymentDetails.style.display = 'block';

    const walletAddress = generateWalletAddress(crypto);
    document.getElementById('walletAddress').value = walletAddress;

    document.getElementById('exactAmount').textContent = `${amount} ${displayCrypto}`;

    paymentDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateWalletAddress(crypto) {
    const addresses = {
        'USDT': 'TPp3mRsStFCJdaojWnyhqgrLk5fZ2L5vBP',
        'BTC': 'bc1q6xxz7altfp7y94t6lnpd5czh6qnwwedxkv2nwz',
        'ETH': '0x30AF09950530f339e9d58F6Ba6490c8Bf5043b13',
        'USDC': '0x30AF09950530f339e9d58F6Ba6490c8Bf5043b13',
        'BNB': '0x30AF09950530f339e9d58F6Ba6490c8Bf5043b13',
        'XMR': '86LWrERA2yFesLAmVk9Cy962wEZoCs5aLGecaiSGz7ss5fsNR19ewgud8iPq1vTWt1QR788ucbmbyjYviSB7yR9uVPXHfXq',
        'SOL': '288Dvs2DdKL9gbtyBZyLzRq6rfT6SVBwSX3iTsFDXNk5',
        'TON': 'UQBgmJ3e-OJyV65QV_vGR-kKrwJMXIOOwwqQN_GDA9rkSsel'
    };

    return addresses[crypto] || 'Address not available';
}

function copyWalletAddress() {
    const walletInput = document.getElementById('walletAddress');
    walletInput.select();
    walletInput.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');

        const btn = event.target.closest('button');
        const originalHTML = btn.innerHTML;
        const btnText = btn.querySelector('.copy-btn-text');

        if (btnText) {
            btn.innerHTML = '<i class="bi bi-check"></i> <span class="copy-btn-text">Copied!</span>';
        } else {
            btn.innerHTML = '<i class="bi bi-check"></i>';
        }

        btn.classList.add('btn-success');
        btn.classList.remove('btn-outline-primary');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-primary');
        }, 2000);
    } catch (err) {
    }
}

function confirmPayment() {
    if (!selectedCrypto) {
        alert('Please select a cryptocurrency.');
        return;
    }

    const orderData = JSON.parse(localStorage.getItem('currentOrder') || '{}');

    document.getElementById('cryptoPaymentPanel').style.display = 'none';

    showProcessingPanel(orderData);
}

function showProcessingPanel(orderData) {
    const processingPanel = document.getElementById('processingPanel');
    processingPanel.style.display = 'block';

    const orderNumber = Math.floor(Math.random() * 90000) + 10000;

    const processingTitle = document.getElementById('processingTitle');
    if (processingTitle) {
        processingTitle.textContent = `Order #${orderNumber} is being processed`;
    }

    const rate = cryptoRates[selectedCrypto];
    if (!rate) {
        return;
    }

    const cryptoAmount = formatCryptoAmount(currentOrderTotalUsd, rate, selectedCrypto);
    const displayCrypto = selectedCrypto === 'TON' ? 'GRAM' : selectedCrypto;

    document.getElementById('processingAmount').textContent = cryptoAmount;
    document.getElementById('processingCrypto').textContent = displayCrypto;
    document.getElementById('processingContact').textContent = orderData.contactInfo || 'Not provided';

    window.scrollTo(0, 0);

    localStorage.removeItem('cart');
    localStorage.removeItem('currentOrder');

    window.dispatchEvent(new Event('storage'));
}
