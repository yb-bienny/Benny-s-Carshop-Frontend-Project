// ========================================
// Registration Form JavaScript
// Form Validation & Submission
// Kenya DPA 2019 Compliant
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        // Real-time validation on blur
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
        
        // Form submission
        form.addEventListener('submit', handleFormSubmit);
    }
});

// ========================================
// FORM VALIDATION
// ========================================

function validateField(field) {
    const fieldName = field.id;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    switch (fieldName) {
        case 'fullName':
            if (value.length < 3) {
                errorMessage = 'Full name must be at least 3 characters';
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMessage = 'Name should only contain letters and spaces';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            // Kenyan phone number validation
            // Accepts: +254700123456, 0700123456, +254 700 123 456, etc.
            const phoneRegex = /^(\+254|0)[17]\d{8}$/;
            const cleanPhone = value.replace(/\s+/g, '');
            
            if (!phoneRegex.test(cleanPhone)) {
                errorMessage = 'Please enter a valid Kenyan phone number (e.g., +254 700 123 456 or 0700 123 456)';
                isValid = false;
            }
            break;
            
        case 'idNumber':
            if (value.length < 7) {
                errorMessage = 'ID/Passport number must be at least 7 characters';
                isValid = false;
            } else if (!/^[A-Z0-9]+$/i.test(value)) {
                errorMessage = 'ID/Passport should only contain letters and numbers';
                isValid = false;
            }
            break;
            
        case 'county':
            if (!value) {
                errorMessage = 'Please select your county';
                isValid = false;
            }
            break;
            
        case 'password':
            if (value.length < 8) {
                errorMessage = 'Password must be at least 8 characters long';
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                errorMessage = 'Password must contain uppercase, lowercase, and numbers';
                isValid = false;
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password')?.value;
            if (value !== password) {
                errorMessage = 'Passwords do not match';
                isValid = false;
            }
            break;
            
        case 'agreeTerms':
            if (!field.checked) {
                errorMessage = 'You must agree to the Terms of Service and Privacy Policy';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function validateForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return false;
    
    let isValid = true;
    
    // Validate all required fields
    const requiredFields = [
        'fullName',
        'email',
        'phone',
        'idNumber',
        'county',
        'password',
        'confirmPassword',
        'agreeTerms'
    ];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (!validateField(field)) {
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// ========================================
// FORM SUBMISSION
// ========================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate entire form
    if (!validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        idNumber: document.getElementById('idNumber').value.trim(),
        county: document.getElementById('county').value,
        password: document.getElementById('password').value,
        agreeTerms: document.getElementById('agreeTerms').checked,
        marketingConsent: document.getElementById('marketingConsent')?.checked || false,
        registrationDate: new Date().toISOString()
    };
    
    // In a real application, this would be sent to a server
    // For this demo, we'll store in localStorage
    try {
        // Store user data (excluding password in real app)
        const userData = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            county: formData.county,
            marketingConsent: formData.marketingConsent,
            registrationDate: formData.registrationDate
        };
        
        localStorage.setItem('bennyscarplace_user', JSON.stringify(userData));
        
        // Log registration event (DPA 2019 compliance)
        console.log('User registered successfully');
        console.log('Consent for marketing:', formData.marketingConsent);
        console.log('Terms accepted:', formData.agreeTerms);
        
        // Show success message
        showSuccessMessage();
        
        // Track registration in session
        if (window.cookieManager) {
            sessionStorage.setItem('registration_complete', 'true');
        }
        
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    }
}

function showSuccessMessage() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

// Format phone number as user types
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        // Auto-format for Kenya numbers
        if (value.startsWith('254')) {
            value = '+' + value;
        } else if (value.startsWith('0') && value.length === 10) {
            // Format as 07XX XXX XXX
            value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        }
    });
}

// ID Number uppercase conversion
const idInput = document.getElementById('idNumber');
if (idInput) {
    idInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

// Password strength indicator
const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        
        // Could add visual indicator here
        console.log('Password strength:', strength);
    });
}

console.log('Registration form initialized');
