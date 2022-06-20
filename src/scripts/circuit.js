import Tile from "./tile";

export default class Circut extends Tile {
    constructor(ctx, x, y, color){
        super(ctx, x, y);
        this.color = color;
        this.pos = []; //position in the grid
        // this.clickCircuit = this.clickCircuit.bind(this);
        this.draw();
    }

    draw(){

        let x = (this.x + this.x + Tile.LENGTH) / 2;
        let y = (this.y + this.y + Tile.LENGTH) / 2;
        let r = (Tile.LENGTH - 20) / 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // clickCircuit(x, y) {
    //     if ((x > this.x && x < (this.x + Tile.LENGTH)) &&
    //         (y > this.y && y < (this.y + Tile.LENGTH))) {
    //             console.log("color changed");
    //             return this.color;
    //     }
    // }
}
