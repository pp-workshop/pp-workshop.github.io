function generateEmptyStats() {
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

function getIdx(i) {
    return i - 1;
}

function getLearningStatsFromStorage() {
    const learningStatsStorage = localStorage.getItem("learning_stats");
    if (learningStatsStorage != null) {
        return JSON.parse(learningStatsStorage);
    }

    return generateEmptyStats();
}

function saveLearningStatsInStorage(learning_stats) {
    localStorage.setItem("learning_stats", JSON.stringify(learning_stats));
}

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
