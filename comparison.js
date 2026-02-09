// ========================================
// Comparison Page JavaScript
// Side-by-Side Vehicle Comparison
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadComparison();
});

function loadComparison() {
    const comparisonIds = comparisonManager.getComparison();
    const emptyState = document.getElementById('emptyComparison');
    const comparisonContainer = document.getElementById('comparisonContainer');
    
    if (comparisonIds.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (comparisonContainer) comparisonContainer.classList.add('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
        if (comparisonContainer) comparisonContainer.classList.remove('hidden');
        
        displayComparison(comparisonIds);
    }
}

function displayComparison(comparisonIds) {
    // Get car data for comparison
    const comparisonCars = comparisonIds
        .map(id => carDatabase.find(car => car.id === id))
        .filter(car => car !== undefined);
    
    if (comparisonCars.length === 0) {
        clearComparison();
        return;
    }
    
    // Build comparison table
    const comparisonHeader = document.getElementById('comparisonHeader');
    const comparisonBody = document.getElementById('comparisonBody');
    
    if (!comparisonHeader || !comparisonBody) return;
    
    // Build header row with car images and names
    let headerHTML = '<th class="sticky-col">Specifications</th>';
    comparisonCars.forEach(car => {
        headerHTML += `
            <th>
                <div style="text-align: center;">
                    <img src="${car.image}" alt="${car.brand} ${car.model}" 
                         style="width: 100%; max-width: 200px; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                    <h3 style="margin: 10px 0 5px 0;">${car.brand} ${car.model}</h3>
                    <p style="color: var(--gray-medium); margin: 0;">${car.year}</p>
                    <button class="btn btn-outline" style="margin-top: 10px; font-size: 0.9rem; padding: 0.5rem 1rem;" 
                            onclick="removeFromComparison('${car.id}')">
                        Remove
                    </button>
                </div>
            </th>
        `;
    });
    comparisonHeader.innerHTML = headerHTML;
    
    // Build comparison rows
    const comparisonSpecs = [
        { label: 'Condition', key: 'condition' },
        { label: 'Price', key: 'price', format: formatPrice },
        { label: 'Year', key: 'year' },
        { label: 'Mileage', key: 'mileage', format: formatMileage },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Fuel Type', key: 'fuelType' },
        { label: 'County', key: 'county' }
    ];
    
    let bodyHTML = '';
    comparisonSpecs.forEach(spec => {
        bodyHTML += '<tr>';
        bodyHTML += `<td class="sticky-col"><strong>${spec.label}</strong></td>`;
        
        comparisonCars.forEach(car => {
            let value = car[spec.key];
            if (spec.format) {
                value = spec.format(value);
            }
            bodyHTML += `<td>${value}</td>`;
        });
        
        bodyHTML += '</tr>';
    });
    
    comparisonBody.innerHTML = bodyHTML;
}

function removeFromComparison(carId) {
    comparisonManager.removeFromComparison(carId);
    loadComparison();
}

function clearComparison() {
    if (confirm('Are you sure you want to clear all comparisons?')) {
        comparisonManager.clearComparison();
        loadComparison();
    }
}

// Global functions
window.removeFromComparison = removeFromComparison;
window.clearComparison = clearComparison;

console.log('Comparison page initialized');
