export default class Tile {
    constructor(ctx, x, y){
        Tile.LENGTH = 48;

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.fillColor = 'grey';
        this.pos = []; // position in the grid;
        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, Tile.LENGTH, Tile.LENGTH);
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.x, this.y, Tile.LENGTH, Tile.LENGTH);
        this.ctx.stroke();
        this.ctx.closePath();
    }

 
    flip(activeColor){
        if (activeColor != null){
            this.fillColor = activeColor;
            this.draw()
        }
    }


}