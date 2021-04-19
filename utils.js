import $ from "jquery";

const KEYS = { LEFT: 37, RIGHT: 39 ,LEFT2: 68, RIGHT2: 65, SPACEBAR:32 } ;

const nextPosition = (type) => {
  return (ball) => {return type === "X" ? ball.x + ball.speed * ball.directionX : ball.y + ball.speed * ball.directionY}
}

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
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
  const param = dir === "X" ? $('#playground')[0].offsetWidth - $('#ball')[0].offsetWidth : $('#playground')[0].offsetHeight;
  return (ball) => {
    const direction = dir === "X" ? ball.directionX : ball.directionY;
    const nextPos = nextPosition(dir)(ball);
    return nextPos > param ? (nextPos < 0 ? 1 : -1) : (nextPos < 0 ? 1 : direction);
}}

export const moveBallPosition = (ball, direction) => {
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
  const offset = racket === "2" ? $(`#racket${racket}`)[0].offsetHeight : 0;
  return $(`#racket${racket}`)[0].offsetTop + offset;
}

export const isRacketsHit = (racket) => {
  const racketBorderLeft  = $(`#racket${racket}`)[0].offsetLeft;
  const racketBorderRight = racketBorderLeft + $(`#racket${racket}`)[0].offsetWidth;
  const racketPosY        = racketsPositionY(racket);
  return (ball) => {
    const posX            = ball.x;
    const posY            = ball.y;
    const offsetY         = $('#ball')[0].offsetHeight;
    const offsetX         = $('#ball')[0].offsetWidth;
    const caseDown = posX + offsetX >= racketBorderLeft && posX <= racketBorderRight && posY + offsetY === racketPosY;
    const caseUp = posX + offsetX >= racketBorderLeft && posX <= racketBorderRight && posY === racketPosY;
    return (racket === "" ? caseDown : caseUp)
}}

export const changeDirectionY = (pong, direction) => {
  pong.ball.directionY = direction;
}

export const isGameOver = (pong) => {
  const posY  = pong.ball.y;
  const offsetY = $('#ball')[0].offsetHeight;
  if(posY + offsetY === $('#playground')[0].offsetHeight){
    pong.scorePlayerUp ++;
    $('#scoreup')[0].innerHTML = pong.scorePlayerUp;
  }
  else if(posY === 0){
    pong.scorePlayerDown ++;
    $('#scoredown')[0].innerHTML = pong.scorePlayerDown;
  }
  return (posY + offsetY === $('#playground')[0].offsetHeight) | (posY === 0);
}

export const endGame = (pong) => {
  pong.status = 'STOPPED';
  const heigth = $('#playground')[0].offsetHeight;
  const min_heigth = Math.floor(heigth / 2 - heigth / 8);
  const max_heigth = Math.floor(heigth / 2 + heigth / 8);
  const max_width = $('#playground')[0].offsetWidth - $('#ball')[0].offsetWidth;
  pong.ball.y = Math.ceil(getRandomArbitrary(min_heigth, max_heigth) / 5) * 5;
  pong.ball.x = Math.ceil(getRandomArbitrary(0, max_width) / 5) * 5;
  pong.ball.directionX = getRandomArbitrary(0, 1) === 0 ? -1 : 1;
  pong.ball.directionY = getRandomArbitrary(0, 1) === 0 ? -1 : 1;
  $('#game-over')[0].style.display = 'block';
}

export const buildPosition = (dirX, dirY, x, y) => {
  return { directionX: dirX, directionY: dirY, x: x, y: y };
}

export const startRunning = (pong) => {
    pong.status = 'RUNNING';
    $('#start-message')[0].style.display = 'none';
    $('#game-over')[0].style.display = 'none';
}