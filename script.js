const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("백엔드주소/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                userId: userId,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log("계정 저장 성공");

            // 나중에 화면 전환할 때 사용
            // window.location.href = "next.html";
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error(error);

        alert("서버에 연결할 수 없습니다.");
    }
});
