import Tile from "./tile";

export default class Circuit extends Tile {
    constructor(ctx, x, y,length, color){
        super(ctx, x, y, length);
        this.color = color;
        this.fillColor = null;
        this.pos = []; //position in the grid
        this.draw();
    }

    draw(){
        let img = new Image();
        img.src = "./src/images/circuit.png";
        this.ctx.drawImage(img, this.x, this.y, this.length, this.length)

        let x = (this.x + this.x + this.length) / 2;
        let y = (this.y + this.y + this.length) / 2;
        let r = (this.length - 28) / 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 7;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // clickCircuit(x, y) {
    //     if ((x > this.x && x < (this.x + this.length)) &&
    //         (y > this.y && y < (this.y + this.length))) {
    //             console.log("color changed");
    //             return this.color;
    //     }
    // }
}
