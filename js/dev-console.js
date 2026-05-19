var DevConsole = (function () {
  var visible = false;
  var consoleOpened = false;
  var usedCmds = {};
  var ALL_CMDS = ["help", "clear", "konami", "food.count", "snake.speed", "snake.color", "snake.size"];
  var overlay = null;
  var output = null;
  var input = null;
  var history = [];
  var historyIdx = -1;

  var COLOR_MAP = {
    red: "#ef4444", orange: "#f97316", yellow: "#eab308",
    green: "#22c55e", lime: "#84cc16", teal: "#14b8a6",
    cyan: "#06b6d4", blue: "#3b82f6", indigo: "#6366f1",
    purple: "#a855f7", violet: "#8b5cf6", pink: "#ec4899",
    rose: "#f43f5e", white: "#f0f0f0", black: "#111111",
    gray: "#6b7280", silver: "#9ca3af", gold: "#f59e0b",
    navy: "#1e3a5f", brown: "#92400e", coral: "#ff6b6b",
    salmon: "#fa8072", tomato: "#ff6347", chocolate: "#d2691e",
    aqua: "#00ffff", magenta: "#ff00ff", fuchsia: "#ff00ff",
    maroon: "#800000", olive: "#808000", mint: "#98ff98"
  };

  function resolveColor(arg) {
    if (!arg) return null;
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(arg)) return arg;
    var low = arg.toLowerCase();
    if (COLOR_MAP[low]) return COLOR_MAP[low];
    if (COLOR_MAP[low.replace(/[^a-z]/g, "")]) return COLOR_MAP[low.replace(/[^a-z]/g, "")];
    return null;
  }

  function create() {
    overlay = document.createElement("div");
    overlay.className = "dev-console-overlay";
    overlay.innerHTML =
      '<div class="dev-console">' +
      '<div class="dev-console-header">' +
      '<span>BZ-Games Dev Console</span>' +
      '<button class="dev-console-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="dev-console-output"></div>' +
      '<div class="dev-console-input-row">' +
      '<span class="dev-console-prompt">&gt;</span>' +
      '<input class="dev-console-input" autofocus spellcheck="false" autocorrect="off" autocapitalize="off">' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    output = overlay.querySelector(".dev-console-output");
    input = overlay.querySelector(".dev-console-input");

    overlay.querySelector(".dev-console-close").addEventListener("click", hide);
    overlay.querySelector(".dev-console").addEventListener("click", function (e) { e.stopPropagation(); });
    overlay.addEventListener("click", hide);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var cmd = input.value.trim();
        if (cmd) execute(cmd);
        input.value = "";
        historyIdx = -1;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0) {
          historyIdx = Math.min(historyIdx + 1, history.length - 1);
          input.value = history[historyIdx];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx > 0) {
          historyIdx--;
          input.value = history[historyIdx];
        } else {
          historyIdx = -1;
          input.value = "";
        }
      } else if (e.key === "Escape") {
        hide();
      }
    });
  }

  function show() {
    if (!overlay) create();
    overlay.classList.add("dev-console-visible");
    visible = true;
    window.setTimeout(function () {
      if (input) input.focus();
    }, 100);
  }

  function hide() {
    if (overlay) overlay.classList.remove("dev-console-visible");
    visible = false;
  }

  function toggle() {
    if (visible) hide();
    else show();
  }

  function print(text, cls) {
    if (!output) return;
    var line = document.createElement("div");
    line.className = cls || "";
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function markCmd(id) {
    if (usedCmds[id]) return;
    usedCmds[id] = true;
    for (var i = 0; i < ALL_CMDS.length; i++) {
      if (!usedCmds[ALL_CMDS[i]]) return;
    }
    try { EventBus.emit("console-all-cmds", {}); } catch (ex) {}
  }

  function execute(cmd) {
    history.unshift(cmd);
    if (history.length > 50) history.pop();
    print("> " + cmd, "dev-console-input-line");

    var parts = cmd.match(/^(\w+)(?:\.(\w+))?(?:\(([^)]*)\))?$/);
    if (!parts) {
      print("Invalid command. Type help for available commands.", "dev-console-error");
      return;
    }

    var ns = parts[1];
    var fn = parts[2];
    var arg = (parts[3] || "").trim().replace(/^["']|["']$/g, "");

    if (ns === "help" || (ns === "h" && !fn)) {
      markCmd("help");
      print("Available commands:", "dev-console-info");
      print("  help                   - Show this help", "dev-console-info");
      print("  clear                  - Clear console output", "dev-console-info");
      print("  konami                 - Trigger easter egg", "dev-console-info");
      print("  snake.speed(ms)        - Set snake speed (default=110, min=20)", "dev-console-info");
      print("  snake.color(#hex|name) - Set snake body color (e.g. #ff0000, red)", "dev-console-info");
      print("  snake.size(px)         - Set snake segment size (e.g. 30)", "dev-console-info");
      print("  food.count             - Show remaining food count", "dev-console-info");
      return;
    }

    if (ns === "clear") {
      markCmd("clear");
      output.innerHTML = "";
      return;
    }

    if (ns === "konami") {
      markCmd("konami");
      print("🎮 Triggering easter egg...", "dev-console-success");
      EventBus.emit("trigger-easter-egg", { clearText: true });
      return;
    }

    if (ns === "food" && fn === "count") {
      markCmd("food.count");
      print("Remaining food: " + FoodManager.count(), "dev-console-info");
      return;
    }

    if (ns === "snake") {
      if (fn === "speed") {
        var ms = parseInt(arg, 10);
        if (isNaN(ms) || ms < 10) { print("Invalid speed. Use a number >= 10 (ms).", "dev-console-error"); return; }
        markCmd("snake.speed");
        EventBus.emit("snake-speed", { ms: ms });
        print("Snake speed set to " + ms + "ms.", "dev-console-success");
        return;
      }
      if (fn === "color") {
        var colorArg = resolveColor(arg);
        if (!colorArg) { print("Invalid color. Use hex (#ff0000) or color name (red, blue...).", "dev-console-error"); return; }
        markCmd("snake.color");
        EventBus.emit("snake-color", { color: colorArg });
        print("Snake color set to " + colorArg + ".", "dev-console-success");
        return;
      }
      if (fn === "size") {
        var sz = parseInt(arg, 10);
        if (isNaN(sz) || sz < 6 || sz > 80) { print("Invalid size. Use a number between 6 and 80.", "dev-console-error"); return; }
        markCmd("snake.size");
        EventBus.emit("snake-size", { size: sz });
        print("Snake size set to " + sz + "px.", "dev-console-success");
        return;
      }
      print("Unknown snake command. Try: speed, color, size", "dev-console-error");
      return;
    }

    print("Unknown command: " + cmd + ". Type help for available commands.", "dev-console-error");
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "`" && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      if (!consoleOpened) {
        consoleOpened = true;
        try { EventBus.emit("console-open", {}); } catch (ex) {}
      }
      toggle();
      return;
    }
    if (e.key === "Escape" && visible) {
      hide();
    }
  });
})();
