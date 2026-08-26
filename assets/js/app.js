/**
 * GREENWAR ASBL — script client
 * Navigation mobile, panneau d'accessibilité (taille du texte, thème, lecture vocale).
 * Aucune dépendance, fonctionne hors-ligne.
 */
(function () {
  "use strict";

  var STORAGE_THEME = "gw-theme";
  var STORAGE_SCALE = "gw-font-scale";

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* stockage indisponible */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ---------- Navigation mobile ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---------- Widget accessibilité ---------- */
  function buildWidget() {
    var trigger = document.createElement("button");
    trigger.className = "a11y-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "a11y-panel");
    trigger.setAttribute("aria-label", "Options d'accessibilité");
    trigger.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>';

    var panel = document.createElement("div");
    panel.className = "a11y-panel";
    panel.id = "a11y-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Options d'accessibilité");
    panel.innerHTML =
      '<div class="a11y-header"><h2>Accessibilité</h2>' +
      '<button type="button" class="a11y-close" aria-label="Fermer">&times;</button></div>' +
      '<div class="a11y-group"><span class="a11y-group-title" id="a11y-font-label">Taille du texte</span>' +
      '<div class="a11y-buttons" role="group" aria-labelledby="a11y-font-label">' +
      '<button type="button" class="a11y-btn" data-scale="-0.1" aria-label="Réduire le texte">A−</button>' +
      '<button type="button" class="a11y-btn" data-scale="reset" aria-label="Taille normale">100 %</button>' +
      '<button type="button" class="a11y-btn" data-scale="0.1" aria-label="Agrandir le texte">A+</button></div></div>' +
      '<div class="a11y-group"><span class="a11y-group-title" id="a11y-theme-label">Thème</span>' +
      '<div class="a11y-buttons" role="group" aria-labelledby="a11y-theme-label">' +
      '<button type="button" class="a11y-btn" data-theme="dark">Sombre</button>' +
      '<button type="button" class="a11y-btn" data-theme="light">Clair</button>' +
      '<button type="button" class="a11y-btn" data-theme="high-contrast">Contraste</button></div></div>' +
      '<div class="a11y-group" id="a11y-tts"><span class="a11y-group-title" id="a11y-tts-label">Lecture vocale</span>' +
      '<div class="a11y-buttons" role="group" aria-labelledby="a11y-tts-label">' +
      '<button type="button" class="a11y-btn" data-tts="play">Lire la page</button>' +
      '<button type="button" class="a11y-btn" data-tts="stop">Arrêter</button></div></div>';

    document.body.appendChild(trigger);
    document.body.appendChild(panel);
    return { trigger: trigger, panel: panel };
  }

  function initA11y() {
    var w = buildWidget();
    var trigger = w.trigger, panel = w.panel;

    function setOpen(open) {
      panel.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var first = panel.querySelector(".a11y-btn");
        if (first) first.focus();
      } else {
        trigger.focus();
      }
    }

    trigger.addEventListener("click", function () { setOpen(!panel.classList.contains("open")); });
    panel.querySelector(".a11y-close").addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !panel.contains(e.target) && !trigger.contains(e.target)) {
        panel.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    /* Taille du texte */
    var scale = parseFloat(read(STORAGE_SCALE)) || 1;
    function applyScale(value) {
      scale = Math.min(1.5, Math.max(0.8, Math.round(value * 100) / 100));
      document.documentElement.style.setProperty("--font-scale", scale);
      store(STORAGE_SCALE, scale);
    }
    applyScale(scale);
    panel.querySelectorAll("[data-scale]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var v = btn.getAttribute("data-scale");
        applyScale(v === "reset" ? 1 : scale + parseFloat(v));
      });
    });

    /* Thème */
    function applyTheme(theme) {
      if (theme === "dark") document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", theme);
      store(STORAGE_THEME, theme);
      panel.querySelectorAll("[data-theme]").forEach(function (b) {
        var active = b.getAttribute("data-theme") === theme;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }
    panel.querySelectorAll("[data-theme]").forEach(function (btn) {
      btn.addEventListener("click", function () { applyTheme(btn.getAttribute("data-theme")); });
    });
    applyTheme(read(STORAGE_THEME) || "dark");

    /* Lecture vocale */
    var ttsGroup = panel.querySelector("#a11y-tts");
    if (!("speechSynthesis" in window)) {
      ttsGroup.remove();
      return;
    }
    var playBtn = panel.querySelector('[data-tts="play"]');
    var stopBtn = panel.querySelector('[data-tts="stop"]');

    playBtn.addEventListener("click", function () {
      window.speechSynthesis.cancel();
      var main = document.getElementById("main-content");
      if (!main) return;
      var parts = [];
      main.querySelectorAll("h1, h2, h3, p, blockquote, li").forEach(function (el) {
        var t = el.innerText.trim();
        if (t) parts.push(t);
      });
      var u = new SpeechSynthesisUtterance(parts.join(". "));
      u.lang = "fr-FR";
      u.onstart = function () { playBtn.classList.add("active"); };
      u.onend = u.onerror = function () { playBtn.classList.remove("active"); };
      window.speechSynthesis.speak(u);
    });
    stopBtn.addEventListener("click", function () {
      window.speechSynthesis.cancel();
      playBtn.classList.remove("active");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initA11y();
  });
})();
