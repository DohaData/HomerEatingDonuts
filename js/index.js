window.onload = function () {
  const donutImage = new Image();
  donutImage.src = "./images/Donut.png";

  const homerImage = new Image();
  homerImage.src = "./images/HomerOpenMouth.png";

  const fruitImages = [new Image(), new Image()];
  fruitImages.forEach((image, index) => {
    image.src = `./images/Obstacle${index + 1}.png`;
  });

  const startButton = document.getElementById("btn-start");
  const gameStartContainer = document.getElementById("game-start");
  const gameOnContainer = document.getElementById("game-on");
  const gameScoresContainer = document.getElementById("game-scores");
  const gameScreenContainer = document.getElementById("game-screen");
  const gameOverContainer = document.getElementById("game-over");

  startButton.addEventListener("click", () => {
    gameStartContainer.style.display = "none";
    gameOnContainer.style.display = "flex";
    gameScoresContainer.style.display = "flex";
    gameScreenContainer.style.display = "block";

    const game = new HomerEatingDonutsGame(homerImage, donutImage, fruitImages);

    // Function that handles keydown event
    function handleKeydown(event) {
      const key = event.key;
      console.log("key", key);
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
  });
};
