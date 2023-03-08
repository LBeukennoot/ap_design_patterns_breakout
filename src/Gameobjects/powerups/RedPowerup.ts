class RedPowerup extends Powerup {

    constructor(x: number, y: number) {
        super(x, y);
    }
}

window.customElements.define("hold-upgrade", RedPowerup as any)