// HTML Elements
let QuestionElm = document.getElementById("IdQuestion");
let AnswerAElm = document.getElementById("IdAnswerA");
let AnswerBElm = document.getElementById("IdAnswerB");
let AnswerCElm = document.getElementById("IdAnswerC");
let AnswerDElm = document.getElementById("IdAnswerD");
let LessonEndElm = document.getElementById("IdLessonEnd");

// Global variables to hold the state of the application
let config = {
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

function checkAnswer(ans) {
    let prompt;

    if (ans == question.correctAns) {
        prompt = "Dobrze!";
        registerGoodAnswer();
    }
    else {
        prompt = `Źle! Poprawna odpowiedź to ${question.correctAns}.`;
        registerBadAnswer();
    }

    window.alert(prompt);
}

function registerAnswer(ans) {
    checkAnswer(ans);
    generateQuestion();
}

// Initialization steps
LessonEndElm.textContent = "Zakończ naukę";
learning_stats = getLearningStatsFromStorage();
generateQuestion();

// Event handlers
AnswerAElm.onclick = function () {
    registerAnswer(AnswerAElm.textContent);
}

AnswerBElm.onclick = function () {
    registerAnswer(AnswerBElm.textContent);
}

AnswerCElm.onclick = function () {
    registerAnswer(AnswerCElm.textContent);
}

AnswerDElm.onclick = function () {
    registerAnswer(AnswerDElm.textContent);
}

LessonEndElm.onclick = function () {
    localStorage.setItem("learning_stats", JSON.stringify(learning_stats));
    location.href = "index.html";
}
