STATUSES = { STOPED: 'STOPED', RUNNING: 'RUNNING', GAMEOVER: 'GAMEOVER' };

const pong = {
  status: STATUSES.STOPED,
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

const KEYS = { LEFT: 37, RIGHT: 39 };