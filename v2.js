import {questions} from "./questions.js";

const scorecard = document.querySelector("[data-output='scorecard']");
const currentNumberOutput = document.querySelector("[data-output='current-number-output']");
const numberOfQuestionsOutput = document.querySelector("[data-output='number-of-questions-output']");
const timeOutput = document.querySelector("[data-output='time-output']");
const quizBody = document.querySelector("[data-output='quiz-body']");

const operators = document.querySelectorAll("[data-operator]");
const startBtn = document.querySelector("[data-operator='start']");
const finishBtn = document.querySelector("[data-operator='finish']");
const restartBtn = document.querySelector("[data-operator='restart']");
const nextBtn = document.querySelector("[data-operator='next']");

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

function hide(button){
    button.classList.add('hide');
    button.classList.remove('show');
}

function show(button){
    button.classList.add('show');
    button.classList.remove('hide');
}

function startQuiz(){
    hide(startBtn);
    hide(restartBtn);
    nextQuestion();
    startTimer(); 
}

function nextQuestion(){
  currentQuestionNumber = currentQuestionNumber + 1;
  currentNumberOutput.innerHTML = currentQuestionNumber;
  hide(nextBtn);

  const questionsOutput = [];
  questions.forEach(
    (currentQ, qNumber) =>{
      const answers = [];
      questions[qNumber].answers.forEach( currentAnswer => {
        answers.push(
          `<button data-operator="answer-btn" data-correct="${currentAnswer.correctAnswer}" class="answer-btn"> ${currentAnswer.answer} </button>`
        )
      });
      questionsOutput.push(
        `<h2>${currentQ.question}</h2>
         ${answers.join('')}
        `
      );
    }
  );
  quizBody.innerHTML = questionsOutput[currentQuestionNumber - 1];
  hide(nextBtn);
  answerQuestion();
}

function startTimer() {
    counter = currentTime;  
    interval = setInterval(() => {
      timeOutput.innerHTML = counter;
      counter--;
      if (counter < 0 ) {
        clearInterval(interval);
        quizBody.innerHTML = `<h2>Times Up! <br> You Scored ${currentScore} / ${numberOfQuestions} </h2>`;
        show(startBtn);
      }
    }, 1000);
}

function answerQuestion(){
    answerBtns = document.querySelectorAll("[data-operator='answer-btn']");
    answerBtns.forEach( (i) =>{
      i.addEventListener("click", () => {

        let correct = i.dataset.correct;
        if(correct == "true"){
          i.classList.add('correct');
          updateScore();
        }else{
          i.classList.add('wrong');
          const correctAnswer = document.querySelector("[data-correct='true']");
          correctAnswer.classList.add('correct');     
        }
        disableBtns();
    
        if(currentQuestionNumber == numberOfQuestions){
            show(finishBtn);
        }else{
            show(nextBtn);
        }
        
      });
    });
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

function endQuiz(){
  quizBody.innerHTML = `<h2>End of quiz! <br> You Scored ${currentScore}  / ${numberOfQuestions} </h2>`;
  hide(finishBtn);
  show(restartBtn);
  clearInterval(interval);
}

operators.forEach( i =>{
    i.addEventListener("click", ()=>{
        let operator = i.dataset.operator;
        switch (operator){
            case "start":

                startQuiz();
                break;

            case "next":

                nextQuestion();
                break;

            case "finish":

                endQuiz();
                break;

            case "restart":

                location.reload();
                break;

            default:
                console.log('No operator found');
                break;
        }
    });
});