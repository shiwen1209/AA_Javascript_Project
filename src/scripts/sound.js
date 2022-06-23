export default class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.id = this.setId();
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    setId(){
        const srcArr =  this.sound.src.split("/");
        const ext = srcArr[srcArr.length -1];
    
        return ext.slice(0, ext.length-4);
    }

    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }

 
}

