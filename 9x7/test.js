// HTML Elements
let HeaderElm = document.getElementById("IdHeader");
let QuestionElm = document.getElementById("IdQuestion");
let AnswerElm = document.getElementById("IdAnswer");
let SubmitElm = document.getElementById("IdSubmit");
let CancelElm = document.getElementById("IdCancel");
let QuestionNrElm = document.getElementById("IdQuestionNr");
let TimeLabelElm = document.getElementById("IdTimeLabel");
let TimeBarElm = document.getElementById("IdTimeBar");

// Global variables to hold the state of the application
const MS_IN_SEC = 1000; // Number of milliseconds in second
const SCORE_PER_QUESTION = 10;
const NR_OF_QUESTIONS = 100;
const MIN_ARG_VAL = 1;
const MAX_ARG_VAL = 10;
const TIMEOUT_SEC = 12;

let question = {
    a: 0,
    b: 0,
    correctAns: 0,
    questionNr: 0,
};

let learning_stats = generateEmptyStats();
let timeoutSec = TIMEOUT_SEC;
let timeoutCtx;
let scoreForCurrentQuestion = SCORE_PER_QUESTION;

// Helper functions
function generateQuestion() {
    question.a = getRandomInt(MIN_ARG_VAL, MAX_ARG_VAL);
    question.b = getRandomInt(MIN_ARG_VAL, MAX_ARG_VAL);
    question.correctAns = question.a * question.b;
    QuestionElm.textContent = `${question.a} x ${question.b} = `;
    question.questionNr++;

    QuestionNrElm.textContent = `Pytanie ${question.questionNr} z ${NR_OF_QUESTIONS}:`;

    timeoutCtx = setInterval(timeout, MS_IN_SEC);
}

function timeout() {
    if (timeoutSec <= SCORE_PER_QUESTION) {
        scoreForCurrentQuestion--;
    }
    timeoutSec--;
    TimeBarElm.value = timeoutSec;
    console.log(`scoreForCurrentQuestion: ${scoreForCurrentQuestion}`);
    if (timeoutSec == 0) {
        clearInterval(timeoutCtx);
        prepareNextQuestion();
    }
}

function checkAnswer(ans) {
    if (ans == question.correctAns) {
        learning_stats.correctAnsPerQuestion[question.a][question.b] = scoreForCurrentQuestion;
    }
}

function isFinished() {
    if (question.questionNr >= NR_OF_QUESTIONS) {
        return true;
    }
    return false;
}

function prepareNextQuestion() {
    // clear the entry
    AnswerElm.value = null;
    scoreForCurrentQuestion = SCORE_PER_QUESTION;
    timeoutSec = TIMEOUT_SEC;
    TimeBarElm.value = timeoutSec;

    if (isFinished()) {
        saveLearningStatsInStorage(learning_stats);
        location.href = "index.html";
    }
    else {
        generateQuestion();
    }
}

// Initialization steps
HeaderElm.textContent = "Odpowiedz na pytanie"
TimeBarElm.max = TIMEOUT_SEC;
TimeBarElm.value = TIMEOUT_SEC;
SubmitElm.textContent = "Wyślij";
CancelElm.textContent = "Przerwij test";

generateQuestion();
AnswerElm.focus();

// Event handlers
SubmitElm.onclick = function () {
    clearInterval(timeoutCtx);
    let answer = AnswerElm.value;

    checkAnswer(answer);
    prepareNextQuestion();
}

CancelElm.onclick = function () {
    location.href = "index.html";
}

// This is how you can trigger a button activation by hitting enter in an input field
// Execute a function when the user presses a key on the keyboard
AnswerElm.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        SubmitElm.click();
    }
}); 
