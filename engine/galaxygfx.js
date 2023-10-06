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
        this.canvas.setAttribute("tabindex", "1");
        this.canvas.setAttribute("style", "outline:none; background: black;");
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d");
        this.clear();
    }

    //Draws sprite. (spr - sprite object, x - x position on screen to render, y - y position on screen to render)
    drawspr = function(spr, x, y) {
        //Save current 2d context transform
        //Draw the image at the x and y, and reset 2d context transform
        this.ctx.drawImage(spr.img, x, y, spr.width, spr.height)
    }

    //Draws image or canvas, no need for sprite object.
    drawsprimg = function(spr, x, y) {
        //Save current 2d context transform
        //Draw the image at the x and y, and reset 2d context transform
        this.ctx.drawImage(spr, x, y, spr.width, spr.height)
    }

    clear = function() {
        //fills screen with black
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//Sprite class
class sprite {
    //Image
    img = null;
    width = 0;
    height = 0;
    //Loads image
    load = async function(src) {
        //New image object
        this.img = new Image();
        //Sets source to src
        this.img.src = src
        //Waits for image to load
        await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("timeout");
            }, 10000);
            this.img.onload = function() {
                resolve();
            }
        });
        //Sets the width to the image
        this.img.onload = null;
        this.width = this.img.width;
        this.height = this.img.height;
    }
}

//Canvas sprite, allows for graphics primitives to be drawn
class canvassprite {
    //Canvas
    canvas = null;
    ctx = null;
    //Size
    width = 0;
    height = 0;
    //Create canvas, set width, get context
    constructor(w, h) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = w;
        this.canvas.height = h;
        this.width = w;
        this.height = h;
        this.ctx = this.canvas.getContext("2d");
    }
}