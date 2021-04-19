import { fromEvent, interval, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
    moveBallPosition,
    moveRacket,
    isRacketsHit,
    moveBallDirection,
    isGameOver,
    startRunning,
    changeBallPosition,
    drawRacket,
    changeDirectionY,
    endGame,
  } from "./utils.js";

const load = () => {
    var pong = {
        status: "STOPPED",
        pressedKeys: [],
        scorePlayerDown: 0,
        scorePlayerUp: 0,
        ball: {
          speed: 5,
          x: 135,
          y: 400,
          directionX: -1,
          directionY: -1
        }
      };

  const keyDown      = fromEvent(document, 'keydown'),
      keyUp          = fromEvent(document, 'keyup'),
      interval_      = interval(100),
      loop           = interval_.pipe(filter(() => {return pong.status === 'RUNNING';})),
      stopped         = keyDown.pipe(filter(() => {return pong.status === 'STOPPED';})),
      newDirX        = loop.pipe(map(() => moveBallDirection("X")(pong.ball))),
      newDirY        = loop.pipe(map(() => moveBallDirection("Y")(pong.ball))),
      newPosX        = newDirX.pipe(map((dirX) => moveBallPosition(pong.ball, dirX))),
      newPosY        = newDirY.pipe(map((dirY) => moveBallPosition(pong.ball, dirY))),
      newBallPos     = zip(newDirX, newDirY, newPosX, newPosY),
      moveRacketDownPos  = loop.pipe(map(() => moveRacket("")(pong))),
      moveRacketUpPos  = loop.pipe(map(() => moveRacket("2")(pong))),
      hit            = loop.pipe(filter(() => isRacketsHit("")(pong.ball))),
      hitUp          = loop.pipe(filter(() => isRacketsHit("2")(pong.ball))),
      gameOver       = loop.pipe(filter(() => isGameOver(pong)));

  keyDown.subscribe((event) => { pong.pressedKeys[event.which] = true  }); // editando pong
  keyUp.subscribe((event) => { pong.pressedKeys[event.which] = false }); // editando pong

  stopped.subscribe(() => { startRunning(pong) }); // editando pong

  newBallPos.subscribe((pos) => { changeBallPosition(pong.ball, pos) }); // editando pong

  moveRacketDownPos.subscribe((pixelPos) => { drawRacket("")(pixelPos); });
  moveRacketUpPos.subscribe((pixelPos) => { drawRacket("2")(pixelPos); });

  hit.subscribe(() => { changeDirectionY(pong, -1) }); // editando pong
  hitUp.subscribe(() => { changeDirectionY(pong, 1) }); // editando pong

  gameOver.subscribe(() => { endGame(pong) }); // editando pong
}

load();
