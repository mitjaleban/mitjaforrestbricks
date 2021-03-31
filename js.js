var canvas=document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");
	var ballRadius=10;
	var x=canvas.width/2;
	var y=canvas.height-30;
	var dx=2;
	var dy=-2;
	var paddleHeight=10;
	var paddleWidth=100;
	var paddleX=(canvas.width-paddleWidth)/2;
	var rightPressed=false;
	var leftPressed=false;
	var brickRowCount=5;
	var brickColumnCount=4;
	var brickWidth=75;
	var brickHeight=20;
	var brickPadding=10;
	var brickOffsetTop=30;
	var brickOffsetLeft=30;
	var score=0;
	var lives=5;

	var bricks=[];
		for(var c=0;c<brickColumnCount;c++) {
			bricks[c]=[];
		for(var r=0;r<brickRowCount;r++) {
			bricks[c][r]={x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.key=="Right" || e.key=="ArrowRight") {
        rightPressed=true;
    }
    else if(e.key=="Left" || e.key=="ArrowLeft") {
        leftPressed=true;
    }
}

function keyUpHandler(e) {
    if(e.key=="Right" || e.key=="ArrowRight") {
        rightPressed=false;
    }
    else if(e.key=="Left" || e.key=="ArrowLeft") {
        leftPressed=false;
    }
}


function collisionDetection() {
  for(var c=0;c<brickColumnCount;c++) {
    for(var r=0;r<brickRowCount;r++) {
      var b=bricks[c][r];
      if(b.status==1) {
        if(x>b.x && x<b.x+brickWidth && y>b.y&&y<b.y+brickHeight) {
          dy=-dy;
          b.status=0;
          score++;
          if(score==brickRowCount*brickColumnCount) {
            alert("YOU WON!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle ="#996600";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle ="#996600";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(var c=0;c<brickColumnCount;c++) {
    for(var r=0;r<brickRowCount;r++) {
      if(bricks[c][r].status==1) {
        var brickX=(r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY=(c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x=brickX;
        bricks[c][r].y=brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle ="#ff0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font="20px Lucida Console";
  ctx.fillStyle="#003300";
  ctx.fillText("SCORE: "+score, 8, 20);
}
function drawLives() {
  ctx.font="20px Lucida Console";
  ctx.fillStyle="#003300";
  ctx.fillText("LIVES: "+lives, canvas.width-100, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x+dx>canvas.width-ballRadius || x+dx<ballRadius) {
    dx=-dx;
  }
  if(y+dy<ballRadius) {
    dy=-dy;
  }
  else if(y+dy>canvas.height-ballRadius) {
    if(x>paddleX && x<paddleX+paddleWidth) {
      dy=-dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("YOU LOST!");
        document.location.reload();
      }
      else {
        x=canvas.width/2;
        y=canvas.height-30;
        dx=3;
        dy=-3;
        paddleX=(canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX<canvas.width-paddleWidth) {
    paddleX +=7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -=7;
  }

  x +=dx;
  y +=dy;
  requestAnimationFrame(draw);
}

draw();
