import {questions} from "./questions.js";

const scorecard = document.querySelector("#scorecard");
const currentNumberOutput = document.querySelector("#current-number-output");
const numberOfQuestionsOutput = document.querySelector("#number-of-questions-output");
const timeOutput = document.querySelector("#time-output");
const nextBtn = document.querySelector("#next-btn");
const answerBtn = document.querySelector("#answer");
const startBtn = document.querySelector("#start-btn");
const questionBody = document.querySelector("#quiz-body");

let currentScore = 0;
let currentTime = 180;
let numberOfQuestions = questions.length;
let currentQuestionNumber = 0;

scorecard.innerHTML = currentScore;
timeOutput.innerHTML = currentTime;
numberOfQuestionsOutput.innerHTML = numberOfQuestions;
currentNumberOutput.innerHTML = currentQuestionNumber;

function startQuiz(){

}

function startTimer() {
    let counter = currentTime;  
    const interval = setInterval(() => {
      timeOutput.innerHTML = counter;
      counter--;
      if (counter < 0 ) {
        clearInterval(interval);
        questionBody.innerHTML = "<h2>Times Up! <br> You Scored " + currentScore + "</h2>";
      }
    }, 1000);
}

function nextQuestion(){

}

function checkAnswer(){

}

startBtn.addEventListener("click", () => {
   currentQuestionNumber = 1;
   currentNumberOutput.innerHTML = currentQuestionNumber;
   startTimer();
   startQuiz();
});

answerBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
    currentQuestionNumber = currentQuestionNumber + 1;
    currentNumberOutput.innerHTML = currentQuestionNumber;
    nextQuestion();
});
