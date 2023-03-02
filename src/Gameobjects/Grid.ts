class Grid extends HTMLElement {
    private rows : number = 7;
    private columns : number = 12;
    private brickWidth : number = 64;
    private brickHeight : number = 32;
    private bricks : Array<Brick> = []

    constructor() {
        super();
        console.log("Grid created");

        for (let row = 0; row < this.rows; row++) {

            for (let column = 0; column < this.columns; column++) {

                // plaats het grid met blokken in het midden van het scherm
                let offsetX = (window.innerWidth - this.columns * this.brickWidth) / 2
                let x = column * this.brickWidth + offsetX
                
                // en op de y-as 100px vanaf de top
                let y = row * this.brickHeight + 105
                
                // Voeg op deze plek een nieuw blok toe aan het spel
                // console.log(`Place brick at (${x}, ${y})`)
                const brick = new Brick(x, y, this.brickWidth, this.brickHeight, "purple");
                this.bricks.push(brick)
                let game = document.getElementsByTagName("game")[0]
                game.appendChild(this)
            }
        }
    }

    public getBricks() : Array<Brick> {
        return this.bricks
    }

    public hit(index : number) : void {

        if(this.bricks.length > 0) {
            this.bricks[index].hit()
            this.bricks.splice(index, 1)
        }
        
        console.log(this.bricks.length)
    }
}

// This object is style in style.css under the paddle-component tag
window.customElements.define("grid-component", Grid as any)