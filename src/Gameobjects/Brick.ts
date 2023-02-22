class Brick extends HTMLElement {
    constructor(width: number, height: number) {
        super();

    }
}
window.customElements.define("brick-component", Brick as any)