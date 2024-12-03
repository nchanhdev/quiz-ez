let quizData = [];

fetch("data.json")
  .then((response) => response.json())
  .then((json) => (quizData = json));

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;

  optionsElement.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.setAttribute("id", `button-${index}`);
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const answer = quizData[currentQuestion].answer;

  if (selectedButton.innerText === answer) {
    score++;
  }

  showAnswerColor();

  currentQuestion++;

  // if (currentQuestion < quizData.length) {
  //   showQuestion();
  // } else {
  //   showResult();
  // }
}

function showResult() {
  quiz.innerHTML = `
    <h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${quizData.length}</p>
  `;
}

function setColorOptions(elmID) {
  document.getElementById(elmID).classList.add("mystyle");
}

function showAnswerColor() {
  const _optionButtons = document
    .getElementById("options")
    .querySelectorAll("button");

  _optionButtons.forEach((value, idx) => {
    if (quizData[currentQuestion].answer == value.textContent) {
      document.getElementById(`button-${idx}`).classList.add("btn-success");
    } else {
      document.getElementById(`button-${idx}`).classList.add("btn-danger");
    }
    console.log(value.textContent);
  });
  // console.log(_options.querySelectorAll("button")[1].textContent);

  // console.log(quizData[currentQuestion], _options.querySelector("button"));
}

setTimeout(() => {
  showQuestion();
}, 100);
