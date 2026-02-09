// ========================================
// AutoHub Kenya - Main JavaScript
// Cookie Management & Core Functionality
// Compliant with Kenya Data Protection Act 2019
// ========================================

// ========================================
// COOKIE MANAGEMENT (Kenya DPA 2019 Compliant)
// ========================================

class CookieManager {
    constructor() {
        this.cookiePrefix = 'autohub_';
        this.consentCookieName = this.cookiePrefix + 'consent';
        this.sessionCookieName = this.cookiePrefix + 'session';
        this.preferencesCookieName = this.cookiePrefix + 'preferences';
        this.viewedCarsCookieName = this.cookiePrefix + 'viewed_cars';
        
        this.init();
    }
    
    init() {
        // Check if user has already given consent
        const consentGiven = this.getCookie(this.consentCookieName);
        
        if (!consentGiven) {
            this.showCookieBanner();
        } else {
            // User has consented, initialize session
            this.initializeSession();
            this.trackPageView();
        }
    }
    
    showCookieBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('hidden');
            
            // Accept cookies button
            document.getElementById('acceptCookies')?.addEventListener('click', () => {
                this.acceptCookies(true);
                banner.classList.add('hidden');
            });
            
            // Reject non-essential cookies button
            document.getElementById('rejectCookies')?.addEventListener('click', () => {
                this.acceptCookies(false);
                banner.classList.add('hidden');
            });
        }
    }
    
    acceptCookies(acceptAll) {
        const expiryDays = 365; // Cookie consent valid for 1 year
        
        // Set consent cookie
        this.setCookie(this.consentCookieName, acceptAll ? 'all' : 'essential', expiryDays);
        
        if (acceptAll) {
            // Initialize all tracking
            this.initializeSession();
            this.trackPageView();
            this.initializePreferences();
        } else {
            // Only essential cookies
            this.initializeSession();
        }
        
        console.log('Cookie consent recorded:', acceptAll ? 'All cookies accepted' : 'Only essential cookies');
    }
    
    initializeSession() {
        // Check if session exists
        let sessionId = this.getCookie(this.sessionCookieName);
        
        if (!sessionId) {
            // Create new session ID
            sessionId = this.generateSessionId();
            // Session cookie expires when browser closes (no expiry date)
            this.setCookie(this.sessionCookieName, sessionId, null, true);
            console.log('New session created:', sessionId);
        } else {
            console.log('Existing session:', sessionId);
        }
        
        // Store session start time
        if (!sessionStorage.getItem('session_start')) {
            sessionStorage.setItem('session_start', new Date().toISOString());
        }
    }
    
    initializePreferences() {
        // Load user preferences from cookie
        const prefsString = this.getCookie(this.preferencesCookieName);
        
        if (prefsString) {
            try {
                const prefs = JSON.parse(prefsString);
                this.applyPreferences(prefs);
            } catch (e) {
                console.error('Error parsing preferences:', e);
            }
        }
    }
    
    applyPreferences(prefs) {
        // Apply saved preferences
        if (prefs.sortBy) {
            const sortSelect = document.getElementById('sortBy');
            if (sortSelect) sortSelect.value = prefs.sortBy;
        }
        
        console.log('Preferences applied:', prefs);
    }
    
    savePreference(key, value) {
        const consent = this.getCookie(this.consentCookieName);
        if (consent !== 'all') return; // Only save if user consented to all cookies
        
        let prefs = {};
        const prefsString = this.getCookie(this.preferencesCookieName);
        
        if (prefsString) {
            try {
                prefs = JSON.parse(prefsString);
            } catch (e) {
                prefs = {};
            }
        }
        
        prefs[key] = value;
        this.setCookie(this.preferencesCookieName, JSON.stringify(prefs), 365);
    }
    
    trackPageView() {
        const consent = this.getCookie(this.consentCookieName);
        if (consent !== 'all') return;
        
        const page = window.location.pathname;
        console.log('Page view tracked:', page);
        
        // Track in session storage
        let pageViews = JSON.parse(sessionStorage.getItem('page_views') || '[]');
        pageViews.push({
            page: page,
            timestamp: new Date().toISOString()
        });
        sessionStorage.setItem('page_views', JSON.stringify(pageViews));
    }
    
    trackViewedCar(carId) {
        const consent = this.getCookie(this.consentCookieName);
        if (consent !== 'all') return;
        
        let viewedCars = [];
        const viewedString = this.getCookie(this.viewedCarsCookieName);
        
        if (viewedString) {
            try {
                viewedCars = JSON.parse(viewedString);
            } catch (e) {
                viewedCars = [];
            }
        }
        
        // Add car if not already viewed
        if (!viewedCars.includes(carId)) {
            viewedCars.push(carId);
            // Keep only last 20 viewed cars
            if (viewedCars.length > 20) {
                viewedCars.shift();
            }
            this.setCookie(this.viewedCarsCookieName, JSON.stringify(viewedCars), 30);
        }
    }
    
    getViewedCars() {
        const viewedString = this.getCookie(this.viewedCarsCookieName);
        if (viewedString) {
            try {
                return JSON.parse(viewedString);
            } catch (e) {
                return [];
            }
        }
        return [];
    }
    
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Core cookie operations
    setCookie(name, value, days, sessionOnly = false) {
        let expires = '';
        
        if (!sessionOnly && days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        
        document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Strict';
    }
    
    getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        
        return null;
    }
    
    deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }
    
    clearAllCookies() {
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            if (name.startsWith(this.cookiePrefix)) {
                this.deleteCookie(name);
            }
        }
    }
}

// Initialize Cookie Manager
const cookieManager = new CookieManager();

// ========================================
// NAVIGATION
// ========================================

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Filter toggle for mobile
const filterToggle = document.getElementById('filterToggle');
const filtersSidebar = document.getElementById('filtersSidebar');

if (filterToggle && filtersSidebar) {
    filterToggle.addEventListener('click', () => {
        filtersSidebar.classList.toggle('active');
    });
}

// ========================================
// WISHLIST MANAGEMENT
// ========================================

class WishlistManager {
    constructor() {
        this.storageKey = 'autohub_wishlist';
        this.wishlist = this.loadWishlist();
        this.updateWishlistCount();
    }
    
    loadWishlist() {
        const wishlistString = localStorage.getItem(this.storageKey);
        if (wishlistString) {
            try {
                return JSON.parse(wishlistString);
            } catch (e) {
                return [];
            }
        }
        return [];
    }
    
    saveWishlist() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
        this.updateWishlistCount();
    }
    
    addToWishlist(carId) {
        if (!this.wishlist.includes(carId)) {
            this.wishlist.push(carId);
            this.saveWishlist();
            return true;
        }
        return false;
    }
    
    removeFromWishlist(carId) {
        const index = this.wishlist.indexOf(carId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.saveWishlist();
            return true;
        }
        return false;
    }
    
    isInWishlist(carId) {
        return this.wishlist.includes(carId);
    }
    
    toggleWishlist(carId) {
        if (this.isInWishlist(carId)) {
            this.removeFromWishlist(carId);
            return false;
        } else {
            this.addToWishlist(carId);
            return true;
        }
    }
    
    clearWishlist() {
        this.wishlist = [];
        this.saveWishlist();
    }
    
    getWishlist() {
        return [...this.wishlist];
    }
    
    updateWishlistCount() {
        const countElements = document.querySelectorAll('#wishlistCount');
        countElements.forEach(el => {
            el.textContent = this.wishlist.length;
        });
    }
}

const wishlistManager = new WishlistManager();

// ========================================
// COMPARISON MANAGEMENT
// ========================================

class ComparisonManager {
    constructor() {
        this.storageKey = 'autohub_comparison';
        this.maxItems = 3;
        this.comparison = this.loadComparison();
    }
    
    loadComparison() {
        const comparisonString = localStorage.getItem(this.storageKey);
        if (comparisonString) {
            try {
                return JSON.parse(comparisonString);
            } catch (e) {
                return [];
            }
        }
        return [];
    }
    
    saveComparison() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.comparison));
    }
    
    addToComparison(carId) {
        if (this.comparison.length >= this.maxItems) {
            alert(`You can only compare up to ${this.maxItems} vehicles`);
            return false;
        }
        
        if (!this.comparison.includes(carId)) {
            this.comparison.push(carId);
            this.saveComparison();
            return true;
        }
        return false;
    }
    
    removeFromComparison(carId) {
        const index = this.comparison.indexOf(carId);
        if (index > -1) {
            this.comparison.splice(index, 1);
            this.saveComparison();
            return true;
        }
        return false;
    }
    
    isInComparison(carId) {
        return this.comparison.includes(carId);
    }
    
    toggleComparison(carId) {
        if (this.isInComparison(carId)) {
            this.removeFromComparison(carId);
            return false;
        } else {
            return this.addToComparison(carId);
        }
    }
    
    clearComparison() {
        this.comparison = [];
        this.saveComparison();
    }
    
    getComparison() {
        return [...this.comparison];
    }
}

const comparisonManager = new ComparisonManager();

// ========================================
// CAR DATABASE (Sample Data)
// ========================================

const carDatabase = [
    // Toyota
    {
        id: 'car-1',
        brand: 'Toyota',
        model: 'Land Cruiser Prado',
        year: 2023,
        condition: 'New',
        price: 7500000,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        county: 'Nairobi',
        description: 'Brand new Toyota Land Cruiser Prado with all modern features',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600'
    },
    {
        id: 'car-2',
        brand: 'Toyota',
        model: 'Hilux Double Cab',
        year: 2022,
        condition: 'Used',
        price: 4200000,
        mileage: 35000,
        transmission: 'Manual',
        fuelType: 'Diesel',
        county: 'Mombasa',
        description: 'Well-maintained Toyota Hilux, perfect for both city and off-road',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600'
    },
    {
        id: 'car-3',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2021,
        condition: 'Used',
        price: 2100000,
        mileage: 48000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Nakuru',
        description: 'Reliable Toyota Corolla, excellent fuel economy',
        image: 'https://images.unsplash.com/photo-1623869675058-72c8e0dc5b8c?w=600'
    },
    {
        id: 'car-4',
        brand: 'Toyota',
        model: 'RAV4',
        year: 2024,
        condition: 'New',
        price: 5800000,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        county: 'Nairobi',
        description: 'Latest Toyota RAV4 Hybrid with advanced safety features',
        image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=600'
    },
    
    // Nissan
    {
        id: 'car-5',
        brand: 'Nissan',
        model: 'X-Trail',
        year: 2022,
        condition: 'Used',
        price: 3800000,
        mileage: 28000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Kisumu',
        description: 'Spacious Nissan X-Trail SUV, perfect for families',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600'
    },
    {
        id: 'car-6',
        brand: 'Nissan',
        model: 'Patrol',
        year: 2023,
        condition: 'New',
        price: 8200000,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        county: 'Nairobi',
        description: 'Powerful Nissan Patrol, built for rugged terrain',
        image: 'https://images.unsplash.com/photo-1552519507-ac12e4543f5f?w=600'
    },
    {
        id: 'car-7',
        brand: 'Nissan',
        model: 'Note',
        year: 2020,
        condition: 'Used',
        price: 1400000,
        mileage: 62000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Kiambu',
        description: 'Compact and economical Nissan Note',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600'
    },
    
    // Honda
    {
        id: 'car-8',
        brand: 'Honda',
        model: 'CR-V',
        year: 2023,
        condition: 'New',
        price: 5200000,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        county: 'Nairobi',
        description: 'Honda CR-V Hybrid with premium interior',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600'
    },
    {
        id: 'car-9',
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        condition: 'Used',
        price: 2800000,
        mileage: 38000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Mombasa',
        description: 'Sporty Honda Civic with excellent handling',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600'
    },
    {
        id: 'car-10',
        brand: 'Honda',
        model: 'Fit',
        year: 2019,
        condition: 'Used',
        price: 1650000,
        mileage: 54000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Nakuru',
        description: 'Versatile Honda Fit, great for city driving',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600'
    },
    
    // Subaru
    {
        id: 'car-11',
        brand: 'Subaru',
        model: 'Forester',
        year: 2023,
        condition: 'New',
        price: 4900000,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Nairobi',
        description: 'Subaru Forester with AWD and EyeSight technology',
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600'
    },
    {
        id: 'car-12',
        brand: 'Subaru',
        model: 'Outback',
        year: 2022,
        condition: 'Used',
        price: 4100000,
        mileage: 22000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Kisumu',
        description: 'Adventure-ready Subaru Outback',
        image: 'https://images.unsplash.com/photo-1605451165371-6f0b8f7c9b22?w=600'
    },
    {
        id: 'car-13',
        brand: 'Subaru',
        model: 'Impreza',
        year: 2020,
        condition: 'Used',
        price: 2300000,
        mileage: 45000,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Kiambu',
        description: 'Reliable Subaru Impreza with AWD',
        image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600'
    },
    
    // Volkswagen
    {
        id: 'car-14',
        brand: 'Volkswagen',
        model: 'Tiguan',
        year: 2023,
        condition: 'New',
        price: 5600000,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        county: 'Nairobi',
        description: 'Premium Volkswagen Tiguan with digital cockpit',
        image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=600'
    },
    {
        id: 'car-15',
        brand: 'Volkswagen',
        model: 'Polo',
        year: 2021,
        condition: 'Used',
        price: 1900000,
        mileage: 41000,
        transmission: 'Manual',
        fuelType: 'Petrol',
        county: 'Mombasa',
        description: 'Compact Volkswagen Polo, great fuel efficiency',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600'
    },
    {
        id: 'car-16',
        brand: 'Volkswagen',
        model: 'Passat',
        year: 2022,
        condition: 'Used',
        price: 3900000,
        mileage: 31000,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        county: 'Nakuru',
        description: 'Executive Volkswagen Passat with luxury features',
        image: 'https://images.unsplash.com/photo-1610381143222-6beee928c8c4?w=600'
    }
];

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatPrice(price) {
    return 'KSh ' + price.toLocaleString('en-KE');
}

function formatMileage(mileage) {
    if (mileage === 0) return 'Brand New';
    return mileage.toLocaleString('en-KE') + ' km';
}

function searchFromHero() {
    const searchTerm = document.getElementById('heroSearch')?.value;
    if (searchTerm) {
        window.location.href = `listings.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
        window.location.href = 'listings.html';
    }
}

// ========================================
// FEATURED CARS DISPLAY (Homepage)
// ========================================

function displayFeaturedCars() {
    const featuredGrid = document.getElementById('featuredCars');
    if (!featuredGrid) return;
    
    // Select 6 random featured cars
    const featured = carDatabase
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    
    featuredGrid.innerHTML = featured.map(car => createCarCard(car)).join('');
    
    // Add event listeners after rendering
    addCarCardEventListeners();
}

function createCarCard(car) {
    const isInWishlist = wishlistManager.isInWishlist(car.id);
    const isInComparison = comparisonManager.isInComparison(car.id);
    
    return `
        <div class="car-card" data-car-id="${car.id}">
            <div class="car-badge">${car.condition}</div>
            <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-image" loading="lazy">
            <div class="car-info">
                <div class="car-brand">${car.brand}</div>
                <h3 class="car-title">${car.model}</h3>
                <div class="car-specs">
                    <div class="spec-item">
                        <span class="spec-label">Year</span>
                        <span class="spec-value">${car.year}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Transmission</span>
                        <span class="spec-value">${car.transmission}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Fuel</span>
                        <span class="spec-value">${car.fuelType}</span>
                    </div>
                </div>
                <div class="car-price">${formatPrice(car.price)}</div>
                <div class="car-location">📍 ${car.county}</div>
                <div class="car-actions">
                    <button class="icon-btn wishlist-btn ${isInWishlist ? 'active' : ''}" 
                            data-car-id="${car.id}" 
                            title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                        ${isInWishlist ? '❤️' : '🤍'}
                    </button>
                    <button class="icon-btn compare-btn ${isInComparison ? 'active' : ''}" 
                            data-car-id="${car.id}"
                            title="${isInComparison ? 'Remove from comparison' : 'Add to comparison'}">
                        ⚖️
                    </button>
                    <button class="icon-btn view-btn" 
                            data-car-id="${car.id}"
                            title="View details">
                        👁️
                    </button>
                </div>
            </div>
        </div>
    `;
}

function addCarCardEventListeners() {
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carId = btn.dataset.carId;
            const added = wishlistManager.toggleWishlist(carId);
            
            btn.classList.toggle('active');
            btn.innerHTML = added ? '❤️' : '🤍';
            btn.title = added ? 'Remove from wishlist' : 'Add to wishlist';
        });
    });
    
    // Comparison buttons
    document.querySelectorAll('.compare-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carId = btn.dataset.carId;
            const added = comparisonManager.toggleComparison(carId);
            
            btn.classList.toggle('active', added);
        });
    });
    
    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carId = btn.dataset.carId;
            
            // Track viewed car
            cookieManager.trackViewedCar(carId);
            
            // Navigate to car details (for now, show alert)
            const car = carDatabase.find(c => c.id === carId);
            if (car) {
                alert(`Viewing: ${car.brand} ${car.model}\n\nPrice: ${formatPrice(car.price)}\nYear: ${car.year}\nMileage: ${formatMileage(car.mileage)}\n\nFull detail pages coming soon!`);
            }
        });
    });
}

// Initialize featured cars on homepage
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', displayFeaturedCars);
}

// ========================================
// GLOBAL FUNCTIONS
// ========================================

window.searchFromHero = searchFromHero;
window.wishlistManager = wishlistManager;
window.comparisonManager = comparisonManager;
window.carDatabase = carDatabase;
window.formatPrice = formatPrice;
window.formatMileage = formatMileage;
window.createCarCard = createCarCard;
window.addCarCardEventListeners = addCarCardEventListeners;

console.log('AutoHub Kenya initialized successfully');
console.log('Cookie consent:', cookieManager.getCookie(cookieManager.consentCookieName));
console.log('Session ID:', cookieManager.getCookie(cookieManager.sessionCookieName));
