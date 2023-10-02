//Galaxy Engine

//Engine Class
class galaxy {
    //Reference to galaxygfx
    gfx = null;

    //Current scene (container)
    scene = null;

    //Init
    constructor(w, h) {
        this.gfx = new galaxygfx(w, h)
        this.scene = new container();
    }

    //Loops through objects and draws them
    draw = function() {
        this.gfx.clear();
        this.scene.draw(this.gfx, 0, 0, 0);
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

    _mat = Mat(0, 0, 1, 0);

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
    draw = function(gfx, rot, x, y) {
        //Loop through all children
        this._upMat();
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)
        for(let i=0; i<this.objects.length; i++) {
            let ent = this.objects[i]
            //Call draw function from child and offset rotation, x, and y, by current x and y.
            //Basically, the x and y from the input of the function offsets the container, and then we
            //offset the children by the container's x and y.
            //Allows for endless inheritance and offsets
            ent.draw(gfx, 0, 0, 0);
        }
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

    _mat = Mat(0, 0, 1, 0);

    _upMat = function() {
        this._mat = setMat(this._mat, this.x, this.y, 1, this.rot)
    }

    //Create new sprite on creation (don't worry about this)
    constructor() {
        this.sprite = new sprite();
    }

    //Draw function
    draw = function(gfx, rot, x, y) {
        this._upMat();
        gfx.ctx.save();
        gfx.ctx.transform(...this._mat)
        //Draws the sprite at this entities position offsetted by the input position and rotation
        gfx.drawspr(this.sprite, 0, 0, 0);
        gfx.ctx.restore();
    }
}

const Mat = (x, y, scale = 1, rotate = 0) => {
    const xAx = Math.cos(rotate) * scale;
    const xAy = Math.sin(rotate) * scale;
    return [xAx, xAy, -xAy, xAx, x, y];
};

const setMat = (mat, x, y, scale = 1, rotate = 0)  => {
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
