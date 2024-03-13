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

function getRandomIntAroundVal(val, minMax, limitLo, limitHi) {
    let candidate = 0;
    do {
        candidate = val + getRandomInt(-minMax, minMax);
    } while (candidate < limitLo || candidate > limitHi);

    return candidate
}

// Generates answer option that's different than other options in the array,
// and is also greater than 0 and smaller or equal to 100
function generateAnswerOption(ansOpts, correctAns) {
    let candidate = 0;
    let regenerate;

    do {
        regenerate = false;
        candidate = getRandomIntAroundVal(correctAns, 10, 1, 100);
        ansOpts.forEach(element => {
            if (element == candidate) {
                regenerate = true;
            }
        });
    } while (regenerate == true);

    return candidate;
}

// Shuffle elements in the array
// NOTE: this algorithm is ineffective and should not be used for large arrays!
function shuffle(array) {

    let arrayLength = array.length;
    let shuffledArray = [];

    array.forEach(element => {
        let newIdx;
        do {
            newIdx = getRandomInt(0, arrayLength);
        } while (shuffledArray[newIdx] != null)
        shuffledArray[newIdx] = element;
    });

    return shuffledArray;
}

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
