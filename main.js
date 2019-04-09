/* load in html used help from https://stackoverflow.com/questions/12468374/make-jquery-function-run-on-page-load 
* and http://cs52.me/assignments/lab/quizzical/
*/
$(document).ready(function () {
    $.getJSON("data.json", function (data) {
        var numberOfQuestions = 0;
        var questions = data.questions;
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].question_type === "image") {
                addImageQuestion(questions[i], numberOfQuestions);
            }
            else if (questions[i].question_type === "text") {
                addTextQuestion(questions[i], numberOfQuestions);
            }
            numberOfQuestions++;
        }
        $(".done-button-container").css("display", "flex");
        $(".done-button").on("click", doneListener);
    });

});
function addImageQuestion(question, numberOfQuestions) {
    if (numberOfQuestions === 0) {
        $(getImageHTML(question)).insertAfter(".top-header");
    }
    else {
        $(getImageHTML(question)).insertAfter(".question.question-" + numberOfQuestions);
    }
    addQuestionBackground(question);
    $(".question.question-" + question.question_number + " .answer-image").on("click", imageListener); 
}
function addTextQuestion(question, numberOfQuestions) {
    if (numberOfQuestions === 0) {
        $(getTextHTML(question)).insertAfter(".top-header");
    }
    else {
        $(getTextHTML(question)).insertAfter(".question.question-" + numberOfQuestions);
    }
    addQuestionBackground(question);
    $(".question.question-" + question.question_number + " .answer-text").on("click", textListener);
}

function addQuestionBackground(question) {
    $(".question.question-" + question.question_number).css("background-image", "url('" + question.question_img_url + "')");
    $(".question.question-" + question.question_number).css("background-size", "100% 100%");
}

function getImageHTML(question) {
    return "<div class='question question-" + question.question_number + "' id='q" + question.question_number + "'>" +
        "<div class='question-box'>" +
        "<h3>" + question.question_text + "</h3>" +
        "</div>" +
        "<div class='answers'>" +
        "<div class='answer-row'>" +
        "<label class='answer-image question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[0].value + "' />" +
        "<img src='" + question.answers[0].img_url + "'/>" +
        "<p>" + question.answers[0].text + "</p>" +
        "</label>" +
        "<label class='answer-image question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[1].value + "' />" +
        "<img src='" + question.answers[1].img_url + "'/>" +
        "<p>" + question.answers[1].text + "</p>" +
        "</label>" +
        "</div>" +
        "<div class='answer-row'>" +
        "<label class='answer-image question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[2].value + "' />" +
        "<img src='" + question.answers[2].img_url + "'/>" +
        "<p>" + question.answers[2].text + "</p>" +
        "</label>" +
        "<label class='answer-image question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[3].value + "' />" +
        "<img src='" + question.answers[3].img_url + "'/>" +
        "<p>" + question.answers[3].text + "</p>" +
        "</label>" +
        "</div>" +
        "</div>" +
        "</div>";
}
function getTextHTML(question) {
    return "<div class='question question-" + question.question_number + "' id='q" + question.question_number + "'>" +
        "<div class='question-box'>" +
        "<h3>" + question.question_text + "</h3>" +
        "</div>" +
        "<div class='answers'>" +
        "<div class='answer-row'>" +
        "<label class='answer-text question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[0].value + "'/>" +
        "<p>" + question.answers[0].text + "</p>" +
        "</label>" +
        "<label class='answer-text question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[1].value + "' />" +
        "<p>" + question.answers[1].text + "</p>" +
        "</label>" +
        "</div>" +
        "<div class='answer-row'>" +
        "<label class='answer-text question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[2].value + "' />" +
        "<p>" + question.answers[2].text + "</p>" +
        "</label>" +
        "<label class='answer-text question-" + question.question_number + "'>" +
        "<input type='radio' name='question-" + question.question_number + "' value='" + question.answers[3].value + "' />" +
        "<p>" + question.answers[3].text + "</p>" +
        "</label>" +
        "</div>" +
        "</div>" +
        "</div>";
}
// Answer Values
var answerScores = {

    Salad1: 1,
    Thayers1: 4,
    World1: 3,
    Pizza1: 2,

    Hop2: 3,
    Foco2: 2,
    Collis2: 4,
    KAF2: 1,

    Sushi3: 4,
    Pasta3: 1,
    StirFry3: 3,
    Smoothie3: 2,

    Collis4: 1,
    Novack4: 4,
    Hop4: 3,
    SnackBar4: 2,

    Breakfast5: 4,
    Lunch5: 2,
    Dinner5: 1,
    LateNight5: 3,

    Foco6: 2,
    Collis6: 3,
    Hop6: 4,
    None6: 1,
};

var answerText = {
    Stacks: "The Stacks",
    BEMA: "BEMA",
    Hop: "Top of the Hop",
    Yard: "50 Yard Line",
    Hall: "Steps of Dartmouth Hall",
    Green: "The Middle of the Green",
    Lawn: "The Presidents Lawn"
};
var answerImage = {
    Stacks: "images/the-stacks.jpg",
    BEMA: "images/bema.jpg",
    Hop: "images/top-of-the-hop.jpg",
    Yard: "images/50-yard-line.jpg",
    Hall: "images/dartmouth-hall.jpg",
    Green: "images/green.jpg",
    Lawn: "images/presidents-lawn.jpg"
};

function imageListener(e) {
    var labelClass = parseClass(e.currentTarget.classList.value);
    $(this).css("border", "0.1em solid var(--white)");
    $(this).css("opacity", "1");
    $(labelClass).not(this).css("opacity", ".7");
    $(labelClass).not(this).css("border", "0.1em solid var(--alt-color-1)");
    goToNextQuestion(labelClass[labelClass.length - 1]);
}

function textListener(e) {
    var labelClass = parseClass(e.currentTarget.classList.value);
    $(this).css("background-color", "var(--alt-color-2)");
    $(this).css("opacity", "1");
    $(labelClass).not(this).css("opacity", ".7");
    $(labelClass).not(this).css("background-color", "var(--dominant-color)");
    goToNextQuestion(labelClass[labelClass.length - 1]);
}

function parseClass(classes) {
    var classList = classes.split(" ");
    var parsedClass = "";
    for (var i = 0; i < classList.length; i++) {
        parsedClass += "." + classList[i];
    }
    return parsedClass;

}

function goToNextQuestion(questionNum) {
    if (questionNum < $(".question").length) {
        var nextQuestion = "#q" + (Number(questionNum) + 1);
        location.href = nextQuestion;
    }
    else {
        location.href = "#finish";
    }

}
/** 
    Used answer 2 from https://stackoverflow.com/questions/4309144/how-to-get-multiple-selected-radio-buttons-value-using-jquery
    to find all values of checked boxes
*/
function doneListener(e) {
    var values = $('input:radio:checked').map(function (i, el) { return $(el).val(); }).get();
    var result = determineResults(values);
    if (result !== null) {
        $(".modal-header h2").text("Based off your DDS choices, the 7 you are most like is...");
        $(".modal-body").empty();
        $(".modal-body").append("<img src=" + answerImage[result] + ">");
        $(".modal-body").append("<p>" + answerText[result] + "</p>");
        $(".try-again").text("Try Again");
        $(".try-again").attr("finished", true);
    }
    else {
        $(".modal-header h2").text("");
        $(".modal-body").empty();
        $(".modal-body").append("<p>Please Fill In All Questions</p>");
        $(".try-again").text("Review Answers");
        $(".try-again").attr("finished", false);
    }
}

function determineResults(values) {
    if ($(".question").length === values.length) {
        var sum = findTotalScore(values);
        switch (true) {
            case (sum < 11):
                return "Stacks";
            case (sum < 13):
                return "BEMA";
            case (sum < 15):
                return "Hop";
            case (sum < 16):
                return "Yard";
            case (sum < 17):
                return "Hall";
            case (sum < 19):
                return "Green";
            case (sum < 25):
                return "Lawn";
            default:
                return null;
        }
    }
    else {
        return null;
    }

}

function findTotalScore(values) {
    var i;
    var total = 0;
    for (i = 0; i < values.length; i++) {
        total += answerScores[values[i]];
    }
    return total;
}
var modal = $("#answerModal");

/* adpated from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2 */
// When the user clicks the button, open the modal 
$(".done-button").on("click", function () {
    modal.css("display", "block");
});

$(".close").on("click", function () {
    modal.css("display", "none");
});
$(".try-again").on("click", function() {
    if (($(".try-again").attr("finished")) === "true") {
        modal.css("display", "none");
        window.location = window.location.pathname;
    }
    else {
        location.href = "#top";
        modal.css("display", "none");
    }
});

/* Help from https://stackoverflow.com/questions/45393553/window-onclick-functionevent-only-works-for-first-item */
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
    if (event.target.id === "answerModal") {
        modal.css("display", "none");
    }
});


