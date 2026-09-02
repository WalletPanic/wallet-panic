const userEmailElement =
    document.getElementById("userEmail");

loadUser();


async function loadUser() {

    const {
        data: { user },
        error
    } = await window.supabaseClient.auth.getUser();


    if (error) {
        console.error("User load error:", error);

        userEmailElement.textContent =
            "Unable to load email.";

        return;
    }


    // 로그인되지 않은 상태
    if (!user) {

        window.location.replace("index.html");

        return;
    }


    // 현재 로그인한 사용자의 이메일 표시
    userEmailElement.textContent = user.email;

}
