(function () {
  "use strict";

  var lang = (document.documentElement.lang || "fr").toLowerCase();

  var I18N = {
    fr: {
      empty: "Coche ton premier défi !",
      all: "Tous les défis réussis ! Tu es un vrai gardien de la Terre.",
      progress: function (done, total) { return done + " défi" + (done > 1 ? "s" : "") + " sur " + total + ". Continue !"; },
      good: "Bravo ! ",
      bad: "Pas tout à fait. "
    },
    en: {
      empty: "Check off your first challenge!",
      all: "All challenges completed! You are a true Earth Guardian.",
      progress: function (done, total) { return done + " of " + total + " challenges completed. Keep going!"; },
      good: "Great job! ",
      bad: "Not quite. "
    },
    nl: {
      empty: "Vink je eerste uitdaging af!",
      all: "Alle uitdagingen gehaald! Je bent een echte Aardebeschermer.",
      progress: function (done, total) { return done + " van de " + total + " uitdagingen behaald. Ga zo door!"; },
      good: "Goed gedaan! ",
      bad: "Niet helemaal. "
    },
    de: {
      empty: "Hake deine erste Herausforderung ab!",
      all: "Alle Herausforderungen geschafft! Du bist ein echter Erdenhüter.",
      progress: function (done, total) { return done + " von " + total + " Herausforderungen geschafft. Weiter so!"; },
      good: "Klasse gemacht! ",
      bad: "Nicht ganz. "
    },
    ja: {
      empty: "最初のチャレンジにチェックを入れてみよう！",
      all: "すべてのチャレンジを達成！きみは本物の地球の守護者です。",
      progress: function (done, total) { return total + "個中 " + done + "個達成。その調子！"; },
      good: "正解！ ",
      bad: "おしい！ "
    }
  };

  var t = I18N[lang] || I18N.fr;

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
})();
