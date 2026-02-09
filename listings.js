// ========================================
// Listings Page JavaScript
// Real-time Search, Filtering & Sorting
// ========================================

let allCars = [...carDatabase];
let filteredCars = [...allCars];

// ========================================
// INITIALIZE LISTINGS PAGE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check for search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchTerm;
        }
    }
    
    // Initial display
    applyFilters();
    
    // Add real-time search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
});

// ========================================
// FILTER AND SEARCH FUNCTIONS
// ========================================

function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const brand = document.getElementById('brandFilter')?.value || '';
    const condition = document.getElementById('conditionFilter')?.value || '';
    const yearFrom = parseInt(document.getElementById('yearFromFilter')?.value) || 0;
    const yearTo = parseInt(document.getElementById('yearToFilter')?.value) || 9999;
    const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || Infinity;
    const county = document.getElementById('countyFilter')?.value || '';
    
    // Filter cars
    filteredCars = allCars.filter(car => {
        // Text search
        const matchesSearch = !searchTerm || 
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm) ||
            car.year.toString().includes(searchTerm);
        
        // Brand filter
        const matchesBrand = !brand || car.brand === brand;
        
        // Condition filter
        const matchesCondition = !condition || car.condition === condition;
        
        // Year range filter
        const matchesYear = car.year >= yearFrom && car.year <= yearTo;
        
        // Price range filter
        const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
        
        // County filter
        const matchesCounty = !county || car.county === county;
        
        return matchesSearch && matchesBrand && matchesCondition && 
               matchesYear && matchesPrice && matchesCounty;
    });
    
    // Apply sorting
    sortCars();
    
    // Update display
    displayCars();
    updateResultsCount();
}

function sortCars() {
    const sortBy = document.getElementById('sortBy')?.value || 'relevant';
    
    switch (sortBy) {
        case 'price-low':
            filteredCars.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCars.sort((a, b) => b.price - a.price);
            break;
        case 'year-new':
            filteredCars.sort((a, b) => b.year - a.year);
            break;
        case 'year-old':
            filteredCars.sort((a, b) => a.year - b.year);
            break;
        default:
            // Relevant - new condition first, then by year
            filteredCars.sort((a, b) => {
                if (a.condition === 'New' && b.condition !== 'New') return -1;
                if (a.condition !== 'New' && b.condition === 'New') return 1;
                return b.year - a.year;
            });
    }
    
    // Save sort preference
    if (window.cookieManager) {
        cookieManager.savePreference('sortBy', sortBy);
    }
}

function displayCars() {
    const carsGrid = document.getElementById('carsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!carsGrid) return;
    
    if (filteredCars.length === 0) {
        carsGrid.innerHTML = '';
        if (noResults) {
            noResults.classList.remove('hidden');
        }
    } else {
        if (noResults) {
            noResults.classList.add('hidden');
        }
        
        carsGrid.innerHTML = filteredCars.map(car => createCarCard(car)).join('');
        
        // Add event listeners
        addCarCardEventListeners();
    }
}

function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.textContent = filteredCars.length;
    }
}

function clearFilters() {
    // Reset all filter inputs
    const searchInput = document.getElementById('searchInput');
    const brandFilter = document.getElementById('brandFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const yearFromFilter = document.getElementById('yearFromFilter');
    const yearToFilter = document.getElementById('yearToFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const countyFilter = document.getElementById('countyFilter');
    const priceRange = document.getElementById('priceRange');
    
    if (searchInput) searchInput.value = '';
    if (brandFilter) brandFilter.value = '';
    if (conditionFilter) conditionFilter.value = '';
    if (yearFromFilter) yearFromFilter.value = '';
    if (yearToFilter) yearToFilter.value = '';
    if (minPrice) minPrice.value = '';
    if (maxPrice) maxPrice.value = '';
    if (countyFilter) countyFilter.value = '';
    if (priceRange) {
        priceRange.value = priceRange.max;
        updatePriceRange(priceRange.max);
    }
    
    // Re-apply filters (which will show all cars)
    applyFilters();
}

function updatePriceRange(value) {
    const displayElement = document.getElementById('priceRangeValue');
    if (displayElement) {
        displayElement.textContent = parseInt(value).toLocaleString('en-KE');
    }
    
    // Update max price input
    const maxPriceInput = document.getElementById('maxPrice');
    if (maxPriceInput) {
        maxPriceInput.value = value;
    }
    
    // Apply filters
    applyFilters();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// GLOBAL FUNCTIONS
// ========================================

window.applyFilters = applyFilters;
window.sortCars = sortCars;
window.clearFilters = clearFilters;
window.updatePriceRange = updatePriceRange;

console.log('Listings page initialized');
console.log('Total cars in database:', allCars.length);
