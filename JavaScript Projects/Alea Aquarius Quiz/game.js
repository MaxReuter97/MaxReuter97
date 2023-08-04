const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCountText = document.getElementById("question-counter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let questionCount = 0;
let availableQuestions = []
let score = 0;
let choiceIsSelected = false;

questions = [
    {
        question: "Wo hat Alea die Alpha Cru kennengelernt?",
        choice0: "In Amsterdam",
        choice1: "In Hannover",
        choice2: "In Hamburg",
        choice3: "In Renesse",
        answer: 2,
        scoreBonus: 10
    },
    {
        question: "Wo hatte Alea ihren ersten Musikalischen Auftritt mit der Alpha Cru?",
        choice0: "In Amsterdam",
        choice1: "In Hamburg",
        choice2: "In Reykjavik",
        choice3: "In Renesse",
        answer: 0,
        scoreBonus: 30
    },
    {
        question: "Wie ist der Name von Alea's Zwillingsschwester?",
        choice0: "Amena",
        choice1: "Nelani",
        choice2: "Anthea",
        choice3: "Niki Vela",
        answer: 2,
        scoreBonus: 10
    },
    {
        question: "Wie hieß die leibliche Mutter von Alea?",
        choice0: "Marianne",
        choice1: "Niki",
        choice2: "Xenia",
        choice3: "Nelani",
        answer: 3,
        scoreBonus: 10
    },
    {
        question: "Wie hieß die leibliche Mutter von Anthea?",
        choice0: "Nelani ",
        choice1: "Xenia",
        choice2: "Niki",
        choice3: "Marianne",
        answer: 0,
        scoreBonus: 20
    },
    {
        question: "Wo wurde Alea von Nelani an Marianne übergeben?",
        choice0: "Am Strand von Renesse",
        choice1: "Am Strand von Hamburg",
        choice2: "Am Strand von Amsterdam",
        choice3: "Am Strand von Reykjavik",
        answer: 0,
        scoreBonus: 20
    },
    {
        question: "Wo hatte Lennox seine erste Fahrstunde?",
        choice0: "In Amsterdam als er noch dort lebte",
        choice1: "In Edinburgh als Alea und Lennox ohne die Alpha Cru nach Loch Ness reisen musste",
        choice2: "In Orions Villa in Reykjavik, Schottland",
        choice3: "Lennox hatte nie eine erste Fahrstunde",
        answer: 2,
        scoreBonus: 30
    },
    {
        question: "Wie heißt Lennox leibliche Mutter?",
        choice0: "Lennia",
        choice1: "Xenia",
        choice2: "Nelani",
        choice3: "Niki",
        answer: 1,
        scoreBonus: 20
    },
    {
        question: "Zu welchen Stamm der Meermenschen gehört Lennox?",
        choice0: "Brim",
        choice1: "Roix",
        choice2: "Oblivion",
        choice3: "Adetari",
        answer: 2,
        scoreBonus: 20
    },
    {
        question: "Was hat Rofus auch Rotfarn für einen nutzen?",
        choice0: "Sie desinfiziert und heilt innere verletzungen",
        choice1: "Gewährt einen temporären Schutz gegen das Virus",
        choice2: "Sie hält Magische Wesen fern",
        choice3: "Rofus ist besonders gut geeignet um leckeren Tee zu kochen",
        answer: 1,
        scoreBonus: 10
    }
];

const SCORE_BONUS = [10, 20, 30, 40]
const MAX_QUESTIONS = questions.length;

startGame = () => {
    availableQuestions = [...questions];
    questionCount = 1;
    score = 0;
    acceptingQuestion = false;
    

    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions <= 0 || questionCount > MAX_QUESTIONS){
        window.location.assign("index.html");
    }

    let index = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[index];

    question.innerText = currentQuestion.question;
    questionCountText.innerText = `${questionCount}/${MAX_QUESTIONS}`

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(index, 1);
    choiceIsSelected = false;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!choiceIsSelected){
            choiceIsSelected = true;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"]
            const rightAnswer = currentQuestion.answer;
            const correctClass = "correct";
            const incorrectClass = "incorrect";
            let classToApply = selectedAnswer == rightAnswer ? correctClass : incorrectClass;
            
            selectedChoice.parentNode.classList.add(classToApply);
            questionCount++;
            if(classToApply == correctClass){
                score += currentQuestion.scoreBonus;
                scoreText.innerText = score;            
            } else {
                choices[rightAnswer].parentNode.classList.add(correctClass);
            }

            setTimeout( () => {
                selectedChoice.parentNode.classList.remove(classToApply);
                choices[rightAnswer].parentNode.classList.remove(correctClass);
                getNewQuestion();
            }, 2800)
        }
    })
})

_print = (s) => {
    console.log(s);
}

startGame();