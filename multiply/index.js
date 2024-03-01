// HTML Elements
let HeaderElm = document.getElementById("IdHeader");
let NrOfQuestionsLabelElm = document.getElementById("IdNrOfQuestionsLabel");
let NrOfQuestionsElm = document.getElementById("IdNrOfQuestions");
let StartTestElm = document.getElementById("IdStartTest");

// Global variables to hold the state of the application
let TEN_SECONDS = 10;

let config = {
    nrOfQuestions: 100,
    minArgVal: 1,
    maxArgVal: 10,
    timeoutSec: TEN_SECONDS,
};

// Initialization steps
HeaderElm.textContent = "Rozpocznij test znajomości tabliczki mnożenia";
NrOfQuestionsLabelElm.textContent = "Podaj liczbę pytań";
NrOfQuestionsElm.value = config.nrOfQuestions;
NrOfQuestionsElm.placeholder = "Liczba pytań";

//Event handlers
StartTestElm.onclick = function () {
    var nrOfQuestions = NrOfQuestionsElm.value;
    if (0 >= nrOfQuestions) {
        window.alert("Wprowadź liczbę pytań (minimum jedno)");
        return;
    }

    config.nrOfQuestions = nrOfQuestions;
    sessionStorage.setItem("config", JSON.stringify(config));
    location.href = "multiply.html";
}
