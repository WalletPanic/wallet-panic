const signupForm = document.getElementById("signupForm");
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const formMessage = document.getElementById("formMessage");
const submitButton = signupForm.querySelector("button[type='submit']");

fetch("/api/me")
    .then((response) => {
        if (response.ok) window.location.replace("new-group.html");
    })
    .catch(() => {});

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = userIdInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!/^[A-Za-z0-9_]{3,30}$/.test(userId)) {
        showMessage("ID must be 3–30 characters and use only letters, numbers, or _.");
        return;
    }
    if (password.length < 8) {
        showMessage("Password must be at least 8 characters.");
        return;
    }
    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
    }

    setLoading(true);
    showMessage("");

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, password })
        });
        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message || "Could not create the account.");
            return;
        }

        window.location.replace("new-group.html");
    } catch {
        showMessage("Cannot reach the server. Please try again.");
    } finally {
        setLoading(false);
    }
});

function showMessage(message) {
    formMessage.textContent = message;
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "CREATING..." : "CREATE ACCOUNT";
}
