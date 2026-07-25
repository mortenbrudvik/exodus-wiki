/**
 * Infobox illustration lightbox: click (or keyboard-activate) an .infobox-image
 * to view the same src full-size; dismiss with Escape, close button, or backdrop.
 * Classic script (not ES module) for file:// and GitHub Pages.
 */
(function (global) {
  "use strict";

  var OVERLAY_ID = "wiki-lightbox";
  var lastFocus = null;

  function getDoc(doc) {
    return doc || global.document;
  }

  function ensureOverlay(doc) {
    doc = getDoc(doc);
    var el = doc.getElementById(OVERLAY_ID);
    if (el) return el;

    el = doc.createElement("div");
    el.id = OVERLAY_ID;
    el.className = "wiki-lightbox";
    el.hidden = true;
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Full illustration");

    var closeBtn = doc.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "wiki-lightbox__close";
    closeBtn.setAttribute("aria-label", "Close full image");
    closeBtn.textContent = "\u00d7";

    var backdrop = doc.createElement("div");
    backdrop.className = "wiki-lightbox__backdrop";
    backdrop.setAttribute("data-lightbox-dismiss", "1");

    var figure = doc.createElement("figure");
    figure.className = "wiki-lightbox__figure";

    var img = doc.createElement("img");
    img.className = "wiki-lightbox__img";
    img.alt = "";

    figure.appendChild(img);
    el.appendChild(backdrop);
    el.appendChild(closeBtn);
    el.appendChild(figure);
    doc.body.appendChild(el);

    closeBtn.addEventListener("click", function () {
      close(doc);
    });
    backdrop.addEventListener("click", function () {
      close(doc);
    });

    return el;
  }

  function open(src, alt, doc) {
    doc = getDoc(doc);
    if (!src) return null;

    var active = doc.activeElement;
    if (active && active !== doc.body) lastFocus = active;

    var overlay = ensureOverlay(doc);
    var img = overlay.querySelector(".wiki-lightbox__img");
    img.setAttribute("src", src);
    img.alt = alt || "";
    overlay.hidden = false;
    if (doc.body && doc.body.classList) {
      doc.body.classList.add("lightbox-open");
    }

    var closeBtn = overlay.querySelector(".wiki-lightbox__close");
    if (closeBtn && typeof closeBtn.focus === "function") {
      try {
        closeBtn.focus();
      } catch (e) {
        /* ignore */
      }
    }
    return overlay;
  }

  function close(doc) {
    doc = getDoc(doc);
    var overlay = doc.getElementById(OVERLAY_ID);
    if (!overlay || overlay.hidden) return false;

    overlay.hidden = true;
    var img = overlay.querySelector(".wiki-lightbox__img");
    if (img) {
      img.removeAttribute("src");
      img.alt = "";
    }
    if (doc.body && doc.body.classList) {
      doc.body.classList.remove("lightbox-open");
    }

    if (lastFocus && typeof lastFocus.focus === "function") {
      try {
        lastFocus.focus();
      } catch (e) {
        /* ignore */
      }
    }
    lastFocus = null;
    return true;
  }

  function isOpen(doc) {
    doc = getDoc(doc);
    var overlay = doc.getElementById(OVERLAY_ID);
    return !!(overlay && !overlay.hidden);
  }

  function enhanceTriggers(doc) {
    doc = getDoc(doc);
    if (!doc.querySelectorAll) return;
    var nodes = doc.querySelectorAll(".infobox-image");
    for (var i = 0; i < nodes.length; i++) {
      var box = nodes[i];
      if (box.getAttribute("data-lightbox-ready") === "1") continue;
      box.setAttribute("data-lightbox-ready", "1");
      box.setAttribute("role", "button");
      box.setAttribute("tabindex", "0");
      if (!box.getAttribute("aria-label")) {
        var img = box.querySelector("img");
        var label = (img && (img.getAttribute("alt") || img.alt)) || "illustration";
        box.setAttribute("aria-label", "View full " + label);
      }
      if (box.classList && box.classList.add) {
        box.classList.add("infobox-image--zoomable");
      }
    }
  }

  function findInfoboxImage(target, doc) {
    if (!target || !target.closest) {
      // Fallback walk for minimal fixtures without Element.closest
      var node = target;
      while (node && node !== doc) {
        if (
          node.classList &&
          node.classList.contains &&
          node.classList.contains("infobox-image")
        ) {
          return node;
        }
        if (
          typeof node.className === "string" &&
          node.className.indexOf("infobox-image") !== -1
        ) {
          return node;
        }
        node = node.parentNode || node.parentElement;
      }
      return null;
    }
    return target.closest(".infobox-image");
  }

  function onActivate(box) {
    if (!box) return;
    var img = box.querySelector ? box.querySelector("img") : null;
    if (!img) return;
    var src = img.getAttribute("src") || img.src;
    var alt = img.getAttribute("alt") || img.alt || "";
    open(src, alt);
  }

  function init(doc) {
    doc = getDoc(doc);
    if (!doc || !doc.addEventListener) return;
    if (doc.documentElement && doc.documentElement.getAttribute("data-lightbox-init") === "1") {
      enhanceTriggers(doc);
      return;
    }
    if (doc.documentElement) {
      doc.documentElement.setAttribute("data-lightbox-init", "1");
    }

    enhanceTriggers(doc);

    doc.addEventListener("click", function (e) {
      var box = findInfoboxImage(e.target, doc);
      if (!box) return;
      e.preventDefault();
      onActivate(box);
    });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen(doc)) {
        e.preventDefault();
        close(doc);
        return;
      }
      if (e.key !== "Enter" && e.key !== " ") return;
      var box = findInfoboxImage(e.target, doc);
      if (!box) return;
      e.preventDefault();
      onActivate(box);
    });
  }

  var api = {
    open: open,
    close: close,
    isOpen: isOpen,
    init: init,
    enhanceTriggers: enhanceTriggers,
    OVERLAY_ID: OVERLAY_ID,
  };

  global.WikiLightbox = api;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        init(document);
      });
    } else {
      init(document);
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
