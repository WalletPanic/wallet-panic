const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const formMessage = document.getElementById("formMessage");
const submitButton = loginForm.querySelector(
    "button[type='submit']"
);

// 이미 로그인한 사용자는 그룹 페이지로 이동
checkExistingSession();

async function checkExistingSession() {
    const {
        data: { session },
        error
    } = await window.supabaseClient.auth.getSession();

    if (error) {
        console.error("Session check error:", error);
        return;
    }

    if (session) {
        window.location.replace("new-group.html");
    }
}

// 로그인 폼 제출
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email) {
        showMessage("Enter your email.");
        emailInput.focus();
        return;
    }

    if (!emailInput.validity.valid) {
        showMessage("Enter a valid email address.");
        emailInput.focus();
        return;
    }

    if (!password) {
        showMessage("Enter your password.");
        passwordInput.focus();
        return;
    }

    setLoading(true);
    showMessage("");

    try {
        const { data, error } =
            await window.supabaseClient.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            console.error("Login error:", error);

            showMessage(
                "Email or password is incorrect."
            );

            return;
        }

        if (!data.session) {
            showMessage(
                "Login failed. Please try again."
            );

            return;
        }

        // 로그인 성공
        window.location.replace("new-group.html");

    } catch (error) {
        console.error("Unexpected login error:", error);

        showMessage(
            "Unable to connect. Please try again."
        );

    } finally {
        setLoading(false);
    }
});

function showMessage(message) {
    formMessage.textContent = message;
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;

    submitButton.textContent = isLoading
        ? "SIGNING IN..."
        : "SIGN IN";
}
