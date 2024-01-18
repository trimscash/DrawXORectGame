import { cleanCanvas, drawed } from "./canvas.js";
import { init, predict } from "./predict.js";

const incorrect_sound = new Audio('../sounds/incorrect.mp3');
const correct_sound = new Audio('../sounds/correct.mp3');
const new_problem_sound = new Audio('../sounds/new_problem.mp3');

const PROBLEMS = ["X", "CIRCLE", "RECT"]
let problem_time = 5000;

let nowProblem = ""
let lifeNum = 3
let incorrectNum = 0
let score = 0
let remainTime = problem_time;

function gameover() {
    console.log("gameover")
    let startButton = document.getElementById('startButton');
    startButton.hidden = false;
    let gameoverArea = document.getElementById('gameover');
    gameoverArea.hidden = false;
    const problemaArea = document.getElementById('problem');
    problemaArea.hidden = true;
    const timeArea = document.getElementById('time');
    timeArea.hidden = true;
}

function updateProblemTime() {
    problem_time
}

async function onAnswerButtonPushed() {
    console.log("aa")
    await checkAns()
}

function nextProblem() {
    new_problem_sound.currentTime = 0;
    new_problem_sound.play();

    nowProblem = PROBLEMS[getRandomInt(0, 3)]

    const problemaArea = document.getElementById('problem');
    problemaArea.innerHTML = `🖍️: ${nowProblem}`
    cleanCanvas();
}

async function checkAns() {
    let prediction = await predict()
    let probability = prediction.map((a) => a.probability)
    let maxIndex = probability.indexOf(Math.max(...probability))
    console.log(probability)
    console.log(maxIndex)
    // let 
    if (drawed && nowProblem == prediction[maxIndex].className) {
        correct_sound.currentTime = 0;
        correct_sound.play();

        console.log("correct!");
        score++;
        const scoreArea = document.getElementById('score');
        scoreArea.innerHTML = `🎯: ${score}`;
        cleanCanvas();
        nextProblem();
        remainTime = problem_time;
        return true
    } else {
        incorrect_sound.currentTime = 0;
        incorrect_sound.play();

        console.log("incorrect..");
        cleanCanvas();
        return false
    }
}

async function start() {
    console.log("aa")
    await init();
    nowProblem = ""
    lifeNum = 3
    incorrectNum = 0
    score = 0
    remainTime = problem_time;

    let startButton = document.getElementById('startButton');
    startButton.hidden = true;
    let gameoverArea = document.getElementById('gameover');
    gameoverArea.hidden = true;

    const scoreArea = document.getElementById('score');
    scoreArea.innerHTML = `🎯: ${score}`;

    const problemaArea = document.getElementById('problem');
    problemaArea.hidden = false;

    const timeArea = document.getElementById('time');
    timeArea.hidden = false;
    timeArea.innerHTML = `<h2>⏱️: ${(remainTime / 1000).toFixed(2)}</h2>`

    const lifeArea = document.getElementById('life');
    lifeArea.innerHTML = "🩷".repeat(lifeNum) + "❌".repeat(incorrectNum);


    nextProblem();

    let loop = setInterval(async () => {
        const timeArea = document.getElementById('time');
        timeArea.innerHTML = `<h2>⏱️: ${(remainTime / 1000).toFixed(2)}</h2>`

        if (lifeNum <= 0) {
            gameover();
            clearInterval(loop);
        }
        if (remainTime <= 0) {
            remainTime = problem_time;

            let isCorrect = await checkAns();
            if (!isCorrect) {
                incorrectNum++;
                lifeNum--;
                const lifeArea = document.getElementById('life');
                lifeArea.innerHTML = "🩷".repeat(lifeNum) + "❌".repeat(incorrectNum);
            }
            nextProblem();
        }

        remainTime -= 100;
    }, 100);
}


document.addEventListener('DOMContentLoaded', function () {
    const answerButton = document.getElementById('answerButton');
    answerButton.addEventListener('click', onAnswerButtonPushed);

    const cleanButton = document.getElementById('cleanButton');
    cleanButton.addEventListener('click', cleanCanvas);

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', start);
});


function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

