$(document).ready(() => {
  // disable all buttons
  $(".btn").css("pointer-events", "none");

  let buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];
  let level = 0;
  let hasStarted = false;
  let userChosenColour;
  let clickCount = -1;

  // create a random number for the next sequence
  const nextSequence = () => {
    let randomNumber = Math.floor(Math.random() * 4);
    level++;
    let levelTitle = $("#level-title");
    levelTitle.text("Level " + level);
    return randomNumber;
  }

  // check answer for each step
  const checkAnswer = (index) => {
    return (userClickedPattern[index] === gamePattern[index]) ? true : false;
  }

  // play sound
  const makeSound = (colour) => {
    let audio = new Audio();
    switch (colour) {
      case "blue":
        audio = new Audio("sounds/blue.mp3");
        audio.play();
        break;
      case "green":
        audio = new Audio("sounds/green.mp3");
        audio.play();
        break;
      case "red":
        audio = new Audio("sounds/red.mp3");
        audio.play();
        break;
      case "yellow":
        audio = new Audio("sounds/yellow.mp3");
        audio.play();
        break;
    }
    audio.volume = 0.1;
  }

  // animate the button on press
  const animatePress = (colour) => {
    let pressedButton = $("." + colour);
    pressedButton.addClass("pressed");
    setTimeout(function() {
      pressedButton.removeClass("pressed");
    }, 100);
  }

  // onclick function (game loop)
  $(".btn").click((e) => {
    userChosenColour = e.target.id;
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    let patternLength = gamePattern.length - 1;
    clickCount++;
    let answer = checkAnswer(clickCount);

    if (!answer) {
      gameOver();
      $(document).off('keydown');
      setTimeout(function() {
        $("#level-title").text("Press A Key to Start");
        $(document).on("keydown", () => {
          if (!hasStarted) {
            hasStarted = true;
            initNewLevel();
          }
        });
      }, 1000);
    } else {
      makeSound(userChosenColour);
    }

    if (clickCount === patternLength) {
      clickCount = -1;
      userClickedPattern = [];
      $(".btn").css("pointer-events", "none");
      setTimeout(function() {
        initNewLevel();
      }, 1000);
    }
  });

  // game over
  const gameOver = () => {
    let gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.volume = 0.1;
    gameOverSound.play();
    $(".btn").css("pointer-events", "none");
    $("#level-title").text("Game Over!");
    $("body").css("background-color", "red");
    setTimeout(function () {
      $("body").css("background-color", "#011F3F");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    clickCount = -1;
    hasStarted = false;
  }

  // initialize new level
  const initNewLevel = () => {
    $(document).off('keydown');
    $(".btn").css("pointer-events", "");
    let rnd = nextSequence();
    let randomChosenColour = buttonColours[rnd];
    gamePattern.push(randomChosenColour);
    let chosenButton = $("#" + randomChosenColour);
    chosenButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
  }

  // start game
  $(document).on("keydown", () => {
    if (!hasStarted) {
      hasStarted = true;
      initNewLevel();
    }
  });

})
