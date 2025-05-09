function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  // Simulate form submission
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
    .then(() => {
      // Redirect to the main page and scroll to a specific section
      window.location.href = "index.html#contact";
      alert("Votre message a été envoyé avec succès !");
    })
    .catch(() => {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    });
}
/**
 * Form submission handler with validation and feedback
 * @param {Event} event - The form submission event
 */
function handleFormSubmit(event) {
  // Get form elements
  const form = event.target;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const telephoneInput = document.getElementById('telephone');
  const datesInput = document.getElementById('dates');
  
  // Basic validation
  if (!validateForm(nameInput, emailInput, subjectInput, telephoneInput, datesInput)) {
    event.preventDefault();
    return false;
  }
  
  // Show loading state on button
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.innerHTML = 'Envoi en cours...';
  submitButton.disabled = true;
  
  // Allow form to submit normally since we're using FormSubmit service
  // The page will redirect to FormSubmit's thank you page
  
  // Optional: Show a confirmation message before form submits (uncomment if desired)
  /*
  event.preventDefault();
  setTimeout(() => {
    alert('Merci pour votre message ! Nous vous contacterons très bientôt.');
    form.reset();
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
    // Now submit the form programmatically
    form.submit();
  }, 1000);
  */
  
  return true;
}

/**
 * Form validation function
 * @param {HTMLElement} nameInput - The name input element
 * @param {HTMLElement} emailInput - The email input element
 * @param {HTMLElement} subjectInput - The subject input element
 * @param {HTMLElement} telephoneInput - The telephone input element
 * @param {HTMLElement} datesInput - The dates input element
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(nameInput, emailInput, subjectInput, telephoneInput, datesInput) {
  let isValid = true;
  
  // Reset previous error styling
  [nameInput, emailInput, subjectInput, telephoneInput, datesInput].forEach(input => {
    if (input) {
      input.style.borderColor = '';
      input.style.backgroundColor = '';
    }
  });
  
  // Name validation
  if (!nameInput || nameInput.value.trim() === '') {
    showError(nameInput, 'Veuillez entrer votre nom');
    isValid = false;
  }
  
  // Email validation
  if (!emailInput || !isValidEmail(emailInput.value)) {
    showError(emailInput, 'Veuillez entrer une adresse email valide');
    isValid = false;
  }
  
  // Subject validation
  if (!subjectInput || subjectInput.value.trim() === '') {
    showError(subjectInput, 'Veuillez entrer un objet pour votre message');
    isValid = false;
  }
  
  // Telephone validation
  if (!telephoneInput || !isValidPhone(telephoneInput.value)) {
    showError(telephoneInput, 'Veuillez entrer un numéro de téléphone valide');
    isValid = false;
  }
  
  // Dates validation
  if (!datesInput || datesInput.value.trim() === '') {
    showError(datesInput, 'Veuillez entrer les dates souhaitées');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Shows an error for an input element
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showError(input, message) {
  if (!input) return;
  
  // Visual feedback
  input.style.borderColor = '#e74c3c';
  input.style.backgroundColor = 'rgba(231, 76, 60, 0.05)';
  
  // Add tooltip or message if needed
  input.setAttribute('title', message);
  input.setAttribute('aria-invalid', 'true');
  
  // Optional: Display error message below the input
  // Remove any existing error message
  const existingError = input.parentNode.querySelector('.error-message');
  if (existingError) {
    input.parentNode.removeChild(existingError);
  }
  
  // Create and insert error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.style.color = '#e74c3c';
  errorElement.style.fontSize = '12px';
  errorElement.style.marginTop = '-15px';
  errorElement.style.marginBottom = '10px';
  errorElement.textContent = message;
  
  input.parentNode.insertBefore(errorElement, input.nextSibling);
  
  // Focus the first invalid input
  input.focus();
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function isValidPhone(phone) {
  // Allow various formats of French phone numbers
  // Accepts formats like: 0612345678, 06 12 34 56 78, +33 6 12 34 56 78, etc.
  const phoneRegex = /^(\+33|0)[1-9](\s*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Newsletter form handling
 */
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForms = document.querySelectorAll('.info_form form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (!emailInput || !isValidEmail(emailInput.value)) {
        alert('Veuillez entrer une adresse email valide');
        return;
      }
      
      // Show success message
      const button = this.querySelector('button');
      const originalText = button.textContent;
      
      button.textContent = 'Inscrit !';
      button.style.backgroundColor = '#27ae60';
      
      // Reset form and button after delay
      setTimeout(() => {
        emailInput.value = '';
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    });
  });
});