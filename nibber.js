var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
var ballX = canvas.width/2;
var ballY = canvas.height/2;

var ballSpeedX = 2 * Math.E;
var ballSpeedY = 2 * Math.PI;

var framesPerSecond = 120;

var paddle1Y = 250;
var paddle2Y = 250;

var ballSize = 15;
var ballColor = 'white';

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 15;
const PADDLE_DIST = 5;

var player1Score = 0;
var player2Score = 0;

const WIN_SCORE = 3;

function calculateMousePos(evt) {
   var rect = canvas.getBoundingClientRect();
   var root = document.documentElement;
   var mouseX = evt.clientX - rect.left - root.scrollLeft;
   var mouseY = evt.clientY - rect.top - root.scrollTop;
   return {
       x: mouseX,
       y: mouseY
     }
   }


     setInterval(callAll, 1000 / framesPerSecond);
     setInterval(easyMode, 1100 / framesPerSecond);

     canvas.addEventListener('mousemove',
       function(evt) {
         var mousePos = calculateMousePos(evt);
         paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
       });


   function callAll() {
     moveAll();
     drawAll();
   }


   function ballReset() {
     ballSpeedX = -ballSpeedX;
     ballX = canvas.width / 2;
     ballY = canvas.height / 2;
     ballSpeedY -=ballSpeedY
   }


function hardMode () {
   paddle2Y = ballY - (PADDLE_HEIGHT/2)
}

function easyMode () {
  if(paddle2Y < ballY - (PADDLE_HEIGHT/2)) {
    paddle2Y = paddle2Y + 6;
  } else {
    paddle2Y = paddle2Y - 6;
  }
}

   function moveAll() {
     ballX = ballX + ballSpeedX
     ballY = ballY + ballSpeedY
     //paddle1Y = ballY - (PADDLE_HEIGHT/2)
     if (ballX > canvas.width - 5) {
       if (ballY > paddle2Y &&
         ballY < paddle2Y + PADDLE_HEIGHT) {
       ballSpeedX = -ballSpeedX;
     } else {
       ballReset();
       player1Score++;
     }}

     if (ballX < 5) {
       if (ballY > paddle1Y &&
         ballY < paddle1Y + PADDLE_HEIGHT) {
         ballSpeedX = -ballSpeedX;

         var deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
         ballSpeedY = deltaY * (1/5);

       } else {
         ballReset();
         player2Score++;
       }}

       if (ballY > canvas.height - ballSize) {
         ballSpeedY = -ballSpeedY;
       }

       if (ballY < 0) {
         ballSpeedY = -ballSpeedY;
       }
     }


     function drawAll() {
       console.log("drawall loaded")
       // next line is main canvas
       spawnRect(0, 0, canvas.width, canvas.height, 'black');
       //left player paddle
       spawnRect(PADDLE_DIST, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
       //this is the right computer paddle
       spawnRect(canvas.width - PADDLE_THICKNESS - PADDLE_DIST, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
       //mainball
       spawnRect(ballX, ballY, ballSize, ballSize, ballColor);
       canvasContext.fillText(player1Score,200,100)
       canvasContext.fillText(player2Score,canvas.width - 200,100)
     }


     function spawnRect(leftX, topY, width, height, drawColor) {
       canvasContext.fillStyle = drawColor;
       canvasContext.fillRect(leftX, topY, width, height);
     }
