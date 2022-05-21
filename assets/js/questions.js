console.log('Starting quiz...');
var timer = 120;
var timeInterval;
var currentQuestionIndex = 0;
var questions = [
  {
    question: 'First question in the quiz?',
    choices: [
      'First choice',
      'Second choice',
      'Third choice',
      'Fourth choice',
    ],
    answer: 'First choice',
  },
  {
    question: 'Second question in the quiz?',
    choices: [
      'First choice',
      'Second choice',
      'Third choice',
      'Fourth choice',
    ],
    answer: 'First choice',
  },
  {
    question: 'Third question in the quiz?',
    choices: [
      'First choice',
      'Second choice',
      'Third choice',
      'Fourth choice',
    ],
    answer: 'First choice',
  },
];

var highscores;
var scoresFromLocalStorage = localStorage.getItem('highscores');

console.log('scores from local', scoresFromLocalStorage);

if (scoresFromLocalStorage) {
  highscores = JSON.parse(scoresFromLocalStorage);
} else {
  highscores = [];
}

var questionTextElement =  document.querySelector('#question-text');
var questionChoicesElement = document.querySelector('#question-choices');
var resultsPElement = document.querySelector('#results');
var timeDisplayElement = document.querySelector('#time-display');
// Buttons
var startQuizButtonElement = document.querySelector('#start-quiz-button');
// Screens
var startQuizScreen = document.querySelector('#start-quiz-screen');
var quizQuestionsScreen = document.querySelector('#quiz-questions-screen');
var endQuizScreen = document.querySelector('#end-quiz-screen');

var scoreboardFormElement = document.querySelector('#scoreboard-form');
var initialsInputElement = document.querySelector('#initials-input');

scoreboardFormElement.addEventListener('submit', function(event) {
  event.preventDefault();
  // Grab the text that was typed into input
  // Create an object with initials and current score (timer)
  var userScore = {
    initals: initialsInputElement.value,
    score: timer,
  };
  console.log(userScore);
  highscores.push(userScore);
  
  // Put that object into localStorage
  localStorage.setItem('highscores', JSON.stringify(userScore));

  // Clear the input
  initialsInputElement.value = '';
});

function checkAnswer(event) {
  console.log('check answer please');
  // find the current question.
  var currentQuestion = questions[currentQuestionIndex];
  // get the right answer for the current question
  var correctAnswer = currentQuestion.answer;
  // get the choice that the user clicked
  var buttonClicked = event.target;

  //compare right answer with the user choice (clicked) < right/wrong
  if (correctAnswer === buttonClicked.textContent) {
    resultsPElement.textContent = 'CORRECT!';
  } else {
    resultsPElement.textContent = 'You got that wrong!';
    
    if (timer < 10)
      timer = 0;
    else
      timer = timer - 10;

    timeDisplayElement.textContent = timer;
  }

  setTimeout(function() {
    resultsPElement.textContent = '';

  }, 750);

  currentQuestionIndex++;
  displayQuestion();
}

function displayQuestion() {
  // Check if we have any questions to display
  // If we still have questions, display the question
  // Else call endQuiz()
  if (currentQuestionIndex < questions.length) {
    console.log('display question please');
    var currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textcontent = currentQuestion.question;

    var choices = currentQuestion.choices;
    questionChoicesElement.innerHTML = '';

    for (var i = 0; i < choices.length; i++) {
      var button = document.createElement('button');
      button.textContent = choices[i];
      button.addEventListener('click', checkAnswer);
      questionChoicesElement.appendChild(button);
    }
  }
  else {
    endQuiz();
  }
}

function startTimer() {
  timeInterval = setInterval(function() {
    timer--;
    
    if (timer < 0) {
      timer = 0;
    }
    
    timeDisplayElement.textContent = timer;

    if (timer === 0) {
      endQuiz();
    }
    
  }, 1000);
}

function endQuiz() {
  clearInterval(timeInterval);
  quizQuestionsScreen.classList.add('hidden');
  endQuizScreen.classList.remove('hidden');
}

function startQuiz() {
  console.log('start quiz');

  startQuizScreen.classList.add('hidden');
  quizQuestionsScreen.classList.remove('hidden');
  displayQuestion();
  startTimer();
}

timeDisplayElement.textContent = timer;

startQuizButtonElement.addEventListener('click', startQuiz);