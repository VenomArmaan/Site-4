const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

canvas.style.backgroundImage = "url('../images/background.png')";
canvas.style.backgroundSize = "cover"; 

let gravity = 0.7; 
let speed = 5; 
let jumpPower = 20; 
let newoffset = 0;  // move platforms and player view

const imgHill = new Image();
const imgPlat = new Image();
const imgStandR = new Image();
const imgMoveR = new Image();
const imgMoveL = new Image();

let total = 5;

imgHill.src = "images/hills.png";
imgPlat.src = "images/platform.png"; 
imgStandR.src = "images/spriteStandRight.png";
imgMoveR.src = "images/spriteRunRight.png";
imgMoveL.src = "images/spriteRunLeft.png";
//imgMoveU.src = "images/spriteStandRight.png";
//imgMoveD.src = "images/spriteStandRight.png";


imgHill.onload = picture;
imgPlat.onload = picture;
imgStandR.onload = picture;
imgMoveR.onload = picture;
imgMoveL.onload = picture;
//imgMoveD.onload = picture;
//imgMoveU.onload = picture;


function picture() {
  total--;
  if (total == 0) {
    updateAnimation(); 
  }
}

class Player {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = 60;
    this.height = 60;
    this.velocity = { x: 0, y: 0 }; 
  }

  draw() {
    if(this.velocity.x==0 && this.velocity.y==0){
    context.drawImage(imgStandR, 0 , 0, 174, 400, this.x,this.y,this.width,this.height);
  }

  if(this.velocity.x > 0){
    context.drawImage(imgMoveR,  0 , 0, 340, 400, this.x,this.y,this.width,this.height);
  }

  if(this.velocity.x < 0){
    context.drawImage(imgMoveL,  0 , 0, 340, 400, this.x,this.y,this.width,this.height);
  }
/*
  if(this.velocity.y >0){
    context.drawImage(imgMoveU,  0 , 0, 340, 400, this.x,this.y,this.width,this.height)
  }
  if(this.velocity.y >0){
    context.drawImage(imgMoveD,  0 , 0, 340, 400, this.x,this.y,this.width,this.height)
  }
    */

}

  

  update() {
    this.velocity.y += gravity; 

    let Yabc = this.y + this.velocity.y + this.height;
    
    for (let i = 0; i < plats.length; i++) {
      let plat = plats[i];
      if (
        this.y + this.height <= plat.position.y &&
        Yabc >= plat.position.y &&
        this.x + this.width > plat.position.x &&
        this.x < plat.position.x + plat.width
      ) {
        this.velocity.y = 0;
        this.y = plat.position.y - this.height;
        break;
      }

      
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.y + this.height > canvas.height) {
      alert("You lost");
      this.x = 100;
      this.y = 100;
      this.velocity.x = 0;
    }

    this.draw(); 
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.initialX = x; 
    this.position = { x, y }; 
    this.width = width;
    this.height = height;
  }

  draw() {
    context.fillStyle = "blue"; 
  //  context.fillRect(this.position.x + newoffset, this.position.y, this.width, this.height);
    context.drawImage(imgPlat,this.position.x, this.position.y,this.width,this.height);
  }
}

const player1 = new Player();
let plats = [];
plats.push(
  new Platform(0, canvas.height - 100, 500, 100),
  new Platform(600, canvas.height-100, 150, 100),
  new Platform(900, 200, 150, 20)
);

document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowRight") {
    player1.velocity.x = speed;
    if (player1.x >= 400) {
      newoffset -= speed;
    }
  }

  if (event.key == "ArrowLeft") {
    player1.velocity.x = -speed;
    if (player1.x >= 200) {
      newoffset += speed;
    }
  }

  if (event.key == "ArrowUp") {
    for (let plat of plats) {
      if (
        player1.y + player1.height <= plat.position.y &&
        player1.y + player1.height + player1.velocity.y >= plat.position.y &&
        player1.x + player1.width > plat.position.x + newoffset &&
        player1.x < plat.position.x + plat.width + newoffset
      ) {
        player1.velocity.y = -jumpPower;
        break;
      }
    }

    if (player1.y + player1.height === canvas.height) {
      player1.velocity.y = -jumpPower;
    }
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
    player1.velocity.x = 0;
  }
});
/*
function updateAnimation() {
  requestAnimationFrame(updateAnimation);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let plat of plats) {
    plat.draw();
  }

  player1.update();
} */
let frameIndex = 0;
let frameTimer = 0;
let frameInterval = 5; // lower = faster animation

function updateAnimation() {
  requestAnimationFrame(updateAnimation);
  context.clearRect(0,0, canvas.width,canvas.height);

  frameTimer++;
  if (frameTimer % frameInterval === 0) {
    frameIndex++;
    if (frameIndex >= 29) frameIndex = 0;
  }

  for (let plat of plats) {
    plat.draw();
  }
  player1.update();
}

