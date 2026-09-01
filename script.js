const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");

passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        if (userId === "" || password === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        window.location.href = "new-group.html";
    }

});
