/**
 * Unit test for the real shipped WikiLightbox open/close API using a minimal
 * DOM fixture (no jsdom dependency). Drives assets/js/lightbox.js as-is.
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const lightboxPath = path.join(root, "assets", "js", "lightbox.js");
const code = fs.readFileSync(lightboxPath, "utf8");

/** Minimal DOM enough for lightbox.js */
function createFixture() {
  function ClassList(el) {
    this._el = el;
    this._set = new Set(
      (el._className || el.className || "")
        .split(/\s+/)
        .filter(Boolean)
    );
  }
  ClassList.prototype.add = function (c) {
    this._set.add(c);
    this._el._className = [...this._set].join(" ");
  };
  ClassList.prototype.remove = function (c) {
    this._set.delete(c);
    this._el._className = [...this._set].join(" ");
  };
  ClassList.prototype.contains = function (c) {
    return this._set.has(c);
  };
  ClassList.prototype.toggle = function (c, force) {
    if (force === true) this.add(c);
    else if (force === false) this.remove(c);
    else if (this.contains(c)) this.remove(c);
    else this.add(c);
  };

  function El(tag) {
    this.tagName = String(tag).toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attrs = Object.create(null);
    this.listeners = Object.create(null);
    this._className = "";
    this.hidden = false;
    this.textContent = "";
    this.id = "";
    this.src = "";
    this.alt = "";
    this.type = "";
    this._focused = false;
    var self = this;
    Object.defineProperty(this, "className", {
      get: function () {
        return self._className;
      },
      set: function (v) {
        self._className = String(v || "");
        self._classList = new ClassList(self);
      },
      enumerable: true,
    });
    this._classList = new ClassList(this);
    Object.defineProperty(this, "classList", {
      get: function () {
        return self._classList;
      },
      enumerable: true,
    });
  }
  El.prototype.setAttribute = function (k, v) {
    this.attrs[k] = String(v);
    if (k === "id") this.id = String(v);
    if (k === "src") this.src = String(v);
    if (k === "alt") this.alt = String(v);
    if (k === "class") {
      this.className = String(v);
    }
  };
  El.prototype.getAttribute = function (k) {
    if (k === "src" && this.src) return this.src;
    if (k === "alt" && this.alt) return this.alt;
    if (k === "id" && this.id) return this.id;
    return this.attrs[k] != null ? this.attrs[k] : null;
  };
  El.prototype.removeAttribute = function (k) {
    delete this.attrs[k];
    if (k === "src") this.src = "";
    if (k === "alt") this.alt = "";
  };
  El.prototype.appendChild = function (c) {
    c.parentNode = this;
    this.children.push(c);
    return c;
  };
  El.prototype.querySelector = function (sel) {
    return queryOne(this, sel);
  };
  El.prototype.querySelectorAll = function (sel) {
    return queryAll(this, sel);
  };
  El.prototype.addEventListener = function (type, fn) {
    (this.listeners[type] || (this.listeners[type] = [])).push(fn);
  };
  El.prototype.focus = function () {
    this._focused = true;
    document.activeElement = this;
  };
  El.prototype.closest = function (sel) {
    var n = this;
    while (n) {
      if (matches(n, sel)) return n;
      n = n.parentNode;
    }
    return null;
  };

  function matches(el, sel) {
    if (!el || !el.tagName) return false;
    if (sel.startsWith(".")) {
      return el.classList.contains(sel.slice(1));
    }
    if (sel.startsWith("#")) {
      return el.id === sel.slice(1);
    }
    return el.tagName === sel.toUpperCase();
  }

  function queryOne(root, sel) {
    var all = queryAll(root, sel);
    return all[0] || null;
  }

  function queryAll(root, sel) {
    var out = [];
    function walk(n) {
      if (!n || !n.tagName) return;
      if (matches(n, sel)) out.push(n);
      for (var i = 0; i < (n.children || []).length; i++) walk(n.children[i]);
    }
    // include root itself
    walk(root);
    return out;
  }

  var body = new El("body");
  var documentElement = new El("html");
  documentElement.appendChild(body);

  var document = {
    body: body,
    documentElement: documentElement,
    activeElement: body,
    readyState: "complete",
    createElement: function (tag) {
      return new El(tag);
    },
    getElementById: function (id) {
      function walk(n) {
        if (!n) return null;
        if (n.id === id) return n;
        for (var i = 0; i < (n.children || []).length; i++) {
          var f = walk(n.children[i]);
          if (f) return f;
        }
        return null;
      }
      return walk(documentElement) || walk(body);
    },
    querySelector: function (sel) {
      return queryOne(documentElement, sel) || queryOne(body, sel);
    },
    querySelectorAll: function (sel) {
      return queryAll(documentElement, sel).concat(
        queryAll(body, sel).filter(function (x) {
          return queryAll(documentElement, sel).indexOf(x) === -1;
        })
      );
    },
    addEventListener: function (type, fn) {
      (document._listeners || (document._listeners = {}));
      (document._listeners[type] || (document._listeners[type] = [])).push(fn);
    },
    _listeners: {},
  };

  // Infobox fixture on the page
  var infobox = new El("aside");
  infobox.setAttribute("class", "infobox");
  var box = new El("div");
  box.setAttribute("class", "infobox-image");
  var img = new El("img");
  img.setAttribute("src", "../../assets/images/characters/finn-jalgori-tobu.jpg");
  img.setAttribute("alt", "Finn Jalgori-Tobu");
  box.appendChild(img);
  infobox.appendChild(box);
  body.appendChild(infobox);

  return { document: document, body: body, box: box, img: img, El: El };
}

function assert(cond, msg) {
  if (!cond) throw new Error("FAIL: " + msg);
}

const fixture = createFixture();
const sandbox = {
  window: {},
  document: fixture.document,
  globalThis: null,
};
sandbox.globalThis = sandbox;
sandbox.window.document = fixture.document;
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: "lightbox.js" });

const WL = sandbox.window.WikiLightbox || sandbox.globalThis.WikiLightbox;
assert(WL && typeof WL.open === "function", "WikiLightbox.open exported");
assert(typeof WL.close === "function", "WikiLightbox.close exported");
assert(typeof WL.isOpen === "function", "WikiLightbox.isOpen exported");

const src = "../../assets/images/characters/finn-jalgori-tobu.jpg";
const overlay = WL.open(src, "Finn Jalgori-Tobu", fixture.document);
assert(overlay, "open returns overlay");
assert(WL.isOpen(fixture.document) === true, "isOpen true after open");
assert(overlay.hidden === false, "overlay not hidden");
const fullImg = overlay.querySelector(".wiki-lightbox__img");
assert(fullImg, "full image element present");
const openedSrc = fullImg.getAttribute("src") || fullImg.src;
assert(openedSrc === src, "full image src matches infobox src (" + openedSrc + ")");
assert(
  fixture.document.body.classList.contains("lightbox-open"),
  "body has lightbox-open"
);

const closed = WL.close(fixture.document);
assert(closed === true, "close returns true");
assert(WL.isOpen(fixture.document) === false, "isOpen false after close");
assert(overlay.hidden === true, "overlay hidden after close");
assert(
  !fixture.document.body.classList.contains("lightbox-open"),
  "body class removed after close"
);
const afterSrc = fullImg.getAttribute("src");
assert(!afterSrc, "full image src cleared after close");

// Second open still works (same overlay)
WL.open(src, "Finn", fixture.document);
assert(WL.isOpen(fixture.document), "re-open works");
WL.close(fixture.document);
assert(!WL.isOpen(fixture.document), "second close works");

// Structural: every illustrated page loads lightbox.js
const index = JSON.parse(
  fs.readFileSync(path.join(root, "docs", "visual-briefs", "index.json"), "utf8")
);
let pagesChecked = 0;
for (const s of index.subjects) {
  let pageRel;
  if (s.kind === "character") pageRel = path.join("pages", "characters", s.slug + ".html");
  else if (s.kind === "ship" || s.kind === "location")
    pageRel = path.join("pages", "locations", s.slug + ".html");
  else if (s.kind === "technology")
    pageRel = path.join("pages", "technology", s.slug + ".html");
  else if (s.kind === "faction")
    pageRel = path.join("pages", "factions", s.slug + ".html");
  else continue;
  const html = fs.readFileSync(path.join(root, pageRel), "utf8");
  assert(
    /assets\/js\/lightbox\.js/.test(html),
    pageRel + " must load lightbox.js"
  );
  assert(/infobox-image/.test(html), pageRel + " must have infobox-image");
  pagesChecked++;
}

console.log(
  "check-lightbox: OK — open/close against shipped WikiLightbox; " +
    pagesChecked +
    " illustrated pages load lightbox.js"
);
