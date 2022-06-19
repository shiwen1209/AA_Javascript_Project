export default class Star {


    constructor(ctx){
        Star.SPIKES = 4;
        Star.OUTERRADIUS = 13;
        Star.INNERRADIUS = 5;

        this.starposes = [
            [75, 570],
            [1000, 80],
            [350, 30],
            [550, 70],
            [700, 20],
            [880, 50],
            [1200, 75],
            [250, 625],
            [425, 625],
            [650, 575],
            [850, 600],
            [1170, 625],
            [1300, 595]

        ];
        this.ctx = ctx;
        this.vel = [-5, 0];
        this.draw();

    }

    draw(){
        this.move();
        this.starposes.forEach((pos, i)=>{
            if (i === 0 || i === 1){
            this.drawStar(pos[0], pos[1], 8, 7, 3, 'red', 'red');
            } else {
                this.drawStar(pos[0], pos[1], Star.SPIKES, Star.OUTERRADIUS, Star.INNERRADIUS, 'blue', 'skyblue');
            }
        })


    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius, bordercolor, fillcolor) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;
        this.ctx.shadowColor = 'blue';
        this.ctx.shadowBlur = 15;
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius)
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y)
            rot += step
        }
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = bordercolor;
        this.ctx.stroke();
        this.ctx.fillStyle = fillcolor;

        this.ctx.fill();
        this.ctx.shadowBlur = 0;


    }

    move(){
        this.starposes.forEach((pos)=>{
            pos[0] += this.vel[0];
            pos[1] += this.vel[1];

            if(pos[0] < 0){
                pos[0] = 1400 + pos[0];
            };
        })


        }

    
}