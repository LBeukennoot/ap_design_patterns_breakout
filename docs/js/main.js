"use strict";
class Game {
    constructor() {
        this.powerups = [];
        this.paddle = new Paddle();
        this.grid = new Grid();
        this.ball = new Ball();
        this.score = new Score();
        this.score.bricksLeft = this.grid.getBricks().length;
        this.gameLoop();
    }
    getCollisionX(ball, object) {
        return (ball.x + ball.width + this.ball.speedX > object.x &&
            ball.x + this.ball.speedX < object.x + object.width &&
            ball.y + ball.height > object.y &&
            ball.y < object.y + object.height);
    }
    getCollisionY(ball, object) {
        return (ball.x + ball.width > object.x &&
            ball.x < object.x + object.width &&
            ball.y + ball.height + this.ball.speedY > object.y &&
            ball.y + this.ball.speedY < object.y + object.height);
    }
    hitBrickHandler(index, position) {
        this.grid.hit(index);
        this.score.bricksLeft = this.grid.getBricks().length;
        const randomizer = Math.random();
        if (randomizer < 0.3) {
            this.powerups.push(new YellowPowerup(position[0], position[1]));
        }
        else if (randomizer > 0.3 && randomizer < 0.6) {
            this.powerups.push(new RedPowerup(position[0], position[1]));
        }
        else if (randomizer > 0.6) {
            this.powerups.push(new BluePowerup(position[0], position[1]));
        }
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
        if (this.powerups.length > 0) {
            for (let i = 0; i < this.powerups.length; i++) {
                if (this.getCollisionY(paddleBounds, this.powerups[i].getBoundingClientRect())) {
                    const powerupName = this.powerups[i].nodeName;
                    if (powerupName == "HOLD-UPGRADE") {
                        this.paddle.behaviour = new Slow(this.paddle);
                    }
                    else if (powerupName == "FASTER-UPGRADE") {
                        this.paddle.behaviour = new Double(this.paddle);
                    }
                    else if (powerupName == "REVERSE-UPGRADE") {
                        this.paddle.behaviour = new Reverse(this.paddle);
                    }
                    this.powerups[i].remove();
                    this.powerups.splice(i, 1);
                }
                if (this.powerups[i] !== undefined && this.powerups[i].y > window.innerHeight) {
                    this.powerups[i].remove();
                    this.powerups.splice(i, 1);
                }
            }
        }
        if (this.ball.outOfBounds) {
            this.score.lives = this.score.lives - 1;
            this.ball.resetPosition();
        }
        if (this.score.lives !== 0) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}
window.addEventListener("load", () => new Game());
class Ball extends HTMLElement {
    constructor() {
        super();
        this._startValueX = window.innerWidth / 2 - this.clientWidth / 2;
        this._startValueY = window.innerHeight * 0.90;
        this._speedX = SPEED_X;
        this._speedY = SPEED_Y;
        this._outOfBounds = false;
        this._x = this._startValueX;
        this._y = this._startValueY;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.draw();
    }
    invertSpeedX() {
        this._speedX *= -1;
    }
    invertSpeedY() {
        this._speedY *= -1;
    }
    get speedX() {
        return this._speedX;
    }
    get speedY() {
        return this._speedY;
    }
    update() {
        let newX = this._x + this._speedX;
        if (newX > 0 && newX + this.clientWidth < window.innerWidth) {
            this._x = newX;
        }
        else {
            this._speedX *= -1;
        }
        let newY = this._y + this._speedY;
        if (newY > 0 && newY + this.clientWidth < window.innerHeight) {
            this._y = newY;
        }
        else {
            this._speedY *= -1;
        }
        if (newY + this.clientWidth > window.innerHeight) {
            this._outOfBounds = true;
        }
        this.draw();
    }
    get outOfBounds() { return this._outOfBounds; }
    resetPosition() {
        this._speedX = SPEED_X;
        this._speedY = SPEED_Y;
        this._x = this._startValueX;
        this._y = this._startValueY;
        this._outOfBounds = false;
    }
    draw() {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`;
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
class Score extends HTMLElement {
    constructor() {
        super();
        this._bricksLeft = 1;
        this._lives = 3;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this.innerHTML = "Lives: " + this._lives;
    }
    get bricksLeft() {
        return this._bricksLeft;
    }
    set bricksLeft(v) {
        this._bricksLeft = v;
        this.update();
    }
    get lives() {
        return this._lives;
    }
    set lives(v) {
        this._lives = v;
        this.update();
    }
    update() {
        if (this._lives !== 0) {
            this.innerHTML = 'Lives: ' + this._lives;
        }
        else {
            this.innerHTML = 'Game over!';
        }
        if (this.bricksLeft == 0) {
            this.innerHTML = 'You won!';
        }
        console.log(this.bricksLeft);
    }
}
window.customElements.define("score-component", Score);
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
class Paddle extends HTMLElement {
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._moveLeft = false;
        this._moveRight = false;
        this._speed = 7;
        this._powerupActive = false;
        console.log("Paddle created!");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        this._behaviour = new Normal(this);
        this._x = window.innerWidth / 2 - this.clientWidth / 2;
        this._y = window.innerHeight * 0.95;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    onKeyDown(e) {
        if (e.key == "ArrowLeft" || e.key == "a")
            this._moveLeft = true;
        else if (e.key == "ArrowRight" || e.key == "d")
            this._moveRight = true;
    }
    onKeyUp(e) {
        if (e.key == "ArrowLeft" || e.key == "a")
            this._moveLeft = false;
        else if (e.key == "ArrowRight" || e.key == "d")
            this._moveRight = false;
    }
    get speed() { return this._speed; }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    get moveLeft() { return this._moveLeft; }
    get moveRight() { return this._moveRight; }
    set behaviour(behaviour) { this._behaviour = behaviour; }
    set powerupActive(active) { this._powerupActive = active; }
    update() {
        this._behaviour.move();
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
}
window.customElements.define("paddle-component", Paddle);
const POWERUP_DURATION = 2;
class Double {
    constructor(paddle) {
        this.paddle = paddle;
    }
    move() {
        let newX = 0;
        this.paddle.powerupActive = true;
        if (this.paddle.moveLeft)
            newX = this.paddle.x - (this.paddle.speed * 2);
        if (this.paddle.moveRight)
            newX = this.paddle.x + (this.paddle.speed * 2);
        if (newX > 0 && newX + this.paddle.clientWidth < window.innerWidth) {
            this.paddle.x = newX;
        }
        setTimeout(() => {
            this.paddle.behaviour = new Normal(this.paddle);
            this.paddle.powerupActive = false;
        }, POWERUP_DURATION * 1000);
    }
}
class Normal {
    constructor(paddle) {
        this.paddle = paddle;
    }
    move() {
        let newX = 0;
        if (this.paddle.moveLeft)
            newX = this.paddle.x - this.paddle.speed;
        if (this.paddle.moveRight)
            newX = this.paddle.x + this.paddle.speed;
        if (newX > 0 && newX + this.paddle.clientWidth < window.innerWidth) {
            this.paddle.x = newX;
        }
    }
}
class Reverse {
    constructor(paddle) {
        this.paddle = paddle;
    }
    move() {
        let newX = 0;
        this.paddle.powerupActive = true;
        if (this.paddle.moveLeft)
            newX = this.paddle.x + this.paddle.speed;
        if (this.paddle.moveRight)
            newX = this.paddle.x - this.paddle.speed;
        if (newX > 0 && newX + this.paddle.clientWidth < window.innerWidth) {
            this.paddle.x = newX;
        }
        setTimeout(() => {
            this.paddle.behaviour = new Normal(this.paddle);
            this.paddle.powerupActive = false;
        }, POWERUP_DURATION * 1000);
    }
}
class Slow {
    constructor(paddle) {
        this.paddle = paddle;
    }
    move() {
        let newX = 0;
        this.paddle.powerupActive = true;
        if (this.paddle.moveLeft)
            newX = this.paddle.x - (this.paddle.speed * 0);
        if (this.paddle.moveRight)
            newX = this.paddle.x + (this.paddle.speed * 0);
        if (newX > 0 && newX + this.paddle.clientWidth < window.innerWidth) {
            this.paddle.x = newX;
        }
        setTimeout(() => {
            this.paddle.behaviour = new Normal(this.paddle);
            this.paddle.powerupActive = false;
        }, POWERUP_DURATION * 1000);
    }
}
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
}
class BluePowerup extends Powerup {
    constructor(x, y) {
        super(x, y);
    }
}
window.customElements.define("faster-upgrade", BluePowerup);
class RedPowerup extends Powerup {
    constructor(x, y) {
        super(x, y);
    }
}
window.customElements.define("hold-upgrade", RedPowerup);
class YellowPowerup extends Powerup {
    constructor(x, y) {
        super(x, y);
    }
}
window.customElements.define("reverse-upgrade", YellowPowerup);
//# sourceMappingURL=main.js.map