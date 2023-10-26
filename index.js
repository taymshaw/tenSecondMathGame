$(document).ready(function() {
var interval;
var currentQuestion;
var score = 0;
var highScore = 0;

var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
    checkHighScore()
};

var checkHighScore = function () {
    if (score >= highScore) {
        highScore = score;
        $('#high-score').text(highScore);
    }
};

var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
}

var maxNumber = 50;
$('#set-max-number').click(function () {
    var userInput = parseInt($('#max-number').val());

    if (!isNaN(userInput) && userInput > 0) {
        maxNumber = userInput;
        $('#message').text("Highest number is set to " + maxNumber);
    }else {
        $('#message').text("Please enter a valid positive number.");
    }

    randomNumberGenerator = function () {
        return Math.ceil(Math.random() * maxNumber);
    }
});

var timeLeft = 10;
var startGame = function () {
    if (!interval) {
        if (timeLeft === 0) {
            updateTimeLeft(10);
            updateScore(-score);
        }
        interval = setInterval(function () {
            updateTimeLeft(-1);
            if (timeLeft === 0) {
                clearInterval(interval);
                interval = undefined;
            }
        }, 1000);
    }
}

var updateTimeLeft = function (amount) {
    timeLeft+= amount;
    $('#time-left').text(timeLeft);
}

var questionGenerator = function() {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + "+" + String(num2);

    return question;
}

var renderNewQuestion = function() {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
}

var checkAnswer = function (userInput, answer) {
    if(userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
    }
};

$('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
})

renderNewQuestion();

});