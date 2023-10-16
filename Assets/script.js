// Select timer elements
var time = document.getElementById("right");
var secondsLeft = 60;
var currentQuestionIndex = 0;
var score = 0;
timerInterval = 0;

//set timer
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;

    time.textContent = "Time: " + secondsLeft;
    // let start = document.querySelector("#start");

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("right").innerHTML = "Game over!";

    }

}, 1000);
}

// Click event for starting quiz
document.getElementById("start").addEventListener("click", startQuiz);

// This is a click event that will start the quiz
function startQuiz() {

  setTime();

// Hiding description and quiz button
document.querySelector(".quiz-container").style.display = "none";
document.querySelector("#start").style.display = "none";



//Quiz questions
var questionList = [
{
    text: "Commonly used data types do NOT include:",
    choices: ["1 - Booleans", "2 - Alerts", "3 - Strings", "4 - Numbers"],
    correctAnswer: 1,
},
{
    text: "The condition of an if/else statement is enclosed within ______.",
    choices: ["1 - Quotes", "2 - Curly Brackets", "3 - Parentheses", "4 - Square Brackets"],
    correctAnswer: 2,
},
{
    text: "Arrays in Javascript can be used to store ______.",
    choices: ["1 - Numbers and strings", "2 - Other Arrays", "3 - Booleans", "4 - All of the above",],
    correctAnswer: 3,
},
{
    text: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["1 - Quotes", "2 - Curly Brackets", "3 - Commas", "4 - Parentheses"],
    correctAnswer: 1,
},
{
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["1 - Javascript", "2 - console.log", "3 - Terminal/bash", "4 - For loops"],
    correctAnswer: 1,
  }
];

}


// Start quiz
function createQuiz(){
  for (let i = 0; i < 6; i++) {
    var question = document.createElement('quiz')
    // question.setAttribute(questionList)
    quiz-container.appendChild(questionList)

  }
}
createQuiz();


  //Check answers, substract 10 every wron answer,  gameOver
  function checkAnswer() {
 
};

// Show "Correct"
function displayCorrect() {
  var correct = createElement("h3", "id", "Correct", "Correct!")
  appendChild(document.body, correct);
}

// Time substraction from the close if answer is incorrect, show "Wrong!"
  function displayWrong() {
    var wrong = createElement("h3", "id", "wrong", "Wrong!")
    appendChild(document.body, wrong);
    secondsLeft = -10;
  }



// Form with initials and my score
var submitEl = document.querySelector("#submit");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var submissionResponseEl = document.querySelector("#response");


function showResponse(event) {
  event.preventDefault();
  console.log(event);
  var response = "Thank you for taking the quiz, " + nameInput.value + "!";
  submissionResponseEl.textContent = response;
}
  
submitEl.addEventListener("click", showResponse);
