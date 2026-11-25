/* Recorded loop on demo/platform/: a silent clip that plays by itself (no controls).
 * Reduced motion: drop autoplay and hold on frame 0, which is the same picture as the poster.
 * A browser that cannot play the WebM gets the animated WebP instead (or the poster, under reduced motion).
 * Without this script the <video> still autoplays where it can and shows the poster where it cannot. */
(function () {
  "use strict";
  var v = document.querySelector(".w-rec video");
  if (!v) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var src = v.querySelector("source");

  function swap() {
    if (!v.parentNode) return;
    var img = document.createElement("img");
    img.src = reduce ? v.getAttribute("poster") : v.getAttribute("data-fallback");
    img.alt = v.getAttribute("aria-label") || "";
    img.width = 1280;
    img.height = 720;
    v.parentNode.replaceChild(img, v);
  }

  if (!src || !v.canPlayType(src.getAttribute("type") || "")) {
    swap();
    return;
  }
  src.addEventListener("error", swap);
  if (v.networkState === 3) {
    swap(); // the source already failed before this deferred script ran
    return;
  }
  if (reduce) {
    // stop where it stands and go back to frame 0, which is the poster image (no reload, so no aborted request)
    var still = function () {
      v.pause();
      if (v.currentTime > 0) v.currentTime = 0;
    };
    v.autoplay = false;
    v.removeAttribute("autoplay");
    v.addEventListener("play", still);
    still();
  }
})();
