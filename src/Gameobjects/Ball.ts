class Ball extends HTMLElement {

    private _x : number
    private _y: number

    private _startValueX : number = window.innerWidth / 2 - this.clientWidth / 2
    private _startValueY : number = window.innerHeight * 0.90
    
    private _speedX : number = SPEED_X
    private _speedY : number = SPEED_Y

    private _outOfBounds: boolean = false

    constructor() {
        super()

        this._x      = this._startValueX
        this._y      = this._startValueY

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        this.draw()
    }

    public invertSpeedX() : void {
        this._speedX *= -1
    }

    public invertSpeedY() : void {
        this._speedY *= -1
    }

    public get speedX() : number {
        return this._speedX
    }

    public get speedY() : number {
        return this._speedY
    }

    public update() {
        //calculating x
        let newX : number = this._x + this._speedX
        if(newX > 0 && newX + this.clientWidth < window.innerWidth) {
            this._x = newX
        } else {
            this._speedX *= -1
        }

        //calculating y
        let newY : number = this._y + this._speedY
        if(newY > 0 && newY + this.clientWidth < window.innerHeight) {
            this._y = newY
        } else {
            this._speedY *= -1
        }

        if (newY + this.clientWidth > window.innerHeight) {
            this._outOfBounds = true
        }

        this.draw()
    }

    public get outOfBounds(): boolean { return this._outOfBounds }

    public resetPosition() : void {
        this._speedX = SPEED_X
        this._speedY = SPEED_Y
        this._x      = this._startValueX
        this._y      = this._startValueY
        this._outOfBounds = false
    }

    private draw() : void {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`
    }
}

const SPEED_X = 7
const SPEED_Y = -3

window.customElements.define("ball-component", Ball as any)