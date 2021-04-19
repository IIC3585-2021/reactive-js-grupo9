import $ from "jquery";

const KEYS = { LEFT: 37, RIGHT: 39 ,LEFT2: 68, RIGHT2: 65, SPACEBAR:32 } ;

const nextPosition = (type) => {
  return (ball) => {return type === "X" ? ball.x + ball.speed * ball.directionX : ball.y + ball.speed * ball.directionY}
}

  export const moveRacket = (racket) => {
    const left = $(`#racket${racket}`)[0].offsetLeft;
    const keys = racket === "" ? [KEYS.LEFT, KEYS.RIGHT, -5, 5] : [KEYS.LEFT2, KEYS.RIGHT2, 5, -5]
    return (pong) => {return pong.pressedKeys[keys[0]] ? left + keys[2] : (pong.pressedKeys[keys[1]] ? left + keys[3] : left)}
  }

export const drawRacket = (racket) => {
  return (pixelPos) => {$(`#racket${racket}`)[0].style.left = pixelPos + 'px'}
}
  
export const moveBallDirection = (dir) => {
  const param = dir === "X" ? $('#playground')[0].offsetWidth : $('#playground')[0].offsetHeight;
  return (ball) => {
    const direction = dir === "X" ? ball.directionX : ball.directionY;
    const nextPos = nextPosition(dir)(ball);
    return nextPos > param ? (nextPos < 0 ? 1 : -1) : (nextPos < 0 ? 1 : direction);
  }}

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

export const racketsPositionY = (racket) => {
  const ballSize = $('#ball')[0].offsetHeight;
  return $(`#racket${racket}`)[0].offsetTop - ballSize / 2;
}

export const isRacketsHit = (racket) => {
  const racketBorderLeft  = $(`#racket${racket}`)[0].offsetLeft;
  const racketBorderRight = racketBorderLeft + $(`#racket${racket}`)[0].offsetWidth;
  const racketPosY        = racketsPositionY(racket);
  const bottomPos2        = racket === "2" ? $(`#racket${racket}`)[0].offsetHeight : 0;
  return (ball) => {
    const posX            = nextPosition("X")(ball);
    const posY            = nextPosition("Y")(ball);
    const caseDown = posX >= racketBorderLeft && posX <= racketBorderRight && posY >= racketPosY;
    const caseUp = posX >= racketBorderLeft && posX <= racketBorderRight && posY <= racketPosY + bottomPos2;
    return (racket === "" ? caseDown : caseUp)
}}

export const changeDirectionY = (pong, direction) => {
  pong.ball.directionY = direction;
}

export const isGameOver = (pong) => {
  const bottomPos  = $('#racket')[0].offsetHeight;
  const posY       = nextPosition("Y")(pong.ball) - bottomPos;
  const racketPosY = racketsPositionY("");
  const racket2PosY = racketsPositionY("2");
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