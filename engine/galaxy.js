//Galaxy Engine

//Engine Class
class galaxy {
    //Reference to galaxygfx and galaxyinpit
    gfx = null;
    input = null;

    //Current scene (container)
    scene = null;

    //Init
    constructor(w, h) {
        this.gfx = new galaxygfx(w, h)
        this.input = new galaxyinput(this.gfx)
        this.scene = new container();
    }

    //Loops through objects and draws them
    draw = function() {
        this.gfx.clear();
        this.scene.draw(this.gfx);
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

    //Updates matrix based off of position and rotation
    _upMat = function() {
        this._mat = setMat(this._mat, this.x, this.y, 1, this.rot)
    }

    //Add a child to the container
    addChild = function(child) {
        //Add reference to array
        this.objects.push(child);
        //Sort by layer
        this.objects = this.objects.sort((a, b) => { if (a.layer > b.layer) { return 1 } return -1})
    }

    //Draw
    draw = function(gfx) {

        //Updates matrixes and pushes context position and applies matrix
        this._upMat();
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)

        //Loop through children
        for(let i=0; i<this.objects.length; i++) {
            let ent = this.objects[i]
            //Call draw function of entity
            ent.draw(gfx);
        }

        //pops context position
        gfx.ctx.restore();
    }
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

    //Updates matrix based off of position and rotation
    _upMat = function() {
        this._mat = setMat(this._mat, this.x, this.y, 1, this.rot)
    }

    //Create new sprite on creation (don't worry about this)
    constructor() {
        this.sprite = new sprite();
    }

    //Draw function
    draw = function(gfx) {
        //Calculates matrix
        this._upMat();
        //Pushes context position and applies matrix
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)
        //Draws the sprite
        gfx.drawspr(this.sprite, 0, 0, 0);
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
