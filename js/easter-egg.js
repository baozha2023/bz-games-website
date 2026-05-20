var EasterEgg = (function () {
  var overlay = null;
  var triggered = false;

  function create() {
    overlay = document.createElement("div");
    overlay.className = "easter-egg-overlay";
    overlay.innerHTML =
      '<div class="easter-egg-box">' +
    '<pre class="easter-egg-art">' +
'  ______     ______                                               \n' +
'  | ___ \\   |___  /      ___     __ _  __ _ _ __ ___   ___  ___ \n' +
'  | |_/ /      / /      |___|   / _` |/ _` | \'_ ` _ \\ / _ \\/ __|\n' +
'  | ___ \\     / /              | (_| | (_| | | | | | |  __/\\__ \\\n' +
'  | |_/ /   ./ /___             \\__, |\\__,_|_| |_| |_|\\___||___/\n' +
'  |____/    \\_____/              __/ |                          \n' +
'                                |___/                           \n' +
'                                                      \n' +
'       \\/     \\/\n' +
'      (o)    (o)\n' +
'       \\______/\n' +
'  +---------------------------+\n' +
'  |                           |\n' +
'  |      CONGRATULATIONS!     |\n' +
'  |                           |\n' +
'  +---------------------------+\n' +
'                                                      \n' +
'        ' + I18n.t("easter.line1") + '\n' +
'   ' + I18n.t("easter.line2") + '</pre>' +
'</div>';
    document.body.appendChild(overlay);
  }

  function show(data) {
    if (!overlay) create();
    triggered = true;
    if (data && data.clearText) {
      hideAllText();
    }
    overlay.classList.add("easter-egg-visible");
    window.setTimeout(respawn, 5000);
  }

  function hideAllText() {
    var containers = document.querySelectorAll(".feature-card, .type-card, .stat-item, .btn, .arch-module, .arch-block, .arch-game-box, .arch-conn-box, .feature-icon");
    for (var c = 0; c < containers.length; c++) {
      containers[c].classList.add("snake-eaten");
    }
    var spans = document.querySelectorAll(".snake-word");
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.visibility = "hidden";
    }
    var svgs = document.querySelectorAll(".hero-buttons .btn svg");
    for (var s = 0; s < svgs.length; s++) {
      svgs[s].style.visibility = "hidden";
    }
    FoodManager.reset();
  }

  function respawn() {
    if (overlay) overlay.classList.remove("easter-egg-visible");
    EventBus.emit("reset-snake", {});
    FoodManager.rebuild();
    triggered = false;
  }

  EventBus.on("all-eaten", function () {
    if (!triggered) show({});
  });

  EventBus.on("trigger-easter-egg", function (data) {
    if (!triggered) show(data || {});
  });
})();
