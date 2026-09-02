(async function protectPage() {
    try {
        // Supabase에서 현재 로그인한 사용자 확인
        const {
            data: { user },
            error
        } = await window.supabaseClient.auth.getUser();

        // 로그인 정보가 없으면 로그인 페이지로 이동
        if (error || !user) {
            window.location.replace("index.html");
            return;
        }

        // 기존 authenticatedUser 데이터 유지
        document.documentElement.dataset.authenticatedUser =
            user.email;

        // 사이드바 로그인 링크를 로그아웃 링크로 변경
        document.querySelectorAll(".login-link").forEach((link) => {
            link.textContent = `LOG OUT (${user.email})`;
            link.href = "#";

            link.addEventListener("click", async (event) => {
                event.preventDefault();

                const originalText = link.textContent;

                link.textContent = "LOGGING OUT...";

                // Supabase 로그아웃
                const { error: logoutError } =
                    await window.supabaseClient.auth.signOut();

                if (logoutError) {
                    console.error(
                        "Logout error:",
                        logoutError
                    );

                    alert(
                        "Could not log out. Please try again."
                    );

                    link.textContent = originalText;
                    return;
                }

                // 로그아웃 성공
                window.location.replace("index.html");
            });
        });

    } catch (error) {
        console.error("Authentication error:", error);

        window.location.replace("index.html");
    }
})();
