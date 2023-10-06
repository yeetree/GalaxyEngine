//Galaxy Engine

//Engine Class
class galaxy {
    //Reference to galaxygfx and galaxyinpit
    gfx = null;
    input = null;

    //Current scene (container)
    scene = null;

    //Refresh rate (FPS)
    fps = 30;
    _frameCount = 0;
    _eachNthFrame = 0;

    //isrunning
    running = false;

    //alreadystarted
    alreadystarted = false;

    //Init
    constructor(w, h) {
        this.gfx = new galaxygfx(w, h)
        this.input = new galaxyinput(this.gfx)
        this.scene = new container();
    }

    start = function() {
        this._eachNthFrame = Math.round((1000 / this.fps) / 16.66);
        this.running = true;
        if(!this.alreadystarted) {
            this.scene._start();
            this.alreadystarted = true;
        }
        this._loop();
    }

    _loop = async function() {
        this.scene._update();
        this.gfx.clear();
        this.scene._draw(this.gfx);
        await sleep(16);
        this._loop();
    }
}

//Container Class
class container {
    //List of objects (children)
    objects = [];
    //Position and rotation
    x = 0;
    y = 0;
    rot = 0;
    
    //Layer
    layer = 0;

    //Matrix (calculated on draw)
    _mat = Mat(0, 0, 1, 0);

    //Add a child to the container
    addChild = function(child) {
        //Add reference to array
        this.objects.push(child);
        //Sort by layer
        this.objects = this.objects.sort((a, b) => { if (a.layer > b.layer) { return 1 } return -1})
    }

    //Remove child from container
    removeChild = function(child) {
        //Remove Child
        this.objects = this.objects.filter((c) => { return c != child})
        //Sort by layer
        //this.objects = this.objects.sort((a, b) => { if (a.layer > b.layer) { return 1 } return -1})
    }

    //Draw
    _draw = function(gfx) {

        //Updates matrixes and pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)

        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            //Call draw function of entity
            this.objects[i]._draw(gfx);
        }

        //pops context position
        gfx.ctx.restore();
    }

    //Update
    _update = function() {
        this.update();
        this._mat = setMat(this._mat, this.x, this.y, 1, this.rot)
        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            //Call update function of entity
            this.objects[i]._update();
        }
    }

    //Start
    _start = function() {
        this.start();
        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            //Call start function of entity
            this.objects[i]._start();
        }
    }
    

    //Define by user
    update = function() {}
    start = function() {}
}

//Entity class
class entity {
    //Sprite
    sprite = null;
    //Position and rotation
    x = 0;
    y = 0;
    rot = 0;
    //Layer
    layer = 0;

    //Matrix (calculated on draw)
    _mat = Mat(0, 0, 1, 0);

    //Create new sprite on creation (don't worry about this)
    constructor() {
        this.sprite = new sprite();
    }

    //Draw function
    _draw = function(gfx) {
        //Calculates matrix
        //Pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat);
        //Draws the sprite
        gfx.drawspr(this.sprite, 0, 0, 0);
        //Pops context position
        gfx.ctx.restore();
    }

    _update = function() {
        this.update();
        this._mat = setMat(this._mat, this.x, this.y, 1, this.rot)
    }

    _start = function() {
        this.start();
    }

    //Define by user
    update = function() {}
    start = function() {}
}

//Canvas entity class, like entity, but instead of an image, it's sprite is a canvas
//So you can draw primitives

class canvasentity extends entity {
    constructor(w, h) {
        //Set sprite to canvassprite
        super();
        this.sprite = new canvassprite(w, h);
    }

    //Draw function
    _draw = function(gfx) {
        //Calculates matrix
        this._upMat();
        //Pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)
        //Draws the sprite
        gfx.drawsprimg(this.sprite.canvas, 0, 0, 0);
        //Pops context position
        gfx.ctx.restore();
    }
}

const Mat = (x, y, scale = 1, rotate = 0) => {
    rotate = (rotate * Math.PI) / 180.0;
    const xAx = Math.cos(rotate) * scale;
    const xAy = Math.sin(rotate) * scale;
    return [xAx, xAy, -xAy, xAx, x, y];
};

const setMat = (mat, x, y, scale = 1, rotate = 0)  => {
    rotate = (rotate * Math.PI) / 180.0;
    const xAx = Math.cos(rotate) * scale;
    const xAy = Math.sin(rotate) * scale;
    mat[0] = xAx;
    mat[1] = xAy;
    mat[2] = -xAy;
    mat[3] = xAx;
    mat[4] = x;
    mat[5] = y;
    return mat;
};

const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));
