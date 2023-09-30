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
            ent.draw(this.gfx);
        }
    }
}

class container {
    objects = [];
    x = 0;
    y = 0;
    rot = 0;
    layer = 0;

    addChild = function(child) {
        this.objects.push(child);
        this.objects = this.objects.sort((a, b) => { if (a.layer > b.layer) { return 1 } return -1})
    }

    draw = function(gfx) {
        for(let i=0; i<this.objects.length; i++) {
            let ent = this.objects[i]
            ent.draw(gfx);
        }
    }
}

class entity {
    sprite = null;
    x = 0;
    y = 0;
    rot = 0;
    layer = 0;
    constructor() {
        this.sprite = new sprite();
    }

    draw = function(gfx) {
        gfx.drawspr(this.sprite, this.x, this.y);
    }
}