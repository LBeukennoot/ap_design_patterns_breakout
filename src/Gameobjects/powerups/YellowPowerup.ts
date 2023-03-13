class YellowPowerup extends Powerup {

    constructor(x: number, y: number) {
        super(x, y);
    }

    public setBehaviour(paddle: Paddle) {
        paddle.behaviour = new Reverse(paddle)
    }
}

window.customElements.define("reverse-upgrade", YellowPowerup as any)