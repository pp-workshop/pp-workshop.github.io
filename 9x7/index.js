// HTML Elements
let HeaderElm = document.getElementById("IdHeader");
let StartTestElm = document.getElementById("IdStartTest");
let StartLearningElm = document.getElementById("IdStartLearning");
let SummaryElm = document.getElementById("IdSummary");

// Global variables to hold the state of the application
let TEN_SECONDS = 10;

let config = {
    nrOfQuestions: 100,
    minArgVal: 1,
    maxArgVal: 10,
    timeoutSec: TEN_SECONDS,
};

// Helper functions
function getLearningStatsFromStorage() {
    const learningStatsStorage = localStorage.getItem("learning_stats");
    if (learningStatsStorage != null) {
        return JSON.parse(learningStatsStorage);
    }

    const stats = {
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
    return stats;
}

function printStatistics() {
    const learning_stats = getLearningStatsFromStorage();

    for (let a = 0; a < 10; a++) {

        if (a == 0) {
            const header = SummaryElm.appendChild(document.createElement("tr"));
            for (let i = 0; i <= 10; i++) {
                const colHeader = header.appendChild(document.createElement("th"));
                if (i == 0) {
                    colHeader.textContent = `x`;
                }
                else {
                    colHeader.textContent = `${i}`;
                }
            }
        }
        const currentRowElm = SummaryElm.appendChild(document.createElement("tr"));

        for (let b = 0; b < 10; b++) {
            if (b == 0) {
                const rowHeader = currentRowElm.appendChild(document.createElement("th"));
                rowHeader.textContent = `${a + 1}`;
            }
            const currentElm = currentRowElm.appendChild(document.createElement("td"));
            currentElm.textContent = `${learning_stats.correctAnsPerQuestion[a][b]}`;
        }
    }
}

// Initialization steps
HeaderElm.textContent = "Tabliczka mnożenia";
StartLearningElm.textContent = "Rozpocznij naukę";
StartTestElm.textContent = "Rozpocznij test";

printStatistics();

//Event handlers
StartTestElm.onclick = function () {
    sessionStorage.setItem("config", JSON.stringify(config));
    location.href = "test.html";
}

StartLearningElm.onclick = function () {
    location.href = "learn.html";
}
