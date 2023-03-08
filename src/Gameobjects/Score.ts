class Score extends HTMLElement{
    private _bricksLeft: number = 1
    private _lives: number =     3

    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
        // console.log(this)
        this.innerHTML = "Lives: " + this._lives
    }
    
    public get bricksLeft() : number {
        return this._bricksLeft
    }

    
    public set bricksLeft(v : number) {
        this._bricksLeft = v;
        this.update()
    }
    
    
    public get lives() : number {
        return this._lives
    }
    
    
    public set lives(v : number) {
        this._lives = v
        this.update()
    }

    private update() {
        if (this._lives !== 0) {
            this.innerHTML = 'Lives: ' + this._lives
        } else {
            this.innerHTML = 'Game over!'
        }

        if(this.bricksLeft == 0) {
            this.innerHTML = 'You won!'
        }

        console.log(this.bricksLeft)
    }
    
}

window.customElements.define("score-component", Score as any)
// window.document.createElement("score", Score as any)