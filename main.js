//Create galaxy instance
let game = new galaxy(800, 600);

//Create entity
let ent = new entity();

//Make entity update function
ent.update = function() {
    if(game.input.getKey("KeyW")) {
        ent.pos.y-=5;
    }
    if(game.input.getKey("KeyS")) {
        ent.pos.y+=5;
    }
    if(game.input.getKey("KeyA")) {
        ent.pos.x-=5;
    }
    if(game.input.getKey("KeyD")) {
        ent.pos.x+=5;
    }
}

//Async load function to load sprites and start galaxy
async function load() {
    await ent.sprite.load("./assets/sample.png")

    game.scene.addChild(ent);

    game.start();
}


load();