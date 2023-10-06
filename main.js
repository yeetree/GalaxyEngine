//Create galaxy instance
let game = new galaxy(800, 600);

//Create entity
let ent = new entity();

//Make entity update function
ent.update = function() {
    if(game.input.getKey("KeyW")) {
        ent.y-=5;
    }
    if(game.input.getKey("KeyS")) {
        ent.y+=5;
    }
    if(game.input.getKey("KeyA")) {
        ent.x-=5;
    }
    if(game.input.getKey("KeyD")) {
        ent.x+=5;
    }
}

//Async load function to load sprites and start galaxy
async function load() {
    await ent.sprite.load("./assets/sample.png")

    game.scene.addChild(ent);

    //loop();
    game.start();
}

async function loop() {
    ent._update();
    game.gfx.clear();
    ent._draw(game.gfx);
    await sleep(10);
    loop();
}

load();