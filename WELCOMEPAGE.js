document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    const loginPasswordInput = document.getElementById('login-password');
    const loginPasswordStrength = document.getElementById('login-password-strength');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupPasswordStrength = document.getElementById('signup-password-strength');

    loginPasswordInput.addEventListener('input', () => {
        const strength = getPasswordStrength(loginPasswordInput.value);
        loginPasswordStrength.textContent = `Password strength: ${strength}`;
        loginPasswordStrength.style.color = getStrengthColor(strength);
    });

    signupPasswordInput.addEventListener('input', () => {
        const strength = getPasswordStrength(signupPasswordInput.value);
        signupPasswordStrength.textContent = `Password strength: ${strength}`;
        signupPasswordStrength.style.color = getStrengthColor(strength);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Redirect to LEARNINGPATH.html
        window.location.href = 'LEARNINGPATH.html';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your sign-up logic here, including additional data validation if necessary

        // For example, validating the age
        const dob = new Date(document.getElementById('dob').value);
        const age = calculateAge(dob);
        if (age < 18) {
            alert('You must be at least 18 years old to sign up.');
            return;
        }

        // Redirect to LEARNINGPATH.html
        window.location.href = 'LEARNINGPATH.html';
    });

    function getPasswordStrength(password) {
        let strength = 'Weak';
        if (password.length >= 8) {
            strength = 'Medium';
        }
        if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password)) {
            strength = 'Strong';
        }
        return strength;
    }

    function getStrengthColor(strength) {
        switch (strength) {
            case 'Weak':
                return 'red';
            case 'Medium':
                return 'orange';
            case 'Strong':
                return 'green';
            default:
                return 'black';
        }
    }

    function calculateAge(dob) {
        const diff = Date.now() - dob.getTime();
        const age = new Date(diff);
        return Math.abs(age.getUTCFullYear() - 1970);
    }
});
