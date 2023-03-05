import {questions} from "./questions.js";

const operators = document.querySelectorAll("[data-operator]");

const quiz = {
    questions: questions,
    scorecard: document.querySelector("[data-output='scorecard']"),
    currentNumberOutput: document.querySelector("[data-output='current-number-output']"),
    numberOfQuestionsOutput: document.querySelector("[data-output='number-of-questions-output']"),
    timeOutput: document.querySelector("[data-output='time-output']"),
    quizBody: document.querySelector("[data-output='quiz-body']"),
    startBtn: document.querySelector("[data-operator='start']"),
    finishBtn: document.querySelector("[data-operator='finish']"),
    restartBtn: document.querySelector("[data-operator='restart']"),
    nextBtn: document.querySelector("[data-operator='next']"),

    answerBtns: "",
    currentScore: 0,
    currentTime: 180,
    numberOfQuestions: questions.length,
    currentQuestionNumber: 0,
    interval: "",
    counter: "",

    setup(){
        this.timeOutput.innerHTML = this.currentTime;
        this.numberOfQuestionsOutput.innerHTML = this.numberOfQuestions;
        this.currentNumberOutput.innerHTML = this.currentQuestionNumber;
        this.scorecard.innerHTML = this.currentScore;
        operators.forEach( i =>{
            i.addEventListener("click", ()=>{
                let operator = i.dataset.operator;
                switch (operator){
                    case "start":
                        quiz.startQuiz();
                        break;
        
                    case "next":
                        quiz.nextQuestion();
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
    },

    hide(button){
        button.classList.add('hide');
        button.classList.remove('show');
    },
    
    show(button){
        button.classList.add('show');
        button.classList.remove('hide');
    },
    
    startQuiz(){
        this.hide(this.startBtn);
        this.hide(this.restartBtn);
        this.nextQuestion();
        this.startTimer(); 
    },

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
      this.answerQuestion();
    },
    
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
    },
  
    answerQuestion(){
        this.answerBtns = document.querySelectorAll("[data-operator='answer-btn']");
        this.answerBtns.forEach( (i) =>{
          i.addEventListener("click", () => {
    
            let correct = i.dataset.correct;
            if(correct == "true"){
              i.classList.add('correct');
              this.currentScore = this.currentScore + 1;
              this.scorecard.innerHTML = this.currentScore;
            }else{
              i.classList.add('wrong');
              const correctAnswer = document.querySelector("[data-correct='true']");
              correctAnswer.classList.add('correct');     
            }

            this.answerBtns.forEach( (i) =>{
              i.disabled= true;
              i.style.pointerEvents = "none";
            });
        
            if(this.currentQuestionNumber == this.numberOfQuestions){
                this.show(this.finishBtn);
            }else{
                this.show(this.nextBtn);
            }
            
          });
        });
    },
     
    endQuiz(){
        this.quizBody.innerHTML = `<h2>End of quiz! <br> You Scored ${this.currentScore}  / ${this.numberOfQuestions} </h2>`;
        this.hide(this.finishBtn);
        this.show(this.restartBtn);
        clearInterval(this.interval);
    }
 
}

quiz.setup();

