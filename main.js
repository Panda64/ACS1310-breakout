/* eslint-disable max-classes-per-file */
// *****************************************************************************
// DOM refreneces
// *****************************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// *****************************************************************************
// Variables
// *****************************************************************************

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const paddleYStart = canvas.height - paddleHeight;
const PI2 = Math.PI * 2;
const objectColor = '#0095DD';

const gameWonMessage = 'You Won!';
const gameOverMessage = 'Game Over.';

class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Bricks {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

class Paddle {
  constructor(x, y, width, height, color = 'red') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class GameLabel {
  constructor(text, x, y, color, font = '16px Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}

class Game {
  constructor() {
    this.scoreLabel = new GameLabel('Score', 8, 20, objectColor);
    this.livesLabel = new GameLabel('Lives', canvas.width - 65, 20, objectColor);
    this.padle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, objectColor);
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.ball = new Ball(0, 0, 2, -2, ballRadius, objectColor);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();

    this.draw();
  }

  setup() {
    this.livesLabel.value = 3;
    resetBallAndPaddle();

    document.addEventListener('keydown', (e) => {
      this.keyDownHandler(e);
    }, false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }

  resetBallAndPaddle() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 3;
    this.ball.dy = -3;
    this.paddle.x = paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (this.ball.x > brick.x
              && this.ball.x < brick.x + brickWidth
              && this.ball.y > brick.y && this.ball.y < brick.y + brickHeight) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.cols * this.bricks.rows) {
              alert(gameWonMessage);
              document.location.reload();
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionsWithCanvasAndPaddle() {
    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < ballRadius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - ballRadius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + paddleWidth) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLabel.value -= 1;
        if (this.livesLabel.value < 1) {
          alert(gameOverMessage);
          document.location.reload();
        } else {
          resetBallAndPaddle();
        }
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, paddleYStart);
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.livesLabel.render(ctx);
    this.collisionDetection();
    this.ball.move();
    this.movePaddle();
    this.collisionsWithCanvasAndPaddle();
    this.movePaddle();

    requestAnimationFrame(() => {
      this.draw();
    });
  }
}

const game = new Game();
