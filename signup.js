const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const formMessage =
    document.getElementById("formMessage");

const submitButton = signupForm.querySelector(
    "button[type='submit']"
);

// 이미 로그인한 사용자는 그룹 페이지로 이동
checkExistingSession();

async function checkExistingSession() {
    const {
        data: { session }
    } = await window.supabaseClient.auth.getSession();

    if (session) {
        window.location.replace("new-group.html");
    }
}

// 회원가입 폼 제출
signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

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

    if (password.length < 8) {
        showMessage(
            "Password must be at least 8 characters."
        );

        passwordInput.focus();
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");

        confirmPasswordInput.focus();
        return;
    }

    setLoading(true);
    showMessage("");

    try {
        const { data, error } =
            await window.supabaseClient.auth.signUp({
                email,
                password,

                options: {
                    emailRedirectTo:
                        "https://walletpanic.github.io/wallet-panic/index.html"
                }
            });

        if (error) {
            console.error("Signup error:", error);
            showMessage(getSignupErrorMessage(error));
            return;
        }

        // Confirm email이 꺼져 있으면 바로 로그인됨
        if (data.session) {
            window.location.replace("new-group.html");
            return;
        }

        // Confirm email이 켜져 있으면 이메일 확인 필요
        showMessage(
            "Account created! Check your email to confirm your account."
        );

        submitButton.textContent = "CHECK YOUR EMAIL";
        submitButton.disabled = true;

    } catch (error) {
        console.error("Unexpected signup error:", error);

        showMessage(
            "Unable to connect. Please try again."
        );

    } finally {
        // 이메일 확인 상태가 아닐 때만 버튼 복구
        if (submitButton.textContent !== "CHECK YOUR EMAIL") {
            setLoading(false);
        }
    }
});

function getSignupErrorMessage(error) {
    const message = error.message.toLowerCase();

    if (
        message.includes("already registered") ||
        message.includes("already exists")
    ) {
        return "This email is already registered.";
    }

    if (message.includes("password")) {
        return "Please use a stronger password.";
    }

    if (message.includes("email")) {
        return "Enter a valid email address.";
    }

    return error.message;
}

function showMessage(message) {
    formMessage.textContent = message;
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;

    submitButton.textContent = isLoading
        ? "CREATING..."
        : "CREATE ACCOUNT";
}
