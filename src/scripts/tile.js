export default class Tile {
    constructor(ctx, x, y, length){
        Tile.DEFAULTCOLOR = 'grey';
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.length = length;
        this.fillColor = Tile.DEFAULTCOLOR;
        this.pos = []; // position in the grid;
        this.clicked = false;
        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeRect(this.x, this.y, this.length, this.length);
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.x, this.y, this.length, this.length);
        this.ctx.stroke();
        this.ctx.closePath();
    }

 
    flip(activeColor){
        if(activeColor === null){return false}
        if (this.fillColor != activeColor){
            this.fillColor = activeColor;
            this.draw();
            return true;
        } 
        return false;
    }

    clickTile(activeColor){
            if (activeColor === this.fillColor ) {
                return null;
            } else if (activeColor === null && this.fillColor != Tile.DEFAULTCOLOR) {
                return this.fillColor;
            } else if(activeColor === Tile.DEFAULTCOLOR){
                return null;
            } else {
                return this.fillColor;
            }

    }


}