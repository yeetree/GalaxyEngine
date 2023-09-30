//GalaxyGFX -- Custom Canvas Renderer

class galaxygfx {
    canvas = null;
    ctx = null;

    constructor(w, h) {
        //Creates renderer and gets 2d context
        this.canvas = document.createElement("canvas");
        this.canvas.width = w;
        this.canvas.height = h;
        this.canvas.setAttribute("id", "renderer");
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d");
        this.clear();
    }

    drawspr = function(spr, x, y, rot) {
        this.ctx.save();
        if(rot!=0) {
            this.ctx.rotate(rot*Math.PI/180);
        }
        this.ctx.drawImage(spr.img, x, y, spr.width, spr.height)
        this.ctx.restore();
    }

    clear = function() {
        //fills screen with black
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
    }
}

//Sprite class
class sprite {
    //loads an image
    img = null;
    width = 0;
    height = 0;
    load = async function(src) {
        this.img = new Image();
        this.img.src = src
        await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("timeout");
            }, 10000);
            this.img.onload = function() {
                resolve();
            }
        });
        this.img.onload = null;
        this.width = this.img.width;
        this.height = this.img.height;
    }
}