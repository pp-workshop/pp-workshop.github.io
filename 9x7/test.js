// HTML Elements
let QuestionElm = document.getElementById("IdQuestion");
let AnswerElm = document.getElementById("IdAnswer");
let SubmitElm = document.getElementById("IdSubmit");
let QuestionNrElm = document.getElementById("IdQuestionNr");
let TimeLabelElm = document.getElementById("IdTimeLabel");
let TimeBarElm = document.getElementById("IdTimeBar");

// Global variables to hold the state of the application
let MS_IN_SEC = 1000; // Number of milliseconds in second
let SCORE_PER_QUESTION = 10;

let question = {
    a: 0,
    b: 0,
    correctAns: 0,
    questionNr: 0,
};

let learning_stats = generateEmptyStats();

let config = JSON.parse(sessionStorage.getItem("config"));

let timeoutCtx;

let scoreForCurrentQuestion = SCORE_PER_QUESTION;

// Helper functions
function generateQuestion() {
    question.a = getRandomInt(config.minArgVal, config.maxArgVal);
    question.b = getRandomInt(config.minArgVal, config.maxArgVal);
    question.correctAns = question.a * question.b;
    QuestionElm.textContent = `${question.a} x ${question.b} = `;
    question.questionNr++;

    QuestionNrElm.textContent = `Pytanie ${question.questionNr} z ${config.nrOfQuestions}:`;

    timeoutCtx = setInterval(timeout, MS_IN_SEC);
}

function timeout() {
    scoreForCurrentQuestion--;
    TimeBarElm.value = scoreForCurrentQuestion;
    console.log(`scoreForCurrentQuestion: ${scoreForCurrentQuestion}`);
    if (scoreForCurrentQuestion == 0) {
        clearInterval(timeoutCtx);
        prepareNextQuestion();
    }
}

function checkAnswer(ans) {
    if (ans == question.correctAns) {
        learning_stats.correctAnsPerQuestion[question.a][question.b] =
            (scoreForCurrentQuestion <= SCORE_PER_QUESTION) ? scoreForCurrentQuestion : SCORE_PER_QUESTION;
    }
}

function isFinished() {
    if (question.questionNr >= config.nrOfQuestions) {
        return true;
    }
    return false;
}

function prepareNextQuestion() {
    // clear the entry
    AnswerElm.value = null;
    scoreForCurrentQuestion = SCORE_PER_QUESTION;
    TimeBarElm.value = scoreForCurrentQuestion;

    if (isFinished()) {
        saveLearningStatsInStorage(learning_stats);
        location.href = "index.html";
    }
    else {
        generateQuestion();
    }
}

// Initialization steps
TimeBarElm.max = SCORE_PER_QUESTION;
TimeBarElm.value = SCORE_PER_QUESTION;

generateQuestion();
AnswerElm.focus();

// Event handlers
SubmitElm.onclick = function () {
    clearInterval(timeoutCtx);
    let answer = AnswerElm.value;

    checkAnswer(answer);
    prepareNextQuestion();
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
