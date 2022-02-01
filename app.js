const cvs = document.querySelector("#snake");
const ctx = cvs.getContext("2d");



const btnUp=document.querySelector('#btn1').addEventListener('click',function(){
  if(d!="DOWN"){
    d = "UP";
    up.play()
}});
const btnLeft=document.querySelector('#btn2').addEventListener('click',function(){
  if(d!="RIGHT"){
    d = "LEFT";
    left.play()
}});
const btnRight=document.querySelector('#btn4').addEventListener('click',function(){
  if(d!="LEFT"){
    d = "RIGHT";
    right.play()
}});
const btnDown=document.querySelector('#btn3').addEventListener('click',function(){
  if(d!='UP'){
    d = "DOWN";
    down.play()
}});

document.addEventListener('DOMContentLoaded',function(){
  if (screen.width >= 769) {
    document.querySelector('.allBtn').innerHTML=""
}
})


//create the unit
const box = 32;

//load img
const ground = new Image();
ground.src = "./img/ground.png";

const foodImg = new Image();
foodImg.src = "./img/food.png";



const dead=new Audio();
const eat=new Audio();
const left=new Audio();
const up=new Audio();
const down=new Audio();
const right=new Audio();

dead.src='./audio/dead.mp3'
eat.src='./audio/eat.mp3'
left.src='./audio/left.mp3'
up.src='./audio/up.mp3'
down.src='./audio/down.mp3'
right.src='./audio/right.mp3'

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food;
function foodLoc(){
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
}
foodLoc();


let score = 0;
let d;

document.addEventListener("keydown", direction);
function direction(e) {
  //keycode keybord

  switch (e.keyCode) {
    case 37:
        if(d!="RIGHT"){
            d = "LEFT";
            left.play()
        }
      break;
    case 38:
        if(d!="DOWN"){
            d = "UP";
            up.play()
        }
      break;
    case 39:
        if(d!="LEFT"){
            d = "RIGHT";
            right.play()

        }
      break;
    case 40:
        if(d!='UP'){
            d = "DOWN";
            down.play()

        }
      break;
  }
  
}

function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = "#26D701";
    }
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);

    score = snake.length - 1;
  }

  ctx.drawImage(foodImg, food.x, food.y);
  


  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;


  //wich direction
  switch (d) {
    case "LEFT":
      snakeX -= box;
      break;
    case "UP":
      snakeY -= box;
      break;
    case "DOWN":
      snakeY += box;
      break;
    case "RIGHT":
      snakeX += box;
      break;
  }

  //eat food 
  if(snakeX==food.x && snakeY==food.y){
    eat.play()  
    foodLoc();
  }else{
    //remove the tail
    snake.pop();
  
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if(snakeX<box||snakeX>(17*box)||snakeY<(3*box)||snakeY>(17*box)||collision(newHead,snake) ){
    clearInterval(game)
    dead.play();
  }

  snake.unshift(newHead);


  ctx.fillStyle = "white";
  ctx.font = "45px changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
  
  ctx.fillStyle = "gold";
  ctx.font = "25px changa one";
  ctx.fillText("Best Score",5*box,1.4*box)
  
  ctx.fillStyle = "gold";
  ctx.font = "25px changa one";

  if(localStorage.getItem('snake-game-go')>score){
    ctx.fillText(localStorage.getItem('snake-game-go'),9*box,1.4*box)
  }else{
    ctx.fillText(score,9*box,1.4*box)
    //local best score
    localStorage.setItem('snake-game-go',score);
  }

  

}

//check collision function
function collision(head,array){
    for (let i = 0; i < array.length; i++) {
        if(head.x==array[i].x&&head.y==array[i].y){
            return true
        }
        
    }
    return false
}


let game = setInterval(draw, 100);
