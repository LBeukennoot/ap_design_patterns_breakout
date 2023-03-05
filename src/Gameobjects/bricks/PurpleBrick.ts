class PurpleBrick extends Brick {
    
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height)
    }

    public hit(bricks: Array<Brick>, index: number) : Array<Brick> {
        this.remove()

        bricks.splice(index, 1)
        
        return bricks
    }
}

window.customElements.define("brick-component", PurpleBrick as any)