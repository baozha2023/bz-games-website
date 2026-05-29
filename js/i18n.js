var I18n = (function () {
  var translations = {
    zh: {
      "nav.features": "功能",
      "nav.games": "游戏类型",
      "nav.arch": "架构",
      "nav.theme_toggle": "切换主题",
      "nav.lang_toggle": "Switch to English",
      "nav.lang_btn": "EN",

      "hero.title1": "你的游戏，",
      "hero.title2": "你的规则",
      "hero.desc": "BZ-Games 是一个无服务器的本地游戏平台。导入、管理、联机 — 一切都存储在你自己的电脑上，无需云端账号。",
      "hero.download": "下载 Windows 版",

      "features.title": "为什么选择 BZ-Games",
      "features.subtitle": "专为 Windows 打造的本地游戏管理体验",
      "features.card1.title": "开放式游戏库",
      "features.card1.desc": "支持导入任意符合规范的本地游戏，自动识别版本、封面与元数据，拖拽即玩。",
      "features.card2.title": "无服务器架构",
      "features.card2.desc": "所有数据存储在你的电脑上。游戏记录、成就、BZ 币 — 完全私有，无需注册云端账户。",
      "features.card3.title": "统一联机大厅",
      "features.card3.desc": "内置房间系统：创建 / 加入 / 准备 / 开始。游戏开发者无需编写网络代码。",
      "features.card4.title": "灵活内网穿透",
      "features.card4.desc": "通过标准 TCP 端口暴露房间，支持 SakuraFrp 等任意内网穿透工具，不锁定特定服务。",
      "features.card5.title": "游戏市场",
      "features.card5.desc": "浏览并一键下载社区游戏。自动校验 SHA-256、解压、导入 — 全程无需手动操作。",
      "features.card6.title": "成就与经济",
      "features.card6.desc": "游戏内解锁成就、累计 BZ 币、每日签到。平台统一追踪你的游戏成就与统计。",

      "games.title": "支持四种游戏类型",
      "games.subtitle": "从单人休闲到多人在线 — 一个平台全搞定",
      "games.solo.title": "单人游戏",
      "games.solo.desc": "经典单机体验<br>无需联网",
      "games.multi.title": "多人游戏",
      "games.multi.desc": "本地 / 联机多人<br>P2P 房间对战",
      "games.duo.title": "单人多模式",
      "games.duo.desc": "单人 + 联机双模式<br>灵活切换玩法",
      "games.web.title": "网络游戏",
      "games.web.desc": "远程网页游戏<br>Web URL 直接启动",

      "arch.title": "房主即主机",
      "arch.subtitle": "无需中心服务器，房主的电脑就是服务端。仅需一个内网穿透工具将端口暴露到公网",
      "arch.host_title": "\uD83D\uDDA5\uFE0F HOST 主机",
      "arch.client_title": "\uD83D\uDCBB CLIENT 客机（可多个）",
      "arch.electron_platform": "Electron 平台进程",
      "arch.renderer": "渲染进程",
      "arch.main_process": "主进程",
      "arch.game_process": "游戏进程 (game.exe)",
      "arch.api_comm": "通过 GameApiServer 进行所有联机通信",
      "arch.connect_to_host": "连接至房主公网地址",
      "arch.public_addr": "公网地址",
      "arch.frp_desc": "内网穿透",

      "stats.os": "支持系统",
      "stats.oss_val": "开源",
      "stats.license": "MIT 协议",
      "stats.local_val": "本地",
      "stats.storage": "数据存储",
      "stats.multi_val": "多语言",
      "stats.multilang": "多语言",

      "footer.market": "游戏市场",

      "counter.tooltip": "已吃掉字符数",

      "ach.unlocked": "已解锁成就",
      "ach.toast_sub": "成就解锁！",
      "ach.first_bite": "初次捕食",
      "ach.cleaner": "清盘大师",
      "ach.big_eater": "大胃王",
      "ach.logo_boom": "大爆炸",
      "ach.hacker": "黑客入门",
      "ach.terminal_master": "终端大师",
      "ach.tetris_first": "初次消行",
      "ach.tetris_builder": "建筑工人",
      "ach.tetris_castle": "方块城堡",

      "easter.line1": "你啃完了整个网站！",
      "easter.line2": "文字即将重新生成...",

      "tetris.title": "俄罗斯方块",
      "tetris.aria_left": "左",
      "tetris.aria_down": "下",
      "tetris.aria_rotate": "旋转",
      "tetris.aria_right": "右"
    },
    en: {
      "nav.features": "Features",
      "nav.games": "Game Types",
      "nav.arch": "Architecture",
      "nav.theme_toggle": "Toggle Theme",
      "nav.lang_toggle": "切换到中文",
      "nav.lang_btn": "中",

      "hero.title1": "Your Games, ",
      "hero.title2": "Your Rules",
      "hero.desc": "BZ-Games is a serverless local game platform. Import, manage, and play multiplayer \u2014 everything lives on your computer, no cloud account needed.",
      "hero.download": "Download for Windows",

      "features.title": "Why BZ-Games",
      "features.subtitle": "Local game management designed for Windows",
      "features.card1.title": "Open Game Library",
      "features.card1.desc": "Import any compliant local game with automatic version, cover art and metadata detection. Drag and drop to play.",
      "features.card2.title": "Serverless Architecture",
      "features.card2.desc": "All data stored on your PC. Game records, achievements, BZ Coins \u2014 completely private, no cloud accounts required.",
      "features.card3.title": "Unified Multiplayer Lobby",
      "features.card3.desc": "Built-in room system: create / join / ready / start. Game developers write zero networking code.",
      "features.card4.title": "Flexible NAT Traversal",
      "features.card4.desc": "Expose rooms via standard TCP ports. Works with SakuraFrp and any NAT traversal tool \u2014 no vendor lock-in.",
      "features.card5.title": "Game Market",
      "features.card5.desc": "Browse and download community games in one click. Auto SHA-256 verification, extraction, and import \u2014 no manual steps.",
      "features.card6.title": "Achievements & Economy",
      "features.card6.desc": "Unlock in-game achievements, earn BZ Coins, daily check-ins. The platform tracks all your achievements and stats.",

      "games.title": "Four Game Types",
      "games.subtitle": "From solo casual to online multiplayer \u2014 one platform does it all",
      "games.solo.title": "Single Player",
      "games.solo.desc": "Classic offline experience<br>No network needed",
      "games.multi.title": "Multiplayer",
      "games.multi.desc": "Local / Online multiplayer<br>P2P room battles",
      "games.duo.title": "Single+Multi",
      "games.duo.desc": "Single + multiplayer dual mode<br>Switch gameplay anytime",
      "games.web.title": "Web Games",
      "games.web.desc": "Remote web games<br>Launch via URL directly",

      "arch.title": "Host Is Server",
      "arch.subtitle": "No central server needed \u2014 the host\u2019s PC is the server. Just use a NAT traversal tool to expose the port to the internet.",
      "arch.host_title": "\uD83D\uDDA5\uFE0F HOST",
      "arch.client_title": "\uD83D\uDCBB CLIENT (multiple)",
      "arch.electron_platform": "Electron Platform",
      "arch.renderer": "Renderer",
      "arch.main_process": "Main Process",
      "arch.game_process": "Game Process (game.exe)",
      "arch.api_comm": "All multiplayer communication through GameApiServer",
      "arch.connect_to_host": "Connect to host\u2019s public address",
      "arch.public_addr": "Public Address",
      "arch.frp_desc": "NAT Traversal",

      "stats.os": "Platform",
      "stats.oss_val": "Open Source",
      "stats.license": "License",
      "stats.local_val": "Local",
      "stats.storage": "Storage",
      "stats.multi_val": "Multilingual",
      "stats.multilang": "Multilingual",

      "footer.market": "Game Market",

      "counter.tooltip": "Characters Eaten",

      "ach.unlocked": "Achievements Unlocked",
      "ach.toast_sub": "Achievement Unlocked!",
      "ach.first_bite": "First Bite",
      "ach.cleaner": "Clean Sweep",
      "ach.big_eater": "Big Eater",
      "ach.logo_boom": "Big Bang",
      "ach.hacker": "Hacker 101",
      "ach.terminal_master": "Terminal Master",
      "ach.tetris_first": "First Clear",
      "ach.tetris_builder": "Builder",
      "ach.tetris_castle": "Block Castle",

      "easter.line1": "You devoured the entire website!",
      "easter.line2": "Text will regenerate...",

      "tetris.title": "Tetris",
      "tetris.aria_left": "Left",
      "tetris.aria_down": "Down",
      "tetris.aria_rotate": "Rotate",
      "tetris.aria_right": "Right"
    }
  };

  var currentLang = localStorage.getItem("bz-lang") || "zh";

  function t(key) {
    var dict = translations[currentLang];
    if (!dict) return key;
    return dict[key] !== undefined ? dict[key] : key;
  }

  function setLang(lang) {
    if (!translations[lang] || lang === currentLang) return;
    localStorage.setItem("bz-lang", lang);
    window.location.reload();
  }

  function scanDOM() {
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute("data-i18n");
      if (!key) continue;
      var val = t(key);
      if (el.firstChild && el.firstChild.nodeType === 1 && el.firstChild.tagName === "BR") continue;
      el.textContent = val;
    }

    var htmlEls = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlEls.length; j++) {
      var hel = htmlEls[j];
      var hkey = hel.getAttribute("data-i18n-html");
      if (hkey) hel.innerHTML = t(hkey);
    }

    var titleEls = document.querySelectorAll("[data-i18n-title]");
    for (var k = 0; k < titleEls.length; k++) {
      var tel = titleEls[k];
      var tkey = tel.getAttribute("data-i18n-title");
      if (tkey) tel.setAttribute("title", t(tkey));
    }

    var ariaEls = document.querySelectorAll("[data-i18n-aria]");
    for (var a = 0; a < ariaEls.length; a++) {
      var ael = ariaEls[a];
      var akey = ael.getAttribute("data-i18n-aria");
      if (akey) ael.setAttribute("aria-label", t(akey));
    }

    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  }

  scanDOM();

  return {
    t: t,
    setLang: setLang,
    get current() { return currentLang; }
  };
})();
