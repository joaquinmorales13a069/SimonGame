let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

// Function designed to play the sounds on each level and by user click
function PlaySound(name){
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}
// Function that changes for 100 miliseconds the color of each block in the sequence and by user click
function animatePress(currentColour){
    $(`.${currentColour}`).click(function(){
        $(`.${currentColour}`).addClass('pressed');
        setTimeout(function(){
            $(`.${currentColour}`).removeClass('pressed');
        }, 100);


    });
}
// Function that compares the sequence against user sequence, if it is the same next senquence added, if wrong restarts the game
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        } else{
          console.log("wrong");
          PlaySound('wrong');

          $('body').addClass('game-over');
          setTimeout(function(){
            $('body').removeClass('game-over')
          }, 200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
    }
}
// Function that resets the game
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;

}
// jQuery that changes the h1 text from start game to the current level
$(document).on('keydown', function(){
    if (!gameStarted){
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        gameStarted = true;
        
    }
});
//  jQuery that adds the functionality of user to the game
$('.btn').on('click', function(){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    PlaySound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

// Function that processes the game logic by selecting a random block on the screen and adding it to the sequence that the user must replicate
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);
    let randomNumber =  Math.floor(Math.random() * (4 - 0) + 0);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    PlaySound(randomChosenColour);


};

