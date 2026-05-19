var SnakeGame = (function () {
  var config = SnakeConfig;
  var stage = document.getElementById("snake-stage");
  var snake;
  var food = FoodManager;
  var input = InputManager;
  var state = GameState.IDLE;
  var lastMove = 0;
  var raf = 0;
  var targetScroll = 0;
  var autoScroll = false;
  var resizeTimer = 0;

  function getInitPos() {
    var featuresGrid = document.querySelector(".features-grid");
    if (featuresGrid) {
      var rect = featuresGrid.getBoundingClientRect();
      var cx = rect.left + rect.width / 2 + (window.pageXOffset || 0);
      var cy = rect.bottom + 20 + (window.pageYOffset || 0);
      var offsetX = (config.MIN_LENGTH - 1) * config.GRID / 2;
      return { x: cx + offsetX, y: cy };
    }
    return { x: 260, y: 420 };
  }

  EventBus.on("snake-speed", function (data) {
    config.MOVE_MS = Math.max(20, data.ms || config.MOVE_MS);
  });

  EventBus.on("snake-color", function (data) {
    if (snake && data.color) snake.setColor(data.color);
  });

  EventBus.on("snake-size", function (data) {
    if (snake && data.size) snake.setSize(data.size);
    if (snake) {
      config.SIZE = data.size;
      config.GRID = data.size + 2;
      config.EAT_MARGIN = Math.floor(data.size * 0.55);
    }
  });

  EventBus.on("reset-snake", function () {
    if (snake) snake.destroy();
    snake = Snake.create(config, stage);
    var pos = getInitPos();
    snake.init(pos.x, pos.y);
    snake.render();
  });

  EventBus.on("fly-in-start", function () {
    input.lock();
  });

  EventBus.on("fly-in-end", function () {
    input.unlock();
  });

  function start() {
    state = GameState.PLAYING;
    snake = Snake.create(config, stage);
    var pos = getInitPos();
    snake.init(pos.x, pos.y);
    food.scan();
    snake.render();
  }

  function tick(ts) {
    if (state !== GameState.PLAYING) {
      raf = requestAnimationFrame(tick);
      return;
    }

    var dir = input.getDirection();
    if (dir.dx !== 0 || dir.dy !== 0) {
      if (ts - lastMove >= config.MOVE_MS) {
        var moveResult = snake.move(dir.dx, dir.dy);
        var rects = snake.checkCollision(moveResult.prevHead, moveResult.newHead);
        var ate = food.eatInRects(rects);
        if (ate > 0) snake.grow();

        var hp = moveResult.headPageY;
        var ch = document.documentElement.clientHeight;
        if (hp > window.pageYOffset + ch - config.SCROLL_ZONE) {
          targetScroll = hp - ch + config.SCROLL_ZONE;
          autoScroll = true;
        } else if (hp < window.pageYOffset + config.SCROLL_ZONE) {
          targetScroll = hp - config.SCROLL_ZONE;
          autoScroll = true;
        }

        lastMove = ts;
      }
    }

    if (autoScroll) {
      var cy = window.pageYOffset;
      var diff = targetScroll - cy;
      if (Math.abs(diff) < 1) {
        autoScroll = false;
        window.scrollTo(window.pageXOffset, targetScroll);
      } else {
        window.scrollTo(window.pageXOffset, cy + diff * config.SCROLL_SPEED);
      }
    }

    snake.render();
    raf = requestAnimationFrame(tick);
  }

  input.setOnDirectionChange(function () {
    if (!input.isMoving()) {
      autoScroll = false;
    }
    lastMove = 0;
  });

  function onScroll() {
    if (snake) snake.render();
  }

  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (snake) {
        food.scan();
        snake.render();
      }
    }, 200);
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onResize);

  input.init();
  start();
  raf = requestAnimationFrame(tick);
})();
