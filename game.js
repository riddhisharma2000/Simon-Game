
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown( function () 
{
    if(!started)
    {
          // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

    
});


function nextSequence()
{
// Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];


    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();

    randomNumber *= 4;

    randomNumber = Math.floor(randomNumber) ;
   // console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

var colorSound = "sounds/" + randomChosenColour + ".mp3";

    playSound(colorSound);

// var audio = new Audio(colorSound);
// audio.play();


}



// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {

    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

     // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    var name = "sounds/" + userChosenColour + ".mp3";

   playSound(name);

   animatePress(userChosenColour);


   // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

   // console.log(userClickedPattern);
});

function playSound(name)
{
    var audio = new Audio(name);
    audio.play();
}


//  a  function called animatePress() created to take a single input parameter called currentColour.
function animatePress(currentColour) {

   // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
        //....and whatever else you need to do
}, 100);

}

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playSound("sounds/wrong.mp3");

      $("body").addClass("game-over");

      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
        //....and whatever else you need to do
}, 200);



    startOver();

    }

}


function startOver()
{
  gamePattern = [];
  level = 0;
  started = false;
}