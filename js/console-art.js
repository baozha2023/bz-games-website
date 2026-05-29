(function () {
  var lang = (function () {
    try { return localStorage.getItem("bz-lang") || "zh"; } catch (e) { return "zh"; }
  })();

  var c = "color:#a78bfa;font-size:14px;";
  var c2 = "color:#c4b5fd;font-size:12px;";
  var c3 = "color:#fbbf24;font-size:13px;font-weight:bold;";
  var c4 = "color:#f472b6;font-size:13px;";

  var art =
    "  ██████╗ ███████╗       ██████╗  █████╗ ███╗   ███╗███████╗███████╗\n" +
    "  ██╔══██╗╚══███╔╝      ██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝\n" +
    "  ██████╔╝  ███╔╝ █████╗██║  ███╗███████║██╔████╔██║█████╗  ███████╗\n" +
    "  ██╔══██╗ ███╔╝  ╚════╝██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║\n" +
    "  ██████╔╝███████╗      ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║\n" +
    "  ╚═════╝ ╚══════╝       ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝";

  var msgs = {
    zh: [
      "\uD83D\uDD27 你也喜欢造轮子？我们在找有趣的人！",
      "\uD83D\uDCD6 开源游戏平台 | Electron + Vue 3 + TypeScript",
      "\uD83C\uDFAE 内置贪吃蛇 · 俄罗斯方块 · 成就系统 · 联机大厅",
      "\uD83D\uDD17 https://github.com/baozha2023/bz-games",
      "\uD83D\uDCAC 来提 Issue / PR，或者纯聊天也欢迎！"
    ],
    en: [
      "\uD83D\uDD27 Love building cool stuff? We're looking for fun people!",
      "\uD83D\uDCD6 Open-source game platform | Electron + Vue 3 + TypeScript",
      "\uD83C\uDFAE Built-in Snake · Tetris · Achievements · Multiplayer Lobby",
      "\uD83D\uDD17 https://github.com/baozha2023/bz-games",
      "\uD83D\uDCAC Submit an Issue / PR, or just drop by to say hi!"
    ]
  };

  var m = msgs[lang] || msgs["zh"];

  console.log(
    "%c\n" + art + "%c\n" +
    "  %c" + m[0] + "%c\n" +
    "  %c" + m[1] + "%c\n" +
    "  %c" + m[2] + "%c\n" +
    "  %c" + m[3] + "%c\n" +
    "  %c" + m[4] + "%c\n\n",
    c, "", c3, "", c2, "", c2, "", c4, "", c2, ""
  );
})();
