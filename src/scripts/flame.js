export default class Flame {
    constructor(ctx){

        this.outerArc = 100;
        this.innerArc = 50;
        this.outerLength = 200;
        this.innerLength = 160;
        this.ctx = ctx;
        this.moveDir = true;
    }


    drawFlame(startPos){
        let x = startPos[0];
        let y = startPos[1];

        this.ctx.shadowColor = "red";
        this.ctx.shadowBlur = 30;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y); // starting pos flame butt
        this.ctx.quadraticCurveTo(x, y - this.outerArc, x - this.outerLength, y); // flame tail
        this.ctx.quadraticCurveTo(x, y + this.outerArc, x, y);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.shadowColor = "yellow";
        this.ctx.shadowBlur = 30;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y); 
        this.ctx.quadraticCurveTo(x, y - this.innerArc, x - this.innerLength, y); // flame tail
        this.ctx.quadraticCurveTo(x, y + this.innerArc, x, y);
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

    }

    draw(){
        this.move();
        let y = 120; 
        this.drawFlame([250, 200]);
        this.drawFlame([250, y+200]);
        this.drawFlame([250, 2*y + 200]);
    }

    move(){
        if(this.outerArc > 120){this.moveDir = false}
        if (this.outerArc < 100) { this.moveDir = true }
        if (this.moveDir) {
            this.outerArc += 5;
            this.innerArc += 5;
            this.outerLength += 5;
            this.innerLength += 5;
        } else { 
            this.outerArc -= 5;
            this.innerArc -= 5;
            this.outerLength -= 5;
            this.innerLength -= 5;
        }

    }

}