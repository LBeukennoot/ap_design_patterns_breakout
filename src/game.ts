/**
 * The game class is the main class of the game. It creates all the objects and
 * starts the game loop.
 */
class Game {
    // Fields
    private paddle : Paddle
    private grid : Grid
    private ball : Ball

    constructor() {
        this.paddle = new Paddle()
        this.grid = new Grid()
        this.ball = new Ball()

        // this.createGrid()
        this.gameLoop()
    }

    private checkCollision(a: DOMRect, b: DOMRect) : boolean {
        // console.log(a.bottom)

        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }

    private getCollisionX(ball: DOMRect, object: DOMRect) : boolean {
        return (ball.x + ball.width + this.ball.getSpeedX() > object.x && 
                ball.x + this.ball.getSpeedX() < object.x + object.width && 
                ball.y + ball.height > object.y && 
                ball.y < object.y + object.height)
    }

    private getCollisionY(ball: DOMRect, object: DOMRect) : boolean {
        return (ball.x + ball.width> object.x && 
            ball.x< object.x + object.width && 
            ball.y + ball.height + this.ball.getSpeedY() > object.y && 
            ball.y + this.ball.getSpeedY() < object.y + object.height)
    }

    // private collisionDetection() {
    //     const b = this.paddle.getBoundingClientRect()
    //     if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
    //         dy = -dy;
    //     }
    // }

    private gameLoop() {
        this.paddle.update()
        this.ball.update()
        const ballBounds = this.ball.getBoundingClientRect()
        const paddleBounds = this.paddle.getBoundingClientRect()

        for(let i = 0; i < this.grid.getBricks().length; i++) {
            const brick = this.grid.getBricks()[i]
            const brickBounds = brick.getBoundingClientRect()

            if (this.getCollisionX(ballBounds, brickBounds)) {
          
                this.ball.invertSpeedX()
                this.grid.hit(i)
            }
          
            if (this.getCollisionY(ballBounds, brickBounds)) {
            
                this.ball.invertSpeedY()
                this.grid.hit(i)
            }

        }

        if (this.getCollisionX(ballBounds, paddleBounds)) {
          
            this.ball.invertSpeedX()
        }
      
        if (this.getCollisionY(ballBounds, paddleBounds)) {
        
            this.ball.invertSpeedY()
        }

        requestAnimationFrame(() => this.gameLoop())
    }
}
// This is the entry point of the game. It is called when the page is loaded.
window.addEventListener("load", () => new Game())