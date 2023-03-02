class Ball extends HTMLElement {

    private x : number
    private y: number
    private startValueX : number = window.innerWidth / 2 - this.clientWidth / 2
    private startValueY : number = window.innerHeight * 0.90
    private speedX : number = SPEED_X
    private speedY : number = SPEED_Y

    constructor() {
        super()

        this.x      = this.startValueX
        this.y      = this.startValueY

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        this.draw()
    }

    public invertSpeedX() : void {
        this.speedX *= -1
    }

    public invertSpeedY() : void {
        this.speedY *= -1
    }

    public getSpeedX() : number {
        return this.speedX
    }

    public getSpeedY() : number {
        return this.speedY
    }

    public update() {
        //calculating x
        let newX : number = this.x + this.speedX
        if(newX > 0 && newX + this.clientWidth < window.innerWidth) {
            this.x = newX
        } else {
            this.speedX *= -1
        }

        //calculating y
        let newY : number = this.y + this.speedY
        if(newY > 0 && newY + this.clientWidth < window.innerHeight) {
            this.y = newY
        } else {
            this.speedY *= -1
        }

        if (newY + this.clientWidth > window.innerHeight) {
            this.speedX = SPEED_X
            this.speedY = SPEED_Y
            this.x      = this.startValueX
            this.y      = this.startValueY
            console.log("live -1")
        }

        this.draw()
    }

    private draw() : void {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}

const SPEED_X = 7
const SPEED_Y = -3

window.customElements.define("ball-component", Ball as any)