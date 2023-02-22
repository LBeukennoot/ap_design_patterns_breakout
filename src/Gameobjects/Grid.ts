class Grid extends HTMLElement {
    constructor() {
        super();
        console.log("Grid created");
        let rows        : number = 7
        let columns     : number = 12
        let brickWidth  : number = 64
        let brickHeight : number = 32

        for (let row = 0; row < rows; row++) {

            for (let column = 0; column < columns; column++) {

                // plaats het grid met blokken in het midden van het scherm
                let offsetX = (window.innerWidth - columns * brickWidth) / 2
                let x = column * brickWidth + offsetX
                
                // en op de y-as 100px vanaf de top
                let y = row * brickHeight + 100
                
                // Voeg op deze plek een nieuw blok toe aan het spel
                // console.log(`Place brick at (${x}, ${y})`)
                const brick = new Brick(x, y, brickWidth, brickHeight);
                let game = document.getElementsByTagName("game")[0]
                game.appendChild(this)
            }
        }
    }
}

// This object is style in style.css under the paddle-component tag
window.customElements.define("grid-component", Grid as any)