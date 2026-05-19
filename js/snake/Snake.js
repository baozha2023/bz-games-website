var Snake = (function () {
  function create(config, stage) {
    var segments = [];
    var segEls = [];
    var currentColor = null;

    function ensureSegEls() {
      while (segEls.length < segments.length) {
        var el = document.createElement("div");
        el.className = "snake-seg snake-body";
        el.style.width = config.SIZE + "px";
        el.style.height = config.SIZE + "px";
        el.style.borderRadius = "3px";
        if (currentColor) el.style.background = currentColor;
        stage.appendChild(el);
        segEls.push(el);
      }
      while (segEls.length > segments.length) {
        segEls.pop().remove();
      }
    }

    function init(x, y) {
      segments = [];
      for (var i = 0; i < config.MIN_LENGTH; i++) {
        segments.push({ x: x - i * config.GRID, y: y });
      }
      ensureSegEls();
    }

    function getHead() {
      return segments[0];
    }

    function getSegments() {
      return segments;
    }

    function move(dx, dy) {
      var head = segments[0];
      var prevHead = { x: head.x, y: head.y };

      var cw = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight;
      var bodyW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth || 0, cw);
      var bodyH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight || 0, ch);

      var nx = head.x + dx * config.GRID;
      var ny = head.y + dy * config.GRID;

      if (nx > bodyW - config.MARGIN) nx = config.MARGIN;
      if (nx < config.MARGIN) nx = bodyW - config.MARGIN;
      if (ny > bodyH - config.MARGIN) ny = config.MARGIN;
      if (ny < config.MARGIN) ny = bodyH - config.MARGIN;

      segments.unshift({ x: nx, y: ny });
      if (segments.length > config.MIN_LENGTH) segments.pop();

      return {
        prevHead: prevHead,
        newHead: { x: nx, y: ny },
        headPageY: ny
      };
    }

    function grow() {
      var tail = segments[segments.length - 1];
      segments.push({ x: tail.x, y: tail.y });
      ensureSegEls();
    }

    function checkCollision(prevHead, newHead) {
      var m = config.EAT_MARGIN;
      var w = config.SIZE;
      return [{
        minX: newHead.x - m,
        maxX: newHead.x + w + m,
        minY: newHead.y - m,
        maxY: newHead.y + w + m
      }];
    }

    function render() {
      var sx = window.pageXOffset || 0;
      var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
      for (var i = 0; i < segments.length; i++) {
        if (i >= segEls.length) break;
        var el = segEls[i];
        var s = segments[i];
        el.className = "snake-seg" + (i === 0 ? " snake-head" : " snake-body");
        el.style.left = (s.x - sx) + "px";
        el.style.top = (s.y - sy) + "px";
      }
    }

    function getLength() {
      return segments.length;
    }

    function setColor(hex) {
      currentColor = hex;
      for (var i = 0; i < segEls.length; i++) {
        segEls[i].style.background = hex;
      }
    }

    function setSize(px) {
      config.SIZE = px;
      for (var i = 0; i < segEls.length; i++) {
        segEls[i].style.width = px + "px";
        segEls[i].style.height = px + "px";
      }
    }

    function destroy() {
      for (var i = 0; i < segEls.length; i++) {
        segEls[i].remove();
      }
      segEls = [];
      segments = [];
    }

    return {
      init: init,
      getHead: getHead,
      getSegments: getSegments,
      move: move,
      grow: grow,
      checkCollision: checkCollision,
      render: render,
      getLength: getLength,
      setColor: setColor,
      setSize: setSize,
      destroy: destroy
    };
  }

  return { create: create };
})();
