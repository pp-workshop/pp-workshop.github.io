// HTML Elements
let HeaderElm = document.getElementById("IdHeader");
let StartTestElm = document.getElementById("IdStartTest");
let StartLearningElm = document.getElementById("IdStartLearning");

// Global variables to hold the state of the application
let TEN_SECONDS = 10;

let config = {
    nrOfQuestions: 100,
    minArgVal: 1,
    maxArgVal: 10,
    timeoutSec: TEN_SECONDS,
};

// Initialization steps
HeaderElm.textContent = "Tabliczka mnożenia";
StartLearningElm.textContent = "Rozpocznij naukę";
StartTestElm.textContent = "Rozpocznij test";

//Event handlers
StartTestElm.onclick = function () {
    sessionStorage.setItem("config", JSON.stringify(config));
    location.href = "test.html";
}

StartLearningElm.onclick = function () {
    location.href = "learn.html";
}
