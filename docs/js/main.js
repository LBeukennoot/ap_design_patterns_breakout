"use strict";
class Game {
    constructor() {
        this.powerups = [];
        this.paddle = new Paddle();
        this.grid = new Grid();
        this.ball = new Ball();
        this.gameLoop();
    }
    getCollisionX(ball, object) {
        return (ball.x + ball.width + this.ball.getSpeedX() > object.x &&
            ball.x + this.ball.getSpeedX() < object.x + object.width &&
            ball.y + ball.height > object.y &&
            ball.y < object.y + object.height);
    }
    getCollisionY(ball, object) {
        return (ball.x + ball.width > object.x &&
            ball.x < object.x + object.width &&
            ball.y + ball.height + this.ball.getSpeedY() > object.y &&
            ball.y + this.ball.getSpeedY() < object.y + object.height);
    }
    hitBrickHandler(index, position) {
        this.grid.hit(index);
        this.powerups.push(new Powerup(position[0], position[1]));
    }
    gameLoop() {
        this.paddle.update();
        this.ball.update();
        for (const powerup of this.powerups) {
            powerup.update();
        }
        const ballBounds = this.ball.getBoundingClientRect();
        const paddleBounds = this.paddle.getBoundingClientRect();
        if (this.grid.getBricks().length > 0) {
            for (let i = 0; i < this.grid.getBricks().length; i++) {
                const brick = this.grid.getBricks()[i];
                const brickBounds = brick.getBoundingClientRect();
                if (this.getCollisionX(ballBounds, brickBounds)) {
                    this.ball.invertSpeedX();
                    this.hitBrickHandler(i, brick.getPosition());
                }
                if (this.getCollisionY(ballBounds, brickBounds)) {
                    this.ball.invertSpeedY();
                    this.hitBrickHandler(i, brick.getPosition());
                }
            }
        }
        else {
            console.log("all gone");
        }
        if (this.getCollisionX(ballBounds, paddleBounds)) {
            this.ball.invertSpeedX();
        }
        if (this.getCollisionY(ballBounds, paddleBounds)) {
            this.ball.invertSpeedY();
        }
        console.log(this.powerups);
        if (this.powerups.length > 0) {
            for (let i = 0; i < this.powerups.length; i++) {
                if (this.powerups[i].y > window.innerHeight) {
                    console.log("weg: " + i);
                    this.powerups[i].remove();
                    this.powerups.splice(i, 1);
                }
                if (this.getCollisionY(paddleBounds, this.powerups[i].getBoundingClientRect())) {
                    console.log("WOOO GOGO");
                }
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
class Ball extends HTMLElement {
    constructor() {
        super();
        this.startValueX = window.innerWidth / 2 - this.clientWidth / 2;
        this.startValueY = window.innerHeight * 0.90;
        this.speedX = SPEED_X;
        this.speedY = SPEED_Y;
        this.x = this.startValueX;
        this.y = this.startValueY;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.draw();
    }
    invertSpeedX() {
        this.speedX *= -1;
    }
    invertSpeedY() {
        this.speedY *= -1;
    }
    getSpeedX() {
        return this.speedX;
    }
    getSpeedY() {
        return this.speedY;
    }
    update() {
        let newX = this.x + this.speedX;
        if (newX > 0 && newX + this.clientWidth < window.innerWidth) {
            this.x = newX;
        }
        else {
            this.speedX *= -1;
        }
        let newY = this.y + this.speedY;
        if (newY > 0 && newY + this.clientWidth < window.innerHeight) {
            this.y = newY;
        }
        else {
            this.speedY *= -1;
        }
        if (newY + this.clientWidth > window.innerHeight) {
            this.speedX = SPEED_X;
            this.speedY = SPEED_Y;
            this.x = this.startValueX;
            this.y = this.startValueY;
            console.log("live -1");
        }
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
const SPEED_X = 7;
const SPEED_Y = -3;
window.customElements.define("ball-component", Ball);
class Grid extends HTMLElement {
    constructor() {
        super();
        this.rows = 7;
        this.columns = 12;
        this.brickWidth = 64;
        this.brickHeight = 32;
        this.bricks = [];
        console.log("Grid created");
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                let offsetX = (window.innerWidth - this.columns * this.brickWidth) / 2;
                let x = column * this.brickWidth + offsetX;
                let y = row * this.brickHeight + 105;
                let brick;
                if (Math.random() < 0.3) {
                    brick = new YellowBrick(x, y, this.brickWidth, this.brickHeight);
                }
                else {
                    brick = new PurpleBrick(x, y, this.brickWidth, this.brickHeight);
                }
                this.bricks.push(brick);
                let game = document.getElementsByTagName("game")[0];
                game.appendChild(this);
            }
        }
    }
    getBricks() {
        return this.bricks;
    }
    hit(index) {
        if (this.bricks.length > 0) {
            this.bricks = this.bricks[index].hit(this.bricks, index);
        }
    }
}
window.customElements.define("grid-component", Grid);
class Paddle extends HTMLElement {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.moveLeft = false;
        this.moveRight = false;
        this.speed = 7;
        console.log("Paddle created!");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.x = window.innerWidth / 2 - this.clientWidth / 2;
        this.y = window.innerHeight * 0.95;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    onKeyDown(e) {
        if (e.key == "ArrowLeft" || e.key == "a")
            this.moveLeft = true;
        else if (e.key == "ArrowRight" || e.key == "d")
            this.moveRight = true;
    }
    onKeyUp(e) {
        if (e.key == "ArrowLeft" || e.key == "a")
            this.moveLeft = false;
        else if (e.key == "ArrowRight" || e.key == "d")
            this.moveRight = false;
    }
    update() {
        let newX = 0;
        if (this.moveLeft)
            newX = this.x - this.speed;
        if (this.moveRight)
            newX = this.x + this.speed;
        if (newX > 0 && newX + this.clientWidth < window.innerWidth)
            this.x = newX;
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
window.customElements.define("paddle-component", Paddle);
class Score {
    constructor() {
        this._bricksLeft = 0;
        this._lives = 3;
    }
    get bricksLeft() {
        return this._bricksLeft;
    }
    set bricksLeft(v) {
        this._bricksLeft = v;
    }
    get lives() {
        return this._lives;
    }
    set lives(v) {
        this._lives = v;
    }
}
class Brick extends HTMLElement {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    hit(bricks, index) {
        return bricks;
    }
    getPosition() {
        return [this.x, this.y];
    }
}
class PurpleBrick extends Brick {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
    hit(bricks, index) {
        this.remove();
        bricks.splice(index, 1);
        return bricks;
    }
}
window.customElements.define("brick-component", PurpleBrick);
class YellowBrick extends Brick {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
    hit(bricks, index) {
        this.remove();
        const brick = new PurpleBrick(this.x, this.y, this.width, this.height);
        bricks[index] = brick;
        return bricks;
    }
}
window.customElements.define("yellow-brick", YellowBrick);
class Powerup extends HTMLElement {
    constructor(x, y) {
        super();
        this._x = 0;
        this._y = 0;
        this._speed = -2;
        this._x = x;
        this._y = y;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.draw();
    }
    get y() { return this._y; }
    draw() {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    update() {
        this._y -= this._speed;
        this.draw();
    }
    hit() {
    }
}
window.customElements.define("hold-upgrade", Powerup);
//# sourceMappingURL=main.js.map