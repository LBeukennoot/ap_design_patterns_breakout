"use strict";
class Game {
    constructor() {
        this.paddle = new Paddle();
        this.createGrid();
        this.gameLoop();
    }
    createGrid() {
        let rows = 7;
        let columns = 12;
        let brickWidth = 64;
        let brickHeight = 32;
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                let offsetX = (window.innerWidth - columns * brickWidth) / 2;
                let x = column * brickWidth + offsetX;
                let y = row * brickHeight + 100;
                console.log(`Place brick at (${x}, ${y})`);
                let game = document.getElementsByTagName("game")[0];
                game.appendChild(this);
            }
        }
    }
    gameLoop() {
        this.paddle.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
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
        if (e.key == "ArrowLeft")
            this.moveLeft = true;
        else if (e.key == "ArrowRight")
            this.moveRight = true;
    }
    onKeyUp(e) {
        if (e.key == "ArrowLeft")
            this.moveLeft = false;
        else if (e.key == "ArrowRight")
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
//# sourceMappingURL=main.js.map