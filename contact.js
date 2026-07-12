document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [header, footer] = await Promise.all([
            fetch("header.html").then(res => res.text()),
            fetch("footer.html").then(res => res.text())
        ]);

        document.getElementById("header").innerHTML = header;
        document.getElementById("footer").innerHTML = footer;

        // Call common functionality after HTML is loaded
        loadCommonFunctions();


        // From Validations
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');


        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        const maxCount = 300;
        const submitBtn = document.getElementById("submit-btn");
        const formSuccess = document.getElementById('formSuccess');

        //  First name validation
        function validateFirstName() {
            const firstNameValue = firstName.value.trim();
            // Regex allowing only English letters, spaces, hyphens, and apostrophes
            const nameRegex = /^[a-zA-Z\s'-]+$/;
            clearError(firstNameError);

            // Rule 1: Check if the field is completely empty
            if (firstNameValue === "") {
                showError("First Name field cannot be left blank.", firstNameError);
                return false;
            }

            // Rule 2: Enforce a minimum length requirement
            if (firstNameValue.length < 2) {
                showError(" First Name must contain at least 2 characters.", firstNameError);
                return false;
            }

            // Rule 3: Enforce format restrictions via regex test
            if (!nameRegex.test(firstNameValue)) {
                showError(" First Name can only contain letters, spaces, hyphens, or apostrophes.", firstNameError);
                return false;
            }
            return true;
        }

        //  Last name validation
        function validateLastName() {
            const lastNameValue = lastName.value.trim();
            // Regex allowing only English letters, spaces, hyphens, and apostrophes
            const nameRegex = /^[a-zA-Z\s'-]+$/;
            clearError(lastNameError);

            // Rule 1: Check if the field is completely empty
            if (lastNameValue === "") {
                showError("Last Name field cannot be left blank.", lastNameError);
                return false;
            }

            // Rule 2: Enforce a minimum length requirement
            if (lastNameValue.length < 2) {
                showError("Last Name must contain at least 2 characters.", lastNameError);
                return false;
            }

            // Rule 3: Enforce format restrictions via regex test
            if (!nameRegex.test(lastNameValue)) {
                showError("Last Name can only contalastNameValuein letters, spaces, hyphens, or apostrophes.", lastNameError);
                return false;
            }
            return true;
        }

        // Email validation
        function validateEmail() {
            const emailValue = email.value.trim();
            clearError(emailError);

            // Rule 1: Check if the field is completely empty
            if (emailValue === "") {
                showError("Email field cannot be left blank.", emailError);
                return false;
            }

            // Rule 2: Regex pattern 
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(emailValue)) {
                showError("Enter proper email format", emailError);
                return false;
            }

            return true;
        }

        // Phone validation
        function validatePhone() {
            const phoneValue = phone.value.trim();
            clearError(phoneError);
            const phoneRegex = /^[0-9]\d{9}$/;

            if (phoneValue === "") {
                showError("Phone number cannot be empty.", phoneError);
                return false;
            }

            if (!phoneRegex.test(phoneValue)) {
                showError("Enter a valid 10 digit mobile number.", phoneError);
                return false;
            }

            return true;
        }

        // Subject validation
        function validateSubject() {
            const subjectValue = subject.value.trim();
            clearError(subjectError);

            if (subjectValue === "") {
                showError("Please select a topic.", subjectError);
                return false;
            }
            return true;
        }

        // Message validation
        function validateMessage() {
            const messageValue = message.value.trim();
            clearError(messageError);

            // Rule 1: Check if the field is completely empty
            if (messageValue === "") {
                showError("Text area cannot be left blank.", messageError);
                return false;
            }

            // Rule 2: Enforce a maximum length requirement
            if (messageValue.length == maxCount) {
                showError("Text area must contain maximum 300 characters.", messageError);
                return false;
            }
            return true;
        }

        // First name validation
        firstName.addEventListener("keyup", () => {
            validateFirstName();
        });

        // Last name validation
        lastName.addEventListener("keyup", () => {
            validateLastName();
        });

        // Email validation
        email.addEventListener("keyup", () => {
            validateEmail();
        });

        // Phone validation
        phone.addEventListener("keyup", () => {
            validatePhone();
        });

        // Subject validation
        subject.addEventListener("change", () => {
            validateSubject();
        });

        // Message validation
        message.addEventListener("keyup", () => {
            validateMessage();
        });

        // Submit Form
        submitBtn.addEventListener("click", () => {
            if (validateFirstName() && validateLastName() && validateEmail()
                && validatePhone() && validateSubject() && validateMessage()) {

                if (formSuccess) {
                    formSuccess.classList.add("show");
                    document.getElementById("contactForm").reset();
                }
            }

        });



    } catch (error) {
        console.error("Failed to load components:", error);
    }
});


// Clear any existing error state
function clearError(error) {
    error.textContent = "";
    error.classList.add("hidden-errorMessage");
}

// Error Message
function showError(message, errorDisplay) {
    errorDisplay.textContent = message;
    errorDisplay.classList.remove("hidden-errorMessage");
}
