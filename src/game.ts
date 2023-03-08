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
    private score : Score

    constructor() {
        this.paddle = new Paddle()
        this.grid = new Grid()
        this.ball = new Ball()
        //TODO making the score system work
        this.score = new Score()
        this.score.bricksLeft = this.grid.getBricks().length

        this.gameLoop()
    }

    private getCollisionX(ball: DOMRect, object: DOMRect) : boolean {
        return (ball.x + ball.width + this.ball.speedX > object.x && 
                ball.x + this.ball.speedX < object.x + object.width && 
                ball.y + ball.height > object.y && 
                ball.y < object.y + object.height)
    }

    private getCollisionY(ball: DOMRect, object: DOMRect) : boolean {
        return (ball.x + ball.width> object.x && 
            ball.x< object.x + object.width && 
            ball.y + ball.height + this.ball.speedY > object.y && 
            ball.y + this.ball.speedY < object.y + object.height)
    }

    private hitBrickHandler(index: number, position: Array<number>) {

        //remove hitted brick
        this.grid.hit(index)
        this.score.bricksLeft = this.grid.getBricks().length

        //random powerup and add it to array
        const randomizer = Math.random()
        if(randomizer < 0.3) {
            this.powerups.push(new YellowPowerup(position[0], position[1]))
        } else if(randomizer > 0.3 && randomizer < 0.6) {
            this.powerups.push(new RedPowerup(position[0], position[1]))
        } else if(randomizer > 0.6) {
            this.powerups.push(new BluePowerup(position[0], position[1]))
        }
        
    }

    private gameLoop() {

        //updating gameobjects
        this.paddle.update()
        this.ball.update()
        for(const powerup of this.powerups) {
            powerup.update()
        }

        //storing bounds in variables
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

        //checking collision with paddle and powerup
        if(this.powerups.length > 0) {
            for(let i = 0; i < this.powerups.length; i++) {

                //enabling powerup when cought by paddle *cough*
                if (this.getCollisionY(paddleBounds, this.powerups[i].getBoundingClientRect())) {
        
                    //activate powerup
                    const powerupName = this.powerups[i].nodeName
                    if(powerupName == "HOLD-UPGRADE") {

                        this.paddle.behaviour = new Slow(this.paddle)

                    } else if (powerupName == "FASTER-UPGRADE") {

                        this.paddle.behaviour = new Double(this.paddle)

                    } else if (powerupName == "REVERSE-UPGRADE") {

                        this.paddle.behaviour = new Reverse(this.paddle)

                    }

                    //removing the powerup after 'collecting' it with paddle
                    this.powerups[i].remove()
                    this.powerups.splice(i, 1)
        
                }

                //removing powerup if out of screen
                if(this.powerups[i] !== undefined && this.powerups[i].y > window.innerHeight) {
                    this.powerups[i].remove()
                    this.powerups.splice(i, 1)
                }

            }
        }

        if (this.ball.outOfBounds) {
            this.score.lives = this.score.lives - 1
            this.ball.resetPosition()
        }

        if (this.score.lives !== 0) {
            requestAnimationFrame(() => this.gameLoop())
        }
        
    }
}
// This is the entry point of the game. It is called when the page is loaded.
window.addEventListener("load", () => new Game())