/* Recorded loops on demo/platform/: three silent clips stacked one under another (no controls).
 * Each clip plays only while it is on screen and pauses once scrolled away (IntersectionObserver),
 * so the three never decode at the same time.
 * Reduced motion: none of them plays; each holds on its poster (frame 0 of the clip).
 * A browser that cannot play the WebM gets the animated WebP instead (or the poster, under reduced motion).
 * Only the first clip carries the autoplay attribute; the other two are preload="none" and are started by this script,
 * so they download only when scrolled to. Without this script the first clip autoplays and the others show their poster. */
(function () {
  "use strict";
  var list = document.querySelectorAll(".w-rec video");
  if (!list.length) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Safari and every browser on iOS (all WebKit) say they can play the WebM but then hang on it without an error,
  // which leaves a black box. They get the animated WebP straight away.
  var apple = /Apple/.test(navigator.vendor || "");
  var io = !reduce && "IntersectionObserver" in window ? new IntersectionObserver(onSeen, { threshold: [0, 0.2] }) : null;

  function swap(v) {
    if (!v.parentNode) return;
    if (io) io.unobserve(v);
    var img = document.createElement("img");
    img.src = reduce ? v.getAttribute("poster") : v.getAttribute("data-fallback");
    img.alt = v.getAttribute("aria-label") || "";
    img.width = 1280;
    img.height = 720;
    if (v.getAttribute("preload") === "none") img.loading = "lazy"; // lower clips: fetch only when scrolled to
    v.parentNode.replaceChild(img, v);
  }

  function play(v) {
    if (!v._watch) {
      // any other browser that never gets a frame within 4 s also falls back to the animated WebP
      v._watch = setTimeout(function () { if (v.parentNode && v.readyState < 2) swap(v); }, 4000);
    }
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* autoplay refused: the poster stays */ });
  }

  function onSeen(entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting && e.intersectionRatio >= 0.2) play(v);
      else if (!v.paused) v.pause();
    });
  }

  function still(v) {
    // stop where it stands and go back to frame 0, which is the poster image (no reload, so no aborted request)
    v.pause();
    if (v.currentTime > 0) v.currentTime = 0;
  }

  Array.prototype.forEach.call(list, function (v) {
    var src = v.querySelector("source");
    if (!src || apple || !v.canPlayType(src.getAttribute("type") || "")) {
      swap(v);
      return;
    }
    src.addEventListener("error", function () { swap(v); });
    v.addEventListener("error", function () { swap(v); });
    if (v.networkState === 3) {
      swap(v); // the source already failed before this deferred script ran
      return;
    }
    if (reduce || io) {
      // from here on this script decides when a clip plays: on screen only, never under reduced motion
      v.autoplay = false;
      v.removeAttribute("autoplay");
    }
    if (reduce) {
      v.addEventListener("play", function () { still(v); });
      still(v);
    } else if (io) {
      io.observe(v);
    }
  });
})();
