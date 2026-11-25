/* Slideshow shared by the work pages (demo/platform/, demo/industry-map/): cross-fade, 5 s per shot, pause on hover/focus, keyboard-operable buttons.
 * Without this script the first shot simply stays on screen. Reduced motion: no autoplay until the visitor presses 继续. */
(function () {
  "use strict";
  var show = document.querySelector(".w-show");
  if (!show) return;
  var slides = show.querySelectorAll(".w-stage img");
  var cur = show.querySelector(".w-num b");
  var name = show.querySelector(".w-name");
  var btnPrev = show.querySelector("[data-act=prev]");
  var btnNext = show.querySelector("[data-act=next]");
  var btnPlay = show.querySelector("[data-act=play]");
  if (!slides.length || !btnPrev || !btnNext || !btnPlay) return;
  document.documentElement.classList.add("js");

  var DWELL = 5000;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var i = 0;
  var stopped = reduce; // the visitor's own pause (or reduced motion)
  var hover = false;
  var focus = false;
  var timer = null;

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function go(n) {
    i = (n + slides.length) % slides.length;
    for (var k = 0; k < slides.length; k++) {
      var on = k === i;
      slides[k].classList.toggle("on", on);
      slides[k].setAttribute("aria-hidden", on ? "false" : "true");
      if (on) slides[k].loading = "eager";
    }
    // warm the next shot so the fade never shows an empty frame
    slides[(i + 1) % slides.length].loading = "eager";
    cur.textContent = pad(i + 1);
    name.textContent = slides[i].getAttribute("data-name") || "";
  }

  function running() {
    return !stopped && !hover && !focus;
  }

  function schedule() {
    clearTimeout(timer);
    timer = null;
    if (running()) timer = setTimeout(tick, DWELL);
  }

  function tick() {
    go(i + 1);
    schedule();
  }

  function sync() {
    btnPlay.textContent = stopped ? "继续" : "暂停";
    btnPlay.setAttribute("aria-pressed", stopped ? "true" : "false");
    name.setAttribute("aria-live", running() ? "off" : "polite");
    schedule();
  }

  btnPrev.addEventListener("click", function () {
    go(i - 1);
    schedule();
  });
  btnNext.addEventListener("click", function () {
    go(i + 1);
    schedule();
  });
  btnPlay.addEventListener("click", function () {
    stopped = !stopped;
    sync();
  });

  show.addEventListener("mouseenter", function () {
    hover = true;
    sync();
  });
  show.addEventListener("mouseleave", function () {
    hover = false;
    sync();
  });
  show.addEventListener("focusin", function () {
    focus = true;
    sync();
  });
  show.addEventListener("focusout", function (e) {
    if (!show.contains(e.relatedTarget)) {
      focus = false;
      sync();
    }
  });

  go(0);
  sync();
})();
