
export default class Instruction {
    constructor(ctx){
        this.ctx = ctx;
        this.draw();
    }

    draw(){
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Game Instruction", 700, 200); 
    }


}