class YellowPowerup extends Powerup {

    constructor(x: number, y: number) {
        super(x, y);
    }
}

window.customElements.define("reverse-upgrade", YellowPowerup as any)