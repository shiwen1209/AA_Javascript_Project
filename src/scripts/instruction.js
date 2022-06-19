
export default class Instruction {
    constructor(ctx){
        this.ctx = ctx;
        this.draw();
    }

    draw(){
        // this.ctx.beginPath();
        // this.ctx.fillStyle = 'yellow'
        // this.ctx.fillRect(200, 150, 850, 350);
        // this.ctx.strokeStyle = 'black';
        // this.ctx.stroke();

        this.ctx.font = "15px Arial";
        this.ctx.fillText("A spaceship is travelling in endless space, and its crew is trying to survive.There is an impostor among them and they need to stay on guard.They need to be aware of empty rooms, and be ready for an attack when left alone with someone else, what if that someone is the impostor.The Impostor wants to kill everyone and will stop at nothing, even if it means sabotaging the ship.He is cunning and sneaky.He can hide in dark corners and wait for his victim, or suddenly jump out of a ventilation shaft and attack from behind.It is difficult to identify him among the crew members, unless he makes a mistake.You wouldn't do that, would you, Impostor?", 250, 200);
 
    }


}