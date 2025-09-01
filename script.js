// =======================
// PART 1: EVENT HANDLING AND BASIC INTERACTIVITY
// =======================

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // =======================
    // LIGHT/DARK MODE TOGGLE FEATURE
    // =======================
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Default to dark mode (as per new CSS design)
    let isLightMode = false;
    
    // Set initial button text
    darkModeToggle.textContent = '☀️ Light Mode';
    
    // Event listener for mode toggle button
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        isLightMode = !isLightMode;
        
        // Update button text based on current mode
        if (body.classList.contains('light-mode')) {
            darkModeToggle.textContent = '🌙 Dark Mode';
            addMessage('Light mode activated! ☀️');
        } else {
            darkModeToggle.textContent = '☀️ Light Mode';
            addMessage('Dark mode activated! 🌙');
        }
    });
    
    // =======================
    // COUNTER GAME FEATURE
    // =======================
    
    let counter = 0;
    const counterDisplay = document.getElementById('counterDisplay');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Function to update counter display
    function updateCounterDisplay() {
        counterDisplay.textContent = counter;
        
        // Change color based on counter value (adjusted for new theme)
        if (counter > 0) {
            counterDisplay.style.color = body.classList.contains('light-mode') ? '#00796b' : '#52e6b8';
        } else if (counter < 0) {
            counterDisplay.style.color = '#ff6b6b';
        } else {
            counterDisplay.style.color = body.classList.contains('light-mode') ? '#00968a' : '#66ffcc';
        }
    }
    
    // Event listeners for counter buttons
    incrementBtn.addEventListener('click', function() {
        counter++;
        updateCounterDisplay();
        addMessage(`Counter increased to ${counter}`);
    });
    
    decrementBtn.addEventListener('click', function() {
        counter--;
        updateCounterDisplay();
        addMessage(`Counter decreased to ${counter}`);
    });
    
    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateCounterDisplay();
        addMessage('Counter reset to 0');
    });
    
    // =======================
    // FAQ COLLAPSIBLE SECTION
    // =======================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Event listeners for FAQ questions
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const answer = document.getElementById(targetId);
            const icon = this.querySelector('.faq-icon');
            
            // Toggle active classes
            this.classList.toggle('active');
            answer.classList.toggle('active');
            
            // Update icon rotation
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(45deg)';
                addMessage(`FAQ opened: ${this.textContent.replace('+', '').replace('×', '').trim()}`);
            } else {
                icon.style.transform = 'rotate(0deg)';
                addMessage('FAQ closed');
            }
        });
    });
    
    // =======================
    // TABBED INTERFACE FEATURE
    // =======================
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Event listeners for tab buttons
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            addMessage(`Switched to ${this.textContent} tab`);
        });
    });
    
    // =======================
    // MESSAGE SYSTEM FOR ACTIVITY LOG
    // =======================
    
    const messageContainer = document.getElementById('messageContainer');
    const clearMessagesBtn = document.getElementById('clearMessages');
    
    // Function to add messages to the activity log
    function addMessage(message) {
        // Remove welcome message if it exists
        const welcomeMessage = messageContainer.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = 'message-item';
        messageElement.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        
        // Add to container (newest first)
        messageContainer.insertBefore(messageElement, messageContainer.firstChild);
        
        // Limit to 10 messages
        const messages = messageContainer.querySelectorAll('.message-item');
        if (messages.length > 10) {
            messages[messages.length - 1].remove();
        }
        
        // Auto-scroll to show newest message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Clear messages event listener
    clearMessagesBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '<p class="welcome-message">Welcome! Try interacting with the elements above to see messages appear here.</p>';
        setTimeout(() => addMessage('Messages cleared'), 100);
    });
    
    // =======================
    // PART 3: FORM VALIDATION
    // =======================
    
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    // Validation functions for each field
    function validateFirstName() {
        const firstName = document.getElementById('firstName');
        const error = document.getElementById('firstNameError');
        
        if (!firstName.value.trim()) {
            showError(firstName, error, 'First name is required');
            return false;
        } else if (!nameRegex.test(firstName.value.trim())) {
            showError(firstName, error, 'First name must contain only letters and be 2-30 characters');
            return false;
        } else {
            showSuccess(firstName, error);
            return true;
        }
    }
    
    function validateLastName() {
        const lastName = document.getElementById('lastName');
        const error = document.getElementById('lastNameError');
        
        if (!lastName.value.trim()) {
            showError(lastName, error, 'Last name is required');
            return false;
        } else if (!nameRegex.test(lastName.value.trim())) {
            showError(lastName, error, 'Last name must contain only letters and be 2-30 characters');
            return false;
        } else {
            showSuccess(lastName, error);
            return true;
        }
    }
    
    function validateEmail() {
        const email = document.getElementById('email');
        const error = document.getElementById('emailError');
        
        if (!email.value.trim()) {
            showError(email, error, 'Email address is required');
            return false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, error, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(email, error);
            return true;
        }
    }
    
    function validatePhone() {
        const phone = document.getElementById('phone');
        const error = document.getElementById('phoneError');
        
        if (!phone.value.trim()) {
            showError(phone, error, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            showError(phone, error, 'Please enter a valid phone number e.g. +1234567890');
            return false;
        } else {
            showSuccess(phone, error);
            return true;
        }
    }
    
    function validatePassword() {
        const password = document.getElementById('password');
        const error = document.getElementById('passwordError');
        
        if (!password.value) {
            showError(password, error, 'Password is required');
            return false;
        } else if (!passwordRegex.test(password.value)) {
            showError(password, error, 'Password must meet all requirements');
            return false;
        } else {
            showSuccess(password, error);
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const error = document.getElementById('confirmPasswordError');
        
        if (!confirmPassword.value) {
            showError(confirmPassword, error, 'Please confirm your password');
            return false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, error, 'Passwords do not match');
            return false;
        } else {
            showSuccess(confirmPassword, error);
            return true;
        }
    }
    
    function validateAge() {
        const age = document.getElementById('age');
        const error = document.getElementById('ageError');
        const ageValue = parseInt(age.value);
        
        if (!age.value) {
            showError(age, error, 'Age is required');
            return false;
        } else if (ageValue < 13 || ageValue > 120) {
            showError(age, error, 'Age must be between 13 and 120');
            return false;
        } else {
            showSuccess(age, error);
            return true;
        }
    }
    
    function validateTerms() {
        const terms = document.getElementById('terms');
        const error = document.getElementById('termsError');
        
        if (!terms.checked) {
            showError(terms, error, 'You must agree to the terms and conditions');
            return false;
        } else {
            showSuccess(terms, error);
            return true;
        }
    }
    
    // Helper functions for showing validation results
    function showError(field, errorElement, message) {
        field.classList.remove('valid');
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
    }
    
    function showSuccess(field, errorElement) {
        field.classList.remove('error');
        field.classList.add('valid');
        errorElement.textContent = '';
    }
    
    // Real-time validation event listeners
    if (document.getElementById('firstName')) {
        document.getElementById('firstName').addEventListener('blur', validateFirstName);
    }
    if (document.getElementById('lastName')) {
        document.getElementById('lastName').addEventListener('blur', validateLastName);
    }
    if (document.getElementById('email')) {
        document.getElementById('email').addEventListener('blur', validateEmail);
    }
    if (document.getElementById('phone')) {
        document.getElementById('phone').addEventListener('blur', validatePhone);
    }
    if (document.getElementById('password')) {
        document.getElementById('password').addEventListener('blur', validatePassword);
    }
    if (document.getElementById('confirmPassword')) {
        document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);
        document.getElementById('confirmPassword').addEventListener('input', function() {
            if (this.value.length > 0) {
                validateConfirmPassword();
            }
        });
    }
    if (document.getElementById('age')) {
        document.getElementById('age').addEventListener('blur', validateAge);
    }
    if (document.getElementById('terms')) {
        document.getElementById('terms').addEventListener('change', validateTerms);
    }
    
    // Form submission event listener
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Validate all fields
            const isFirstNameValid = validateFirstName();
            const isLastNameValid = validateLastName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            const isAgeValid = validateAge();
            const isTermsValid = validateTerms();
            
            // Check if all validations passed
            const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid && 
                               isPhoneValid && isPasswordValid && isConfirmPasswordValid && 
                               isAgeValid && isTermsValid;
            
            if (isFormValid) {
                // Hide form and show success message
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
                addMessage('🎉 Registration completed successfully!');
            } else {
                addMessage('❌ Please fix the form errors before submitting');
                
                // Focus on first invalid field
                const firstInvalidField = form.querySelector('.error');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });
    }
    
    // =======================
    // ADDITIONAL INTERACTIVE FEATURES
    // =======================
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'Ctrl + D' to toggle light/dark mode
        if (e.key.toLowerCase() === 'd' && e.ctrlKey) {
            e.preventDefault();
            darkModeToggle.click();
        }
        
        // Press 'Ctrl + +' to increment counter
        if (e.key === '+' && e.ctrlKey && incrementBtn) {
            e.preventDefault();
            incrementBtn.click();
        }
        
        // Press 'Ctrl + -' to decrement counter
        if (e.key === '-' && e.ctrlKey && decrementBtn) {
            e.preventDefault();
            decrementBtn.click();
        }
        
        // Press 'Escape' to close any open FAQ
        if (e.key === 'Escape') {
            const activeFaq = document.querySelector('.faq-question.active');
            if (activeFaq) {
                activeFaq.click();
            }
        }
    });
    
    // Add smooth hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .faq-question, .tab-btn');
    interactiveElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('translateY')) {
                this.style.transform = 'translateY(-1px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize counter display
    updateCounterDisplay();
    
    // Add welcome message on page load with delay
    setTimeout(function() {
        addMessage('Welcome to the Interactive Web Experience! 🚀');
        setTimeout(function() {
            addMessage('💡 Try Ctrl+D to toggle themes, or explore the features below');
        }, 1000);
    }, 500);
    
    // Console welcome message
    console.log('🎉 Interactive Web Page JavaScript loaded successfully!');
    console.log('💡 Try these keyboard shortcuts:');
    console.log('   - Ctrl + D: Toggle light/dark mode');
    console.log('   - Ctrl + +: Increment counter');
    console.log('   - Ctrl + -: Decrement counter');
    console.log('   - Escape: Close open FAQ');
    
    // Theme change observer to update counter colors
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                updateCounterDisplay();
            }
        });
    });
    
    observer.observe(body, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// =======================
// UTILITY FUNCTIONS (Available globally)
// =======================

// Function to simulate typing effect (bonus feature)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Function to add smooth transitions to elements
function addSmoothTransitions(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function(element) {
        element.style.transition = 'all 0.2s ease';
    });
}

// Function to create ripple effect on button clicks
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});