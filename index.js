import { fromEvent, interval, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
    moveBallDirectionX,
    moveBallDirectionY,
    moveBallPosition,
    moveRacketDown,
    moveRacketUp,
    isRacketHit,
    isGameOver,
    startRunning,
    changeBallPosition,
    drawRacketDown,
    drawRacketUp,
    changeDirectionY,
    endGame,
    isRacketUpHit
  } from "./utils.js";

const load = () => {
    var pong = {
        status: "STOPPED",
        pressedKeys: [],
        score: 0,
        ball: {
          speed: 5,
          x: 135,
          y: 100,
          directionX: -1,
          directionY: -1
        }
      };

  const keyDown      = fromEvent(document, 'keydown'),
      keyUp          = fromEvent(document, 'keyup'),
      interval_      = interval(16),
      loop           = interval_.pipe(filter(() => {return pong.status === 'RUNNING';})),
      stopped         = keyDown.pipe(filter(() => {return pong.status === 'STOPPED';})),
      newDirX        = loop.pipe(map(() => moveBallDirectionX(pong.ball))),
      newDirY        = loop.pipe(map(() => moveBallDirectionY(pong.ball))),
      newPosX        = newDirX.pipe(map((dirX) => moveBallPosition(pong.ball, dirX))),
      newPosY        = newDirY.pipe(map((dirY) => moveBallPosition(pong.ball, dirY))),
      newBallPos     = zip(newDirX, newDirY, newPosX, newPosY),
      moveRacketDownPos  = loop.pipe(map(() => moveRacketDown(pong))),
      moveRacketUpPos  = loop.pipe(map(() => moveRacketUp(pong))),
      hit            = loop.pipe(filter(() => isRacketHit(pong.ball))),
      hitUp          = loop.pipe(filter(() => isRacketUpHit(pong.ball))),
      gameOver       = loop.pipe(filter(() => isGameOver(pong.ball)));

  keyDown.subscribe((event) => { pong.pressedKeys[event.which] = true  }); // editando pong
  keyUp.subscribe((event) => { pong.pressedKeys[event.which] = false }); // editando pong

  stopped.subscribe(() => { startRunning(pong) }); // editando pong

  newBallPos.subscribe((pos) => { changeBallPosition(pong.ball, pos) }); // editando pong

  moveRacketDownPos.subscribe((pixelPos) => { drawRacketDown(pixelPos); });
  moveRacketUpPos.subscribe((pixelPos) => { drawRacketUp(pixelPos); });

  hit.subscribe(() => { changeDirectionY(pong, -1) }); // editando pong
  hitUp.subscribe(() => { changeDirectionY(pong, 1) }); // editando pong

  gameOver.subscribe(() => { endGame(pong) }); // editando pong
}

load();
