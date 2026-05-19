var Achievements = (function () {
  var total = 0;
  var unlocked = {};
  var toastContainer = null;
  var counterEl = null;

  var MILESTONES = [
    { count: 1, id: "first-bite", title: "初次捕食", icon: "\uD83C\uDF1F" },
    { count: 100, id: "cleaner", title: "清盘大师", icon: "\uD83E\uDDE4" },
    { count: 500, id: "big-eater", title: "大胃王", icon: "\uD83C\uDFC6" }
  ];

  var SPECIALS = {
    "logo-explode": { id: "logo-boom", title: "大爆炸", icon: "\uD83D\uDCA5" },
    "console-open": { id: "hacker", title: "黑客入门", icon: "\u2328\uFE0F" },
    "console-all-cmds": { id: "terminal-master", title: "终端大师", icon: "\uD83C\uDF9B\uFE0F" }
  };

  var TETRIS_MILESTONES = [
    { score: 100, id: "tetris-first", title: "初次消行", icon: "\uD83E\uDDF1" },
    { score: 500, id: "tetris-builder", title: "建筑工人", icon: "\uD83C\uDFD7\uFE0F" },
    { score: 1000, id: "tetris-castle", title: "方块城堡", icon: "\uD83C\uDFF0" }
  ];

  var ALL_IDS = [];
  for (var ai = 0; ai < MILESTONES.length; ai++) ALL_IDS.push(MILESTONES[ai].id);
  for (var sk in SPECIALS) { if (SPECIALS.hasOwnProperty(sk)) ALL_IDS.push(SPECIALS[sk].id); }
  for (var ti = 0; ti < TETRIS_MILESTONES.length; ti++) ALL_IDS.push(TETRIS_MILESTONES[ti].id);
  var TOTAL_COUNT = ALL_IDS.length;

  function countUnlocked() {
    var c = 0;
    for (var i = 0; i < ALL_IDS.length; i++) {
      if (unlocked[ALL_IDS[i]]) c++;
    }
    return c;
  }

  function updateCounter() {
    if (!counterEl) return;
    var n = countUnlocked();
    counterEl.textContent = "\uD83C\uDFC6 " + n + "/" + TOTAL_COUNT;
    if (n > 0) {
      counterEl.classList.add("eat-counter-show");
    }
  }

  function createCounter() {
    counterEl = document.createElement("span");
    counterEl.className = "eat-counter nav-ach-count";
    counterEl.textContent = "\uD83C\uDFC6 0/" + TOTAL_COUNT;
    counterEl.title = "已解锁成就";
    var navRight = document.querySelector(".nav-right");
    if (navRight) {
      var navLinks = navRight.querySelector(".nav-links");
      if (navLinks) {
        navRight.insertBefore(counterEl, navLinks);
      } else {
        navRight.insertBefore(counterEl, navRight.firstChild);
      }
    }
  }

  function createContainer() {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  function show(id, title, icon) {
    if (unlocked[id]) return;
    unlocked[id] = true;
    updateCounter();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<span class="toast-icon">' + icon + '</span><div class="toast-body"><div class="toast-title">' + title + '</div><div class="toast-sub">成就解锁！</div></div>';
    toastContainer.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("toast-show");
    });

    window.setTimeout(function () {
      toast.classList.remove("toast-show");
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3500);
  }

  EventBus.on("food-eaten", function (data) {
    total += data.count || 0;
    for (var i = 0; i < MILESTONES.length; i++) {
      var m = MILESTONES[i];
      if (total >= m.count && !unlocked[m.id]) {
        show(m.id, m.title, m.icon);
      }
    }
  });

  function onSpecial(event) {
    var s = SPECIALS[event];
    if (s && !unlocked[s.id]) {
      show(s.id, s.title, s.icon);
    }
  }

  EventBus.on("logo-explode", function () { onSpecial("logo-explode"); });
  EventBus.on("console-open", function () { onSpecial("console-open"); });
  EventBus.on("console-all-cmds", function () { onSpecial("console-all-cmds"); });

  EventBus.on("tetris-score", function (data) {
    var s = data.score || 0;
    for (var i = 0; i < TETRIS_MILESTONES.length; i++) {
      var m = TETRIS_MILESTONES[i];
      if (s >= m.score && !unlocked[m.id]) {
        show(m.id, m.title, m.icon);
      }
    }
  });

  createContainer();
  createCounter();
})();
