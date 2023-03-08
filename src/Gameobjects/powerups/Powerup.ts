class Powerup extends HTMLElement {
    private _x: number = 0
    private _y: number = 0
    private _speed: number = -2
    
    constructor(x: number, y: number) {
        super()
        this._x = x
        this._y = y

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
        
        this.draw()
    }

    public get y(): number { return this._y }

    private draw() : void {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public update() : void {
        this._y -= this._speed
        this.draw()
    }
}