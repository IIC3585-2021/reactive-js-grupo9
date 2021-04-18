const moveRacketDown = (pong) => {
    const left = $('#racket')[0].offsetLeft;
    return pong.pressedKeys[KEYS.LEFT] ? left - 5 : (pong.pressedKeys[KEYS.RIGHT] ? left + 5 : left);
  }

  const moveRacketUp = (pong) => {
    const left = $('#racket2')[0].offsetLeft;
    return pong.pressedKeys[KEYS.LEFT2] ? left + 5 : (pong.pressedKeys[KEYS.RIGHT2] ? left - 5 : left);
  }

  
  const drawRacketDown = (pixelPos) => {
    $('#racket')[0].style.left = pixelPos + 'px';
  }
  
  const drawRacketUp = (pixelPos) => {
    $('#racket2')[0].style.left = pixelPos + 'px';
    $('#racket2')[0].style.top = 15 + 'px';
  }
  
  const moveBallDirectionX = (ball) => {
    const width = $('#playground')[0].offsetWidth
    const directionX = ball.directionX;
    const positionX = nextPosition("X")(ball);
    return positionX > width ? (positionX < 0 ? 1 : -1) : (positionX < 0 ? 1 : directionX)
  }
  
  const moveBallDirectionY = (ball) => {
    const height = $('#playground')[0].offsetHeight;
    const directionY = ball.directionY;
    const positionY = nextPosition("Y")(ball);
    return positionY > height ? (positionY < 0 ? 1 : -1) : (positionY < 0 ? 1 : directionY)
  }
  
  const moveBallPosition = (ball, direction) => {
    return ball.speed * direction;
  }
  
  const changeBallPosition = (ball, pos) => {
    ball.directionX = pos.directionX;
    ball.directionY = pos.directionY;
    ball.x += pos.x;
    ball.y += pos.y;
    drawBall(ball);
  }
  
  const drawBall = (ball) => {
    $('#ball')[0].style.left = ball.x + 'px';
    $('#ball')[0].style.top  = ball.y + 'px';
  }
  
  const racketPositionY = () => {
    const ballSize = $('#ball')[0].offsetHeight;
    return $('#racket')[0].offsetTop - ballSize / 2; // subtracting size of ball for doesn't pass through racket
  }

  const racketUpPositionY = () => {
    const ballSize = $('#ball')[0].offsetHeight;
    return $('#racket2')[0].offsetTop - ballSize / 2; // subtracting size of ball for doesn't pass through racket
  }
  
  const nextPosition = (type) => {
    return (ball) => {return type === "X" ? ball.x + ball.speed * ball.directionX : ball.y + ball.speed * ball.directionY}
  }
  
  const isRacketHit = (ball) => {
    const racketBorderLeft  = $('#racket')[0].offsetLeft;
    const racketBorderRight = racketBorderLeft + $('#racket')[0].offsetWidth;
    const posX              = nextPosition("X")(ball);
    const posY              = nextPosition("Y")(ball);
    const racketPosY        = racketPositionY();
    return (posX >= racketBorderLeft && 
            posX <= racketBorderRight && 
            posY >= racketPosY);
  }

  const isRacketUpHit = (ball) => {
    const racketUpBorderLeft  = $('#racket2')[0].offsetLeft;
    const racketUpBorderRight = racketBorderLeft + $('#racket2')[0].offsetWidth;
    const posX              = nextPosition("X")(ball);
    const posY              = nextPosition("Y")(ball);
    const racketPosY        = racketUpPositionY();
    return (posX >= racketUpBorderLeft && 
            posX <= racketUpBorderRight && 
            posY >= racketPosY);
  }
  
  const changeScore = (pong) => {
    pong.score++;
  }
  
  const drawScore = (score) => {
    $('#score')[0].innerHTML = score;
  }
  
  const changeDirectionY = (pong) => {
    pong.ball.directionY = -1;
    changeScore(pong);
    drawScore(pong.score);
  }
  
  const isGameOver = (ball) => {
    const bottomPos  = $('#racket')[0].offsetHeight;
    const posY       = nextPosition("Y")(ball) - bottomPos;
    const racketPosY = racketPositionY();
    return posY > racketPosY;
  }
  
  const endGame = (pong) => {
    pong.status = STATUSES.GAMEOVER;
    drawEndGame();
  }
  
  const drawEndGame = () => {
    $('#game-over')[0].style.display = 'block';
  }
  
  const isRunning = () => {
    return pong.status === STATUSES.RUNNING;
  }
  
  const isStoped = () => {
    return pong.status === STATUSES.STOPED;
  }
  
  const buildPosition = (dirX, dirY, x, y) => {
    return { directionX: dirX, directionY: dirY, x: x, y: y };
  }
  
  const startRunning = (pong) => {
      pong.status = STATUSES.RUNNING;
      $('#start-message')[0].style.display = 'none';
  }