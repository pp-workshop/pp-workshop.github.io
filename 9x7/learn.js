// HTML Elements
let QuestionElm = document.getElementById("IdQuestion");
let AnswerAElm = document.getElementById("IdAnswerA");
let AnswerBElm = document.getElementById("IdAnswerB");
let AnswerCElm = document.getElementById("IdAnswerC");
let AnswerDElm = document.getElementById("IdAnswerD");
let LessonEndElm = document.getElementById("IdLessonEnd");
let NextQuestionElm = document.getElementById("IdNextQuestion");

// Global variables to hold the state of the application
let blockAnswers = false;
let blockNextQuestion = true;

const config = {
    minArgVal: 1,
    maxArgVal: 10,
};

let question = {
    a: 0,
    b: 0,
    correctAns: 0,
};

let learning_stats;

// Helper functions
function generateAnswerOptions(q) {
    let answerOptions = [0, 0, 0, 0];

    answerOptions[0] = q.correctAns;
    answerOptions[1] = generateAnswerOption(answerOptions, q.correctAns);
    answerOptions[2] = generateAnswerOption(answerOptions, q.correctAns);
    answerOptions[3] = generateAnswerOption(answerOptions, q.correctAns);

    return shuffle(answerOptions);
}

function generateQuestion() {
    question.a = getRandomInt(config.minArgVal, config.maxArgVal);
    question.b = getRandomInt(config.minArgVal, config.maxArgVal);
    question.correctAns = question.a * question.b;

    let ansOptions = generateAnswerOptions(question);

    QuestionElm.textContent = `${question.a} x ${question.b} = `;
    AnswerAElm.textContent = `${ansOptions[0]}`;
    AnswerBElm.textContent = `${ansOptions[1]}`;
    AnswerCElm.textContent = `${ansOptions[2]}`;
    AnswerDElm.textContent = `${ansOptions[3]}`;
}

function getIdx(i) {
    return i - 1;
}

function registerGoodAnswer() {
    if (learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] == null) {
        learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] = 1;
    }
    else if (learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] < 10) {
        learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)]++;
    }
}

function registerBadAnswer() {
    if (learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] == null) {
        learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] = 0;
    }
    else if (learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] > 0) {
        learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)]--;
    }
}

function clearButtonColors() {
    AnswerAElm.style.background = "#270f26";
    AnswerBElm.style.background = "#270f26";
    AnswerCElm.style.background = "#270f26";
    AnswerDElm.style.background = "#270f26";
}

function checkAnswer(ans, button) {
    if (ans == question.correctAns) {
        button.style.background = "green";
        registerGoodAnswer();
    }
    else {
        button.style.background = "red";
        highlightCorrectAnswer();
        registerBadAnswer();
    }
}

function highlightCorrectAnswer() {
    if (AnswerAElm.textContent == question.correctAns) {
        AnswerAElm.style.background = "green";
    }
    else if (AnswerBElm.textContent == question.correctAns) {
        AnswerBElm.style.background = "green";
    }
    else if (AnswerCElm.textContent == question.correctAns) {
        AnswerCElm.style.background = "green";
    }
    else if (AnswerDElm.textContent == question.correctAns) {
        AnswerDElm.style.background = "green";
    }
}

function registerAnswer(ans, button) {
    if (blockAnswers) {
        return;
    }
    enableNextQuestion();
    blockAnswers = true;
    checkAnswer(ans, button);
}

function disableNextQuestion() {
    NextQuestionElm.style.opacity = 0.6;
    NextQuestionElm.style.cursor = "not-allowed";
    blockNextQuestion = true;
}

function enableNextQuestion() {
    NextQuestionElm.style.opacity = 1;
    NextQuestionElm.style.cursor = "pointer";
    blockNextQuestion = false;
}

// Initialization steps
LessonEndElm.textContent = "Zakończ naukę";
NextQuestionElm.textContent = "Następne";
disableNextQuestion();
learning_stats = getLearningStatsFromStorage();
generateQuestion();

// Event handlers
AnswerAElm.onclick = function () {
    registerAnswer(AnswerAElm.textContent, AnswerAElm);
}

AnswerBElm.onclick = function () {
    registerAnswer(AnswerBElm.textContent, AnswerBElm);
}

AnswerCElm.onclick = function () {
    registerAnswer(AnswerCElm.textContent, AnswerCElm);
}

AnswerDElm.onclick = function () {
    registerAnswer(AnswerDElm.textContent, AnswerDElm);
}

NextQuestionElm.onclick = function () {
    if (blockNextQuestion) {
        return;
    }
    disableNextQuestion();
    blockAnswers = false;
    generateQuestion();
    clearButtonColors();
}

LessonEndElm.onclick = function () {
    localStorage.setItem("learning_stats", JSON.stringify(learning_stats));
    location.href = "index.html";
}
