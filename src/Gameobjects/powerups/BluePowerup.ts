///<reference path="./Powerup.ts" />

class BluePowerup extends Powerup {

    constructor(x: number, y: number) {
        super(x, y);
    }
}

window.customElements.define("faster-upgrade", BluePowerup as any)