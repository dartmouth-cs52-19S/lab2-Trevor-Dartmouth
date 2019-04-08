// Answer Values

var answerScores = {

    Salad: 1,
    Thayers: 4,
    World: 3,
    Pizza: 2,

    Hop2: 3,
    Foco2: 2,
    Collis2: 4,
    KAF2: 1,

    Sushi: 4,
    Pasta: 1,
    StirFry: 3,
    Smoothie: 2,

    Collis4: 1,
    Novack4: 4,
    Hop4: 3,
    SnackBar: 2,

    Breakfast: 4,
    Lunch: 2,
    Dinner: 1,
    LateNight: 3,

    Foco6: 2,
    Collis6: 3,
    Hop6: 4,
    None: 1,
};



$(".answer-image").on( "click", imageListener);
$(".answer-text").on( "click", textListener);
$(".done-button").on("click", doneListener);

function imageListener(e) {
    $('.answer-image input[type="radio"]:checked').parent().css("border", "0.1em solid var(--alt-color-2)");
    $('.answer-image input[type="radio"]:not(:checked)').parent().css("border", "0.1em solid var(--alt-color-1)");

}

function textListener(e) {
    $('.answer-text input[type="radio"]:checked').parent().css("background-color", "var(--alt-color-2)");
    $('.answer-text input[type="radio"]:not(:checked)').parent().css("background-color", "var(--dominant-color)");
}

/** 
    Used answer 2 from https://stackoverflow.com/questions/4309144/how-to-get-multiple-selected-radio-buttons-value-using-jquery
    to find all values of checked boxes
*/
function doneListener(e) {
    var values = $('input:radio:checked').map(function(i, el){return $(el).val();}).get();
    var result = determineResults(values);
    $(".results h3").html(result);
}

function determineResults(values) {
    var sum = findTotalScore(values);
    switch (true) {
        case (sum < 7):
            return "The Stacks";
        case (sum < 10):
            return "BEMA";
        case (sum < 13):
            return "Top of the Hop";
        case (sum < 16):
            return "50 Yard Line";
        case (sum < 19):
            return "Steps of Dartmouth Hall";
        case (sum < 21):
            return "Middle of the Green";
        case (sum < 25):
            return "President's Lawn";
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
$(".done-button").on("click", function() {
    modal.css("display", "block");
});

$(".close").on("click", function() {
    modal.css("display", "none");
});

/* Help from https://stackoverflow.com/questions/45393553/window-onclick-functionevent-only-works-for-first-item */
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target.id === "answerModal") {
        modal.css("display", "none");
      }
});



