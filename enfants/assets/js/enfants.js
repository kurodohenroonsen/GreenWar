(function () {
  "use strict";
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
      if (done === 0) score.textContent = "Coche ton premier défi !";
      else if (done === boxes.length) score.textContent = "Tous les défis réussis ! Tu es un vrai gardien de la Terre.";
      else score.textContent = done + " défi" + (done > 1 ? "s" : "") + " sur " + boxes.length + ". Continue !";
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
        why.textContent = (good ? "Bravo ! " : "Pas tout à fait. ") + b.dataset.why;
      });
    });
  });
})();
