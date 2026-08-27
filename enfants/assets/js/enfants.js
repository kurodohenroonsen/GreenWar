(function () {
  "use strict";

  var lang = (document.documentElement.lang || "fr").toLowerCase();
  var STORAGE_SCALE = "gw-kids-scale";
  var STORAGE_STYLE = "gw-img-style";

  var memStore = {};
  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { memStore[key] = value; }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return memStore[key] || null; }
  }

  var I18N = {
    fr: {
      empty: "Coche ton premier défi !",
      all: "Tous les défis réussis ! Tu es un vrai gardien de la Terre.",
      progress: function (done, total) { return done + " défi" + (done > 1 ? "s" : "") + " sur " + total + ". Continue !"; },
      good: "Bravo ! ",
      bad: "Pas tout à fait. ",
      a11y_btn: "Options et styles d'images",
      a11y_title: "Accessibilité & Images",
      close: "Fermer",
      font: "Taille du texte",
      style: "Style des images",
      cartoon: "🎨 Cartoon",
      real: "📷 Vraie Nature",
      toon: "🦊 3D Zootopia",
      tts: "Écouter l'histoire",
      play: "▶ Lire",
      stop: "⏹ Arrêter"
    },
    en: {
      empty: "Check off your first challenge!",
      all: "All challenges completed! You are a true Earth Guardian.",
      progress: function (done, total) { return done + " of " + total + " challenges completed. Keep going!"; },
      good: "Great job! ",
      bad: "Not quite. ",
      a11y_btn: "Options and image styles",
      a11y_title: "Accessibility & Visuals",
      close: "Close",
      font: "Text size",
      style: "Image style",
      cartoon: "🎨 Cartoon",
      real: "📷 Real Nature",
      toon: "🦊 3D Zootopia",
      tts: "Listen to story",
      play: "▶ Play",
      stop: "⏹ Stop"
    },
    nl: {
      empty: "Vink je eerste uitdaging af!",
      all: "Alle uitdagingen gehaald! Je bent een echte Aardebeschermer.",
      progress: function (done, total) { return done + " van de " + total + " uitdagingen behaald. Ga zo door!"; },
      good: "Goed gedaan! ",
      bad: "Niet helemaal. ",
      a11y_btn: "Opties en beeldstijlen",
      a11y_title: "Toegankelijkheid & Beelden",
      close: "Sluiten",
      font: "Tekstgrootte",
      style: "Beeldstijl",
      cartoon: "🎨 Cartoon",
      real: "📷 Echte Natuur",
      toon: "🦊 3D Zootopia",
      tts: "Luister naar het verhaal",
      play: "▶ Luisteren",
      stop: "⏹ Stoppen"
    },
    de: {
      empty: "Hake deine erste Herausforderung ab!",
      all: "Alle Herausforderungen geschafft! Du bist ein echter Erdenhüter.",
      progress: function (done, total) { return done + " von " + total + " Herausforderungen geschafft. Weiter so!"; },
      good: "Klasse gemacht! ",
      bad: "Nicht ganz. ",
      a11y_btn: "Optionen und Bildstile",
      a11y_title: "Barrierefreiheit & Bilder",
      close: "Schließen",
      font: "Textgröße",
      style: "Bildstil",
      cartoon: "🎨 Cartoon",
      real: "📷 Echte Natur",
      toon: "🦊 3D Zootopia",
      tts: "Geschichte anhören",
      play: "▶ Vorlesen",
      stop: "⏹ Stoppen"
    },
    ja: {
      empty: "最初のチャレンジにチェックを入れてみよう！",
      all: "すべてのチャレンジを達成！きみは本物の地球の守護者です。",
      progress: function (done, total) { return total + "個中 " + done + "個達成。その調子！"; },
      good: "正解！ ",
      bad: "おしい！ ",
      a11y_btn: "オプション・画像設定",
      a11y_title: "アクセシビリティ・画像",
      close: "閉じる",
      font: "文字サイズ",
      style: "イラストスタイル",
      cartoon: "🎨 カートゥーン",
      real: "📷 リアル写真",
      toon: "🦊 3Dズートピア",
      tts: "お話をきく",
      play: "▶ 読み上げ",
      stop: "⏹ 停止"
    }
  };

  var t = I18N[lang] || I18N.fr;

  /* ---------- Menu Mobile ---------- */
  var toggle = document.querySelector(".menu-toggle"), menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  function isKidsImage(url) {
    if (!url) return false;
    return /assets\/imgs\/(?:0[1-9]|1[0-2])[-_]/i.test(url) ||
           /(?:pepin|terre|jardin|geants|voyage|larves|equipes|pouvoir|passeport|ferme|gardiens)[-_]/i.test(url);
  }

  /* ---------- Switcher Style d'Images Enfants ---------- */
  function updateImageSrc(url, style) {
    if (!url) return url;
    var is800 = url.indexOf("-800.") !== -1;
    var extMatch = url.match(/\.(jpg|jpeg|webp|png)$/i);
    if (!extMatch) return url;
    var ext = extMatch[1];

    var base = url.replace(/-800\.(?:jpg|jpeg|webp|png)$/i, "")
                  .replace(/-(?:real|toon)\.(?:jpg|jpeg|webp|png)$/i, "")
                  .replace(/-(?:real|toon)$/i, "")
                  .replace(/\.(?:jpg|jpeg|webp|png)$/i, "");

    if (style === "real") {
      return base + "-real" + (is800 ? "-800." : ".") + ext;
    } else if (style === "toon") {
      return base + "-toon" + (is800 ? "-800." : ".") + ext;
    } else {
      return base + (is800 ? "-800." : ".") + ext;
    }
  }

  function setKidsImageStyle(style) {
    var validStyles = ["scifi", "cartoon", "real", "toon"];
    if (style === "cartoon") style = "scifi";
    if (validStyles.indexOf(style) === -1) style = "scifi";

    document.documentElement.setAttribute("data-img-style", style);
    store(STORAGE_STYLE, style);

    document.querySelectorAll("img").forEach(function (img) {
      var src = img.getAttribute("src");
      if (isKidsImage(src)) {
        img.src = updateImageSrc(src, style);
      }
    });

    document.querySelectorAll("source").forEach(function (source) {
      var srcset = source.getAttribute("srcset");
      if (isKidsImage(srcset)) {
        var parts = srcset.split(",").map(function (part) {
          var trimmed = part.trim();
          var segs = trimmed.split(/\s+/);
          segs[0] = updateImageSrc(segs[0], style);
          return segs.join(" ");
        });
        source.srcset = parts.join(", ");
      }
    });

    document.querySelectorAll("[data-kids-style]").forEach(function (btn) {
      var s = btn.dataset.kidsStyle === "cartoon" ? "scifi" : btn.dataset.kidsStyle;
      btn.classList.toggle("active", s === style);
    });
  }

  /* ---------- Widget Accessibilité Junior ---------- */
  function buildKidsA11y() {
    if (document.querySelector(".kids-a11y-trigger")) return;

    var trigger = document.createElement("button");
    trigger.className = "kids-a11y-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", t.a11y_btn);
    trigger.innerHTML = '🎨';

    var panel = document.createElement("div");
    panel.className = "kids-a11y-panel";
    panel.id = "kids-a11y-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", t.a11y_title);
    panel.innerHTML =
      '<div class="kids-a11y-header"><h3>' + t.a11y_title + '</h3>' +
      '<button type="button" class="kids-a11y-close" aria-label="' + t.close + '">&times;</button></div>' +
      '<div class="kids-a11y-group"><span class="kids-a11y-label">' + t.font + '</span>' +
      '<div class="kids-a11y-btns">' +
      '<button type="button" class="kids-a11y-btn" data-kids-scale="-0.1">A−</button>' +
      '<button type="button" class="kids-a11y-btn" data-kids-scale="reset">100 %</button>' +
      '<button type="button" class="kids-a11y-btn" data-kids-scale="0.1">A+</button></div></div>' +
      '<div class="kids-a11y-group"><span class="kids-a11y-label">' + t.style + '</span>' +
      '<div class="kids-a11y-btns kids-a11y-btns--styles">' +
      '<button type="button" class="kids-a11y-btn" data-kids-style="cartoon">' + t.cartoon + '</button>' +
      '<button type="button" class="kids-a11y-btn" data-kids-style="real">' + t.real + '</button>' +
      '<button type="button" class="kids-a11y-btn" data-kids-style="toon">' + t.toon + '</button></div></div>' +
      '<div class="kids-a11y-group" id="kids-tts"><span class="kids-a11y-label">' + t.tts + '</span>' +
      '<div class="kids-a11y-btns">' +
      '<button type="button" class="kids-a11y-btn" data-kids-tts="play">' + t.play + '</button>' +
      '<button type="button" class="kids-a11y-btn" data-kids-tts="stop">' + t.stop + '</button></div></div>';

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    function setOpen(open) {
      panel.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    trigger.addEventListener("click", function () { setOpen(!panel.classList.contains("open")); });
    panel.querySelector(".kids-a11y-close").addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) setOpen(false);
    });

    var scale = parseFloat(read(STORAGE_SCALE)) || 1;
    function applyScale(val) {
      scale = Math.min(1.4, Math.max(0.8, Math.round(val * 100) / 100));
      document.documentElement.style.setProperty("--font-scale", scale);
      store(STORAGE_SCALE, scale);
    }
    applyScale(scale);

    panel.addEventListener("click", function (e) {
      var btn = e.target.closest(".kids-a11y-btn");
      if (!btn) return;

      if (btn.dataset.kidsScale !== undefined) {
        var v = btn.dataset.kidsScale;
        applyScale(v === "reset" ? 1 : scale + parseFloat(v));
      }
      if (btn.dataset.kidsStyle !== undefined) {
        setKidsImageStyle(btn.dataset.kidsStyle);
      }
      if (btn.dataset.kidsTts !== undefined) {
        if (btn.dataset.kidsTts === "play") startKidsTTS();
        else stopKidsTTS();
      }
    });

    // Global listener for data-kids-style
    document.querySelectorAll("[data-kids-style]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setKidsImageStyle(btn.dataset.kidsStyle);
      });
    });

    var savedStyle = read(STORAGE_STYLE);
    if (savedStyle) {
      setKidsImageStyle(savedStyle);
    }
  }

  /* ---------- TTS Junior ---------- */
  var ttsLangs = { fr: "fr-FR", en: "en-US", nl: "nl-NL", de: "de-DE", ja: "ja-JP" };
  function startKidsTTS() {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var main = document.querySelector("main") || document.body;
      var parts = [];
      main.querySelectorAll("h1, h2, h3, p, li").forEach(function (el) {
        var tx = el.innerText.trim();
        if (tx) parts.push(tx);
      });
      var u = new SpeechSynthesisUtterance(parts.join(". "));
      u.lang = ttsLangs[lang] || "fr-FR";
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  function stopKidsTTS() {
    try {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } catch (e) {}
  }

  /* ---------- Quiz & Défis ---------- */
  var boxes = document.querySelectorAll("[data-mission]"), score = document.getElementById("score");
  if (boxes.length) {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem("gw-junior-missions") || "{}"); } catch (e) {}
    function update() {
      var done = 0, state = {};
      boxes.forEach(function (b) { if (b.checked) done++; state[b.dataset.mission] = b.checked; });
      try { localStorage.setItem("gw-junior-missions", JSON.stringify(state)); } catch (e) {}
      if (!score) return;
      if (done === 0) score.textContent = t.empty;
      else if (done === boxes.length) score.textContent = t.all;
      else score.textContent = t.progress(done, boxes.length);
    }
    boxes.forEach(function (b) { b.checked = !!saved[b.dataset.mission]; b.addEventListener("change", update); });
    update();
  }

  document.querySelectorAll(".quiz__q").forEach(function (q) {
    var why = q.querySelector(".quiz__why");
    q.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        q.querySelectorAll("button").forEach(function (x) { x.classList.remove("good", "bad"); });
        var good = b.dataset.good === "1";
        b.classList.add(good ? "good" : "bad");
        why.textContent = (good ? t.good : t.bad) + b.dataset.why;
      });
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildKidsA11y);
  } else {
    buildKidsA11y();
  }
})();
