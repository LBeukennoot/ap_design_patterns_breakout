class Reverse implements PaddleBehaviour {

    private paddle: Paddle

    constructor(paddle: Paddle) {
        this.paddle = paddle
    }

    public move(): void {
        
        let newX = 0
        this.paddle.powerupActive = true
        if(this.paddle.moveLeft)   newX = this.paddle.x + this.paddle.speed
        if(this.paddle.moveRight)  newX = this.paddle.x - this.paddle.speed

        if (newX > 0 && newX + this.paddle.clientWidth < window.innerWidth) {

            this.paddle.x = newX

        }

        setTimeout(() => {
            this.paddle.behaviour = new Normal(this.paddle)
            this.paddle.powerupActive = false
        }, POWERUP_DURATION * 1000)
    }

}