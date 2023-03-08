/**
 * Paddle class
 * automatically added to the game tag in index.html
 */
class Paddle extends HTMLElement {
    // Fields
    private _x           : number    = 0
    private _y           : number    = 0

    private _moveLeft    : boolean   = false
    private _moveRight   : boolean   = false
    
    private _speed       : number    = 7
    private _powerupActive: boolean   = false
    // private _behaviour  : PaddleBehaviour
    private _behaviour : PaddleBehaviour

    constructor() {
        super()
        console.log("Paddle created!")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        this._behaviour = new Normal(this)

        // center of the screen
        this._x      = window.innerWidth / 2 - this.clientWidth / 2
        // 5% from bottom of the screen
        this._y      = window.innerHeight * 0.95
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        if(e.key == "ArrowLeft" || e.key == "a")        this._moveLeft   = true
        else if (e.key == "ArrowRight" || e.key == "d") this._moveRight  = true
    }

    private onKeyUp(e: KeyboardEvent): void {
        if(e.key == "ArrowLeft" || e.key == "a")        this._moveLeft   = false
        else if (e.key == "ArrowRight" || e.key == "d") this._moveRight  = false
    }

    public get speed(): number {return this._speed}
    
    public get x(): number {return this._x}
    public set x(value: number) {this._x = value}

    public get y(): number {return this._y}

    public get moveLeft(): boolean {return this._moveLeft}
    public get moveRight(): boolean {return this._moveRight}

    public set behaviour(behaviour: PaddleBehaviour) {this._behaviour = behaviour}
    
    public set powerupActive(active: boolean) {this._powerupActive = active}

    public update() {

        this._behaviour.move()

        this.draw()
    }

    private draw() : void {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`
    }
}

// This object is style in style.css under the paddle-component tag
window.customElements.define("paddle-component", Paddle as any)
const POWERUP_DURATION = 2 //seconds