(function () {
  var btn = document.getElementById("themeToggle");
  var html = document.documentElement;
  var saved = localStorage.getItem("bz-theme");

  if (saved === "light") {
    html.classList.add("light");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", function () {
    var isLight = html.classList.toggle("light");
    btn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("bz-theme", isLight ? "light" : "dark");
  });
})();
