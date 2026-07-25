(function (window, document) {
  "use strict";

  // Fold case, diacritics and punctuation so ASCII typing finds the real spelling:
  // "tose" matches Toše, "helena chione" matches Helena-Chione, "cybeles eagle"
  // matches Cybele’s Eagle. Queries and index fields both pass through here, so the
  // two always normalize the same way.
  function fold(s) {
    s = String(s || "").toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return s
      .replace(/[‘’`´']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function normalizeQuery(q) {
    return fold(q);
  }

  // Ranking, highest first: exact title, exact keyword (an alias names its own subject, so it
  // must beat an incidental page whose longer title merely contains the query), title prefix,
  // title substring, keyword substring, summary substring.
  function scoreEntry(entry, q) {
    if (!q) return 0;
    var score = 0;
    var title = fold(entry.title);
    var summary = fold(entry.summary);
    var keywords = Array.isArray(entry.keywords) ? entry.keywords : [];
    if (title === q) score += 250;
    else if (title.indexOf(q) === 0) score += 125;
    else if (title.indexOf(q) !== -1) score += 100;
    var best = 0;
    for (var i = 0; i < keywords.length; i++) {
      var kw = fold(keywords[i]);
      if (!kw) continue;
      if (kw === q) best = Math.max(best, 150);
      else if (kw.indexOf(q) !== -1) best = Math.max(best, 40);
    }
    score += best;
    // When the query extends the title ("makaio faraji" over Makaio), this is the subject
    // page rather than one that merely mentions the name — outrank the incidental mention.
    if (title && title !== q && q.indexOf(title + " ") === 0) score += 15;
    if (summary.indexOf(q) !== -1) score += 10;
    return score;
  }

  function rankResults(index, q) {
    var query = normalizeQuery(q);
    if (!query) return [];
    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var s = scoreEntry(index[i], query);
      if (s > 0) scored.push({ entry: index[i], score: s });
    }
    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return String(a.entry.title).localeCompare(String(b.entry.title));
    });
    return scored.map(function (x) { return x.entry; });
  }

  function resolvePath(root, path) {
    var r = root || "./";
    if (r.slice(-1) !== "/") r += "/";
    var p = String(path || "").replace(/^\//, "");
    return r + p;
  }

  var cachedIndex = null;
  var loading = null;

  function getRoot() {
    var body = document.body;
    return (body && body.getAttribute("data-root")) || "./";
  }

  function acceptIndex(data, source) {
    if (!Array.isArray(data)) {
      throw new Error("Search index is not an array (" + source + ")");
    }
    if (!data.length) {
      throw new Error("Search index is empty (" + source + ")");
    }
    return data;
  }

  function loadIndex() {
    if (cachedIndex) return Promise.resolve(cachedIndex);
    if (Array.isArray(window.WIKI_SEARCH_INDEX) && window.WIKI_SEARCH_INDEX.length) {
      cachedIndex = window.WIKI_SEARCH_INDEX;
      return Promise.resolve(cachedIndex);
    }
    if (loading) return loading;
    var url = resolvePath(getRoot(), "assets/data/search-index.json");
    loading = fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        cachedIndex = acceptIndex(data, url);
        return cachedIndex;
      })
      .catch(function (err) {
        loading = null;
        console.error("[WikiSearch] index load failed:", err);
        throw err;
      });
    return loading;
  }

  function renderHits(container, hits, root) {
    container.innerHTML = "";
    if (!hits.length) {
      var empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No pages matched — try a character or faction name.";
      container.appendChild(empty);
      return;
    }
    hits.forEach(function (hit) {
      var a = document.createElement("a");
      a.className = "search-hit";
      a.href = resolvePath(root, hit.path);
      a.innerHTML =
        '<div class="hit-title"></div><div class="hit-meta"></div>';
      a.querySelector(".hit-title").textContent = hit.title;
      a.querySelector(".hit-meta").textContent =
        (hit.category || "") + (hit.summary ? " — " + hit.summary : "");
      container.appendChild(a);
    });
  }

  function wireForm(form) {
    var input = form.querySelector(".search-input");
    var dropdown = form.querySelector(".search-dropdown");
    if (!input || !dropdown) return;
    var root = getRoot();
    var timer = null;

    function close() {
      dropdown.classList.remove("is-open");
      dropdown.hidden = true;
    }

    function open() {
      dropdown.hidden = false;
      dropdown.classList.add("is-open");
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value;
        if (!normalizeQuery(q)) {
          close();
          return;
        }
        loadIndex()
          .then(function (index) {
            // Ignore stale responses if the input changed while loading.
            if (normalizeQuery(input.value) !== normalizeQuery(q)) return;
            var hits = rankResults(index, q).slice(0, 8);
            renderHits(dropdown, hits, root);
            open();
          })
          .catch(function (err) {
            console.error("[WikiSearch] dropdown search failed:", err);
            if (normalizeQuery(input.value) !== normalizeQuery(q)) return;
            dropdown.innerHTML = "";
            var errEl = document.createElement("div");
            errEl.className = "search-error";
            errEl.textContent =
              "Search index failed to load. Use a local server or check search-index.js.";
            dropdown.appendChild(errEl);
            open();
          });
      }, 150);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    document.addEventListener("click", function (e) {
      if (!form.contains(e.target)) close();
    });
  }

  function wireMenu() {
    var btn = document.querySelector(".menu-toggle");
    var sidebar = document.getElementById("site-sidebar");
    if (!btn || !sidebar) return;

    var backdrop = document.querySelector(".sidebar-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sidebar-backdrop";
      backdrop.hidden = true;
      document.body.appendChild(backdrop);
    }

    function setOpen(open) {
      sidebar.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      backdrop.hidden = !open;
      document.body.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    btn.addEventListener("click", function () {
      setOpen(!sidebar.classList.contains("is-open"));
    });

    backdrop.addEventListener("click", function () {
      setOpen(false);
      btn.focus();
    });

    // Closing the drawer hides whatever held focus, so hand focus back to the toggle —
    // otherwise the next Tab restarts from the top of the page.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!sidebar.classList.contains("is-open")) return;
      setOpen(false);
      btn.focus();
    });
  }

  function wireResultsPage() {
    var mount = document.getElementById("search-results");
    if (!mount) return;
    var params = new URLSearchParams(window.location.search);
    var q = params.get("q") || "";
    var input = document.querySelector(".search-input");
    if (input) input.value = q;
    var root = getRoot();
    var heading = document.getElementById("search-query-label");
    if (heading) heading.textContent = q ? 'Results for “' + q + '”' : "Search";
    loadIndex()
      .then(function (index) {
        var hits = rankResults(index, q);
        if (!normalizeQuery(q)) {
          var emptyPrompt = document.createElement("p");
          emptyPrompt.className = "search-empty";
          emptyPrompt.textContent = "Type a query in the search box.";
          mount.replaceChildren(emptyPrompt);
          return;
        }
        if (!hits.length) {
          var emptyMatch = document.createElement("p");
          emptyMatch.className = "search-empty";
          emptyMatch.textContent =
            'No pages matched “' + q + '” — try a character or faction name.';
          mount.replaceChildren(emptyMatch);
          return;
        }
        var ul = document.createElement("ul");
        hits.forEach(function (hit) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = resolvePath(root, hit.path);
          a.textContent = hit.title;
          li.appendChild(a);
          var meta = document.createElement("div");
          meta.className = "hit-meta";
          meta.textContent = (hit.category || "") + (hit.summary ? " — " + hit.summary : "");
          li.appendChild(meta);
          ul.appendChild(li);
        });
        mount.replaceChildren(ul);
      })
      .catch(function (err) {
        console.error("[WikiSearch] results page failed:", err);
        var errP = document.createElement("p");
        errP.className = "search-error";
        errP.appendChild(
          document.createTextNode("Search index failed to load. Prefer ")
        );
        var code = document.createElement("code");
        code.textContent = "python -m http.server";
        errP.appendChild(code);
        errP.appendChild(
          document.createTextNode(" from the project root, and ensure ")
        );
        var code2 = document.createElement("code");
        code2.textContent = "assets/data/search-index.js";
        errP.appendChild(code2);
        errP.appendChild(document.createTextNode(" is present."));
        mount.replaceChildren(errP);
      });
  }

  function initSearch() {
    wireMenu();
    document.querySelectorAll(".search-form").forEach(wireForm);
    wireResultsPage();
  }

  window.WikiSearch = {
    normalizeQuery: normalizeQuery,
    scoreEntry: scoreEntry,
    rankResults: rankResults,
    resolvePath: resolvePath,
    initSearch: initSearch,
    loadIndex: loadIndex,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})(window, document);
