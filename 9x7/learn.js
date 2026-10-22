// HTML Elements
let HeaderElm = document.getElementById("IdHeader");
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
    maxScore: 10,
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

// Picks question arguments at random, weighted so that questions with lower
// score are asked more often. The previous question is not repeated.
function generateQuestionAB() {
    let candidates = [];
    let totalWeight = 0;

    for (let a = config.minArgVal; a <= config.maxArgVal; a++) {
        for (let b = config.minArgVal; b <= config.maxArgVal; b++) {
            if (a == question.a && b == question.b) {
                continue;
            }
            const score = learning_stats.correctAnsPerQuestion[getIdx(a)][getIdx(b)] ?? 0;
            const weight = config.maxScore + 1 - score;
            candidates.push({ a: a, b: b, weight: weight });
            totalWeight += weight;
        }
    }

    let r = Math.random() * totalWeight;
    for (const candidate of candidates) {
        r -= candidate.weight;
        if (r < 0) {
            question.a = candidate.a;
            question.b = candidate.b;
            return;
        }
    }

    const last = candidates[candidates.length - 1];
    question.a = last.a;
    question.b = last.b;
}

function generateQuestion() {
    generateQuestionAB();
    question.correctAns = question.a * question.b;

    let ansOptions = generateAnswerOptions(question);

    QuestionElm.textContent = `${question.a} x ${question.b} = `;
    AnswerAElm.textContent = `${ansOptions[0]}`;
    AnswerBElm.textContent = `${ansOptions[1]}`;
    AnswerCElm.textContent = `${ansOptions[2]}`;
    AnswerDElm.textContent = `${ansOptions[3]}`;
}

function registerGoodAnswer() {
    if (learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] == null) {
        learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] = 1;
    }
    else if (learning_stats.correctAnsPerQuestion[getIdx(question.a)][getIdx(question.b)] < config.maxScore) {
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
HeaderElm.textContent = "Odpowiedz na pytanie"
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
    saveLearningStatsInStorage(learning_stats);
    location.href = "index.html";
}
