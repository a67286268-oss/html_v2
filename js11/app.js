// app.js

// ----- 공통 요소 선택 -----
const getTodoBtn = document.getElementById("getTodoBtn");
const postBtn = document.getElementById("postBtn");
const patchBtn = document.getElementById("patchBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");
const listBtn = document.getElementById("listBtn");
const resultDisplay = document.getElementById("resultDisplay");
const todoList = document.getElementById("todoList");

// API 기본 주소 - "http://localhost:8080/api"
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 결과를 pre 태그에 보여주는 헬퍼 함수
function showResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
}

// 1. GET 조회
async function fetchTodo() {
  resultDisplay.textContent = "Loading (GET) ......";
  try {
    // 1) 요청을 보내고 응답이 도착할 대까지 여기서 잠시 대기
    //    fetch 함수에서 기본값을 GET 요청이다.
    const response = await fetch(`${BASE_URL}/todos/1`);

    console.log(response.status); // 응답 상태코드

    // 2) 응답 본문 (json 문자열)을 객체로 바꿀 때까지 기다린다.
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

getTodoBtn.addEventListener("click", fetchTodo);
