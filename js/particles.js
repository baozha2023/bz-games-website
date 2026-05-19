var MouseParticles = (function () {
  var container = null;
  var mx = -100;
  var my = -100;
  var ticking = false;
  var aliveCount = 0;
  var MAX_PARTICLES = 80;

  function createContainer() {
    container = document.createElement("div");
    container.className = "particle-stage";
    container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:200;";
    document.body.appendChild(container);
  }

  function spawn(x, y) {
    if (aliveCount >= MAX_PARTICLES) return;
    var dot = document.createElement("div");
    dot.className = "mouse-particle";
    var size = 3 + Math.random() * 5;
    var hue = 260 + Math.random() * 100;
    dot.style.cssText =
      "position:absolute;width:" + size + "px;height:" + size + "px;" +
      "left:" + x + "px;top:" + y + "px;" +
      "background:hsl(" + hue + ",80%,65%);" +
      "border-radius:50%;" +
      "transform:translate(-50%,-50%);" +
      "pointer-events:none;";
    container.appendChild(dot);
    aliveCount++;

    var dx = (Math.random() - 0.5) * 60;
    var dy = (Math.random() - 0.5) * 60 - 15;
    var opacity = 1;
    var life = 0;
    var maxLife = 30 + Math.random() * 20;

    function animate() {
      life++;
      if (life >= maxLife) {
        aliveCount--;
        if (dot.parentNode) dot.parentNode.removeChild(dot);
        return;
      }
      opacity = 1 - life / maxLife;
      dot.style.opacity = opacity;
      dot.style.transform = "translate(-50%,-50%) translate(" + (dx * life / maxLife) + "px," + (dy * life / maxLife) + "px)";
      dot.style.width = (size * (1 - life / maxLife * 0.5)) + "px";
      dot.style.height = (size * (1 - life / maxLife * 0.5)) + "px";
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  function onMouseMove(e) {
    mx = e.clientX;
    my = e.clientY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        spawn(mx, my);
        ticking = false;
      });
    }
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mx = e.touches[0].clientX;
      my = e.touches[0].clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          spawn(mx, my);
          ticking = false;
        });
      }
    }
  }

  createContainer();
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
})();
