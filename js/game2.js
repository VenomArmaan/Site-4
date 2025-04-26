
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d");
  //canvas.style.background = "yellow"; 
  canvas.style.backgroundImage = "url('../images/background.png')";
  canvas.style.backgroundSize = "cover"; 
  let gravity = 0.7; 
  let speed = 5; 
  let jumpPower = 20; 
  let offset = 0;

  const imgHill = new Image();
  const imgPlat = new Image();
  
  imgHill.src = "../images/hills.png";
  imgPlat.src ="../images/hills.png";

  function draw(){
  imgHill.onload =function(){ 
    context.drawImage(imgHill, 100, 200);
  }
  imgPlat.onload =function(){
    context.drawImage(imgPlat,100,100);
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
      context.fillStyle = "black"; 
      context.fillRect(this.x + newoffset, this.y, this.width, this.height); 
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


          if (
            this.velocity.x > 0 &&
            this.x + this.width + this.velocity.x > plat.position.x &&
            this.x < plat.position.x &&
            this.y + this.height > plat.position.y &&
            this.y < plat.position.y + plat.height
          ) {
            this.velocity.x = 0;
            this.x = plat.position.x - this.width;
          }
        
          
          if (
            this.velocity.x < 0 &&
            this.x + this.velocity.x < plat.position.x + plat.width &&
            this.x + this.width > plat.position.x + plat.width &&
            this.y + this.height > plat.position.y &&
            this.y < plat.position.y + plat.height
          ) {
            this.velocity.x = 0;
            this.x = plat.position.x + plat.width;
          }
        }
      
        this.x += this.velocity.x;
        this.y += this.velocity.y; 
      
        if (this.y + this.height > canvas.height) {
         this.y = canvas.height - this.height;
          this.velocity.y = 0; 
        /*  alert("you lost")
          this.x=100
          this.y =100
          this.velocity.x=0*/
        }
      
        context.clearRect(0, 0, canvas.width, canvas.height); 
        for (let i = 0; i < plats.length; i++) {
          plats[i].draw();
        }
        this.draw(); 
      }
      
  }

  class Platform {
    constructor(x, y, width, height) {
      this.position = { x, y }; 
      this.width = width; 
      this.height = height; 
    }

    draw() {
      context.fillStyle = "blue"; 
      context.fillRect(this.position.x, this.position.y, this.width, this.height); 
    }
  }

  const player1 = new Player(); 
  let plats = []; 
  let plat2 = new Platform(700, 400, 150, 20); 
  let plat1 = new Platform(0, canvas.height -100, 500, 100);
  let plat3 = new Platform(900, 200, 150, 20);
  plats.push(plat1, plat2, plat3); 

  let newoffset = 0;
  document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
      player1.velocity.x = speed; 
     if(player1.x >=400){
      offset = -speed;
     // newoffset+=offset;
    }
    }

    if (event.key == "ArrowLeft") {
      player1.velocity.x = -speed; 
     if(player1.x >=200){
        offset = speed;
      }
    }

    if (event.key == "ArrowUp") {
      
      for (let i = 0; i < plats.length; i++) {
        let plat = plats[i];
        if (
          player1.y + player1.height <= plat.position.y &&
          player1.y + player1.height + player1.velocity.y >= plat.position.y &&
          player1.x + player1.width > plat.position.x &&
          player1.x < plat.position.x + plat.width
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



 
  function updateAnimation() {
    requestAnimationFrame(updateAnimation); 
    context.clearRect(0,0, canvas.width,canvas.height);
    requestAnimationFrame(draw);
    player1.update();
  }

  updateAnimation(); 
  draw();

