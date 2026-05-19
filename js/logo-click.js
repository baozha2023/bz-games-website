var LogoClick = (function () {
  var clickCount = 0;
  var clickTimer = 0;
  var logo = null;
  var CLICK_WINDOW = 1500;
  var CLICK_NEEDED = 3;
  var exploding = false;

  function resetClicks() {
    clickCount = 0;
    if (clickTimer) {
      window.clearTimeout(clickTimer);
      clickTimer = 0;
    }
  }

  function onClick() {
    if (exploding) return;
    clickCount++;
    if (clickTimer) window.clearTimeout(clickTimer);
    clickTimer = window.setTimeout(resetClicks, CLICK_WINDOW);

    if (clickCount >= CLICK_NEEDED) {
      resetClicks();
      explode();
    }
  }

  function getStyle(el, prop) {
    return window.getComputedStyle(el).getPropertyValue(prop);
  }

  function explode() {
    if (!logo || exploding) return;
    exploding = true;
    try { EventBus.emit("logo-explode", {}); } catch (e) {}

    var sx = window.pageXOffset || 0;
    var sy = window.pageYOffset || 0;

    var charData = [];
    var textNodes = [];
    var walker = document.createTreeWalker(logo, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (var tn = 0; tn < textNodes.length; tn++) {
      var node = textNodes[tn];
      var text = node.textContent;
      for (var ci = 0; ci < text.length; ci++) {
        var ch = text[ci];
        if (ch >= "\uD800" && ch <= "\uDBFF" && ci + 1 < text.length) {
          ch += text[ci + 1];
          ci++;
        }
        var range = document.createRange();
        try {
          var start = ci - (ch.length > 1 ? 1 : 0);
          range.setStart(node, start);
          range.setEnd(node, ch.length > 1 ? ci + 1 : ci + 1);
        } catch (e) { continue; }
        var rect = range.getBoundingClientRect();
        var parentSpan = node.parentNode;
        var color = getStyle(logo, "color");
        if (parentSpan && parentSpan.tagName && parentSpan.tagName.toLowerCase() === "span") {
          color = getStyle(parentSpan, "color");
        }
        charData.push({
          ch: ch,
          x: rect.left + sx,
          y: rect.top + sy,
          w: rect.width,
          h: rect.height,
          color: color,
          fontSize: getStyle(logo, "font-size"),
          fontWeight: getStyle(logo, "font-weight"),
          fontFamily: getStyle(logo, "font-family")
        });
      }
    }

    if (charData.length === 0) { exploding = false; return; }

    var container = document.createElement("div");
    container.className = "logo-explosion-stage";
    document.body.appendChild(container);

    var spans = [];
    for (var i = 0; i < charData.length; i++) {
      var d = charData[i];
      var span = document.createElement("span");
      span.className = "logo-char";
      span.textContent = d.ch;
      span.style.cssText =
        "position:absolute;" +
        "left:" + d.x + "px;top:" + d.y + "px;" +
        "font-size:" + d.fontSize + ";" +
        "font-weight:" + d.fontWeight + ";" +
        "font-family:" + d.fontFamily + ";" +
        "color:" + d.color + ";" +
        "transition:left 10s cubic-bezier(0.25,0.1,0.1,1),top 10s cubic-bezier(0.25,0.1,0.1,1);";
      container.appendChild(span);
      spans.push({ el: span, ox: d.x, oy: d.y });
    }

    logo.style.opacity = "0";
    logo.style.transition = "opacity 0.15s ease";

    requestAnimationFrame(function () {
      var pw = document.documentElement.scrollWidth || document.body.scrollWidth || 2000;
      var ph = document.documentElement.scrollHeight || document.body.scrollHeight || 4000;
      for (var i = 0; i < spans.length; i++) {
        var s = spans[i];
        var tx = Math.random() * pw;
        var ty = Math.random() * ph;
        s.el.style.left = tx + "px";
        s.el.style.top = ty + "px";
        s.el.style.transform = "rotate(" + ((Math.random() - 0.5) * 720) + "deg)";
        s.el.style.transition += ",transform 10s cubic-bezier(0.25,0.1,0.1,1)";
      }

      window.setTimeout(function () {
        for (var j = 0; j < spans.length; j++) {
          var s = spans[j];
          s.el.style.transition = "left 30s cubic-bezier(0.25,0.1,0.1,1),top 30s cubic-bezier(0.25,0.1,0.1,1),transform 30s cubic-bezier(0.25,0.1,0.1,1)";
          s.el.style.left = s.ox + "px";
          s.el.style.top = s.oy + "px";
          s.el.style.transform = "rotate(0deg)";
        }

        window.setTimeout(function () {
          container.remove();
          logo.style.opacity = "1";
          logo.style.transition = "opacity 0.3s ease";
          exploding = false;
        }, 30000);
      }, 10000);
    });
  }

  function init() {
    logo = document.querySelector(".nav-logo");
    if (logo) {
      logo.addEventListener("click", onClick);
    }
  }

  init();
})();
