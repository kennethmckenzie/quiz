import {questions} from "./questions.js";

const scorecard = document.querySelector("#scorecard");
const currentNumberOutput = document.querySelector("#current-number-output");
const numberOfQuestionsOutput = document.querySelector("#number-of-questions-output");
const timeOutput = document.querySelector("#time-output");
const nextBtn = document.querySelector("#next-btn");
const startBtn = document.querySelector("#start-btn");
const questionBody = document.querySelector("#quiz-body");
const finishBtn = document.querySelector("#finish-btn");
const restartBtn = document.querySelector("#restart-btn");

let answerBtns = "";
let currentScore = 0;
let currentTime = 180;
let numberOfQuestions = questions.length;
let currentQuestionNumber = 0;
let interval = "";
let counter = "";

timeOutput.innerHTML = currentTime;
numberOfQuestionsOutput.innerHTML = numberOfQuestions;
currentNumberOutput.innerHTML = currentQuestionNumber;
scorecard.innerHTML = currentScore;

function endQuiz(){
  questionBody.innerHTML = "<h2>End of quiz! <br> You Scored " + currentScore + " / " + numberOfQuestions + "</h2>";
  finishBtn.classList.remove('show');
  finishBtn.classList.add('hide');
  restartBtn.classList.remove('hide');
  restartBtn.classList.add('show');
  clearInterval(interval);
}

function answerQuestion(){
  answerBtns = document.querySelectorAll(".answer-btn");
  answerBtns.forEach( (i) =>{
    i.addEventListener("click", () => {

      if(i.classList.contains('true')){
        i.classList.add('correct');
        updateScore();
      }else{
        i.classList.add('wrong');
        const correctAnswer = document.querySelector(".true");
        correctAnswer.classList.add('correct');
        
      }
      disableBtns();
  
      if(currentQuestionNumber == numberOfQuestions){
        finishBtn.classList.add('show');
      }else{
        nextBtn.classList.add('show');
      }
      
    });
  });
}

function startQuiz(){
  startBtn.classList.add('hide');
  restartBtn.classList.remove('show');
  restartBtn.classList.add('hide');

  nextQuestion();
  answerQuestion();
  startTimer();

}

function updateScore(){
  currentScore = currentScore + 1;
  scorecard.innerHTML = currentScore;
}

function disableBtns(){
  answerBtns.forEach( (i) =>{
    i.disabled= true;
    i.style.pointerEvents = "none";
  });
}

function startTimer() {
    counter = currentTime;  
    interval = setInterval(() => {
      timeOutput.innerHTML = counter;
      counter--;
      if (counter < 0 ) {
        clearInterval(interval);
        questionBody.innerHTML = "<h2>Times Up! <br> You Scored " + currentScore + " / " + numberOfQuestions + "</h2>";
        startBtn.classList.add('show');
      }
    }, 1000);
}

function nextQuestion(){
  currentQuestionNumber = currentQuestionNumber + 1;
  currentNumberOutput.innerHTML = currentQuestionNumber;
  currentNumberOutput.innerHTML = currentQuestionNumber;
  nextBtn.classList.add('hide');

  const questionsOutput = [];
  questions.forEach(
    (currentQ, qNumber) =>{
      const answers = [];
      questions[qNumber].answers.forEach( currentAnswer => {
        answers.push(
          `<button class="answer-btn ${currentAnswer.correctAnswer}"> ${currentAnswer.answer} </button>`
        )
      });
      questionsOutput.push(
        `<h2>${currentQ.question}</h2>
         ${answers.join('')}
        `
      );
    }
  );
  questionBody.innerHTML = questionsOutput[currentQuestionNumber - 1];
  nextBtn.classList.remove('show');
  nextBtn.classList.add('hide');
}

function restartQuiz(){
  location.reload();
}

startBtn.addEventListener("click", () => {
   startQuiz();
});

nextBtn.addEventListener("click", () => {
    nextQuestion();
    answerQuestion();
});

finishBtn.addEventListener("click", () => {
  endQuiz();
});

restartBtn.addEventListener("click", () => {
  restartQuiz();
});
