export default class Tile {
    constructor(ctx, x, y){
        Tile.LENGTH = 48;

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = '#DAF7A6';
        this.clickTile = this.clickTile.bind(this);
        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, Tile.LENGTH, Tile.LENGTH);
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, Tile.LENGTH, Tile.LENGTH);
        this.ctx.stroke();
        this.ctx.closePath();
    }

 
    flip(){
        this.color = 'yellow';
        this.draw()


    }

    clickTile(x, y){
        if ((x > this.x && x < (this.x + Tile.LENGTH)) && 
            (y > this.y && y < (this.y + Tile.LENGTH))) {
            this.flip();
            console.log("tile got flipped")
        }
    }


}