import {questions} from "./questions.js";

const operators = document.querySelectorAll("[data-operator]");

class Quiz{
    constructor(questions){
        this.questions = questions;
        this.scorecard = document.querySelector("[data-output='scorecard']");
        this.currentNumberOutput = document.querySelector("[data-output='current-number-output']");
        this.numberOfQuestionsOutput = document.querySelector("[data-output='number-of-questions-output']");
        this.timeOutput = document.querySelector("[data-output='time-output']");
        this.quizBody = document.querySelector("[data-output='quiz-body']");
        this.startBtn = document.querySelector("[data-operator='start']");
        this.finishBtn = document.querySelector("[data-operator='finish']");
        this.restartBtn = document.querySelector("[data-operator='restart']");
        this.nextBtn = document.querySelector("[data-operator='next']");

        this.answerBtns = "";
        this.currentScore = 0;
        this.currentTime = 180;
        this.numberOfQuestions = questions.length;
        this.currentQuestionNumber = 0;
        this.interval = "";
        this.counter = "";

        this.timeOutput.innerHTML = this.currentTime;
        this.numberOfQuestionsOutput.innerHTML = this.numberOfQuestions;
        this.currentNumberOutput.innerHTML = this.currentQuestionNumber;
        this.scorecard.innerHTML = this.currentScore;
    }

    hide(button){
        button.classList.add('hide');
        button.classList.remove('show');
    }
    
    show(button){
        button.classList.add('show');
        button.classList.remove('hide');
    }
    
    startQuiz(){
        this.hide(this.startBtn);
        this.hide(this.restartBtn);
        this.nextQuestion();
        this.answerQuestion();
        this.startTimer(); 
    }
    
    startTimer() {
        this.counter = this.currentTime;  
        this.interval = setInterval(() => {
            this.timeOutput.innerHTML = this.counter;
            this.counter--;
          if (this.counter < 0 ) {
            clearInterval(this.interval);
            this.quizBody.innerHTML = `<h2>Times Up! <br> You Scored ${this.currentScore} / ${this.numberOfQuestions} </h2>`;
            show(this.startBtn);
          }
        }, 1000);
    }
    
    answerQuestion(){
        this.answerBtns = document.querySelectorAll("[data-operator='answer-btn']");
        this.answerBtns.forEach( (i) =>{
          i.addEventListener("click", () => {
    
            let correct = i.dataset.correct;
            if(correct == "true"){
              i.classList.add('correct');
              this.updateScore();
            }else{
              i.classList.add('wrong');
              const correctAnswer = document.querySelector("[data-correct='true']");
              correctAnswer.classList.add('correct');     
            }
            this.disableBtns();
        
            if(this.currentQuestionNumber == this.numberOfQuestions){
                this.show(this.finishBtn);
            }else{
                this.show(this.nextBtn);
            }
            
          });
        });
    }
    
    updateScore(){
        this.currentScore = this.currentScore + 1;
        this.scorecard.innerHTML = this.currentScore;
    }
      
    disableBtns(){
        this.answerBtns.forEach( (i) =>{
          i.disabled= true;
          i.style.pointerEvents = "none";
        });
    }
    
    nextQuestion(){
        this.currentQuestionNumber = this.currentQuestionNumber + 1;
        this.currentNumberOutput.innerHTML = this.currentQuestionNumber;
        this.hide(this.nextBtn);
      
        const questionsOutput = [];
        this.questions.forEach(
          (currentQ, qNumber) =>{
            const answers = [];
            this.questions[qNumber].answers.forEach( currentAnswer => {
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
        this.quizBody.innerHTML = questionsOutput[this.currentQuestionNumber - 1];
        this.hide(this.nextBtn);
    }
    
    endQuiz(){
        this.quizBody.innerHTML = `<h2>End of quiz! <br> You Scored ${this.currentScore}  / ${this.numberOfQuestions} </h2>`;
        this.hide(this.finishBtn);
        this.show(this.restartBtn);
        clearInterval(this.interval);
    }
}

const quiz = new Quiz(questions);

operators.forEach( i =>{
    i.addEventListener("click", ()=>{
        let operator = i.dataset.operator;
        switch (operator){
            case "start":

                quiz.startQuiz();
                break;

            case "next":

                quiz.nextQuestion();
                quiz.answerQuestion();
                break;

            case "finish":

                quiz.endQuiz();
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