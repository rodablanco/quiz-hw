
//prompts with answers
var questions = [
    {
        prompt: " Which is not a data types present in javascript?",
        choices: ["String", "Image","Boolean"],
         answer: "Image"
    },
    {
        prompt: "Which is not a scopes of a variable in JavaScript?",
        choices: [ "Global", "Town", "Local"],
        answer: "Town"
    },
    {
        prompt: "Which type of JavaScript language is ___",
        choices: ["Object-Oriented", "Object-Based","Assembly-language", "High-level"],
        answer: "Object-Oriented"

    },
    {
        prompt: "Which one of the following also known as Conditional Expression:",
        choices: ["Alternative to if-else", "Switch statement","If-then-else statement", "Immediate if"],
        answer: "Immediate if"
    }
];


//variables declared
var score = 0;
var questionsIndex = 0;

var time = document.querySelector("#time");
var start = document.querySelector("#start");
var bodyContent = document.querySelector("#bodyContent");
var quiz = document.querySelector("#quiz");

var secondsRemaining = 70;
var holdInterval = 0;
var penalty = 10;
var ulMake = document.createElement("ul");


//starts timer
start.addEventListener("click", function(){
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsRemaining--;
            time.textContent = `Time: ${secondsRemaining}`;

            if(secondsRemaining <= 0) {
                clearInterval(holdInterval);
                allDone();
                time.textContent = "Game Over!";
            }
        }, 1000);
    }
    render(questionsIndex);
});

//displays questions and choices
function render(questionsIndex) {
    //clears existing data
    // bodyContent.innerHTML ="";
    // choicesList.innerHTML = "";

    //loops to loop thorugh all info
    //for (var i = 0; i < questions.length; i++){
        var userQuestion = questions[questionsIndex].prompt;
        var userChoices = questions[questionsIndex].choices;
        bodyContent.textContent = userQuestion;
   // }
    
    //new for each questions choices
    //clear list items
    ulMake.innerHTML = "";
    userChoices.forEach(function (newItem){
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        bodyContent.appendChild(ulMake);
        ulMake.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })

}

//event to compare choice with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //correct condition
        if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = `You are right! ${questions[questionsIndex].answer}`;
        } else {
            secondsRemaining = secondsRemaining - penalty;
            createDiv.textContent = `You are incorrect. The answer is ${questions[questionsIndex].answer}`
        }
    }
    //questions index determines number question user is on 
    questionsIndex++;


    if (questionsIndex === questions.length) {
        allDone();
        createDiv.textContent = `You're done! You got ${score}/${questions.length} Correct!`;
    } else {
        render(questionsIndex);
    }
    bodyContent.appendChild(createDiv);
}

//all done will append last page
function allDone() {
    bodyContent.innerHTML = "";
    time.innerHTML = "";

    //heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You're Done!!!"

    bodyContent.appendChild(createH1);

    //paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    bodyContent.appendChild(createP);

    //calculates time remaining and replaces it with score
    if (secondsRemaining >= 0) {
        var timeLeft = secondsRemaining;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = `YOur final score is ${timeLeft}`;

        bodyContent.appendChild(createP2);
    }

    //label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    bodyContent.appendChild(createLabel);

    //input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "iniitals");
    createInput.textContent = "";

    bodyContent.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    bodyContent.appendChild(createSubmit);
    

    //event listner for initials & storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;
        console.log("your initials", initials);

        localStorage.setItem("highScore", `${score} - ${initials}`);

    });
}

//making click work
document.querySelector("#highScores").addEventListener("click", getScore);
function getScore() {
    alert(localStorage.getItem("highScore"))
}
