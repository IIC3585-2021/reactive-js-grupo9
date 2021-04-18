

const load = () => {
  const keyDown      = Rx.Observable.fromEvent(document, 'keydown'),
      keyUp          = Rx.Observable.fromEvent(document, 'keyup'),
      interval       = Rx.Observable.interval(16),
      loop           = interval.filter(isRunning),
      stoped         = keyDown.filter(isStoped),
      newDirX        = loop.map(() => { return moveBallDirectionX(pong.ball) }),
      newDirY        = loop.map(() => { return moveBallDirectionY(pong.ball) }),
      newPosX        = newDirX.map((dirX) => { return moveBallPosition(pong.ball, dirX) }),
      newPosY        = newDirY.map((dirY) => { return moveBallPosition(pong.ball, dirY) }),
      newBallPos     = Rx.Observable.zip(newDirX, newDirY, newPosX, newPosY, buildPosition),
      moveRacketDownPos  = loop.map(() => { return moveRacketDown(pong) }),
      moveRacketUpPos  = loop.map(() => { return moveRacketUp(pong) }),
      hit            = loop.filter(() => { return isRacketHit(pong.ball) }),
      hitUp            = loop.filter(() => { return isRacketUpHit(pong.ball) }),
      gameOver       = loop.filter(() => { return isGameOver(pong.ball) });

  keyDown.subscribe((event) => { pong.pressedKeys[event.which] = true  }); // editando pong
  keyUp.subscribe((event) => { pong.pressedKeys[event.which] = false }); // editando pong

  stoped.subscribe(() => { startRunning(pong) }); // editando pong

  newBallPos.subscribe((pos) => { changeBallPosition(pong.ball, pos) }); // editando pong

  moveRacketDownPos.subscribe((pixelPos) => { drawRacketDown(pixelPos); });
  moveRacketUpPos.subscribe((pixelPos) => { drawRacketUp(pixelPos); });

  hit.subscribe(() => { changeDirectionY(pong, -1) }); // editando pong
  hitUp.subscribe(() => { changeDirectionY(pong, 1) }); // editando pong

  gameOver.subscribe(() => { endGame(pong) }); // editando pong
}

window.onload = load;
