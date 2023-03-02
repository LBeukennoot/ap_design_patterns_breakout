class Brick extends HTMLElement {
    private x : number
    private y : number
    private width: number
    private height: number
    private type: string

    constructor(x: number, y: number, width: number, height: number, type: string) {
        super()

        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = type

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)

        // this.style.
        this.draw();
    }

    private draw() : void {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public hit() : void {
        this.remove()
        
    }
}
window.customElements.define("brick-component", Brick as any)