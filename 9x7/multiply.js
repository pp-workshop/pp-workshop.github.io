// Some useful snippets here:
// console.log("This is log");
// window.alert("This is an allert!");
// let username = window.prompt("Podaj imię");

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
};

let stats = {
    correctAnsNr: 0,
    questionNr: 0,
    score: 0,
};

let config = JSON.parse(sessionStorage.getItem("config"));

let timeoutCtx;

let scoreForCurrentQuestion = SCORE_PER_QUESTION;

// Helper functions
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function generateQuestion() {
    question.a = getRandomInt(config.minArgVal, config.maxArgVal);
    question.b = getRandomInt(config.minArgVal, config.maxArgVal);
    question.correctAns = question.a * question.b;
    QuestionElm.textContent = `${question.a} x ${question.b} = `;
    stats.questionNr++;

    QuestionNrElm.textContent = `Pytanie ${stats.questionNr} z ${config.nrOfQuestions}:`;

    timeoutCtx = setInterval(timeout, MS_IN_SEC);
}

function timeout() {
    scoreForCurrentQuestion--;
    TimeBarElm.value = scoreForCurrentQuestion;
    console.log(`scoreForCurrentQuestion: ${scoreForCurrentQuestion}`);
    if (scoreForCurrentQuestion == 0) {
        clearInterval(timeoutCtx);
        window.alert(`Czas minął! Poprawna odpowiedź to ${question.correctAns}`);
        prepareNextQuestion();
    }
}

function checkAnswer(ans) {
    let prompt;

    if (ans == question.correctAns) {
        prompt = "Dobrze!";
        stats.correctAnsNr++;
        stats.score += scoreForCurrentQuestion;
    }
    else {
        prompt = `Źle! Poprawna odpowiedź to ${question.correctAns}.`;
    }

    window.alert(prompt);
}

function isFinished() {
    if (stats.questionNr >= config.nrOfQuestions) {
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
        sessionStorage.setItem("stats", JSON.stringify(stats));
        location.href = "summary.html";
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
