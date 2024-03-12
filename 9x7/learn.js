// HTML Elements
let QuestionElm = document.getElementById("IdQuestion");
let AnswerAElm = document.getElementById("IdAnswerA");
let AnswerBElm = document.getElementById("IdAnswerB");
let AnswerCElm = document.getElementById("IdAnswerC");
let AnswerDElm = document.getElementById("IdAnswerD");
let QuestionNrElm = document.getElementById("IdQuestionNr");
let TimeLabelElm = document.getElementById("IdTimeLabel");
let TimeBarElm = document.getElementById("IdTimeBar");

// Global variables to hold the state of the application
let MS_IN_SEC = 1000; // Number of milliseconds in second
let SCORE_PER_QUESTION = 10;
let TEN_SECONDS = 10;

let config = {
    nrOfQuestions: 100,
    minArgVal: 1,
    maxArgVal: 10,
    timeoutSec: TEN_SECONDS,
};

let question = {
    a: 0,
    b: 0,
    correctAns: 0,
    incorrectAns1: 0,
    incorrectAns2: 0,
    incorrectAns3: 0,
};

let stats = {
    correctAnsNr: 0,
    questionNr: 0,
    score: 0,
};

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
    // TODO: Prepare correct implementation for incorrect answers
    question.incorrectAns1 = question.correctAns + 1;
    question.incorrectAns2 = question.correctAns + 2;
    question.incorrectAns3 = question.correctAns + 3;

    QuestionElm.textContent = `${question.a} x ${question.b} = `;
    // TODO: Implement a question shuffle mechanism
    AnswerAElm.textContent = `${question.correctAns}`;
    AnswerBElm.textContent = `${question.incorrectAns1}`;
    AnswerCElm.textContent = `${question.incorrectAns2}`;
    AnswerDElm.textContent = `${question.incorrectAns3}`;

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

// Event handlers
function registerAnswer(ans) {
    clearInterval(timeoutCtx);
    let answer = ans;

    checkAnswer(answer);
    prepareNextQuestion();
}

AnswerAElm.onclick = function () {
    registerAnswer(question.correctAns);
}

AnswerBElm.onclick = function () {
    registerAnswer(question.incorrectAns1);
}

AnswerCElm.onclick = function () {
    registerAnswer(question.incorrectAns2);
}

AnswerDElm.onclick = function () {
    registerAnswer(question.incorrectAns3);
}
