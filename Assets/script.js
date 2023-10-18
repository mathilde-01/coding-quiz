// Select timer elements
var time = document.getElementById("right");
var secondsLeft = 6;
var currentQuestionIndex = 0;
var score = 0;
timerInterval = 0;
// Answers, right or wrong
var choicesEl = document.querySelector("#choices");
var correct = 0;
var wrong = 0;
var alert = document.getElementById("alert");
// End game with initials and score
var submitEl = document.querySelector("#submit");
var initialsInput = document.querySelector("#initials");
var submissionResponseEl = document.querySelector("#score");

// Set timer
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
    correctAnswer: "Booleans",
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
// Click event for starting quiz
document.getElementById("start").addEventListener("click", startQuiz);

// show questions in the quiz screen
function getQuestion() {
  console.log(currentQuestionIndex, "currentQuestionIndex");
  console.log(
    questionList[currentQuestionIndex],
    "questionList[currentQuestionIndex]"
  );
  var currentQuestionObject = questionList[currentQuestionIndex];
  console.log(currentQuestionObject, "currentQuestionObject");
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

//Check answers, substract 10 every wrong answer, alerts
function checkAnswer(event) {
  var btnEl = event.target;
  // if value is correct or wrong
  if (btnEl.value === questionList[currentQuestionIndex].correctAnswer) {
    alert.innerText = "Correct";
    console.log("Correct");
    currentQuestionIndex++;
    getQuestion();
  } else if (btnEl.value !== questionList[currentQuestionIndex].correctAnswer) {
    alert.innerText = "Wrong";
    console.log("Wrong");
    secondsLeft -= 10;
    currentQuestionIndex++;
    getQuestion();
  }
}
// Check answer on click
choicesEl.onclick = checkAnswer;

// end game, time out
function endgame() {
  // if answered all questions, end game
  if (currentQuestionIndex >= questionList.length - 1) {
    console.log("showscore");
    showScore();
  }
  // if time gets to 0, end game
  else if (secondsLeft === 0) {
    console.log("game over");
    showScore();
  }
}
endgame();

// Show score, initials input
function showScore(event) {
  // event.preventDefault();
  console.log(event);
  document.querySelector("#quiz-screen").setAttribute("class", "hide");
  document.querySelector("#end-screen").removeAttribute("class");

  documentCreateElement("input");
  newField.setAttribute("initials", "text");

  var response = "You're finail score is " + secondsLeft.valueOf + ".";
  submissionResponseEl.textContent = response;
  var inputEl = formfield.getAttribute("initials");
}

submitEl.addEventListener("click", showScore);

// Updates score on screen and highscore to user storage
function setScore() {
  showScore.textContent = secondsLeft;
  localStorage.setItem("secondsLeft", secondsLeft);
}

// Go back button
var resetButton = document.getElementById("reset-button");

function goBack() {
  // Resets timer
  secondsLeft = 60;
  // restrart
  startQuiz();
}
// Attaches event listener to button
resetButton.addEventListener("click", goBack);
