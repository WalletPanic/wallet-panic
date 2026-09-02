(async function protectPage() {
    try {
        const response = await fetch("/api/me");
        if (!response.ok) {
            window.location.replace("index.html");
            return;
        }

        const { user } = await response.json();
        document.documentElement.dataset.authenticatedUser = user.userId;

        document.querySelectorAll(".login-link").forEach((link) => {
            link.textContent = `LOG OUT (${user.userId})`;
            link.href = "#";
            link.addEventListener("click", async (event) => {
                event.preventDefault();
                await fetch("/api/logout", { method: "POST" });
                window.location.replace("index.html");
            });
        });
    } catch {
        window.location.replace("index.html");
    }
})();
