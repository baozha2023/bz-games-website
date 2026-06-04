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
      "hero.desc": "BZ-Games 是一个本地优先的 Windows 游戏平台。导入、管理、市场下载、房间联机、成就统计与个性化资料都在一个客户端里完成。",
      "hero.download": "下载 Windows 版",

      "features.title": "为什么选择 BZ-Games",
      "features.subtitle": "专为 Windows 打造的本地游戏管理、市场下载与联机体验",
      "features.card1.title": "开放式游戏库",
      "features.card1.desc": "支持导入任意符合规范的本地游戏，自动识别版本、封面与元数据，拖拽即玩。",
      "features.card2.title": "本地优先数据",
      "features.card2.desc": "配置、游戏记录、统计、成就与 BZ 币都优先存储在本机，配置文件加密保存，无需注册云端账号。",
      "features.card3.title": "统一联机大厅",
      "features.card3.desc": "内置创建、加入、准备、开始、聊天、踢人、解散与断线处理，游戏只需接入本地 Game API。",
      "features.card4.title": "多入口联机",
      "features.card4.desc": "局域网发现、用户自备 frp 直连、官方中继短地址三种入口并存，按场景自由切换。",
      "features.card5.title": "游戏市场",
      "features.card5.desc": "浏览多来源社区游戏，下载任务支持进度、暂停、恢复、取消与悬浮球提醒，安装自动校验和导入。",
      "features.card6.title": "成长与个性化",
      "features.card6.desc": "成就、签到、BZ 币、游玩统计、日历热力图、头像框和昵称特效，让本地资料也有成长感。",

      "games.title": "支持四种游戏类型",
      "games.subtitle": "从单人休闲到多人在线 — 一个平台全搞定",
      "games.solo.title": "单人游戏",
      "games.solo.desc": "经典单机体验<br>无需联网",
      "games.multi.title": "多人游戏",
      "games.multi.desc": "局域网 / frp / 官方中继<br>房间联机对战",
      "games.duo.title": "单人多模式",
      "games.duo.desc": "单人 + 联机双模式<br>灵活切换玩法",
      "games.web.title": "网络游戏",
      "games.web.desc": "远程网页游戏<br>本地存档接管",

      "arch.title": "本地房间 + 可切换公网入口",
      "arch.subtitle": "房主本机运行 RoomServer，局域网可直接发现；公网可选择用户自备 frp 直连，也可使用官方 Relay Server 短地址中继。",
      "arch.host_title": "\uD83D\uDDA5\uFE0F HOST 主机",
      "arch.client_title": "\uD83D\uDCBB CLIENT 客机（可多个）",
      "arch.electron_platform": "Electron 平台进程",
      "arch.renderer": "渲染进程",
      "arch.main_process": "主进程",
      "arch.game_process": "游戏进程 (game.exe)",
      "arch.api_comm": "通过 GameApiServer 进行所有联机通信",
      "arch.connect_to_host": "连接 frp 地址或官方短地址",
      "arch.public_entry": "公网入口",
      "arch.public_addr": "公网地址或短地址",
      "arch.frp_title": "frp 直连",
      "arch.frp_desc": "用户自备映射到 RoomServer",
      "arch.relay_title": "官方中继",
      "arch.relay_desc": "短地址 / 房间码 / 透明转发",

      "stats.os": "支持系统",
      "stats.oss_val": "开源",
      "stats.license": "MIT 协议",
      "stats.local_val": "本地",
      "stats.storage": "数据存储",
      "stats.multi_val": "中英日",
      "stats.multilang": "界面语言",

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
      "hero.desc": "BZ-Games is a local-first Windows game platform. Import, manage, download from the market, play in rooms, track achievements, and personalize your profile in one client.",
      "hero.download": "Download for Windows",

      "features.title": "Why BZ-Games",
      "features.subtitle": "Local game management, market downloads, and multiplayer built for Windows",
      "features.card1.title": "Open Game Library",
      "features.card1.desc": "Import any compliant local game with automatic version, cover art and metadata detection. Drag and drop to play.",
      "features.card2.title": "Local-First Data",
      "features.card2.desc": "Settings, play records, statistics, achievements, and BZ Coins stay on your PC first, with encrypted config storage and no cloud account required.",
      "features.card3.title": "Unified Multiplayer Lobby",
      "features.card3.desc": "Create, join, ready, start, chat, kick, disband, and handle reconnects. Games only need to integrate the local Game API.",
      "features.card4.title": "Multiple Online Entries",
      "features.card4.desc": "LAN discovery, self-hosted frp direct links, and official relay short addresses coexist so you can switch by scenario.",
      "features.card5.title": "Game Market",
      "features.card5.desc": "Browse multi-source community games. Download tasks support progress, pause, resume, cancel, and floating reminders, with automatic verification and import.",
      "features.card6.title": "Growth & Personalization",
      "features.card6.desc": "Achievements, check-ins, BZ Coins, play statistics, calendar heatmaps, avatar frames, and nickname effects make your local profile feel alive.",

      "games.title": "Four Game Types",
      "games.subtitle": "From solo casual to online multiplayer \u2014 one platform does it all",
      "games.solo.title": "Single Player",
      "games.solo.desc": "Classic offline experience<br>No network needed",
      "games.multi.title": "Multiplayer",
      "games.multi.desc": "LAN / frp / official relay<br>Room-based multiplayer",
      "games.duo.title": "Single+Multi",
      "games.duo.desc": "Single + multiplayer dual mode<br>Switch gameplay anytime",
      "games.web.title": "Web Games",
      "games.web.desc": "Remote web games<br>Local storage takeover",

      "arch.title": "Local Rooms + Switchable Public Entries",
      "arch.subtitle": "The host runs RoomServer locally. LAN discovery works directly, while public play can use self-hosted frp direct links or official Relay Server short addresses.",
      "arch.host_title": "\uD83D\uDDA5\uFE0F HOST",
      "arch.client_title": "\uD83D\uDCBB CLIENT (multiple)",
      "arch.electron_platform": "Electron Platform",
      "arch.renderer": "Renderer",
      "arch.main_process": "Main Process",
      "arch.game_process": "Game Process (game.exe)",
      "arch.api_comm": "All multiplayer communication through GameApiServer",
      "arch.connect_to_host": "Connect via frp address or official short address",
      "arch.public_entry": "Public Entry",
      "arch.public_addr": "Public Address or Short Address",
      "arch.frp_title": "frp Direct",
      "arch.frp_desc": "User mapping to RoomServer",
      "arch.relay_title": "Official Relay",
      "arch.relay_desc": "Short address / room code / transparent forwarding",

      "stats.os": "Platform",
      "stats.oss_val": "Open Source",
      "stats.license": "License",
      "stats.local_val": "Local",
      "stats.storage": "Storage",
      "stats.multi_val": "ZH/EN/JA",
      "stats.multilang": "UI Languages",

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
