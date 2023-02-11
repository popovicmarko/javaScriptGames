let playerState = "sit"
const dropDown = document.getElementById('animations');
dropDown.addEventListener('change', function (e) {
    playerState = e.target.value;
})
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600 ;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteheight = 523;


let gameFrame = 0;
const staggerFrame = 5;
const spriteAnimation = [];
const animationState = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 9,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },
];

nimationState.forEach((state, index) => {
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++) {
        let positionx = j * spriteWidth;
        let paositiony = index * spriteheight;
        frames.loc.push({ x: positionx, y: positiony });
    }
    spriteAnimation[state.name] = frames;
});


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimation[playerState].loc.length;
    let framX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;

    ctx.drawImage(playerImage, framX, frameY, spriteWidth, spriteheight, 0, 0, spriteWidth, spriteheight);

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();
