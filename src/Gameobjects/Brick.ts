class Brick extends HTMLElement {
    private x : number
    private y : number
    private width: number
    private height: number

    constructor(x: number, y: number, width: number, height: number) {
        super()

        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.style.
    }

    private draw() : void {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}
window.customElements.define("brick-component", Brick as any)