const players = [];
let ball;
let txt;

class Player {
  constructor(x, upKey, downKey) {
    this.x = x;
    this.y = height / 2;
    this.width = 20;
    this.height = 100;
    this.upKey = upKey;
    this.downKey = downKey;
    this.score = 0;
  }

  show() {
    fill(255);
    rect(this.x, this.y, 20, 100);

    if (keyIsDown(this.upKey)) {
      if (this.y > 0) {
        this.y -= 5;
      }
    }
    if (keyIsDown(this.downKey)) {
      if (this.y < height - this.height) {
        this.y += 5;
      }
    }
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 20;
    this.height = 20;
    this.xSpeed = 5;
    this.ySpeed = 5;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.width, this.height);

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y - this.height / 2 < 0 || this.y + this.height / 2 > height) {
      this.ySpeed *= -1;
    }

    if (this.x - this.width / 2 < 0 || this.x + this.width / 2 > width) {
      this.xSpeed *= -1;
    }

    for (let player of players) {
      if (
        this.x - this.width / 2 < player.x + player.width &&
        this.x + this.width / 2 > player.x &&
        this.y - this.height / 2 < player.y + player.height &&
        this.y + this.height / 2 > player.y
      ) {
        this.xSpeed *= -1;
      }
    }

    if (this.x - this.width / 2 < 0) {
      players[1].score++;
      this.x = width / 2;
      this.y = height / 2;
    }

    if (this.x + this.width / 2 > width) {
      players[0].score++;
      this.x = width / 2;
      this.y = height / 2;
    }
  }
}

class Text {
  constructor() {}

  show() {
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);

    text(players[0].score + " : " + players[1].score, width / 2, 50);
  }
}

function setup() {
  createCanvas(1000, 600);
  players.push(new Player(50, 87, 83));
  players.push(new Player(width - 70, UP_ARROW, DOWN_ARROW));
  ball = new Ball();
  txt = new Text();
}

function draw() {
  background(0);

  for (let player of players) {
    player.show();
  }
  ball.show();
  txt.show();
}
