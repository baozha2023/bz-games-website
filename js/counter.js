var EatCounter = (function () {
  var total = 0;
  var el = null;

  function create() {
    el = document.createElement("span");
    el.className = "eat-counter";
    el.textContent = "\uD83D\uDC0D \u00D7 0";
    el.title = "已吃掉字符数";
    var navRight = document.querySelector(".nav-right");
    if (navRight) {
      navRight.insertBefore(el, navRight.firstChild);
    }
  }

  function update() {
    if (!el) return;
    el.textContent = "\uD83D\uDC0D \u00D7 " + total;
    if (total > 0) {
      el.classList.add("eat-counter-show");
    } else {
      el.classList.remove("eat-counter-show");
    }
  }

  EventBus.on("food-eaten", function (data) {
    total += data.count || 0;
    update();
  });

  create();
  update();
  return { total: function () { return total; } };
})();
