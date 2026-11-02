
function getCurrentSearchQuery() {
    return (typeof window !== 'undefined' && window.currentSearchQuery) ? window.currentSearchQuery : '';
}

const products = [
    {
        id: 1,
        name: "Mastercard Ziraat Card",
        price: 90,
        category: "debit",
        image: "images/products/mastercard-ziraat.webp",
        description: "Get a Turkish Mastercard Ziraat card for international transactions with fast delivery.",
        images: ["images/products/mastercard-ziraat.webp", "images/products/mastercard-ziraat2.webp"],
        reviews: [
            {
                "author": "Mason",
                "rating": 5,
                "text": "The card works without issues, and delivery was prompt.",
                "date": "2025-09-02"
            }
        ]
    },
    {
        id: 4,
        name: "Verified PayPal Account",
        price: 25,
        category: "ewallet",
        image: "images/products/paypal-verified.webp",
        description: "Get a verified PayPal account with full access and confirmed account details. Fast delivery.",
        images: ["images/products/paypal-verified.webp", "images/products/paypal-verified2.webp"],
        reviews: [
            {
                "author": "str0ka",
                "rating": 5,
                "text": "Excellent. The account has a transaction history and works great! Highly recommended.",
                "date": "2026-09-08"
            },
            {
                "author": "Xabi",
                "rating": 5,
                "text": "Great account! I got it for working with international clients, and everything works without issues. Verification is complete, the limits are high, delivery was quick, and the instructions were detailed. I recommend it!",
                "date": "2025-10-18"
            }
        ]
    },
    {
        id: 29,
        name: "PayPal Account with $500-$1,000 Balance",
        price: 30,
        category: "ewallet",
        image: "images/products/paypal-verified.webp",
        description: "Get a PayPal account with a $500-$1,000 balance and full email access. Includes fast delivery and full account access.",
        images: ["images/products/paypal-verified.webp", "images/products/paypal500.webp"],
        reviews: [
            {
                "author": "EtW",
                "rating": 5,
                "text": "I received my account within 15 minutes and withdrew the funds to my own account using the guide.",
                "date": "2026-10-25"
            },
            {
                "author": "FJKLsdf2",
                "rating": 5,
                "text": "Great deal.",
                "date": "2026-09-04"
            },
            {
                "author": "UGGYN",
                "rating": 5,
                "text": "After receiving the account, I transferred the funds to crypto through an exchange.",
                "date": "2026-07-08"
            }
        ]
    },
    {
        id: 30,
        name: "PayPal Account with $1,000+ Balance",
        price: 35,
        category: "ewallet",
        image: "images/products/paypal-verified.webp",
        description: "Get a PayPal account with a $1,000+ balance and full email access. Includes fast delivery and full account access.",
        images: ["images/products/paypal-verified.webp", "images/products/paypal1000.webp"],
        reviews: [
            {
                "author": "321",
                "rating": 5,
                "text": "Excellent service.",
                "date": "2026-09-19"
            },
            {
                "author": "Lucas",
                "rating": 5,
                "text": "I got an account with a balance of about $1,500 and withdrew it using the instructions. All good.",
                "date": "2026-08-24"
            }
        ]
    },

    {
        id: 8,
        name: "Mastercard Kaspi Gold Card",
        price: 85,
        category: "debit",
        image: "images/products/mastercard-kaspi-gold.webp",
        description: "Get a premium Kazakhstan Mastercard Kaspi Gold card with enhanced features and fast delivery.",
        images: ["images/products/mastercard-kaspi-gold.webp", "images/products/mastercard-kaspi-gold2.webp"],
        reviews: [
            {
                "author": "James T.",
                "rating": 5,
                "text": "High limits and fast transfers. A great card for international transactions.",
                "date": "2025-10-16"
            },
            {
                "author": "Arman",
                "rating": 5,
                "text": "I received the card quickly, and all the documents were in order. It continues to work without issues. I recommend it!",
                "date": "2025-06-22"
            }
        ]
    },
    {
        id: 9,
        name: "Verified OlduBil Account",
        price: 25,
        category: "ewallet",
        image: "images/products/oldubil-verified.webp",
        description: "Get a verified OlduBil account for this Turkish payment service. Verification is complete, with fast delivery.",
        images: ["images/products/oldubil-verified.webp", "images/products/oldubil-verified2.webp"],
        reviews: [
            {
                "author": "lake",
                "rating": 5,
                "text": "It went smoothly.",
                "date": "2026-06-28"
            }
        ]
    },
    {
        id: 10,
        name: "Verified Wise Account",
        price: 45,
        category: "ewallet",
        image: "images/products/wise-verified.webp",
        description: "Get a verified Wise (formerly TransferWise) account with full access and a multi-currency wallet for international transfers.",
        images: ["images/products/wise-verified.webp", "images/products/wise-verified2.webp"],
        reviews: [
            {
                "author": "Anry",
                "rating": 5,
                "text": "Great store. I have already purchased several accounts.",
                "date": "2026-09-07"
            },
            {
                "author": "228",
                "rating": 5,
                "text": "I use it for work with international partners. Transfers are instant, fees are low, and verification was complete with no additional checks. I am very satisfied!",
                "date": "2024-03-29"
            }
        ]
    },
    {
        id: 11,
        name: "Verified Pyypl Account",
        price: 40,
        category: "ewallet",
        image: "images/products/pyypl-verified.webp",
        description: "Get a verified Pyypl account for this Middle Eastern payment service. Verification is complete, with fast delivery.",
        images: ["images/products/pyypl-verified.webp", "images/products/pyypl-verified2.webp"],
        reviews: []
    },

    {
        id: 16,
        name: "Verified Revolut Account",
        price: 42,
        category: "ewallet",
        image: "images/products/revolut-verified.webp",
        description: "Get a verified Revolut account with full access to a European neobank, including a multi-currency wallet, virtual cards, and cryptocurrency features.",
        images: ["images/products/revolut-verified.webp", "images/products/revolut-verified2.webp"],
        reviews: [
            {
                "author": "Rakasin",
                "rating": 5,
                "text": "The seller is awesome, support was excellent, and they helped me get set up. Thanks so much!",
                "date": "2026-07-12"
            }
        ]
    },
    {
        id: 17,
        name: "Verified Volet (Advcash) Account",
        price: 42,
        category: "ewallet",
        image: "images/products/volet-advcash-verified.webp",
        description: "Get a verified Volet (Advcash) account for this electronic payment service. Verification is complete, with fast delivery.",
        images: ["images/products/volet-advcash-verified.webp", "images/products/volet-advcash-verified2.webp"],
        reviews: [
            {
                "author": "Isak",
                "rating": 5,
                "text": "I needed an extra account for business payments. The first incoming transfer arrived instantly, so it is doing what I need.",
                "date": "2026-07-10"
            }
        ]
    },
    {
        id: 18,
        name: "Verified Skrill Account",
        price: 42,
        category: "ewallet",
        image: "images/products/skrill-verified.webp",
        description: "Get a verified Skrill e-wallet account with full access and confirmed details for international transfers.",
        images: ["images/products/skrill-verified.webp", "images/products/skrill-verified2.webp"],
        reviews: [
            {
                "author": "Same",
                "rating": 5,
                "text": "I tested incoming and outgoing transfers. Everything is there, and the account is not blocked.",
                "date": "2026-10-08"
            }
        ]
    },
    {
        id: 242,
        name: "Verified Payoneer Account",
        price: 45,
        category: "ewallet",
        image: "images/products/payoneer.webp",
        description: "Get a verified Payoneer account for international payments and receiving transfers.",
        images: ["images/products/payoneer.webp"],
        reviews: [
            {
                "author": "Noah",
                "rating": 5,
                "text": "All good, everything is there.",
                "date": "2026-10-04"
            }
        ]
    },
    {
        id: 317,
        name: "Verified N26 Account",
        price: 35,
        category: "ewallet",
        image: "images/products/n26.webp",
        description: "Get a verified N26 account with full access, ready to use for digital banking and payments.",
        images: ["images/products/n26.webp"],
        reviews: [
            {
                "author": "Elliot",
                "rating": 5,
                "text": "I received the instructions and details without delay.",
                "date": "2026-10-12"
            }
        ]
    },
    {
        id: 318,
        name: "Verified Zelle Account",
        price: 45,
        category: "ewallet",
        image: "images/products/zelle.webp",
        description: "Zelle is a handy way to send money using your cell banking app or online banking account. Whether it’s saving you an experience at the ATM or removing the guesswork of divvying up the lunch tab, Zelle is a quick, safe, and smooth way to send and request money. Funds are dispatched directly to the recipient’s account in a matter of minutes, and all you need is the recipient’s email address or a U.S. Cellular smartphone number. If you buy Zelle account from us. You get a confirmed account with those functions. 1. Access in the USA: You can use the account and get or give money everywhere within the United States. 2. Numerous companions: Zelle has many primary banks as their partners. You can transfer money within mins in those banks. You also can be given direct deposit, pay on Samsung pay, apple pay, and so on everywhere. 3. Acceptable in numerous sectors: When you’re a businessman or someone who works for the government, you can use Zelle. 4. Mobile App: Zelle is a carrier that permits you to apply it from anywhere. There is an app that lets you check for your account and ship money to others. You also can receive money and break up cash with this app.",
        images: ["images/products/zelle.webp"],
        reviews: [
            {
                "author": "ruby",
                "rating": 5,
                "text": "I logged into the account without any issues. The included instructions were detailed and easy to follow.",
                "date": "2026-11-02"
            }
        ]
    },
    {
        id: 243,
        name: "Verified Paysera Account",
        price: 35,
        category: "ewallet",
        image: "images/products/paysera.webp",
        description: "Get a verified Paysera account with full access, ready to use for online payments and international transfers.",
        images: ["images/products/paysera.webp"],
        reviews: [
            {
                "author": "Dashman",
                "rating": 5,
                "text": "The account is 11 days old and still active.",
                "date": "2026-08-09"
            }
        ]
    },
    {
        id: 244,
        name: "Verified Stripe Account",
        price: 30,
        category: "ewallet",
        image: "images/products/stripe.webp",
        description: "Get a verified Stripe account with full access, ready to use for accepting and processing online payments.",
        images: ["images/products/stripe.webp"],
        reviews: [
            {
                "author": "santa",
                "rating": 5,
                "text": "Everything is running smoothly. I just hope the account does not get blocked anytime soon.",
                "date": "2026-06-27"
            }
        ]
    },
    {
        id: 19,
        name: "Verified Bybit Account",
        price: 30,
        category: "ewallet",
        image: "images/products/bybit-verified.webp",
        description: "Get a verified Bybit account, ready for cryptocurrency trading. Verification is complete, with fast delivery.",
        images: ["images/products/bybit-verified.webp", "images/products/bybit-verified2.webp"],
        reviews: [
            {
                "author": "@@@",
                "rating": 5,
                "text": "The account stayed active after I signed in, which is a good start. I will keep an eye on it.",
                "date": "2026-09-07"
            },
            {
                "author": "wasd",
                "rating": 5,
                "text": "The account is seasoned, just what I needed for P2P.",
                "date": "2026-05-31"
            },
            {
                "author": "hew",
                "rating": 5,
                "text": "I bought a Bybit account here. It was verified a little over two months ago, and everything seems to be working.",
                "date": "2025-11-22"
            }
        ]
    },
    {
        id: 305,
        name: "Bybit Account with $500-$1,000 Balance",
        price: 35,
        category: "ewallet",
        image: "images/products/bybit-verified.webp",
        description: "Get a Bybit account with a $500-$1,000 balance and full account access. Fast delivery.",
        images: ["images/products/bybit-verified.webp", "images/products/bybit500.webp"],
        reviews: [
            {
                "author": "velvet",
                "rating": 5,
                "text": "I withdrew the balance using the instructions. Thanks!",
                "date": "2026-10-23"
            },
            {
                "author": "sim",
                "rating": 5,
                "text": "I had no issues signing in.",
                "date": "2026-06-15"
            }
        ]
    },
    {
        id: 20,
        name: "Verified Binance Account",
        price: 30,
        category: "ewallet",
        image: "images/products/binance-verified.webp",
        description: "Shop a verified Binance account with full access. KYC is complete and the account is ready for crypto trading. High limits and a secure transaction.",
        images: ["images/products/binance-verified.webp", "images/products/binance-verified2.webp"],
        reviews: [
            {
                "author": "Breeze",
                "rating": 5,
                "text": "Received it. Everything's great! The phone number and documents are verified. 5 out of 5!",
                "date": "2026-09-21"
            },
            {
                "author": "Caleb",
                "rating": 5,
                "text": "The account works perfectly, and all the documents are included.",
                "date": "2026-02-09"
            }
        ]
    },
    {
        id: 303,
        name: "Binance Account with $1,000+ Crypto Balance | Full Access",  
        price: 39,
        category: "ewallet",
        image: "images/products/binance-verified.webp",
        description: "Get a Binance account with a $1,000+ crypto balance and full access. Includes account access, balance, and step-by-step instructions.",
        images: ["images/products/binance-verified.webp", "images/products/binance1000.webp"],
        reviews: [
            {
                "author": "cometa",
                "rating": 5,
                "text": "Everything was great and very fast. The account works!",
                "date": "2026-10-11"
            },
            {
                "author": "boy",
                "rating": 5,
                "text": "The account arrived right away, and the promised balance was there. I withdrew it without any issues.",
                "date": "2026-07-05"
            }
        ]
    },
    {
        id: 21,
        name: "Verified OKX Account",
        price: 35,
        category: "ewallet",
        image: "images/products/okx-verified.webp",
        description: "Get a verified OKX account, ready for cryptocurrency trading. Verification is complete, with fast delivery.",
        images: ["images/products/okx-verified.webp", "images/products/okx-verified2.webp"],
        reviews: [
            {
                "author": "Fufek",
                "rating": 5,
                "text": "A high-quality verified account. I am trading with it and have had no issues.",
                "date": "2026-01-18"
            }
        ]
    },
    {
        id: 26,
        name: "Verified MEXC Account",
        price: 32,
        category: "ewallet",
        image: "images/products/mexc-verified.webp",
        description: "Get a verified MEXC account, ready for cryptocurrency trading. Verification is complete, with fast delivery.",
        images: ["images/products/mexc-verified.webp", "images/products/mexc-verified2.webp"],
        reviews: [
            {
                "author": "Nathan",
                "rating": 5,
                "text": "The details arrived quickly, and a proxy for signing in was included, which was helpful.",
                "date": "2025-12-14"
            },
            {
                "author": "Niki",
                "rating": 5,
                "text": "I bought a batch of accounts, and they are working fine so far.",
                "date": "2026-01-12"
            }
        ]
    },
    {
        id: 27,
        name: "Verified BingX Account",
        price: 32,
        category: "ewallet",
        image: "images/products/bingx-verified.webp",
        description: "Get a verified BingX account, ready for trading and copy trading. Verification is complete, with fast and private delivery.",
        images: ["images/products/bingx-verified.webp", "images/products/bingx-verified2.webp"],
        reviews: []
    },
    {
        id: 28,
        name: "Verified Coinbase Account",
        price: 30,
        category: "ewallet",
        image: "images/products/coinbase-verified.webp",
        description: "Get a verified Coinbase account with full access, ready to use on a leading cryptocurrency platform. Fast delivery.",
        images: ["images/products/coinbase-verified.webp", "images/products/coinbase-verified2.webp"],
        reviews: []
    },
    {
        id: 304,
        name: "Coinbase Account with $1,200-$2,000 Balance",
        price: 35,
        category: "ewallet",
        image: "images/products/coinbase-verified.webp",
        description: "Get a Coinbase account with a $1,200-$2,000 balance and full account access. Fast delivery.",
        images: ["images/products/coinbase-verified.webp", "images/products/coinbase1200.webp"],
        reviews: [
            {
                "author": "fjo3w",
                "rating": 5,
                "text": "I had no issues, and the instructions are very detailed. I think anyone can follow them.",
                "date": "2026-05-09"
            }
        ]
    },
    {
        id: 306,
        name: "Verified Kraken Account",
        price: 28,
        category: "ewallet",
        image: "images/products/kraken.webp",
        description: "Get a verified Kraken account for cryptocurrency services, with fast delivery and support.",
        images: ["images/products/kraken.webp"],
        reviews: [
            {
                "author": "Samuel",
                "rating": 5,
                "text": "I kept the account for a few days before writing this review. No resets or unusual changes; it is still active.",
                "date": "2026-10-03"
            },
            {
                "author": "iman",
                "rating": 5,
                "text": "Received and used successfully! I will be back.",
                "date": "2026-07-23"
            }
        ]
    },
    {
        id: 307,
        name: "Verified Crypto.com Account",
        price: 30,
        category: "ewallet",
        image: "images/products/crypto.com.webp",
        description: "Get full access to a verified Crypto.com account. Use the platform to exchange and trade cryptocurrencies and manage digital assets.",
        images: ["images/products/crypto.com.webp"],
        reviews: [
            {
                "author": "Leo",
                "rating": 5,
                "text": "I bought one to try it out. The account is active and has been working for about three days. I hope it stays that way.",
                "date": "2026-09-20"
            },
            {
                "author": "124",
                "rating": 5,
                "text": "I tested it with a small amount first. The wallet did not flag anything. No surprises so far; it is ready to use.",
                "date": "2026-08-30"
            }
        ]
    },
    {
        id: 308,
        name: "Verified Bitget Account",
        price: 28,
        category: "ewallet",
        image: "images/products/bitget.webp",
        description: "Get full access to a verified Bitget account. Bitget is a popular platform for exchanging and trading digital assets.",
        images: ["images/products/bitget.webp"],
        reviews: []
    },
    {
        id: 309,
        name: "Verified Gate.io Account",
        price: 28,
        category: "ewallet",
        image: "images/products/gateio.webp",
        description: "Get full access to a verified Gate.io account. Use the platform to exchange and trade cryptocurrencies and manage digital assets.",
        images: ["images/products/gateio.webp"],
        reviews: [
            {
                "author": "Thomas",
                "rating": 5,
                "text": "I got access and immediately set everything up the way I wanted (email, 2FA). Everything is great.",
                "date": "2026-05-18"
            }
        ]
    },
    {
        id: 24,
        name: "Mastercard Royal Bank of Scotland",
        price: 140,
        category: "debit",
        image: "images/products/mastercard-rbs-card.webp",
        description: "Get a premium UK Mastercard from Royal Bank of Scotland with reliable delivery.",
        images: ["images/products/mastercard-rbs-card.webp", "images/products/mastercard-rbs-card2.webp"],
        reviews: [
            {
                "author": "EvanL",
                "rating": 5,
                "text": "I have been using it in the EU without restrictions for several weeks, and it has been working well so far.",
                "date": "2025-08-18"
            }
        ]
    },
    {
        id: 314,
        name: "Verified Kaspi Bank Account",
        price: 30,
        category: "bankaccounts",
        image: "images/products/kaspi.webp",
        description: "Get full access to a verified Kaspi Bank account for money transfers, ready to use.",
        images: ["images/products/kaspi.webp"],
        reviews: [
            {
                "author": "Alamaley123",
                "rating": 5,
                "text": "The best in the market. Everything was handled quickly. Thank you.",
                "date": "2026-10-09"
            },
            {
                "author": "Timur",
                "rating": 5,
                "text": "I have been using it for a couple of days. No issues, and the verification is complete.",
                "date": "2026-07-02"
            }
        ]
    },
    {
        id: 315,
        name: "Verified Halyk Bank Account",
        price: 30,
        category: "bankaccounts",
        image: "images/products/halyk.webp",
        description: "Get full access to a verified Halyk Bank account for money transfers, ready to use.",
        images: ["images/products/halyk.webp"],
        reviews: [
            {
                "author": "Nurlan",
                "rating": 5,
                "text": "It arrived quickly. The instructions clearly explained what to do.",
                "date": "2026-09-22"
            }
        ]
    },
    {
        id: 210,
        name: "Virtual Visa Prepaid Card | EUR 100 (EU)",
        price: 25,
        category: "prepaid",
        image: "images/products/visa-prepaid-virtual-100-eur.webp",
        description: "Get a European virtual Visa prepaid card with a EUR 100 balance, ready for use and delivered quickly.",
        images: ["images/products/visa-prepaid-virtual-100-eur.webp", "images/products/visa-prepaid-virtual-100-eur2.webp"],
        reviews: []
    },
    {
        id: 211,
        name: "Virtual Mastercard Prepaid Card | $100 (US)",
        price: 25,
        category: "prepaid",
        image: "images/products/mastercard-prepaid-virtual-100-usd.webp",
        description: "Get a ready-to-use US virtual Mastercard prepaid card with a $100 balance for online purchases.",
        images: ["images/products/mastercard-prepaid-virtual-100-usd.webp", "images/products/mastercard-prepaid-virtual-100-usd2.webp"],
        reviews: [
            {
                "author": "Freddie",
                "rating": 5,
                "text": "I purchased a virtual card for subscriptions. I received the card details within an hour of payment. Activation was easy, and payments are going through successfully.",
                "date": "2026-06-19"
            }
        ]
    },

    {
        id: 224,
        name: "Verified eBay Account",
        price: 15,
        category: "accounts",
        image: "images/products/ebay-account.webp",
        description: "Get a verified eBay account, ready for buying and selling. Fast worldwide delivery.",
        images: ["images/products/ebay-account.webp", "images/products/ebay-account2.webp"],
        reviews: [
            {
                "author": "Tyagach",
                "rating": 5,
                "text": "I bought an eBay account for international shopping. It arrived right away, and I signed in without any issues. The account was clean, and I have already made my first purchase.",
                "date": "2026-02-05"
            }
        ]
    },
    {
        id: 225,
        name: "Amazon Account",
        price: 20,
        category: "accounts",
        image: "images/products/amazon-account.webp",
        description: "Shop with a verified Amazon account, ready for purchases worldwide and linked to a dedicated email. Private checkout and fast delivery.",
        images: ["images/products/amazon-account.webp", "images/products/amazon-account2.webp"],
        reviews: [
            {
                "author": "Stan",
                "rating": 5,
                "text": "I bought an Amazon account to order electronics. It arrived quickly, and the account works without restrictions.",
                "date": "2026-03-19"
            }
        ]
    },
    {
        id: 226,
        name: "Verified WeChat Account",
        price: 7,
        category: "accounts",
        image: "images/products/wechat-account.webp",
        description: "Get a verified WeChat account, ready for messaging and services, with SMS verification completed.",
        images: ["images/products/wechat-account.webp", "images/products/wechat-account2.webp"],
        reviews: [
            {
                "author": "pvp",
                "rating": 5,
                "text": "Everything else is blocked, so we are using this high-quality Chinese product now.",
                "date": "2026-06-10"
            }
        ]
    },
    {
        id: 316,
        name: "Google AdSense Account",
        price: 40,
        category: "accounts",
        image: "images/products/adsense.webp",
        description: "Get a Google AdSense account ready to connect to YouTube channel monetization.",
        images: ["images/products/adsense.webp"],
        reviews: [
            {
                "author": "Poly",
                "rating": 5,
                "text": "I took a long time choosing where to order AdSense because prices elsewhere were sky-high. The price here was reasonable, and everything went quickly without issues or delays.",
                "date": "2026-10-01"
            },
            {
                "author": "Micha",
                "rating": 5,
                "text": "Everything went smoothly.",
                "date": "2026-09-16"
            },
            {
                "author": "atom",
                "rating": 5,
                "text": "The service was delivered in full. AdSense was successfully connected to the channel, and monetization is working. The seller was responsive and honest. I recommend them.",
                "date": "2026-08-11"
            }
        ]
    },
    {
        id: 228,
        name: "GitHub Copilot Pro Account | 1 Month",
        price: 10,
        category: "accounts",
        image: "images/products/cop.webp",
        description: "Get a GitHub Copilot Pro account for one month with personal access to premium AI coding assistance. Fast online delivery.",
        images: ["images/products/cop.webp", "images/products/cop2.webp"],
        reviews: [
            {
                "author": "AI",
                "rating": 5,
                "text": "I keep coming back to this seller. Delivery is instant!",
                "date": "2026-06-20"
            },
            {
                "author": "Ralf",
                "rating": 5,
                "text": "Everything worked out, and the instructions were simple and clear. I recommend it.",
                "date": "2026-06-20"
            },
            {
                "author": "jlk",
                "rating": 5,
                "text": "It works.",
                "date": "2026-06-20"
            }
        ]
    },
    {
        id: 229,
        name: "GitHub Copilot Pro+ Account | 1 Month",
        price: 20,
        category: "accounts",
        image: "images/products/cop.webp",
        description: "Get a GitHub Copilot Pro+ account for one month with personal access to advanced AI coding assistance. Fast online delivery.",
        images: ["images/products/cop.webp", "images/products/cop2.webp"],
        reviews: [
            {
                "author": "Jersy",
                "rating": 5,
                "text": "Great seller. Everything was fast. The account is a week old and running smoothly.",
                "date": "2026-07-04"
            }
        ]
    },
    {
        id: 230,
        name: "GitHub Copilot Max Account | 1 Month",
        price: 50,
        category: "accounts",
        image: "images/products/cop.webp",
        description: "Get a GitHub Copilot Max account for one month with personal access to advanced AI coding assistance and priority access to new models.",
        images: ["images/products/cop.webp", "images/products/cop2.webp"],
        reviews: [
            {
                "author": "4124",
                "rating": 5,
                "text": "I got Copilot Max, and the difference from Pro+ is huge. Access to the new models works, delivery was instant, and everything went smoothly!",
                "date": "2026-07-05"
            }
        ]
    },
    {
        id: 231,
        name: "Claude AI Pro Account | 1 Month",
        price: 10,
        category: "accounts",
        image: "images/products/claude.webp",
        description: "Get a Claude AI Pro account for one month with access to Claude Opus, Claude Sonnet, and Claude Code. Includes 5x usage limits and a context window of up to 200K tokens.",
        images: ["images/products/claude.webp", "images/products/claude2.webp"],
        reviews: [
            {
                "author": "Den",
                "rating": 5,
                "text": "This is my second purchase. No issues so far. Everything is great!",
                "date": "2026-07-06"
            },
            {
                "author": "ARCHIBALD",
                "rating": 5,
                "text": "Everything is great. It was delivered within a minute.",
                "date": "2026-07-06"
            }
        ]
    },
    {
        id: 232,
        name: "Claude AI Max Account | 1 Month",
        price: 45,
        category: "accounts",
        image: "images/products/claude.webp",
        description: "Get a Claude AI Max account for one month, with 5x or 20x more usage, priority access during peak times, and early access to advanced features.",
        images: ["images/products/claude.webp", "images/products/claude2.webp"],
        reviews: [
            {
                "author": "kit1978",
                "rating": 5,
                "text": "I have been working with this seller since April. Everything has been reliable, fast, and smooth. I will keep working with them.",
                "date": "2026-07-07"
            }
        ]
    },
    {
        id: 233,
        name: "Fortnite Account with 300+ Skins",
        price: 10,
        category: "accounts",
        image: "images/products/fort.webp",
        description: "Get a Fortnite account with 300+ skins and full email access, including Battle Pass and event skins. Fast online delivery.",
        images: ["images/products/fort.webp", "images/products/fort2.webp"],
        reviews: [
            {
                "author": "Praimfreak",
                "rating": 5,
                "text": "Honestly, it is just awesome.",
                "date": "2026-04-08"
            }
        ]
    },
    {
        id: 234,
        name: "Facebook Account | 2016-2020",
        price: 5,
        category: "accounts",
        image: "images/products/face.webp",
        description: "Get a Facebook account with email access. Credentials are provided in Username:Password:MailEmail:MailPassword format, with a setup guide included.",
        images: ["images/products/face.webp", "images/products/face2.webp"],
        reviews: [
            {
                "author": "RoBert14",
                "rating": 5,
                "text": "Phew, everything worked out. I was able to sign in.",
                "date": "2026-07-08"
            },
            {
                "author": "SodaNe",
                "rating": 5,
                "text": "I received all the details quickly and signed in without any issues.",
                "date": "2026-07-08"
            },
            {
                "author": "Raijin10",
                "rating": 5,
                "text": "The instructions were clear, and the account was clean. Thanks to the seller!",
                "date": "2026-07-08"
            }
        ]
    },
    {
        id: 235,
        name: "X (Twitter) Account | 2008-2014",
        price: 6,
        category: "accounts",
        image: "images/products/x.webp",
        description: "Get an X (Twitter) account with email access. Credentials are provided in TwitterUsername:Password:MailEmail:MailPassword format.",
        images: ["images/products/x.webp", "images/products/x2.webp"],
        reviews: [
            {
                "author": "Felix",
                "rating": 5,
                "text": "The account was old, email access was included, and the format matched the description exactly. Everything works.",
                "date": "2026-07-14"
            }
        ]
    },
    {
        id: 236,
        name: "Personal Google Gmail Account",
        price: 5,
        category: "accounts",
        image: "images/products/gm.webp",
        description: "Get a personal Google Gmail account with ongoing access, two-factor authentication, and a guide to secure use.",
        images: ["images/products/gm.webp", "images/products/gm2.webp"],
        reviews: [
            {
                "author": "Yandeks",
                "rating": 5,
                "text": "I am happy with the purchase.",
                "date": "2026-07-08"
            },
            {
                "author": "Don",
                "rating": 5,
                "text": "The instructions were clear, and I got access right away. Thanks!",
                "date": "2026-07-08"
            }
        ]
    },
    {
        id: 237,
        name: "Reddit Account | 1,000 Karma, Global",
        price: 9,
        category: "accounts",
        image: "images/products/reddit.webp",
        description: "Get a global Reddit account with 1,000 karma, a confirmed email, a clean history, and credentials in username:password:ip format.",
        images: ["images/products/reddit.webp", "images/products/reddit2.webp"],
        reviews: [
            {
                "author": "Fffggfccffd3",
                "rating": 5,
                "text": "Ideal for promotion and redirecting traffic.",
                "date": "2026-07-08"
            }
        ]
    },
    {
        id: 240,
        name: "BlackHatWorld Account",
        price: 25,
        category: "accounts",
        image: "images/products/blackhatworld.webp",
        description: "BlackHatWorld (BHW) is an online community for SEO, web design, copywriting, and social media marketing, with black hat and white hat marketing sections. Includes an established account, access details, and 24/7 customer service.",
        images: ["images/products/blackhatworld.webp"],
        reviews: [
            {
                author: "Sss",
                rating: 5,
                text: "Everything works perfectly! The account is in good condition, login was smooth, and all features are accessible. No issues so far. Very satisfied with the purchase!",
                date: "2026-11-12",
                isDemo: true
            }
        ]
    },
    {
        id: 301,
        name: "NordVPN Premium Complete Account | 1 Year",
        price: 15,
        category: "vpnproxy",
        image: "images/products/vpn.webp",
        description: "Get a NordVPN Premium Complete account for one year, with 6,400+ servers in 111 countries, AES-256 encryption, and Threat Protection.",
        images: ["images/products/vpn.webp", "images/products/vpn2.webp"],
        reviews: [
            {
                "author": "135ew51",
                "rating": 5,
                "text": "It works.",
                "date": "2026-03-15"
            }
        ]
    },
    {
        id: 302,
        name: "Dedicated Proxy Service",
        price: 5,
        category: "vpnproxy",
        image: "images/products/proxy.webp",
        description: "Get dedicated IPv4 or IPv6 proxies with fast, reliable connections for legitimate privacy and network access needs.",
        images: ["images/products/proxy.webp", "images/products/proxy2.webp"],
        reviews: []
    },
    {
        id: 75,
        name: "OnlyFans Account with $400-$800 Balance",
        price: 20,
        category: "accounts",
        image: "images/products/onlyf.webp",
        description: "Get an OnlyFans account with a $400-$800 balance and full access. The balance can be used for subscriptions and tips.",
        images: ["images/products/onlyf.webp", "images/products/onlyf2.webp"],
        reviews: [
            {
                "author": "Tom",
                "rating": 5,
                "text": "Great, this is my second purchase.",
                "date": "2026-06-20"
            }
        ]
    },
    {
        id: 238,
        name: "1Xbet Account",
        price: 20,
        category: "accounts",
        page: "1xbet-account.html",
        image: "images/products/1xbet.webp",
        description: "1Xbet account with a $5,481–$6,090 negative balance. Includes account access and verification documents.",
        images: ["images/products/1xbet.webp", "images/products/1xbet2.webp"],
        reviews: [
            {
                "author": "Mark",
                "rating": 5,
                "text": "I bought several verified accounts and received them. Everything was great. I definitely recommend this shop.",
                "date": "2026-08-09"
            },
            {
                "author": "Ali",
                "rating": 5,
                "text": "Recommended. Everything was great.",
                "date": "2026-07-02"
            }
        ]
    },
    {
        id: 239,
        name: "Verified Stake Account",
        price: 20,
        category: "accounts",
        page: "stake-account.html",
        image: "images/products/stake.webp",
        description: "Get a verified Stake account with verification documents and full account access.",
        images: ["images/products/stake.webp", "images/products/stake2.webp"],
        reviews: [
            {
                "author": "Nate",
                "rating": 5,
                "text": "The seller is great. Everything was fast, clear, and hassle-free.",
                "date": "2026-07-11"
            }
        ]
    }
];

function getUniqueProductReviews(reviews) {
    if (!Array.isArray(reviews)) return [];

    const seenReviews = new Set();
    return reviews.filter(review => {
        const reviewKey = JSON.stringify([
            review.author,
            review.rating,
            review.text,
            review.date
        ]);

        if (seenReviews.has(reviewKey)) return false;

        seenReviews.add(reviewKey);
        return true;
    });
}

products.forEach(product => {
    product.reviews = getUniqueProductReviews(product.reviews);
});

function migrateStoredPricesToUsd() {
    const migrationKey = 'cardgem-product-prices-v3';
    if (localStorage.getItem(migrationKey)) return;

    const productById = new Map(products.map(product => [String(product.id), product]));
    const removedProductIds = new Set(['2', '25', '102', '201', '202', '205', '310', '311', '312', '313', '3', '7', '12', '213', '212', '220', '221', '227', '214', '215', '216', '217', '218', '219']);
    ['cart', 'favorites'].forEach(storageKey => {
        const storedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const migratedItems = storedItems.map(item => {
            const currentProduct = productById.get(String(item.id));
            return currentProduct ? { ...item, price: currentProduct.price } : item;
        }).filter(item => !removedProductIds.has(String(item.id)));
        localStorage.setItem(storageKey, JSON.stringify(migratedItems));
    });

    localStorage.setItem(migrationKey, '1');
}

migrateStoredPricesToUsd();

let currentCategory = 'all';
let currentSort = 'default';
let currentPage = 1;
let itemsPerPage = 20;
let loadMoreMode = false;


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const savedState = sessionStorage.getItem('catalogState');
    let savedScrollPosition = null;
    let savedLoadMoreMode = false;
    let savedPage = 1;

    // Проверяем, есть ли URL-параметры (приоритет над savedState)
    const hasUrlCategory = urlParams.has('category');
    const hasUrlSearch = urlParams.has('search');
    const hasUrlPage = urlParams.has('page');

    if (savedState && !hasUrlCategory && !hasUrlSearch && !hasUrlPage) {
        try {
            const catalogState = JSON.parse(savedState);

            if (window.location.pathname.includes('catalog.html') || window.location.pathname.endsWith('/')) {
                savedPage = catalogState.page || 1;
                currentCategory = catalogState.category || 'all';
                currentSort = catalogState.sort || 'default';
                savedScrollPosition = catalogState.scrollPosition || null;
                savedLoadMoreMode = catalogState.loadMoreMode || false;

                if (catalogState.search && typeof window.setSearchQuery === 'function') {
                    window.setSearchQuery(catalogState.search);
                }

                const url = new URL(window.location);
                if (catalogState.category && catalogState.category !== 'all') {
                    url.searchParams.set('category', catalogState.category);
                }
                if (catalogState.search) {
                    url.searchParams.set('search', catalogState.search);
                }
                if (catalogState.page && catalogState.page > 1) {
                    url.searchParams.set('page', catalogState.page);
                }

                window.history.replaceState({}, '', url);

                const sortSelect = document.getElementById('sortSelect');
                if (sortSelect) {
                    sortSelect.value = currentSort;
                }

                sessionStorage.removeItem('catalogState');
            }
        } catch (e) {
        }
    } else {
        // Очищаем savedState если есть URL параметры
        if (savedState && (hasUrlCategory || hasUrlSearch || hasUrlPage)) {
            sessionStorage.removeItem('catalogState');
        }

        let urlCategory = urlParams.get('category') || 'all';

        const categoryMapping = {
            'debit-cards': 'debit',
            'prepaid-cards': 'prepaid',
            'e-wallets': 'ewallet',
            'debit': 'debit',
            'prepaid': 'prepaid',
            'ewallet': 'ewallet',
            'accounts': 'accounts',
            'bankaccounts': 'bankaccounts',
            'all': 'all'
        };

        currentCategory = categoryMapping[urlCategory] || urlCategory;

        const urlPage = parseInt(urlParams.get('page')) || 1;
        currentPage = urlPage;

        const urlSearch = urlParams.get('search');
        if (urlSearch && typeof window.setSearchQuery === 'function') {
            window.setSearchQuery(urlSearch);

            const searchInputs = [
                document.getElementById('catalogDesktopSearchInput'),
                document.getElementById('catalogMobileSearchInput')
            ];
            searchInputs.forEach(input => {
                if (input) {
                    input.value = urlSearch;
                }
            });
        }
    }

    const sortSelect = document.getElementById('sortSelect');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    if (savedLoadMoreMode && savedPage > 1) {
        loadMoreMode = true;
        currentPage = 1;
        loadProducts();
        for (let i = 2; i <= savedPage; i++) {
            currentPage = i;
            loadProducts();
        }
    } else {
        currentPage = savedPage;
        loadProducts();
    }

    updateCategoryTitle();

    updateCartBadge();
    updateFavoritesBadge();

    initializeCartButtonStates();

    if (savedScrollPosition !== null) {
        setTimeout(() => {
            window.scrollTo(0, savedScrollPosition);
        }, 100);
    }
});


function updateCategoryTitle() {
    const categoryTitle = document.getElementById('categoryTitle');

    if (!categoryTitle) return;

    const titles = {
        'bankaccounts': document.documentElement.lang === 'en-US' ? 'Bank Accounts' : 'Банковские аккаунты',
        'all': document.documentElement.lang === 'en-US' ? 'All Products' : 'Все товары',
        'debit': document.documentElement.lang === 'en-US' ? 'Bank Cards' : 'Банковские карты',
        'prepaid': document.documentElement.lang === 'en-US' ? 'Prepaid Cards' : 'Предоплаченные карты',
        'ewallet': document.documentElement.lang === 'en-US' ? 'E-Wallets' : 'Электронные кошельки',
        'accounts': document.documentElement.lang === 'en-US' ? 'Accounts' : 'Аккаунты',
        'vpnproxy': document.documentElement.lang === 'en-US' ? 'Software' : 'Программы'
    };

    const isEnglishPage = document.documentElement.lang === 'en-US';
    const categoryName = titles[currentCategory] || (isEnglishPage ? 'All Products' : 'Все товары');

    const currentSearchQuery = getCurrentSearchQuery();
    if (currentSearchQuery && currentSearchQuery.trim() !== '') {
        if (currentCategory === 'all') {
            categoryTitle.textContent = isEnglishPage
                ? `Search results for "${currentSearchQuery}"`
                : `Поиск: "${currentSearchQuery}"`;
        } else {
            categoryTitle.textContent = isEnglishPage
                ? `Search in ${categoryName} for "${currentSearchQuery}"`
                : `Поиск в "${categoryName}": "${currentSearchQuery}"`;
        }
    } else {

        categoryTitle.textContent = categoryName;
    }
}


function handleSortChange(event) {
    currentSort = event.target.value;
    currentPage = 1;
    loadProducts();
}


function filterProducts() {
    let filteredProducts = products;

    const currentSearchQuery = getCurrentSearchQuery();
    if (currentSearchQuery && currentSearchQuery.trim() !== '') {
        const searchFunction = (typeof window !== 'undefined' && window.searchProducts) ? window.searchProducts : null;
        if (searchFunction) {
            filteredProducts = searchFunction(currentSearchQuery);
        }
    }


    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }

    return filteredProducts;
}


function sortProducts(products) {
    const sorted = [...products];
    const getProductName = product => document.documentElement.lang === 'en-US'
        ? getHomeProductName(product)
        : product.name;

    switch (currentSort) {
        case 'name-asc':
            return sorted.sort((a, b) => getProductName(a).localeCompare(getProductName(b), 'en-US'));
        case 'name-desc':
            return sorted.sort((a, b) => getProductName(b).localeCompare(getProductName(a), 'en-US'));
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        default:
            const qplusIndex = sorted.findIndex(product => String(product.id) === '213');
            const ozonIndex = sorted.findIndex(product => String(product.id) === '7');
            if (qplusIndex !== -1 && ozonIndex !== -1) {
                const [qplusProduct] = sorted.splice(qplusIndex, 1);
                const updatedOzonIndex = sorted.findIndex(product => String(product.id) === '7');
                sorted.splice(updatedOzonIndex + 1, 0, qplusProduct);
            }
            return sorted;
    }
}


function calculateAverageRating(reviews) {
    const uniqueReviews = getUniqueProductReviews(reviews);
    if (uniqueReviews.length === 0) return 0;
    const totalRating = uniqueReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / uniqueReviews.length * 10) / 10;
}

function createStarsHTML(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="bi bi-star-fill text-warning"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="bi bi-star-half text-warning"></i>';
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="bi bi-star text-warning"></i>';
    }

    return starsHTML;
}

function createProductHTML(product) {
    const isEnglishPage = document.documentElement.lang === 'en-US';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(f => f.id === product.id);
    const favoriteClass = isFavorite ? 'btn-favorite-active' : '';
    const favoriteIcon = isFavorite ? 'bi-heart-fill' : 'bi-heart';

    const isInCart = isProductInCart(product.id);
    const cartButtonClass = isInCart ? 'btn btn-primary btn-sm btn-added-to-cart' : 'btn btn-primary btn-sm';
    const cartButtonText = isInCart
        ? `<i class="bi bi-check-circle"></i> ${isEnglishPage ? 'Added' : 'Добавлено'}`
        : `<i class="bi bi-cart-plus"></i> ${isEnglishPage ? 'Add to Cart' : 'В корзину'}`;

    const averageRating = calculateAverageRating(product.reviews);
    const starsHTML = createStarsHTML(averageRating);
    const uniqueReviews = getUniqueProductReviews(product.reviews);
    const reviewsCount = uniqueReviews.length;
    const ratingText = reviewsCount > 0
        ? `${averageRating}/5 (${reviewsCount})`
        : isEnglishPage ? 'No reviews yet' : 'Нет отзывов';
    const productName = isEnglishPage
        ? (product.homePageName || getHomeProductName(product))
        : (product.homePageName || product.name);

    return `
        <div class="product-card card" onclick="openProduct(${product.id})">
            <img src="${product.image}" alt="${productName}" class="card-img-top" 
                 onerror="this.src='images/placeholder.svg';" loading="lazy">
            <div class="card-body">
                <h5 class="product-title">${productName}</h5>
                <div class="product-price">$${product.price.toLocaleString('en-US')}</div>
                
                <div class="product-rating-section">
                    <div class="product-rating">
                        <div class="d-flex align-items-center">
                            ${starsHTML}
                            <span class="ms-2 text-muted rating-text">${ratingText}</span>
                        </div>
                    </div>
                    
                    <div class="product-status">
                        <span class="badge bg-success">${isEnglishPage ? 'In Stock' : 'В наличии'}</span>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button class="${cartButtonClass}" onclick="event.stopPropagation(); addToCart(${product.id})">
                        ${cartButtonText}
                    </button>
                    <button class="btn btn-outline-light btn-sm btn-favorite-toggle ${favoriteClass}" 
                            onclick="event.stopPropagation(); toggleFavorite(${product.id}, this)"
                            data-product-id="${product.id}">
                        <i class="${favoriteIcon}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadProducts() {
    const filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = sortedProducts.slice(startIndex, endIndex);

    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) {
        return;
    }

    if (loadMoreMode && currentPage > 1) {
        const newProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map(product => createProductHTML(product)).join('');
        productsGrid.insertAdjacentHTML('beforeend', newProducts);
    } else {
        productsGrid.innerHTML = productsToShow.map(product => createProductHTML(product)).join('');
    }

    setTimeout(() => {
        initializeCartButtonStates();
    }, 0);

    const loadMoreContainer = document.getElementById('loadMoreContainer');
    if (endIndex < sortedProducts.length) {
        loadMoreContainer.style.display = 'block';
        loadMoreMode = true;
    } else {
        loadMoreContainer.style.display = 'none';
        loadMoreMode = false;
    }

    createPagination(sortedProducts.length);
}

function loadMoreProducts() {
    currentPage++;
    loadProducts();
}

function createPagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    if (currentPage > 1) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link pagination-arrow" href="#" onclick="goToPage(${currentPage - 1})">
                    <i class="bi bi-chevron-left"></i>
                </a>
            </li>
        `;
    }

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `
                <li class="page-item active">
                    <span class="page-link">${i}</span>
                </li>
            `;
        } else if (totalPages <= 7 || i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
                </li>
            `;
        } else if (totalPages > 7 && (i === currentPage - 3 || i === currentPage + 3)) {
            paginationHTML += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `;
        }
    }

    if (currentPage < totalPages) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link pagination-arrow" href="#" onclick="goToPage(${currentPage + 1})">
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        `;
    }

    pagination.innerHTML = paginationHTML;
}

function goToPage(page) {
    currentPage = page;
    loadMoreMode = false;

    const url = new URL(window.location);
    if (page > 1) {
        url.searchParams.set('page', page);
    } else {
        url.searchParams.delete('page');
    }
    window.history.pushState({}, '', url);

    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const catalogState = {
        page: currentPage,
        category: currentCategory,
        sort: currentSort,
        search: getCurrentSearchQuery(),
        scrollPosition: window.scrollY || window.pageYOffset,
        loadMoreMode: loadMoreMode
    };

    sessionStorage.setItem('catalogState', JSON.stringify(catalogState));

    const isProductPage = window.location.pathname.includes('/products/');
    const basePath = isProductPage ? '../' : '';

    const page = productPages[productId] || `products/product.html?id=${productId}`;
    window.location.href = basePath + page;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isAlreadyInCart = cart.some(item => item.id === productId);

        if (isAlreadyInCart) {
            removeFromCart(productId);
            return;
        }

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartBadge();

        updateCartButtonState(productId, true);

        window.dispatchEvent(new CustomEvent('cartChanged', {
            detail: { productId: productId, action: 'added', cart: cart }
        }));

        showNotification('Added to your cart.');
    }
}

function isProductInCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.some(item => item.id === productId);
}

function updateCartButtonState(productId, isInCart) {
    const isEnglishPage = document.documentElement.lang === 'en-US';
    const buttons = document.querySelectorAll(`[onclick*="addToCart(${productId})"]`);
    buttons.forEach(button => {
        if (isInCart) {
            button.classList.add('btn-added-to-cart');
            button.innerHTML = `<i class="bi bi-check-circle"></i> ${isEnglishPage ? 'Added' : 'Добавлено'}`;
        } else {
            button.classList.remove('btn-added-to-cart');
            button.innerHTML = `<i class="bi bi-cart-plus"></i> ${isEnglishPage ? 'Add to Cart' : 'В корзину'}`;
        }
    });
}

function initializeCartButtonStates() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartProductIds = cart.map(item => item.id);

    cartProductIds.forEach(productId => {
        updateCartButtonState(productId, true);
    });
}

function toggleFavorite(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingIndex = favorites.findIndex(f => f.id === productId);

    if (existingIndex === -1) {

        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        buttonElement.classList.add('btn-favorite-active');
        const icon = buttonElement.querySelector('i');
        icon.className = 'bi bi-heart-fill';

        showNotification('Added to your favorites.');
    } else {

        favorites.splice(existingIndex, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        buttonElement.classList.remove('btn-favorite-active');
        const icon = buttonElement.querySelector('i');
        icon.className = 'bi bi-heart';

        showNotification('Removed from your favorites.');
    }

    updateFavoritesBadge();
}

function addToFavorites(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.find(f => f.id === productId)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));

            updateFavoritesBadge();

            showNotification('Added to your favorites.');
        } else {
            showNotification('This product is already in your favorites.', 'warning');
        }
    }
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badges = document.querySelectorAll('.btn-cart .badge');
    badges.forEach(badge => {
        badge.textContent = cart.length;
    });
}

function updateFavoritesBadge() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const badges = document.querySelectorAll('.btn-favorites .badge');
    badges.forEach(badge => {
        badge.textContent = favorites.length;
    });
}

function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

window.getProductById = getProductById;
window.products = products;

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

    if (!content) return;

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
        const price = parseFloat(item.price) || 0;
        return sum + (price * item.quantity);
    }, 0);

    if (totalElement) totalElement.textContent = `$${total.toLocaleString('en-US')}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
}

function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoritesBadge();
    renderFavorites();
    showNotification('Removed from your favorites.');
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartBadge();
    renderCart();

    updateCartButtonState(productId, false);

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
}

function getCategoryName(category, forceEnglish = false) {
    if (forceEnglish || document.documentElement.lang === 'en-US') {
        const englishCategoryNames = {
            debit: 'Bank Cards',
            prepaid: 'Prepaid Cards',
            ewallet: 'E-Wallets',
            bankaccounts: 'Bank Accounts',
            accounts: 'Accounts',
            vpnproxy: 'Software'
        };
        return englishCategoryNames[category] || 'Products';
    }

    const categoryNames = {
        'debit': 'Банковские карты',
        'prepaid': 'Предоплаченные карты',
        'ewallet': 'Электронные кошельки',
        'bankaccounts': 'Банковские аккаунты',
        'accounts': 'Аккаунты',
        'vpnproxy': 'Программы'
    };
    return categoryNames[category] || 'Товары';
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

document.addEventListener('DOMContentLoaded', function () {

    updateCartBadge();
    updateFavoritesBadge();

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

window.products = products;

if (typeof window !== 'undefined') {
    window.updateCategoryTitle = updateCategoryTitle;
    window.loadProducts = loadProducts;

    Object.defineProperty(window, 'currentPage', {
        get: function () { return currentPage; },
        set: function (value) { currentPage = value; }
    });
}