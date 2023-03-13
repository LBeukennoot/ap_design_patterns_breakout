///<reference path="./Powerup.ts" />

class BluePowerup extends Powerup {

    constructor(x: number, y: number) {
        super(x, y);
    }

    public setBehaviour(paddle: Paddle) {
        paddle.behaviour = new Double(paddle)
    }
}

window.customElements.define("faster-upgrade", BluePowerup as any)