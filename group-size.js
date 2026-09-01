const minusButton = document.getElementById("minusButton");
const plusButton = document.getElementById("plusButton");
const participantCount = document.getElementById("participantCount");
const nextButton = document.getElementById("participantNext");

let count = 1;


// 마이너스 버튼
minusButton.addEventListener("click", function () {

    if (count > 1) {
        count = count - 1;
        participantCount.textContent = count;
    }

});


// 플러스 버튼
plusButton.addEventListener("click", function () {

    if (count < 6) {
        count = count + 1;
        participantCount.textContent = count;
    }

});


// NEXT
nextButton.addEventListener("click", function () {

    // 선택한 인원수를 잠시 저장
    localStorage.setItem("groupSize", count);

    // 2번 페이지로 이동
    window.location.href = "group-name.html";

});
