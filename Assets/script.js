// Select timer elements
var time = document.getElementById("right");
var secondsLeft = 60;
var currentQuestionIndex = 0;
var score = 0;
timerInterval = 0;
// Answers, right or wrong
var choicesEl = document.querySelector("#choices");
var correct = 0;
var wrong = 0;
var alert = document.getElementById("alert");
// End game with initials and score
var submitEl = document.querySelector("#end");
var initialsInput = document.querySelector("#initials");
var submissionResponseEl = document.querySelector("#score");
// question array
var scores = [];
var game_score = 0;
var game_start = 0;
// var currentQuestionObject = questionList[currentQuestionIndex];

// Set timer
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = "Time: " + secondsLeft;
    // let start = document.querySelector("#start");

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("right").innerHTML = "Game over!";
      endGame();
    }

    if (game_start === 1) {
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
var currentQuestionObject = questionList[currentQuestionIndex];

// Randomize questions
// questionList.sort(() => 0.5 - Math.random());

function startScreen() {
  secondsLeft = 60;
  game_start = 0;
  document.querySelector("#start-screen").removeAttribute("class");
}

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

document.getElementById("start").addEventListener("click", startQuiz);

// Get questions in the quiz screen
function getQuestion() {
  if (currentQuestionIndex >= 0 && currentQuestionIndex < questionList.length) {
    var currentQuestionObject = questionList[currentQuestionIndex];
    if (currentQuestionObject && currentQuestionObject.text) {
      var questionEl = document.querySelector("#question");
      questionEl.textContent = currentQuestionObject.text;
      choicesEl.innerHTML = "";

      for (var i = 0; i < currentQuestionObject.choices.length; i++) {
        var choice = currentQuestionObject.choices[i];
        var btn = document.createElement("button");
        btn.setAttribute("value", choice);
        btn.textContent = `${i + 1}.${choice}`;
        choicesEl.appendChild(btn);
      }
    } else {
      endGame();
    }
  } else {
    endGame();
  }
}

//Check answers, substract 10 every wrong answer, alerts
function checkAnswer(event) {
  var btnEl = event.target;
  if (currentQuestionIndex >= 0 && currentQuestionIndex < questionList.length) {
    var currentQuestionObject = questionList[currentQuestionIndex];
    if (currentQuestionObject && currentQuestionObject.correctAnswer) {
      if (btnEl.value === currentQuestionObject.correctAnswer) {
        alert.innerText = "Correct";
        console.log("Correct");
        currentQuestionIndex++;
        getQuestion();
      } else {
        alert.innerText = "Wrong";
        console.log("Wrong");
        secondsLeft -= 10;
        currentQuestionIndex++;
        getQuestion();
      }
    } else {
      console.error(
        "Invalid question object or missing 'correctAnswer' property."
      );
    }
  } else {
    console.error("Invalid currentQuestionIndex or questionList.");
  }
}

// Check answer on click
choicesEl.onclick = checkAnswer;

// end game, time out
function endGame() {
  // if answered all questions, end game

  if ((currentQuestionIndex = questionList.length)) {
    console.log("showscore");
    document.querySelector("#quiz-screen").setAttribute("class", "hide");
    document.querySelector("#end-screen").removeAttribute("class");
    showScore();
  }
  // if time gets to 0, end game
  else if (secondsLeft === 0) {
    console.log("game over");
    document.querySelector("#quiz-screen").setAttribute("class", "hide");
    document.querySelector("#end-screen").removeAttribute("class");
    showScore();
  }
}

// Show score, initials input
function showScore(event) {
  // event.preventDefault();
  console.log(event);
  document.querySelector("#score").removeAttribute("class");
  var response = "Your final score is " + secondsLeft + ".";
  submissionResponseEl.textContent = response;
  submitEl.addEventListener("click", setScore);
  game_start = 1;
}

// Updates score on screen and highscore to user storage
function setScore() {
  showScore.textContent = secondsLeft;
  var storedScores = {
    score: secondsLeft,
    user: initialsInput,
  };
  localStorage.setItem("storedScores", JSON.stringify(storedScores));
  document.querySelector("#highscores").removeAttribute("class");
  renderHighScore();
}

// Render Highscores
function renderHighScore() {
  var storedScores = JSON.parse(localStorage.getItem("storedScores"));
  if (storedScores === null) {
    scores = [];
  } else {
    scores = storedScores;
  }
  for (i = 0; i < storedScores.length; i++) {
    console.log("your score");
  }
}

// Go back button

function goBack() {
  // Resets timer
  // secondsLeft === 60;
  clearInterval(timerInterval);
  document.querySelector("#end-screen").setAttribute("class", "hide");
  document.querySelector("#highscores").setAttribute("class", "hide");
  document.querySelector("#score").setAttribute("class", "hide");
  startScreen();
}

// Attaches event listener to button

document.getElementById("reset-button").addEventListener("click", goBack);
