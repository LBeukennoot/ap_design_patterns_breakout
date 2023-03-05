class Brick extends HTMLElement {
    protected x : number
    protected y : number
    protected width: number
    protected height: number

    constructor(x: number, y: number, width: number, height: number) {
        super()

        this.x = x
        this.y = y
        this.width = width
        this.height = height

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        // this.style.
        this.draw();
    }

    private draw() : void {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public hit(bricks: Array<Brick>, index: number) : Array<Brick> {
        return bricks
    }

    public getPosition() : Array<number> {
        return [this.x, this.y]
    }
}

// window.customElements.define("yellow-brick", Brick as any)