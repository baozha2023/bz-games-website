(function () {
  var themeBtn = document.getElementById("themeToggle");
  var langBtn = document.getElementById("langToggle");
  var html = document.documentElement;
  var saved = localStorage.getItem("bz-theme");

  if (saved === "light") {
    html.classList.add("light");
    themeBtn.textContent = "☀️";
  }

  themeBtn.addEventListener("click", function () {
    var isLight = html.classList.toggle("light");
    themeBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("bz-theme", isLight ? "light" : "dark");
  });

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = I18n.current === "zh" ? "en" : "zh";
      I18n.setLang(next);
    });
  }
})();
