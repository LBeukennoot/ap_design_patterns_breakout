class Normal implements PaddleBehaviour {
    private paddle: Paddle

    constructor(paddle: Paddle) {
        this.paddle = paddle
    }

    public move(): void {
        
        let newX = 0
        if(this.paddle.moveLeft)   newX = this.paddle.x - this.paddle.speed
        if(this.paddle.moveRight)  newX = this.paddle.x + this.paddle.speed

        if (newX > 0 && newX + this.paddle.clientWidth < window.innerWidth) {

            this.paddle.x = newX

        }
    }
}