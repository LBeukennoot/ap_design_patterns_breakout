/**
 * The game class is the main class of the game. It creates all the objects and
 * starts the game loop.
 */
class Game {
    // Fields
    private paddle : Paddle
    private grid : Grid
    private ball : Ball
    private powerups : Array<Powerup> = []

    constructor() {
        this.paddle = new Paddle()
        this.grid = new Grid()
        this.ball = new Ball()

        this.gameLoop()
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

    private hitBrickHandler(index: number, position: Array<number>) {
        this.grid.hit(index)
        //powerup
        this.powerups.push(new Powerup(position[0], position[1]))
    }

    private gameLoop() {

        //updating gameobjects
        this.paddle.update()
        this.ball.update()
        for(const powerup of this.powerups) {
            powerup.update()
        }

        const ballBounds = this.ball.getBoundingClientRect()
        const paddleBounds = this.paddle.getBoundingClientRect()

        //checking collision with ball and brick
        if(this.grid.getBricks().length > 0) {

            for(let i = 0; i < this.grid.getBricks().length; i++) {

                const brick = this.grid.getBricks()[i]
                const brickBounds = brick.getBoundingClientRect()
    
                if (this.getCollisionX(ballBounds, brickBounds)) {
              
                    this.ball.invertSpeedX()
                    this.hitBrickHandler(i, brick.getPosition())

                }
              
                if (this.getCollisionY(ballBounds, brickBounds)) {
                
                    this.ball.invertSpeedY()
                    this.hitBrickHandler(i, brick.getPosition())

                }
    
            }
        } else {

            console.log("all gone")

        }

        //checking collision with ball and paddle
        if (this.getCollisionX(ballBounds, paddleBounds)) {
          
            this.ball.invertSpeedX()

        }
      
        if (this.getCollisionY(ballBounds, paddleBounds)) {
        
            this.ball.invertSpeedY()

        }

        console.log(this.powerups)
        if(this.powerups.length > 0) {
            for(let i = 0; i < this.powerups.length; i++) {

                //removing if out of screen
                if(this.powerups[i].y > window.innerHeight) {
                    console.log("weg: " + i)
                    this.powerups[i].remove()
                    this.powerups.splice(i, 1)
                }

                //enabling powerup when cought by paddle
                if (this.getCollisionY(paddleBounds, this.powerups[i].getBoundingClientRect())) {
        
                    console.log("WOOO GOGO")
        
                }
            }
        }

        //checking collision with paddle and powerup

        requestAnimationFrame(() => this.gameLoop())
    }
}
// This is the entry point of the game. It is called when the page is loaded.
window.addEventListener("load", () => new Game())