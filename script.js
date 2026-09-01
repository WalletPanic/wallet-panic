const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    // 원래 form의 새로고침 동작 막기
    event.preventDefault();

    // 입력한 ID와 Password 가져오기
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();


    // 아무것도 입력하지 않은 경우
    if (userId === "" || password === "") {

        alert("아이디와 비밀번호를 입력해주세요.");

        return;
    }


    // 1번 페이지로 이동
    window.location.href = "new-group.html";

});
