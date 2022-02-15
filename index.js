const canvas = document.querySelector('.canvas')
const SIZE = 600;
canvas.width = canvas.height = SIZE
const ctx = canvas.getContext('2d');
const maxRadius = 40;
const minRadius = 2;
const circleNumber = 500;
let mousePosition = {
    x: undefined,
    y: undefined
}
const colorArray = [
    '#0099FF',
    '#FF6699',
    '#003366',
    '#CC0000',
    '#000033'
]
window.addEventListener('mousemove', function(e){
    mousePosition.x = e.x;
    mousePosition.y = e.y;
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx; 
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)]
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    this.update = function(){
        if (this.x > canvas.width - this.radius || this.x < 0 + this.radius){
            this.dx = -this.dx;

        }
        if (this.y  > canvas.height - this.radius || this.y < 0 + this.radius){
            this.dy = - this.dy;
        }
        this.x += this.dx
        this.y += this.dy
        // interactive
        if(mousePosition.x - this.x < 50 && mousePosition.x - this.x > -50 && mousePosition.y - this.y < 50 && mousePosition.y - this.y > -50){
            if(this.radius < maxRadius ){
                this.radius +=1;

            }
        } else if(this.radius > minRadius){
            this.radius -=1;
        }



        this.draw()
    }

}
let circleArray = [];
for (let i = 0; i < circleNumber; i++){
    let x = Math.random()*SIZE;
    let y = Math.random()*SIZE;
    let dx = Math.random();
    let dy = Math.random();
    let radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius))
}
function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, SIZE, SIZE);
    for(let i =0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
animation()

