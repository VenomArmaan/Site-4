const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
const genran = document.getElementById("genran");

canvas.style.background = "yellow";

let speed =10;
class Circle {
    constructor(x, y, radius, color) {
        this.count=0;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
       
        this.factorX = speed;
        this.factorY = speed;
        
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
       // context.fill();
       context.fillText(this.count,this.x,this.y);
        
        context.closePath();
    }

    update() {
        this.x += this.factorX;
        this.y += this.factorY;
        this.draw();
       
        if ((this.y + this.radius) >= canvas.height) {
            this.factorY = -speed;
            this.count++;
        }
        
        else if ((this.y - this.radius) <= 0) {
            this.factorY = speed;
            this.count++;
        }
    
     
        if ((this.x + this.radius) >= canvas.width) {
            this.factorX = -speed;
            this.count++;
        }
       
        else if ((this.x - this.radius) <= 0) {
            this.factorX = speed;
            this.count++;
        }
    }

}

const circleran =[];
genran.addEventListener("click",function(){
    
    let d = new Circle(parseInt((Math.random()*500)) + 100, parseInt((Math.random()*500))+100, 50, "red");
    circleran.push(d);
    d.draw();

})



const circles = [];

canvas.addEventListener("click", function(event) {
    let c = new Circle(event.x, event.y, 50, "red");

    circles.push(c);
    c.draw();
})

function updateAnimation() {
    requestAnimationFrame(updateAnimation);
   context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }

    for (let i = 0; i < circleran.length; i++) {
        circleran[i].update();
    }
   
    

    

}

updateAnimation();
