var MiniTetris = (function () {
  var COLS = 10;
  var ROWS = 16;
  var CELL = 18;
  var GAP = 1;
  var DROP_MS = 600;
  var SPEED_MS = 60;

  var panel = null;
  var board = null;
  var cells = [];
  var grid = [];
  var piece = null;
  var pieceType = null;
  var pieceX = 0;
  var pieceY = 0;
  var score = 0;
  var scoreEl = null;
  var running = false;
  var dropTimer = 0;
  var moveTimer = 0;
  var moveDir = 0;

  var PIECES = {
    I: { color: "#00f0f0", shape: [[0,0],[0,1],[0,2],[0,3]] },
    O: { color: "#f0f000", shape: [[0,0],[0,1],[1,0],[1,1]] },
    T: { color: "#a000f0", shape: [[0,0],[0,1],[0,2],[1,1]] },
    S: { color: "#00f000", shape: [[0,1],[0,2],[1,0],[1,1]] },
    Z: { color: "#f00000", shape: [[0,0],[0,1],[1,1],[1,2]] },
    J: { color: "#0000f0", shape: [[0,0],[1,0],[1,1],[1,2]] },
    L: { color: "#f0a000", shape: [[0,2],[1,0],[1,1],[1,2]] }
  };

  var TYPES = ["I","O","T","S","Z","J","L"];

  function createPanel() {
    panel = document.createElement("div");
    panel.className = "tetris-panel";
    panel.innerHTML =
      '<div class="tetris-bubble" title="俄罗斯方块">' +
      '<div class="tetris-logo">' +
      '<span class="tl-block tl-cyan"></span><span class="tl-block tl-yellow"></span>' +
      '<span class="tl-block tl-purple"></span><span class="tl-block tl-green"></span>' +
      '</div>' +
      '</div>' +
      '<div class="tetris-body">' +
      '<div class="tetris-header">' +
      '<span class="tetris-title">俄罗斯方块</span>' +
      '<span class="tetris-score">0</span>' +
      '<button class="tetris-close">&times;</button>' +
      '</div>' +
      '<div class="tetris-board"></div>' +
      '<div class="tetris-controls">' +
      '<button class="tetris-btn" data-dir="-1" aria-label="左">◀</button>' +
      '<button class="tetris-btn" data-dir="1" aria-label="下">▼</button>' +
      '<button class="tetris-btn" data-dir="0" aria-label="旋转">↻</button>' +
      '<button class="tetris-btn" data-dir="2" aria-label="右">▶</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(panel);

    board = panel.querySelector(".tetris-board");
    scoreEl = panel.querySelector(".tetris-score");

    panel.querySelector(".tetris-bubble").addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });

    panel.querySelector(".tetris-close").addEventListener("click", function (e) {
      e.stopPropagation();
      close();
    });

    var btns = panel.querySelectorAll(".tetris-btn");
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener("pointerdown", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var dir = parseInt(this.dataset.dir, 10);
        if (dir === 0) rotatePiece();
        if (dir === 1) hardDrop();
        if (dir === -1 || dir === 2) {
          moveDir = dir === -1 ? -1 : 1;
          moving = true;
          moveTimer = window.setInterval(function () {
            movePiece(moveDir);
          }, SPEED_MS);
        }
      });
      btns[b].addEventListener("pointerup", stopMove);
      btns[b].addEventListener("pointerleave", stopMove);
      btns[b].addEventListener("pointercancel", stopMove);
    }
  }

  var moving = false;
  function stopMove() {
    moving = false;
    moveDir = 0;
    if (moveTimer) { window.clearInterval(moveTimer); moveTimer = 0; }
  }

  var KEY_MAP = {
    "arrowleft": -1,
    "arrowright": 2,
    "arrowdown": 1,
    "arrowup": 0,
    "a": -1,
    "d": 2,
    "s": 1,
    "w": 0
  };

  var TETRIS_KEYS = ["arrowleft","arrowright","arrowdown","arrowup","a","d","s","w"];

  function onTetrisKeyDown(e) {
    var k = e.key.toLowerCase();
    if (TETRIS_KEYS.indexOf(k) === -1) return;
    e.preventDefault();
    e.stopPropagation();
    var dir = KEY_MAP[k];
    if (dir === 0) rotatePiece();
    else if (dir === 1) hardDrop();
    else if (dir === -1 || dir === 2) {
      moveDir = dir === -1 ? -1 : 1;
      if (!moving) {
        moving = true;
        moveTimer = window.setInterval(function () {
          movePiece(moveDir);
        }, SPEED_MS);
      }
    }
  }

  function onTetrisKeyUp(e) {
    var k = e.key.toLowerCase();
    if (TETRIS_KEYS.indexOf(k) === -1) return;
    e.preventDefault();
    e.stopPropagation();
    var dir = KEY_MAP[k];
    if (dir === -1 || dir === 2) {
      stopMove();
    }
  }

  function attachKeyboard() {
    window.addEventListener("keydown", onTetrisKeyDown, true);
    window.addEventListener("keyup", onTetrisKeyUp, true);
  }

  function detachKeyboard() {
    stopMove();
    window.removeEventListener("keydown", onTetrisKeyDown, true);
    window.removeEventListener("keyup", onTetrisKeyUp, true);
  }

  function createGrid() {
    grid = [];
    cells = [];
    board.innerHTML = "";
    for (var r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (var c = 0; c < COLS; c++) {
        grid[r][c] = 0;
        var cell = document.createElement("div");
        cell.className = "tetris-cell";
        cell.style.width = CELL + "px";
        cell.style.height = CELL + "px";
        board.appendChild(cell);
        cells.push(cell);
      }
    }
  }

  function cellIdx(r, c) { return r * COLS + c; }

  function renderCell(r, c, color) {
    var idx = cellIdx(r, c);
    if (idx >= 0 && idx < cells.length) {
      cells[idx].style.background = color || "";
    }
  }

  function renderBoard() {
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        renderCell(r, c, grid[r][c] || "");
      }
    }
  }

  function renderPiece() {
    if (!piece) return;
    for (var i = 0; i < piece.length; i++) {
      var pr = pieceY + piece[i][0];
      var pc = pieceX + piece[i][1];
      if (pr >= 0 && pr < ROWS && pc >= 0 && pc < COLS) {
        renderCell(pr, pc, PIECES[pieceType].color);
      }
    }
  }

  function render() {
    renderBoard();
    renderPiece();
  }

  function spawnPiece() {
    var t = TYPES[Math.floor(Math.random() * TYPES.length)];
    pieceType = t;
    piece = PIECES[t].shape.map(function (p) { return [p[0], p[1]]; });
    pieceX = Math.floor((COLS - 4) / 2);
    pieceY = -2;
    if (!canPlace(piece, pieceX, pieceY + 1)) {
      gameOver();
      return;
    }
    render();
  }

  function canPlace(shape, px, py) {
    for (var i = 0; i < shape.length; i++) {
      var r = py + shape[i][0];
      var c = px + shape[i][1];
      if (c < 0 || c >= COLS || r >= ROWS) return false;
      if (r < 0) continue;
      if (grid[r][c]) return false;
    }
    return true;
  }

  function lockPiece() {
    for (var i = 0; i < piece.length; i++) {
      var r = pieceY + piece[i][0];
      var c = pieceX + piece[i][1];
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        grid[r][c] = PIECES[pieceType].color;
      }
    }
    clearLines();
    piece = null;
    pieceType = null;
    window.setTimeout(spawnPiece, 50);
  }

  function clearLines() {
    var cleared = 0;
    for (var r = ROWS - 1; r >= 0; r--) {
      var full = true;
      for (var c = 0; c < COLS; c++) {
        if (!grid[r][c]) { full = false; break; }
      }
      if (full) {
        cleared++;
        for (var cr = r; cr > 0; cr--) {
          for (var cc = 0; cc < COLS; cc++) {
            grid[cr][cc] = grid[cr - 1][cc];
          }
        }
        for (var cc = 0; cc < COLS; cc++) {
          grid[0][cc] = 0;
        }
        r++;
      }
    }
    if (cleared > 0) {
      score += cleared * cleared * 100;
      scoreEl.textContent = score;
      try { EventBus.emit("tetris-score", { score: score }); } catch (e) {}
    }
  }

  function movePiece(dir) {
    if (!piece || !running) return;
    var nx = pieceX + dir;
    if (canPlace(piece, nx, pieceY)) {
      pieceX = nx;
    }
    render();
  }

  function rotatePiece() {
    if (!piece || !running) return;
    var newShape = [];
    for (var i = 0; i < piece.length; i++) {
      var r = piece[i][0];
      var c = piece[i][1];
      newShape.push([c, 3 - r]);
    }
    if (canPlace(newShape, pieceX, pieceY)) {
      piece = newShape;
    }
    render();
  }

  function hardDrop() {
    if (!piece || !running) return;
    while (canPlace(piece, pieceX, pieceY + 1)) {
      pieceY++;
    }
    lockPiece();
    render();
  }

  function gameOver() {
    running = false;
    if (dropTimer) { window.clearInterval(dropTimer); dropTimer = 0; }
    stopMove();
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.opacity = "0.3";
    }
    window.setTimeout(reset, 1500);
  }

  function reset() {
    stopMove();
    if (dropTimer) { window.clearInterval(dropTimer); dropTimer = 0; }
    score = 0;
    scoreEl.textContent = "0";
    createGrid();
    renderBoard();
    spawnPiece();
    render();
    running = true;
    dropTimer = window.setInterval(tick, DROP_MS);
  }

  function tick() {
    if (!piece || !running) return;
    if (canPlace(piece, pieceX, pieceY + 1)) {
      pieceY++;
    } else {
      lockPiece();
    }
    render();
  }

  function open() {
    if (!panel) createPanel();
    stopMove();
    if (dropTimer) { window.clearInterval(dropTimer); dropTimer = 0; }
    running = false;
    score = 0;
    if (scoreEl) scoreEl.textContent = "0";
    createGrid();
    renderBoard();
    spawnPiece();
    render();
    running = true;
    dropTimer = window.setInterval(tick, DROP_MS);
    if (typeof InputManager !== "undefined") InputManager.lock();
    attachKeyboard();
    panel.classList.add("tetris-open");
  }

  function close() {
    if (panel) panel.classList.remove("tetris-open");
    detachKeyboard();
    if (typeof InputManager !== "undefined") InputManager.unlock();
  }

  function toggle() {
    if (panel && panel.classList.contains("tetris-open")) close();
    else open();
  }

  createPanel();
})();
