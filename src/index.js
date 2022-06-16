

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "darkblue"
    ctx.fillRect(0, 0, 800, 800);

    ctx.fillStyle = "green"
    ctx.fillRect(200, 200, 400, 8);

    // ctx.fillStyle = "yellow"
    // ctx.fillRect(200, 200, 10, 900);




    ctx.strokeStyle = 'green';
    ctx.beginPath(0, 0);
    ctx.moveTo(202, 202);
    ctx.lineTo(0, 500);
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600, 200)
    ctx.bezierCurveTo(0, 30, 31, 7, 70, 8);
    ctx.bezierCurveTo(109, 9, 313, 99, 425, -100);
    ctx.bezierCurveTo(516, 82.5, 536, 55, 536, 55);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "8";
    ctx.strokeStyle = "yellow";
    ctx.rect(250, 250, 150, 80);
    ctx.stroke();
})