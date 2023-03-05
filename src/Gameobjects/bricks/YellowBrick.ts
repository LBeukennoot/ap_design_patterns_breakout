class YellowBrick extends Brick {
    
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height)
    }

    public hit(bricks: Array<Brick>, index: number) : Array<Brick> {
        this.remove()
        const brick = new PurpleBrick(this.x, this.y, this.width, this.height);
        
        bricks[index] = brick

        return bricks
    }
}

window.customElements.define("yellow-brick", YellowBrick as any)