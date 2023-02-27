/**
 * The game class is the main class of the game. It creates all the objects and
 * starts the game loop.
 */
class Game {
    // Fields
    private paddle : Paddle
    private grid : Grid

    constructor() {
        this.paddle = new Paddle()
        this.grid = new Grid()

        // this.createGrid()
        this.gameLoop()
    }

    private gameLoop() {
        this.paddle.update()

        requestAnimationFrame(() => this.gameLoop())
    }
}
// This is the entry point of the game. It is called when the page is loaded.
window.addEventListener("load", () => new Game())