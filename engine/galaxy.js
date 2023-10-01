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
        for(let i=0; i<this.scene.objects.length; i++) {
            let ent = this.scene.objects[i]
            ent.draw(this.gfx, 0, 0, 0);
        }
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
        for(let i=0; i<this.objects.length; i++) {
            let ent = this.objects[i]
            //Call draw function from child and offset rotation, x, and y, by current x and y.
            //Basically, the x and y from the input of the function offsets the container, and then we
            //offset the children by the container's x and y.
            //Allows for endless inheritance and offsets
            ent.draw(gfx, this.rot + rot, this.x + x, this.y + y);
        }
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

    //Create new sprite on creation (don't worry about this)
    constructor() {
        this.sprite = new sprite();
    }

    //Draw function
    draw = function(gfx, rot, x, y) {
        //Draws the sprite at this entities position offsetted by the input position and rotation
        gfx.drawspr(this.sprite, this.x + x, this.y + y, this.rot + rot);
    }
}