class RedPowerup extends Powerup {

    constructor(x: number, y: number) {
        super(x, y);
    }

    public setBehaviour(paddle: Paddle) {
        paddle.behaviour = new Slow(paddle)
    }
}

window.customElements.define("hold-upgrade", RedPowerup as any)