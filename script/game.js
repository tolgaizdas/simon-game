$(document).ready(() => {
  let levelTitle = $("#level-title");
  let body = $("body");
  // disable all buttons
  let allButtons = $(".btn");
  allButtons.css("pointer-events", "none");

  let buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];
  let level = 0;
  let hasStarted = false;
  let clickCount = -1;

  // create a random number for the next sequence
  const nextSequence = () => {
    let randomNumber = Math.floor(Math.random() * 4);
    level++;
    levelTitle.text("Level " + level);
    return randomNumber;
  };

  // check answer for each step
  const checkAnswer = (index) => {
    return userClickedPattern[index] === gamePattern[index] ? true : false;
  };

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
  };

  // animate the button on press
  const animatePress = (colour) => {
    let pressedButton = $("." + colour);
    pressedButton.addClass("pressed");
    setTimeout(function () {
      pressedButton.removeClass("pressed");
    }, 100);
  };

  // onclick function (game loop)
  allButtons.click((e) => {
    let userChosenColour = e.target.id;
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    let patternLength = gamePattern.length - 1;
    clickCount++;
    let answer = checkAnswer(clickCount);

    if (!answer) {
      gameOver();
      setTimeout(function () {
        levelTitle.css("pointer-events", "");
        levelTitle.text("Click Me to Start");
        levelTitle.on("click", () => {
          if (!hasStarted) {
            hasStarted = true;
            initNewLevel();
          }
        });
      }, 1000);
    } else if (clickCount !== patternLength) {
      makeSound(userChosenColour);
    }

    if (clickCount === patternLength) {
      let passedSound = new Audio("sounds/passed.mp3");
      passedSound.volume = 0.1;
      passedSound.play();
      body.css("background-color", "limegreen");
      setTimeout(function () {
        body.css("background-color", "#011F3F");
      }, 200);
      clickCount = -1;
      userClickedPattern = [];
      allButtons.css("pointer-events", "none");
      setTimeout(function () {
        initNewLevel();
      }, 1000);
    } else if (answer) {
      makeSound(userChosenColour);
    }
  });

  // game over
  const gameOver = () => {
    let gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.volume = 0.1;
    gameOverSound.play();
    levelTitle.css("pointer-events", "none");
    allButtons.css("pointer-events", "none");
    levelTitle.text("Game Over!");
    body.css("background-color", "red");
    setTimeout(function () {
      body.css("background-color", "#011F3F");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    clickCount = -1;
    hasStarted = false;
  };

  // initialize new level
  const initNewLevel = () => {
    levelTitle.css("pointer-events", "none");
    allButtons.css("pointer-events", "");
    let rnd = nextSequence();
    let randomChosenColour = buttonColours[rnd];
    gamePattern.push(randomChosenColour);
    let chosenButton = $("#" + randomChosenColour);
    chosenButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
  };

  // start game
  levelTitle.on("click", () => {
    if (!hasStarted) {
      hasStarted = true;
      initNewLevel();
    }
  });
});