var FoodManager = (function () {
  var foods = [];

  function isSkipped(el) {
    if (!el) return true;
    if (!el.tagName) return false;
    var tag = el.tagName.toLowerCase();
    if (tag === "nav" || tag === "footer" || tag === "script" || tag === "style" || tag === "noscript" || tag === "canvas") return true;
    if (el.closest("nav") || el.closest("footer") || el.closest(".theme-btn") || el.closest("#snake-stage") || el.closest(".snake-word") || el.closest(".snake-word-group")) return true;
    if (el.closest(".toast-container") || el.closest(".easter-egg-overlay") || el.closest(".dev-console-overlay") || el.closest(".tetris-panel") || el.closest(".particle-stage") || el.closest(".eat-counter")) return true;
    return false;
  }

  function collectTextNodes(root, list) {
    if (!root) return;
    if (isSkipped(root)) return;
    if (root.nodeType === 3) {
      if (root.textContent.trim() && !isSkipped(root.parentNode)) {
        list.push(root);
      }
      return;
    }
    if (root.nodeType === 1) {
      var tag = root.tagName.toLowerCase();
      if (tag === "br" || tag === "hr" || tag === "input" || tag === "textarea" || tag === "select") return;
      for (var i = 0; i < root.childNodes.length; i++) {
        collectTextNodes(root.childNodes[i], list);
      }
    }
  }

  function wrapTextNode(textNode) {
    var text = textNode.textContent;
    if (!text.trim()) return;
    var parent = textNode.parentNode;
    var frag = document.createDocumentFragment();
    var i = 0;
    while (i < text.length) {
      var ch = text[i];
      if (ch >= "\uD800" && ch <= "\uDBFF" && i + 1 < text.length) {
        ch += text[i + 1];
        i += 2;
      } else {
        i++;
      }
      if (ch === " " || ch === "\n" || ch === "\t" || ch === "\r") {
        frag.appendChild(document.createTextNode(ch));
      } else {
        var span = document.createElement("span");
        span.className = "snake-word";
        span.textContent = ch;
        frag.appendChild(span);
      }
    }

    var isInFlex = parent.closest(".btn");
    if (isInFlex) {
      var group = document.createElement("span");
      group.className = "snake-word-group";
      group.appendChild(frag);
      parent.replaceChild(group, textNode);
    } else {
      parent.replaceChild(frag, textNode);
    }
  }

  function scan() {
    foods = [];
    var textNodes = [];
    collectTextNodes(document.body, textNodes);
    for (var t = 0; t < textNodes.length; t++) {
      try { wrapTextNode(textNodes[t]); } catch (e) {}
    }
    var spans = document.querySelectorAll(".snake-word");
    for (var s = 0; s < spans.length; s++) {
      var span = spans[s];
      var rect = span.getBoundingClientRect();
      var cx = rect.left + rect.width / 2 + window.pageXOffset;
      var cy = rect.top + rect.height / 2 + window.pageYOffset;
      if (cx > 0 && cy > 0) {
        foods.push({ x: cx, y: cy, el: span, alive: true });
      }
    }

    var btns = document.querySelectorAll(".hero-buttons .btn");
    for (var b = 0; b < btns.length; b++) {
      var svgs = btns[b].querySelectorAll("svg");
      for (var sv = 0; sv < svgs.length; sv++) {
        var svg = svgs[sv];
        var srect = svg.getBoundingClientRect();
        var scx = srect.left + srect.width / 2 + window.pageXOffset;
        var scy = srect.top + srect.height / 2 + window.pageYOffset;
        if (scx > 0 && scy > 0) {
          foods.push({ x: scx, y: scy, el: svg, alive: true });
        }
      }
    }
  }

  var CONTAINER_SEL = ".feature-card, .type-card, .stat-item, .btn, .arch-module, .arch-block, .arch-game-box, .arch-conn-box, .feature-icon";

  function containerMatches(el) {
    return el.nodeType === 1 && el.matches && el.matches(CONTAINER_SEL);
  }

  function isContainerEmpty(container) {
    var words = container.querySelectorAll(".snake-word");
    if (words.length === 0) return false;
    for (var w = 0; w < words.length; w++) {
      if (words[w].style.visibility !== "hidden") return false;
    }
    return true;
  }

  function hideAndCascade(container) {
    if (!container || !isContainerEmpty(container)) return;
    container.classList.add("snake-eaten");
    var parent = container.parentNode;
    while (parent && parent.nodeType === 1) {
      if (containerMatches(parent) && isContainerEmpty(parent)) {
        parent.classList.add("snake-eaten");
      }
      parent = parent.parentNode;
    }
  }

  function showAndCascade(container) {
    if (!container) return;
    container.classList.remove("snake-eaten");
    var parent = container.parentNode;
    while (parent && parent.nodeType === 1) {
      if (containerMatches(parent)) {
        parent.classList.remove("snake-eaten");
      }
      parent = parent.parentNode;
    }
  }

  function hideEmptyContainers(containers) {
    for (var ci = 0; ci < containers.length; ci++) {
      hideAndCascade(containers[ci]);
    }
  }

  function eatInRects(rects) {
    var eaten = {};
    var affected = [];
    var eatenItems = [];
    for (var r = 0; r < rects.length; r++) {
      var rect = rects[r];
      for (var i = foods.length - 1; i >= 0; i--) {
        var f = foods[i];
        if (!f.alive) continue;
        if (eaten[i]) continue;
        if (f.x > rect.minX && f.x < rect.maxX && f.y > rect.minY && f.y < rect.maxY) {
          f.alive = false;
          f.el.style.visibility = "hidden";
          eaten[i] = true;
          eatenItems.push({ char: f.el.textContent, el: f.el });
          var container = f.el.closest(CONTAINER_SEL);
          if (container && affected.indexOf(container) === -1) {
            affected.push(container);
          }
        }
      }
    }

    hideEmptyContainers(affected);

    var count = 0;
    var indices = Object.keys(eaten).map(Number).sort(function(a, b) { return b - a; });
    for (var j = 0; j < indices.length; j++) {
      foods.splice(indices[j], 1);
      count++;
    }

    if (count > 0) {
      var lang = (function () {
        try { return localStorage.getItem("bz-lang") || "zh"; } catch (e) { return "zh"; }
      })();
      var emitCount = lang === "en" ? Math.floor(count / 2) : count;
      if (emitCount > 0) {
        try { EventBus.emit("food-eaten", { count: emitCount, chars: eatenItems }); } catch (e) {}
      }
    }
    if (foods.length === 0) {
      try { EventBus.emit("all-eaten", {}); } catch (e) {}
    }

    return count;
  }

  function rebuild() {
    var WAVES = 5;
    var WAVE_SEC = 3;
    var WAVE_OFFSET = 3;
    EventBus.emit("fly-in-start", {});

    var spans = document.querySelectorAll(".snake-word");
    for (var s = 0; s < spans.length; s++) {
      spans[s].style.visibility = "";
    }

    var svgs = document.querySelectorAll(".hero-buttons .btn svg");
    for (var sv = 0; sv < svgs.length; sv++) {
      svgs[sv].style.visibility = "";
    }

    var indices = [];
    for (var i = 0; i < spans.length; i++) {
      indices.push(i);
    }
    for (var i = indices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
    }

    function revealChar(span) {
      span.style.opacity = "";
      var container = span.closest(CONTAINER_SEL);
      showAndCascade(container);
    }

    for (var i = 0; i < indices.length; i++) {
      var idx = indices[i];
      var span = spans[idx];
      var wave = Math.floor(i / Math.ceil(indices.length / WAVES));
      if (wave >= WAVES) wave = WAVES - 1;
      span.style.opacity = "0";
      window.setTimeout((function (el) {
        return function () { revealChar(el); };
      })(span), (WAVE_OFFSET + wave * WAVE_SEC) * 1000);
    }

    for (var svi = 0; svi < svgs.length; svi++) {
      svgs[svi].style.opacity = "0";
      window.setTimeout((function (el) {
        return function () { el.style.opacity = ""; };
      })(svgs[svi]), WAVE_OFFSET * 1000);
    }

    window.setTimeout(function () {
      foods = [];
      var rebuildSpans = document.querySelectorAll(".snake-word");
      for (var rs = 0; rs < rebuildSpans.length; rs++) {
        var rspan = rebuildSpans[rs];
        var rect = rspan.getBoundingClientRect();
        var cx = rect.left + rect.width / 2 + window.pageXOffset;
        var cy = rect.top + rect.height / 2 + window.pageYOffset;
        if (cx > 0 && cy > 0) {
          foods.push({ x: cx, y: cy, el: rspan, alive: true });
        }
      }
      var btns2 = document.querySelectorAll(".hero-buttons .btn");
      for (var b2 = 0; b2 < btns2.length; b2++) {
        var svgs2 = btns2[b2].querySelectorAll("svg");
        for (var sv2 = 0; sv2 < svgs2.length; sv2++) {
          var svg2 = svgs2[sv2];
          var sr2 = svg2.getBoundingClientRect();
          var scx2 = sr2.left + sr2.width / 2 + window.pageXOffset;
          var scy2 = sr2.top + sr2.height / 2 + window.pageYOffset;
          if (scx2 > 0 && scy2 > 0) {
            foods.push({ x: scx2, y: scy2, el: svg2, alive: true });
          }
        }
      }
      EventBus.emit("fly-in-end", {});
    }, (WAVE_OFFSET + WAVES * WAVE_SEC) * 1000 + 200);
  }

  function getFoodPositions() {
    var positions = [];
    for (var i = 0; i < foods.length; i++) {
      positions.push({ x: foods[i].x, y: foods[i].y });
    }
    return positions;
  }

  function count() {
    var lang = (function () {
      try { return localStorage.getItem("bz-lang") || "zh"; } catch (e) { return "zh"; }
    })();
    var raw = foods.length;
    return lang === "en" ? Math.floor(raw / 2) : raw;
  }

  function reset() {
    foods = [];
  }

  return {
    scan: scan,
    eatInRects: eatInRects,
    rebuild: rebuild,
    getFoodPositions: getFoodPositions,
    count: count,
    reset: reset
  };
})();
