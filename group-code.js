const groupCodeElement = document.getElementById("groupCode");
const copyButton = document.getElementById("copyButton");
const createButton = document.getElementById("createButton");


function createGroupCode() {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const codeCharacters = [];


    // 영어 대문자 4개
    for (let i = 0; i < 4; i++) {

        const randomIndex =
            Math.floor(Math.random() * letters.length);

        codeCharacters.push(letters[randomIndex]);

    }


    // 숫자 2개
    for (let i = 0; i < 2; i++) {

        const randomIndex =
            Math.floor(Math.random() * numbers.length);

        codeCharacters.push(numbers[randomIndex]);

    }


    // 순서를 무작위로 섞기
    for (let i = codeCharacters.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        const temp = codeCharacters[i];

        codeCharacters[i] = codeCharacters[randomIndex];
        codeCharacters[randomIndex] = temp;

    }


    return codeCharacters.join("");
}


// 페이지가 열리면 코드 생성
const generatedCode = createGroupCode();

groupCodeElement.textContent = generatedCode;


// 나중에 DB 저장할 수 있도록 기억
localStorage.setItem("groupCode", generatedCode);


// 복사 버튼
copyButton.addEventListener("click", async function () {

    await navigator.clipboard.writeText(generatedCode);

    alert("그룹 코드가 복사되었습니다.");

});


// CREATE 버튼
createButton.addEventListener("click", function () {

    const groupSize = Number(localStorage.getItem("groupSize"));

    // 1명 그룹
    if (groupSize === 1) {

        window.location.href = "dashboard.html";
        return;

    }

    // 2~6명 그룹
    if (groupSize >= 2 && groupSize <= 6) {

        alert("다인 그룹 기능은 업데이트 예정입니다. 조금만 기다려주세요!");
        return;

    }

    alert("그룹 인원 정보를 확인할 수 없습니다.");

});
