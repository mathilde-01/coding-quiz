// Select timer elements
var time = document.getElementById("right");
var secondsLeft = 60;
var currentQuestionIndex = 0;
var score = 0;
timerInterval = 0;
var choicesEl = document.querySelector("#choices");
var correct = 0;
var wrong = 0;

//set timer
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;

    time.textContent = "Time: " + secondsLeft;
    // let start = document.querySelector("#start");

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("right").innerHTML = "Game over!";
    }
  }, 1000);
}

//Quiz questions
var questionList = [
  {
    text: "Commonly used data types do NOT include:",
    choices: ["Booleans", "Alerts", "Strings", "Numbers"],
    correctAnswer: "1 - Booleans",
  },
  {
    text: "The condition of an if/else statement is enclosed within ______.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    correctAnswer: "Quotes",
  },
  {
    text: "Arrays in Javascript can be used to store ______.",
    choices: [
      "Numbers and strings",
      "Other Arrays",
      "Booleans",
      "All of the above",
    ],
    correctAnswer: "Booleans",
  },
  {
    text: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["Quotes", "Curly Brackets", "Commas", "Parentheses"],
    correctAnswer: "Quotes",
  },
  {
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "console.log", "Terminal/bash", "For loops"],
    correctAnswer: "Javascript",
  },
];

// Randomize questions
// questionList.sort(() => 0.5 - Math.random());

// Start quiz
function startQuiz() {
  // Hiding description and quiz button
  document.querySelector("#start-screen").setAttribute("class", "hide");
  document.querySelector("#end-screen").setAttribute("class", "hide");
  document.querySelector("#quiz-screen").removeAttribute("class");

  getQuestion();

  //timer
  setTime();
}

// show questions in the quiz screen
function getQuestion() {
  var currentQuestionObject = questionList[currentQuestionIndex];
  console.log(currentQuestionObject);
  var questionEl = document.querySelector("#question");
  questionEl.textContent = currentQuestionObject.text;
  choicesEl.innerHTML = "";

  // loop through current question choices
  for (var i = 0; i < currentQuestionObject.choices.length; i++) {
    var choice = currentQuestionObject.choices[i];
    var btn = document.createElement("button");
    btn.setAttribute("value", choice);
    btn.textContent = `${i + 1}.${choice}`;
    choicesEl.appendChild(btn);
  }
}

//Check answers, substract 10 every wrong answer, gameOver
function checkAnswer(event) {
  var btnEl = event.target;
  if (btnEl.value !== questionList[currentQuestionIndex].correctAnswer) {
    secondsLeft -= 10;
    currentQuestionIndex++;
    getQuestion();
    // if answered all questions, end game
    if (currentQuestionIndex > questionList.length) {
      showScore();
    }
    // if time gets to 0, end game
    if (secondsLeft === 0) {
      showScore();
    }
    // display wrong!
    if (btnEl.value !== questionList[currentQuestionIndex].correctAnswer) {
      choicesEl.textContent = "Wrong!";
      console.log("wrong");
    }
    currentQuestionIndex++;
    getQuestion();
  } else {
    // display correct
    if (btnEl.value === questionList[currentQuestionIndex].correctAnswer) {
      choicesEl.textContent = "Correct!";
      console.log("true");
    }
    currentQuestionIndex++;
    getQuestion();
  }
}

// Click event for starting quiz
document.getElementById("start").addEventListener("click", startQuiz);

// Check answer on click
choicesEl.onclick = checkAnswer;

// End game with initials and score
var submitEl = document.querySelector("#submit");
var initialsInput = document.querySelector("#initials");
var submissionResponseEl = document.querySelector("#score");

function showScore(event) {
  event.preventDefault();
  console.log(event);
  var response = "Thank you for taking the quiz, " + initialsInput.value + "!";
  submissionResponseEl.textContent = response;

  document.querySelector("#end-screen").removeAttribute("class");
}

submitEl.addEventListener("click", showScore);

// Updates score on screen and highscore to user storage
function setScore() {
  showScore.textContent = secondsLeft;
  localStorage.setItem("secondsLeft", secondsLeft);
}

//go back button
var resetButton = document.getElementById("reset-button");

function goBack() {
  // Resets timer
  secondsLeft = 60;
  // restrart
  startQuiz();
}
// Attaches event listener to button
resetButton.addEventListener("click", goBack);
