var InputManager = (function () {
  var KEY_MAP = {
    "arrowup":    { dx: 0, dy: -1 },
    "arrowdown":  { dx: 0, dy: 1 },
    "arrowleft":  { dx: -1, dy: 0 },
    "arrowright": { dx: 1, dy: 0 },
    "w": { dx: 0, dy: -1 },
    "s": { dx: 0, dy: 1 },
    "a": { dx: -1, dy: 0 },
    "d": { dx: 1, dy: 0 }
  };

  var SNAKE_KEYS = Object.keys(KEY_MAP);

  var activeKeys = {};
  var dirX = 0;
  var dirY = 0;
  var onDirectionChange = null;
  var locked = false;

  function refreshDirection() {
    var keysDown = [];
    for (var k in activeKeys) {
      if (activeKeys[k] && KEY_MAP[k]) keysDown.push(k);
    }
    if (keysDown.length === 0) {
      dirX = 0;
      dirY = 0;
      return;
    }
    var first = KEY_MAP[keysDown[0]];
    dirX = first.dx;
    dirY = first.dy;
  }

  function onKeyDown(e) {
    if (locked) return;
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    var k = e.key.toLowerCase();
    if (!KEY_MAP[k]) return;
    if (activeKeys[k]) return;
    e.preventDefault();

    var prevDirX = dirX;
    var prevDirY = dirY;
    activeKeys[k] = true;

    var nd = KEY_MAP[k];
    if (nd.dx === -dirX && nd.dy === -dirY) return;
    dirX = nd.dx;
    dirY = nd.dy;

    if (onDirectionChange && (dirX !== prevDirX || dirY !== prevDirY)) {
      onDirectionChange();
    }
  }

  function onKeyUp(e) {
    if (locked) return;
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    var k = e.key.toLowerCase();
    if (!KEY_MAP[k]) return;
    activeKeys[k] = false;
    var wasMoving = dirX !== 0 || dirY !== 0;
    refreshDirection();
    if (wasMoving && dirX === 0 && dirY === 0 && onDirectionChange) {
      onDirectionChange();
    }
  }

  function getDirection() {
    return { dx: dirX, dy: dirY };
  }

  function isMoving() {
    return dirX !== 0 || dirY !== 0;
  }

  function init() {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
  }

  function setOnDirectionChange(cb) {
    onDirectionChange = cb;
  }

  function reset() {
    activeKeys = {};
    dirX = 0;
    dirY = 0;
  }

  function destroy() {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  }

  return {
    init: init,
    getDirection: getDirection,
    isMoving: isMoving,
    setOnDirectionChange: setOnDirectionChange,
    lock: function () { locked = true; activeKeys = {}; dirX = 0; dirY = 0; },
    unlock: function () { locked = false; },
    isLocked: function () { return locked; },
    reset: reset,
    destroy: destroy
  };
})();
