// HTML Elements
let HeaderElm = document.getElementById("IdHeader");
let StartTestElm = document.getElementById("IdStartTest");
let StartLearningElm = document.getElementById("IdStartLearning");
let SummaryElm = document.getElementById("IdSummary");
let SummaryTextElm = document.getElementById("IdSummaryText");
let PromptForTestOrLesson = document.getElementById("IdPromptForTestOrLesson");

// Helper functions
function calculateColor(percentage) {
    const maxColorVal = 255;
    const step = maxColorVal / 50;

    let colorRGB = {
        red: 0,
        green: 0,
        blue: 0,
    }

    if (percentage < 50) {
        colorRGB.red = maxColorVal;
        colorRGB.green = step * percentage;
    }
    else if (percentage >= 50) {
        colorRGB.green = maxColorVal;
        colorRGB.red = (step * (100 - percentage));
    }

    return colorRGB;
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
            const score = learning_stats.correctAnsPerQuestion[a][b];
            currentElm.textContent = `${score}`;
            color = calculateColor(score * 10);
            currentElm.style.background = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        }
    }
}

// Initialization steps
HeaderElm.textContent = "Tabliczka mnożenia";
StartLearningElm.textContent = "Nauka";
StartTestElm.textContent = "Test";
SummaryTextElm.textContent = "Twoje obecne umiejętności przedstawiają się następująco:";
PromptForTestOrLesson.textContent = "Rozwiąż test lub rozpocznij naukę aby zaktualizować powyższą mapę!";

printStatistics();

//Event handlers
StartTestElm.onclick = function () {
    location.href = "test.html";
}

StartLearningElm.onclick = function () {
    location.href = "learn.html";
}
