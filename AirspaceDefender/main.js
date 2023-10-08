//Create galaxy instance
let game = new galaxy(800, 600, "game");

//Create entities
let bg = new entity();
let title = new entity();

let base = new entity();
let cannon = new entity();
let shooter = new container();
let pivot = new container();

let rocketspr = new entity();
let rocket = new container();

let ufospr = new sprite();

let ex1 = new sprite();
let ex2 = new sprite();
let ex3 = new sprite();

let score = new text();
let pts = 0;

let rocketfly = false;

let wtime = 0;
let rtime = 0;
let w = 1;

let up = true;

let ctr = false;
let ulose = false;

let tittxt = new text();
let asdt = new text();
let ctxt = new text();
let ultxt = new text();
let getxt = new text();


menu = new container();
asd = new container();

menu.update = function() {
    if(game.input.getKeyDown("Space")) {
        game.scene = asd;
    }
}

asd.update = function() {
    score.txt = "SCORE: " + pts.toString();
    if(up) {
        rtime+=1;
        if(rtime == 300) {
            for(let i=0; i<w; i++)
                asd.addChild(createUFO())
            rtime=0;
            wtime+=1;
        }
    
        if(wtime == 5) {
            wtime=0;
            w+=1;
        }
    }
    else {
        if(!ulose) {
            asd.addChild(ultxt);
            ulose = true;
        }
    }
}

pivot.update = function() {
    if(up) {
        if(game.input.getKey("ArrowRight") && pivot.rot < 66) {
            pivot.rot += 3
        }
        if(game.input.getKey("ArrowLeft") && pivot.rot > -66) {
            pivot.rot -= 3
        }

        if(game.input.getKeyDown("Space")) {
            if(!rocketfly) {
                rocketspr.pos.y = -50;
                rocket.rot = pivot.rot;
                rocketfly = true;
            }
            if(!ctr) {
                asd.removeChild(ctxt);
                ctr = true;
            }
        }

        /*
        if(game.input.getKeyDown("KeyZ")) {
            asd.addChild(createUFO())
        }*/

        if(!rocketfly)
            rocket.rot = pivot.rot;
    }
}

rocket.update = function() {
    if(up) {
        if(rocketfly) {
            rocketspr.pos.y-=20
            if(rocketspr.pos.y < -600) {
                rocketfly = false;
                rocketspr.pos.y = -50;
                pts-=20;
            }
        } else {
            rocketspr.pos.y = -50;
            rocket.rot = pivot.rot;
        }
    }
}

//Async load function to load sprites and start galaxy
async function load() {
    await bg.sprite.load("./assets/background.png")
    await title.sprite.load("./assets/title.png")

    await cannon.sprite.load("./assets/cannon.png");
    await base.sprite.load("./assets/base.png");
    await rocketspr.sprite.load("./assets/rocket.png");
    await ufospr.load("./assets/redufo.png");
    await ex1.load("./assets/ex1.png");
    await ex2.load("./assets/ex2.png");
    await ex3.load("./assets/ex3.png");

    rocket.addChild(rocketspr);
    rocket.pos.x = 400;
    rocket.pos.y = 510;
    rocketspr.pos.x = -25;
    rocketspr.pos.y = -50;
    rocket.layer = 1;

    cannon.pos.x = -25;
    cannon.pos.y = -110;

    base.layer = 2;
    cannon.layer = 1;

    pivot.addChild(cannon);
    pivot.layer = 1

    pivot.pos.x = 100;
    pivot.pos.y = 20;

    shooter.addChild(pivot);
    shooter.addChild(base)
    shooter.layer = 2;

    shooter.pos.x = 300;
    shooter.pos.y = 500;

    score.txt = "SCORE: 0"
    score.font = "20px arial"
    score.layer = 10;
    score.pos.y = 20;

    asdt.txt = "Airspace Defense"
    asdt.font = "50px arial"
    asdt.layer = 10;
    asdt.pos.y = 285;
    asdt.pos.x = 10;

    tittxt.txt = "Press Space to Start"
    tittxt.font = "30px arial"
    tittxt.layer = 10;
    tittxt.pos.y = 320;
    tittxt.pos.x = 10;

    ctxt.txt = "Press space to shoot, use left and right arrows to aim."
    ctxt.font = "20px arial"
    ctxt.layer = 10;
    ctxt.pos.y = 300;
    ctxt.pos.x = 170;

    getxt.txt = "Made with Galaxy Engine 0.2 Beta 3"
    getxt.font = "20px arial"
    getxt.color = "black"
    getxt.layer = 10;
    getxt.pos.y = 597;
    getxt.pos.x = 2;

    ultxt.txt = "Game Over"
    ultxt.font = "50px arial"
    ultxt.color = "red"
    ultxt.layer = 10;
    ultxt.pos.y = 270;
    ultxt.pos.x = 275;

    menu.addChild(title);
    menu.addChild(tittxt);
    menu.addChild(asdt);
    menu.addChild(getxt);

    asd.addChild(bg);
    asd.addChild(shooter);
    asd.addChild(rocket);
    asd.addChild(score);
    asd.addChild(ctxt);

    game.scene = menu;

    game.start();
}

load();

function createUFO() {
    let ufo = new entity();
    ufo.sprite = ufospr;
    ufo.layer = 4

    ufo.pos.x = Math.floor(Math.random() * 750 );

    ufo.pos.y = -100 - Math.floor(Math.random() * 50 );

    ufo.update = function() {
        if(up) {
            if(ufo.pos.y < 500) {
                ufo.pos.y+=1;
            }
            else {
                asd.removeChild(ufo);
                up = false;
            }

            let ul = ufo.pos.x;
            let ur = ufo.pos.x+100;
            let ut = ufo.pos.y;
            let ub = ufo.pos.y+100;

            let rl = rocketspr.wpos.x;
            let rr = rocketspr.wpos.x + 20;
            let rt = rocketspr.wpos.y;
            let rb = rocketspr.wpos.y + 20;

            if(!(ul > rr || ur < rl || ut > rb || ub < rt || !rocketfly)) {
                let ex = createEXP(rl, rt);
                asd.addChild(ex)
                asd.removeChild(ufo);
                rocketspr.pos.y = -50;
                rocket.rot = pivot.rot;
                rocketfly = false;
                pts+=100;
            }
        }
    }

    return ufo;
}

function createEXP(x, y) {
    let exp = new entity();
    exp.sprite = ex1;
    exp.layer = 3
    exp.stime = game.frames
    exp.pos.x = x - 50;
    exp.pos.y = y - 50;



    exp.update = function() {
        if(up) {
            if(game.frames - exp.stime < 6) {
                exp.sprite = ex2;
            }
            else if(game.frames - exp.stime < 9) {
                exp.sprite = ex3;
            }
            else if(game.frames - exp.stime < 12) {
                asd.removeChild(exp)
            }
        }
    }

    return exp;
}