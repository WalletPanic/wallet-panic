const groupNameInput = document.getElementById("groupName");
const currentLength = document.getElementById("currentLength");
const nextButton = document.getElementById("nameNext");


// 글자 수 표시
groupNameInput.addEventListener("input", function () {

    currentLength.textContent = groupNameInput.value.length;

});


// NEXT
nextButton.addEventListener("click", function () {

    const groupName = groupNameInput.value.trim();

    if (groupName === "") {
        alert("그룹명을 입력해주세요.");
        return;
    }

    // 그룹명 저장
    localStorage.setItem("groupName", groupName);

    // 3번 페이지
    window.location.href = "group-code.html";

});
