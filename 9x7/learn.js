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

let learning_stats = {
    // Correct answers per question (a x b)
    correctAnsPerQuestion: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
};

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
    let shuffledArray = [];

    array.forEach(element => {
        let newIdx;
        do {
            newIdx = getRandomInt(0, array.length);
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
}

function registerGoodAnswer() {
    if (learning_stats.correctAnsPerQuestion[question.a][question.b] == null) {
        learning_stats.correctAnsPerQuestion[question.a][question.b] = 1;
    }
    else if (learning_stats.correctAnsPerQuestion[question.a][question.b] < 10) {
        learning_stats.correctAnsPerQuestion[question.a][question.b]++;
    }
}

function registerBadAnswer() {
    if (learning_stats.correctAnsPerQuestion[question.a][question.b] == null) {
        learning_stats.correctAnsPerQuestion[question.a][question.b] = 0;
    }
    else if (learning_stats.correctAnsPerQuestion[question.a][question.b] > 0) {
        learning_stats.correctAnsPerQuestion[question.a][question.b]--;
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
    // sessionStorage.setItem("stats", JSON.stringify(stats));
    // location.href = "summary.html";
    console.log("statistics: ");
    for (let a = 0; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
            console.log(`${a} x ${b} : ${learning_stats.correctAnsPerQuestion[a][b]}`);
        }
    }
}
