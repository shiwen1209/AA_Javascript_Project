export default class Ship{
    constructor(ctx){
        Ship.BOARDPOSX = 200
        Ship.BOARDPOSY = 150
        Ship.BOARDWIDTH = 850
        Ship.BOARDHEIGHT = 350
        this.ctx = ctx;
        this.draw()

    }

    draw(){
        //head
        this.ctx.beginPath();
        this.ctx.fillStyle = '#7B3014'
        this.ctx.moveTo(1300, 325);
        this.ctx.lineTo(1100, 550);
        this.ctx.lineTo(1100, 100);
        this.ctx.fill();

        //Ship outer body
        let gradient = this.ctx.createLinearGradient(150, 100, 950, 450);
        gradient.addColorStop(0, '#3B3F42');
        gradient.addColorStop(.7, 'lightgrey');
        gradient.addColorStop(1, '#7B3014');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(150, 100, 950, 450);

        //interior, switchboard
        this.ctx.beginPath();
        this.ctx.fillStyle = 'lightgrey'
        this.ctx.fillRect(Ship.BOARDPOSX, Ship.BOARDPOSY, Ship.BOARDWIDTH, Ship.BOARDHEIGHT);
        this.ctx.stroke();

        // upper wing
        this.ctx.beginPath();
        this.ctx.fillStyle = '#3B3F42'
        this.ctx.moveTo(150, 100);
        this.ctx.lineTo(50, 10);
        this.ctx.lineTo(500, 100);
        this.ctx.fill();

        // lower wing
        this.ctx.beginPath();
        this.ctx.fillStyle = '#3B3F42'
        this.ctx.moveTo(150, 550);
        this.ctx.lineTo(50, 640);
        this.ctx.lineTo(500, 550);
        this.ctx.fill();
    }
}

// module.exports = Ship;