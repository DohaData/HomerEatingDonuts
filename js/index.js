window.onload = function () {
  const donutImage = new Image();
  donutImage.src = "./images/Donut.png";

  const homerImage = new Image();
  homerImage.src = "./images/HomerOpenMouth.png";

  const fruitImages = [new Image(), new Image()];
  fruitImages.forEach((image, index) => {
    image.src = `./images/Obstacle${index + 1}.png`;
  });

  const allScores = [];

  const startButton = document.getElementById("btn-start");
  const gameStartContainer = document.getElementById("game-start");
  const gameOnContainer = document.getElementById("game-on");
  const gameScoresContainer = document.getElementById("game-scores");
  const gameScreenContainer = document.getElementById("game-screen");
  const gameOverContainer = document.getElementById("game-over");
  const finalScore = document.getElementById("final-score");
  const restartButton = document.getElementById("btn-restart");

  startButton.addEventListener("click", () => {
    gameStartContainer.style.display = "none";
    gameOnContainer.style.display = "flex";
    gameScoresContainer.style.display = "flex";
    gameScreenContainer.style.display = "block";

    const game = new HomerEatingDonutsGame(
      homerImage,
      donutImage,
      fruitImages,
      allScores.length ? Math.max(...allScores) : 0
    );

    // Function that handles keydown event
    function handleKeydown(event) {
      const key = event.key;
      const possibleKeystrokes = ["ArrowLeft", "ArrowRight"];

      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();

        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case "ArrowLeft":
            game.homer.update(true, false);
            break;
          case "ArrowRight":
            game.homer.update(false, true);
            break;
        }
      }
    }
    window.addEventListener("keydown", handleKeydown);

    intervalId = setInterval(() => {
      if (game.gameOver) {
        clearInterval(intervalId);
        gameOnContainer.style.display = "none";
        gameScoresContainer.style.display = "none";
        gameScreenContainer.style.display = "none";
        gameOverContainer.style.display = "flex";
        finalScore.innerText = game.score;
        allScores.push(game.score);
      }
    }, 1000 / 60);
  });

  restartButton.addEventListener("click", () => {
    gameOverContainer.style.display = "none";
    gameStartContainer.style.display = "flex";
  });
};
