const canvas =document.getElementById("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const contex = canvas.getContext("2d");
canvas.style.background ="yellow";

const img1 = new Image();
const img2 = new Image();
const img3 = new Image();
  img3.src ="../images/TaraTara.png"; 
  img1.src ="../images/BombCroc.png"; 
  img2.src ="../images/floor.jpg"; 

let x1 = 0;
let x3 = canvas.width - 200;
 function draw() { 
    
  img1.onload = function() {
    contex.drawImage(img1, x1, canvas.height - 300, 200, 200); 
  };
  img2.onload = function() {
    contex.drawImage(img2, 0, canvas.height - 100, canvas.width, 100);
  };
  img3.onload = function() {
    contex.drawImage(img3, x3, canvas.height - 300, 200, 200);
  };
 }
  if ((x1 + 200) < x3) {
    x1 += 2;
    x3 -= 2;
    requestAnimationFrame(draw);
  } else {
    alert("boooooom")
  }

draw();
/*
  canvas.addEventListener("click",function{
    canvas.clearRect(canvas.width-400, canvas.height-300,)
  })
*/
