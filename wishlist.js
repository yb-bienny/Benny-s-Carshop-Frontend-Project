// ========================================
// Wishlist Page JavaScript
// Saved Favorites Management
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadWishlist();
});

function loadWishlist() {
    const wishlistIds = wishlistManager.getWishlist();
    const emptyState = document.getElementById('emptyWishlist');
    const wishlistContainer = document.getElementById('wishlistContainer');
    const wishlistItemCount = document.getElementById('wishlistItemCount');
    
    if (wishlistIds.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (wishlistContainer) wishlistContainer.classList.add('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
        if (wishlistContainer) wishlistContainer.classList.remove('hidden');
        
        // Update count
        if (wishlistItemCount) {
            wishlistItemCount.textContent = wishlistIds.length;
        }
        
        displayWishlist(wishlistIds);
    }
}

function displayWishlist(wishlistIds) {
    const wishlistGrid = document.getElementById('wishlistGrid');
    if (!wishlistGrid) return;
    
    // Get car data for wishlist
    const wishlistCars = wishlistIds
        .map(id => carDatabase.find(car => car.id === id))
        .filter(car => car !== undefined);
    
    if (wishlistCars.length === 0) {
        clearWishlist();
        return;
    }
    
    // Display cars
    wishlistGrid.innerHTML = wishlistCars.map(car => createCarCard(car)).join('');
    
    // Add event listeners
    addCarCardEventListeners();
}

function clearWishlist() {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
        wishlistManager.clearWishlist();
        loadWishlist();
    }
}

// Global functions
window.clearWishlist = clearWishlist;

console.log('Wishlist page initialized');
