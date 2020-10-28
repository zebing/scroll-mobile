(function (window, document) {
  let rootFontSize;
  function resize () {
    var ww = window.innerWidth
    if (ww > window.screen.width) {
      window.requestAnimationFrame(resize)
    } else {
      if (ww > 750) {
        ww = 750
      }
      rootFontSize = ww * 100 / 750;
      document.documentElement.style.fontSize = rootFontSize + 'px';
    }
  }

  resize()
})(window, document)
