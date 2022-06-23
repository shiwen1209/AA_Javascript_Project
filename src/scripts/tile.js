export default class Tile {
    constructor(ctx, x, y, length){
        Tile.DEFAULTCOLOR = 'grey';
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.length = length;
        this.fillColor = Tile.DEFAULTCOLOR;
        this.pos = []; // position in the grid;
        this.fliped = false;
        this.draw();
    }

    draw(){
        if(this.fliped){
            this.drawBack();
        } else {
            this.drawFront();
        }
    }

 
    flip(activeColor){
        console.log("flip active color")
        console.log(activeColor)
        if(activeColor === null){return false}
        if (this.fillColor != activeColor && activeColor != Tile.DEFAULTCOLOR){
            console.log("hello")
            this.fliped = true;
            this.fillColor = activeColor;
            console.log(this.fillColor);
            this.draw();
            return true;
        } else if (this.fillColor != activeColor && activeColor === Tile.DEFAULTCOLOR) {
            this.fliped = false;
            this.fillColor = activeColor;
            this.draw();
        }
        return false;
    }

    clickTile(activeColor){
            if (activeColor != null){
                return null;
            } else {
                return this.fillColor;
            }

    }

    drawFront(){
        let img = new Image();
        img.src = "./src/images/board.png";
        this.ctx.drawImage(img, this.x, this.y, this.length, this.length)

    }

    drawBack(){

        let img = new Image();
        img.src = "./src/images/circuit.png";
        this.ctx.drawImage(img, this.x, this.y, this.length, this.length)

        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.x + 10, this.y + 10, this.length - 20, this.length - 20);
        this.ctx.closePath();

    }


}