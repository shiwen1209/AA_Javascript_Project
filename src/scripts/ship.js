export default class Ship{
    constructor(ctx){
        Ship.BOARDPOSX = 300
        Ship.BOARDPOSY = 150
        Ship.BOARDWIDTH = 750
        Ship.BOARDHEIGHT = 350
        this.ctx = ctx;
        this.draw()

    }

    draw(){
        //head
        this.ctx.beginPath();
        this.ctx.fillStyle = '#7B3014';
        this.ctx.moveTo(1300, 325);
        this.ctx.lineTo(1100, 550);
        this.ctx.lineTo(1100, 100);
        this.ctx.fill();
        this.ctx.closePath();
      
        this.ctx.beginPath();
        let gradient = this.ctx.createLinearGradient(250, 100, 850, 450);
        gradient.addColorStop(0, '#3B3F42');
        gradient.addColorStop(.7, 'lightgrey');
        gradient.addColorStop(1, '#7B3014');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(250, 100, 850, 450);
        this.ctx.closePath();
        

        //interior, switchboard
        this.ctx.beginPath();
        // this.ctx.strokeRect(Ship.BOARDPOSX, Ship.BOARDPOSY, Ship.BOARDWIDTH, Ship.BOARDHEIGHT)
        this.ctx.fillStyle = 'lightgrey'
        // this.ctx.strokeStyle = "black";
        // this.ctx.shadowStyle = "black";
        // this.ctx.stroke();
        this.ctx.fillRect(Ship.BOARDPOSX, Ship.BOARDPOSY, Ship.BOARDWIDTH, Ship.BOARDHEIGHT);
        this.ctx.closePath();

        // upper wing
        this.ctx.beginPath();
        // this.ctx.strokeStyle = "blue";
        // this.ctx.shadowStyle = "blue";
        this.ctx.fillStyle = '#3B3F42'
        this.ctx.moveTo(250, 100);
        this.ctx.lineTo(150, 10);
        this.ctx.lineTo(600, 100);
        // this.ctx.stroke();

        this.ctx.fill();

        // lower wing
        this.ctx.beginPath();
        // this.ctx.strokeStyle = "blue";
        // this.ctx.shadowStyle = "blue";
        this.ctx.fillStyle = '#3B3F42'
        this.ctx.moveTo(250, 550);
        this.ctx.lineTo(150, 640);
        this.ctx.lineTo(600, 550);
        this.ctx.fill();
        // this.ctx.stroke();
    }
}

// module.exports = Ship;