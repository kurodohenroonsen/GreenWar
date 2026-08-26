/**
 * GREENWAR ASBL - Accessible Client-Side Application Script
 * WCAG 2.1 AAA Compliant with dynamic Accessibility Panel, TTS Voice Synthesizer, & Responsive Navigation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize Accessibility Widget ---
  injectA11yWidget();
  initA11yControls();

  // --- Initialize Mobile Navigation ---
  initMobileNav();

  // --- Initialize Web Speech API TTS helper ---
  initTtsEngine();
});

/**
 * Dynamically injects the Accessibility floating button and options panel
 */
function injectA11yWidget() {
  const trigger = document.createElement("button");
  trigger.className = "a11y-trigger";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "a11y-panel");
  trigger.setAttribute("aria-label", "Options d'accessibilité (Taille de police, thème et synthèse vocale)");
  trigger.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
    </svg>
  `;

  const panel = document.createElement("div");
  panel.className = "a11y-panel";
  panel.id = "a11y-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Panneau d'accessibilité GREENWAR");
  panel.innerHTML = `
    <div class="a11y-header">
      <h3>Accessibilité</h3>
      <button class="a11y-close" aria-label="Fermer le panneau d'accessibilité">&times;</button>
    </div>

    <!-- Font Scaling -->
    <div class="a11y-group">
      <span class="a11y-group-title" id="font-label">Taille du texte</span>
      <div class="a11y-buttons" role="group" aria-labelledby="font-label">
        <button class="a11y-btn" id="a11y-font-dec" aria-label="Diminuer la taille du texte">A-</button>
        <button class="a11y-btn" id="a11y-font-reset" aria-label="Taille du texte normale">100%</button>
        <button class="a11y-btn" id="a11y-font-inc" aria-label="Augmenter la taille du texte">A+</button>
      </div>
    </div>

    <!-- Theme Selection -->
    <div class="a11y-group">
      <span class="a11y-group-title" id="theme-label">Thème & Contraste</span>
      <div class="a11y-buttons" role="group" aria-labelledby="theme-label">
        <button class="a11y-btn" id="a11y-theme-dark" aria-label="Thème sombre émeraude">Sombre</button>
        <button class="a11y-btn" id="a11y-theme-light" aria-label="Thème clair">Clair</button>
        <button class="a11y-btn" id="a11y-theme-contrast" aria-label="Contraste élevé jaune sur noir">Élevé</button>
      </div>
    </div>

    <!-- Text-to-Speech (TTS) -->
    <div class="a11y-group">
      <span class="a11y-group-title" id="tts-label">Lecture Vocale (TTS)</span>
      <div class="a11y-buttons" role="group" aria-labelledby="tts-label">
        <button class="a11y-btn" id="a11y-tts-btn" aria-label="Lire la page à voix haute">🔊 Lire la page</button>
        <button class="a11y-btn" id="a11y-tts-stop" aria-label="Arrêter la lecture">⏹ Stop</button>
      </div>
    </div>
  `;

  document.body.appendChild(trigger);
  document.body.appendChild(panel);
}

/**
 * Attaches event listeners for accessibility panel
 */
function initA11yControls() {
  const trigger = document.querySelector(".a11y-trigger");
  const panel = document.querySelector(".a11y-panel");
  const closeBtn = document.querySelector(".a11y-close");

  if (!trigger || !panel) return;

  const togglePanel = () => {
    const isOpen = panel.classList.toggle("open");
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      const firstBtn = panel.querySelector(".a11y-btn");
      if (firstBtn) setTimeout(() => firstBtn.focus(), 100);
    } else {
      trigger.focus();
    }
  };

  trigger.addEventListener("click", togglePanel);
  closeBtn.addEventListener("click", togglePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      togglePanel();
    }
  });

  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !trigger.contains(e.target) && panel.classList.contains("open")) {
      togglePanel();
    }
  });

  // --- Font Scaling ---
  let currentScale = 1.0;
  try {
    const storedScale = localStorage.getItem("gw-font-scale");
    if (storedScale) {
      currentScale = parseFloat(storedScale);
      document.documentElement.style.setProperty("--font-scale", currentScale);
    }
  } catch (err) {}

  const applyScale = (scale) => {
    currentScale = Math.max(0.75, Math.min(scale, 1.5));
    document.documentElement.style.setProperty("--font-scale", currentScale);
    try {
      localStorage.setItem("gw-font-scale", currentScale.toFixed(2));
    } catch (e) {}
  };

  document.getElementById("a11y-font-dec")?.addEventListener("click", () => applyScale(currentScale - 0.1));
  document.getElementById("a11y-font-reset")?.addEventListener("click", () => applyScale(1.0));
  document.getElementById("a11y-font-inc")?.addEventListener("click", () => applyScale(currentScale + 0.1));

  // --- Theme Controls ---
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      localStorage.setItem("gw-theme", theme);
    } catch (e) {}
    updateThemeButtons(theme);
  };

  const updateThemeButtons = (theme) => {
    document.querySelectorAll(".a11y-group .a11y-btn").forEach(btn => {
      if (btn.id.includes("theme")) btn.classList.remove("active");
    });
    const activeBtn = document.getElementById(`a11y-theme-${theme}`);
    if (activeBtn) activeBtn.classList.add("active");
  };

  document.getElementById("a11y-theme-dark")?.addEventListener("click", () => applyTheme("dark"));
  document.getElementById("a11y-theme-light")?.addEventListener("click", () => applyTheme("light"));
  document.getElementById("a11y-theme-contrast")?.addEventListener("click", () => applyTheme("high-contrast"));

  // Restore stored theme
  try {
    const storedTheme = localStorage.getItem("gw-theme") || "dark";
    applyTheme(storedTheme);
  } catch (e) {}
}

/**
 * Responsive Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/**
 * Web Speech API Text-to-Speech Engine
 */
function initTtsEngine() {
  if (!("speechSynthesis" in window)) {
    const ttsGroup = document.getElementById("tts-label")?.closest(".a11y-group");
    if (ttsGroup) ttsGroup.style.display = "none";
    return;
  }

  const ttsBtn = document.getElementById("a11y-tts-btn");
  const stopBtn = document.getElementById("a11y-tts-stop");

  ttsBtn?.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    // Collect all main text elements
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    const textNodes = [];
    const elements = mainContent.querySelectorAll("h1, h2, h3, p, blockquote, li");
    elements.forEach(el => {
      const text = el.innerText.trim();
      if (text) textNodes.push(text);
    });

    const fullText = textNodes.join(". ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "fr-FR";
    utterance.rate = 1.0;

    utterance.onstart = () => {
      if (ttsBtn) ttsBtn.classList.add("active");
    };
    utterance.onend = () => {
      if (ttsBtn) ttsBtn.classList.remove("active");
    };
    utterance.onerror = () => {
      if (ttsBtn) ttsBtn.classList.remove("active");
    };

    window.speechSynthesis.speak(utterance);
  });

  stopBtn?.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    if (ttsBtn) ttsBtn.classList.remove("active");
  });
}
