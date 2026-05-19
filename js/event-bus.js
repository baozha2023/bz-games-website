var EventBus = (function () {
  var listeners = {};

  function on(event, fn) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) return;
    if (fn) {
      var idx = listeners[event].indexOf(fn);
      if (idx >= 0) listeners[event].splice(idx, 1);
    } else {
      delete listeners[event];
    }
  }

  function emit(event, data) {
    if (!listeners[event]) return;
    for (var i = 0; i < listeners[event].length; i++) {
      try { listeners[event][i](data); } catch (e) {}
    }
  }

  return { on: on, off: off, emit: emit };
})();
