
let NrOfQuestionsElm = document.getElementById("IdNrOfQuestions");
let NrOfCorrectAnsElm = document.getElementById("IdNrOfCorrectAns");
let ScoreElm = document.getElementById("IdScore");

var stats = JSON.parse(sessionStorage.getItem("stats"));

NrOfQuestionsElm.textContent = `Ilość pytań: ${stats.questionNr}`;
NrOfCorrectAnsElm.textContent = `Ilość poprawnych odpowiedzi: ${stats.correctAnsNr}`;
ScoreElm.textContent = `Punkty: ${stats.score}`;