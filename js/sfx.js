var SoundFX = (function () {
  var ctx = null;
  var enabled = true;

  function initCtx() {
    if (ctx) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
    } catch (e) {
      enabled = false;
    }
  }

  function noteFromChar(ch) {
    if (!ch) return 440;
    var code = ch.charCodeAt(0);
    if (isNaN(code)) {
      code = (ch.codePointAt ? ch.codePointAt(0) : 440) || 440;
    }
    var base = 65;
    var notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    var idx = (code - base) % notes.length;
    var oct = Math.floor((code - base) / notes.length) + 4;
    if (oct < 3) oct = 3;
    if (oct > 6) oct = 6;
    return notes[idx] * Math.pow(2, oct - 4);
  }

  function play(ch) {
    if (!enabled || !ctx) return;
    initCtx();
    if (!ctx) return;
    try {
      if (ctx.state === "suspended") ctx.resume();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = noteFromChar(ch);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  EventBus.on("food-eaten", function (data) {
    if (!data.chars) return;
    initCtx();
    for (var i = 0; i < data.chars.length; i++) {
      play(data.chars[i].char);
    }
  });
})();
