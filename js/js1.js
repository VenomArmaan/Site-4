const canvas = document.getElementById("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const contex = canvas.getContext("2d");

canvas.style.background ="yellow";
contex.fillRect(50,50,10,10);

class Circle{

    setCircle(x,y,radius,color)
    {
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }

    draw()
    {
        contex.beginPath();
        contex.fillStyle= this.color;
        contex.arc(this.x,this.y,this.radius,0,2*Math.PI);
        contex.stroke();
        contex.fill();
        contex.closePath();

    }
}

let circle=[];


for(i=1;i<=10;i++)
{
    let c= new Circle(100+i*10,100,15,"red");
    circle.push(c);


}

for(j=1;j<=10;j++){
    circle[i].draw();
}


let c=new Circle(100,200,50,"red");
c.draw();


/*
const grd = contex.createRadialGradient(0,0,200,400);

contex.fillStyle ="yellow";

grd.addColorStop(0, "yellow");
grd.addColorStop(1, "blue");

contex.Style="red"
contex.rect(50,50,10,10);

contex.moveTo(0, 0);
contex.lineTo(400, 200);
contex.lineTo(500, 100);
contex.lineTo(600, 200);
contex.lineWidth = 5;
contex.strokeStyle = "grd";
contex.stroke();
*/


//contex.fillRect(0,0, canvas.width, canvas.height);

/* 
addEventListener("mousemove",function(event){
    contex.beginPath();
    contex.arc(event.x,event.y, 100, 0, 2*Math.PI );
    contex.stroke();
   
})

*/








/*
x=50;
y=50;
speed=10;
boxwidth=10;
boxheight=10;

contex.strokeRect(30,30,1000,300);

addEventListener("keydown",function(event){

    if(event.key=="ArrowRight"){
        contex.clearRect(x,y,boxwidth,boxheight);
        x+=speed;
        contex.fillRect(x,y,10,10);
        
    }
    else if(event.key=="ArrowLeft"){
        contex.clearRect(x,y,boxwidth,boxheight);
        x-=speed;
        contex.fillRect(x,y,10,10);
        
    }
    else if(event.key=="ArrowUp"){
        contex.clearRect(x,y,boxwidth,boxheight);
        y-=speed;
        contex.fillRect(x,y,10,10);
        
    }
    else if(event.key=="ArrowDown"){
        contex.clearRect(x,y,boxwidth,boxheight);
        y+=speed;
        contex.fillRect(x,y,10,10);
       
    }
    else if(event.key== "r"){
        contex.clearRect(0,0,canvas.width,canvas.height);
        x=10
        y=10
        contex.fillRect(x,y,10,10); 
    }
})
*/
    
