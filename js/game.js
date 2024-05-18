class HomerEatingDonutsGame {
  constructor(homerImage, donutImage, fruitImages, highScore) {
    this.homerImage = homerImage;
    this.donutImage = donutImage;
    this.fruitImages = fruitImages;
    this.highScore = highScore;
    this.canvas = document.getElementById("game-screen");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 500;
    this.canvas.height = 800;
    this.homer = new Homer(this.canvas.width, this.canvas.height);
    this.donuts = [];
    this.donuts.push(
      new ObjectsComingFromTheSky(this.canvas.width, this.canvas.height)
    );
    this.fruits = [];
    this.fruits.push({
      name: Math.random() < 0.5 ? 0 : 1,
      object: new ObjectsComingFromTheSky(
        this.canvas.width,
        this.canvas.height
      ),
    });
    this.score = 0;
    this.gameOver = false;
    this.gameLoop();
  }

  gameLoop() {
    this.update();
    this.draw();
    if (!this.gameOver) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  update() {
    for (let donutIndex = 0; donutIndex < this.donuts.length; donutIndex++) {
      const donut = this.donuts[donutIndex];
      donut.update();
      if (this.homer.isColliding(donut)) {
        this.score++;
        this.donuts.splice(donutIndex, 1);
        donutIndex--;
      }
      if (donut.isOutOfScreen()) {
        this.donuts.splice(donutIndex, 1);
        donutIndex--;
      }
    }

    for (let fruitIndex = 0; fruitIndex < this.fruits.length; fruitIndex++) {
      const fruit = this.fruits[fruitIndex];
      fruit.object.update();
      if (this.homer.isColliding(fruit.object)) {
        this.gameOver = true;
        console.log("game over");
      }
      if (fruit.object.isOutOfScreen()) {
        this.fruits.splice(fruitIndex, 1);
        fruitIndex--;
      }
    }

    if (Math.random() < 0.01) {
      this.donuts.push(
        new ObjectsComingFromTheSky(this.canvas.width, this.canvas.height)
      );
    }
    if (Math.random() < 0.015) {
      this.fruits.push({
        name: Math.random() < 0.5 ? 0 : 1,
        object: new ObjectsComingFromTheSky(
          this.canvas.width,
          this.canvas.height
        ),
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.homer.draw(this.ctx, this.homerImage);
    this.donuts.forEach((donut) => donut.draw(this.ctx, this.donutImage));
    this.fruits.forEach((fruit) =>
      fruit.object.draw(this.ctx, this.fruitImages[fruit.name])
    );
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `${this.score}`;
    const highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = `${this.highScore}`;
  }
}

class Homer {
  constructor(gameWidth, gameHeight) {
    this.width = 80;
    this.height = 50;
    this.x = gameWidth / 2 - this.width / 2;
    this.y = gameHeight - this.height;
    this.speed = 15;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  update(clickedLeft, clickedRight) {
    if (clickedLeft && this.x > 0) {
      this.x -= this.speed;
    }
    if (clickedRight && this.x < this.gameWidth - this.width) {
      this.x += this.speed;
    }
  }

  draw(ctx, img) {
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  isColliding(objectComingFromTheSky) {
    return (
      this.x < objectComingFromTheSky.x + objectComingFromTheSky.width &&
      this.x + this.width > objectComingFromTheSky.x &&
      this.y < objectComingFromTheSky.y + objectComingFromTheSky.height &&
      this.y + this.height > objectComingFromTheSky.y
    );
  }
}

class ObjectsComingFromTheSky {
  constructor(gameWidth, gameHeight) {
    this.width = 50;
    this.height = 50;
    this.x = Math.random() * (gameWidth - this.width);
    this.y = 0;
    this.speed = 2;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx, img) {
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  isOutOfScreen() {
    return this.y > this.gameHeight;
  }
}
