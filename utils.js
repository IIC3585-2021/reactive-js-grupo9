import $ from "jquery";

const KEYS = { LEFT: 37, RIGHT: 39 ,LEFT2: 68, RIGHT2: 65, SPACEBAR:32 } ;

const nextPosition = (type) => {
  return (ball) => {return type === "X" ? ball.x + ball.speed * ball.directionX : ball.y + ball.speed * ball.directionY}
}

export const moveRacketUp = (pong) => {
  const left = $('#racket2')[0].offsetLeft;
  return pong.pressedKeys[KEYS.LEFT2] ? left + 5 : (pong.pressedKeys[KEYS.RIGHT2] ? left - 5 : left);
}

export const moveRacketDown = (pong) => {
    const left = $('#racket')[0].offsetLeft;
    return pong.pressedKeys[KEYS.LEFT] ? left - 5 : (pong.pressedKeys[KEYS.RIGHT] ? left + 5 : left);
  }
  
export const drawRacketDown = (pixelPos) => {
    $('#racket')[0].style.left = pixelPos + 'px';
  }

export const drawRacketUp = (pixelPos) => {
    $('#racket2')[0].style.left = pixelPos + 'px';
    $('#racket2')[0].style.top = 15 + 'px';
  }
  
export  const moveBallDirectionX = (ball) => {
    const width = $('#playground')[0].offsetWidth
    const directionX = ball.directionX;
    const positionX = nextPosition("X")(ball);
    return positionX > width ? (positionX < 0 ? 1 : -1) : (positionX < 0 ? 1 : directionX)
  }
  
export const moveBallDirectionY = (ball) => {
  const height = $('#playground')[0].offsetHeight;
  const directionY = ball.directionY;
  const positionY = nextPosition("Y")(ball);
  return positionY > height ? (positionY < 0 ? 1 : -1) : (positionY < 0 ? 1 : directionY)
}

export  const moveBallPosition = (ball, direction) => {
  return ball.speed * direction;
}

export const changeBallPosition = (ball, pos) => {
  ball.directionX = pos[0];
  ball.directionY = pos[1];
  ball.x += pos[2];
  ball.y += pos[3];
  drawBall(ball);
}

export const drawBall = (ball) => {
  $('#ball')[0].style.left = ball.x + 'px';
  $('#ball')[0].style.top  = ball.y + 'px';
}

export const racketPositionY = () => {
  const ballSize = $('#ball')[0].offsetHeight;
  return $('#racket')[0].offsetTop - ballSize / 2; // subtracting size of ball for doesn't pass through racket
}

export const racketUpPositionY = () => {
  const ballSize = $('#ball')[0].offsetHeight;
  return $('#racket2')[0].offsetTop - ballSize / 2; // subtracting size of ball for doesn't pass through racket
}

export const isRacketHit = (ball) => {
  const racketBorderLeft  = $('#racket')[0].offsetLeft;
  const racketBorderRight = racketBorderLeft + $('#racket')[0].offsetWidth;
  const posX              = nextPosition("X")(ball);
  const posY              = nextPosition("Y")(ball);
  const racketPosY        = racketPositionY();
  return (posX >= racketBorderLeft && 
          posX <= racketBorderRight && 
          posY >= racketPosY);
}

export const isRacketUpHit = (ball) => {
  const racketUpBorderLeft  = $('#racket2')[0].offsetLeft;
  const racketUpBorderRight = racketUpBorderLeft + $('#racket2')[0].offsetWidth;
  const posX              = nextPosition("X")(ball);
  const posY              = nextPosition("Y")(ball);
  const racketPosY        = racketUpPositionY();
  const bottomPos2        = $('#racket2')[0].offsetHeight;
  return (posX >= racketUpBorderLeft && 
          posX <= racketUpBorderRight && 
          posY <= racketPosY + bottomPos2);
}

export const changeDirectionY = (pong, direction) => {
  pong.ball.directionY = direction;
}

export const isGameOver = (pong) => {
  const bottomPos  = $('#racket')[0].offsetHeight;
  const posY       = nextPosition("Y")(pong.ball) - bottomPos;
  const racketPosY = racketPositionY();
  const racket2PosY = racketUpPositionY();
  if(posY > racketPosY){
    pong.scorePlayerUp ++;
    $('#scoreup')[0].innerHTML = pong.scorePlayerUp;
  }
  else if(posY < racket2PosY){
    pong.scorePlayerDown ++;
    $('#scoredown')[0].innerHTML = pong.scorePlayerDown;
  }
  return (posY > racketPosY) | (posY < racket2PosY);
}

export const endGame = (pong) => {
  pong.status = 'STOPPED';
  pong.ball.x = 350;
  pong.ball.y = 350;
  drawEndGame();
  if (pong.pressedKeys[KEYS.SPACEBAR]){
    $('#game-over')[0].style.display = 'none';
    pong.status = 'RUNNING';
  }
}

export const drawEndGame = () => {
  $('#game-over')[0].style.display = 'block';
}


export const buildPosition = (dirX, dirY, x, y) => {
  return { directionX: dirX, directionY: dirY, x: x, y: y };
}

export const startRunning = (pong) => {
    pong.status = 'RUNNING';
    $('#start-message')[0].style.display = 'none';
}