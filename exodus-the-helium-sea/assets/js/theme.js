/* Theme toggle.
 *
 * Dark is the wiki's default. When the reader has expressed no preference the
 * OS decides, in CSS, via prefers-color-scheme — so the right theme shows even
 * with JavaScript off. An explicit choice is stamped on <html data-theme> and
 * persisted, which overrides the media query.
 *
 * The no-flash stamp is NOT here: it runs inline in each page's <head>, before
 * first paint, because a deferred file would repaint. This file only owns the
 * button, which stays hidden until JavaScript can make it do something.
 */
(function () {
  "use strict";

  var KEY = "wiki-theme";
  var root = document.documentElement;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null; // private mode, or storage disabled
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function current() {
    return root.getAttribute("data-theme") || stored() || systemTheme();
  }

  // The button is named for what it will do, not for the state it is in.
  function label(btn, theme) {
    var next = theme === "dark" ? "light" : "dark";
    btn.textContent = next === "dark" ? "Dark" : "Light";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    btn.setAttribute("title", "Switch to " + next + " theme");
  }

  function init() {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;

    btn.hidden = false;
    label(btn, current());

    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {
        /* choice will not survive the page, but the page still switches */
      }
      label(btn, next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
