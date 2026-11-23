/* Platform sound feedback — additive only; no UI controls or saved settings. */
(function () {
  "use strict";

  let audioContext = null;
  const speech = window.speechSynthesis;

  function getAudioContext() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      try { audioContext = new AudioContextClass(); } catch (e) { return null; }
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(function () {});
    }
    return audioContext;
  }

  function tone(frequency, duration, volume, type, delay) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const start = ctx.currentTime + (delay || 0);
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume || 0.035), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function playClick() {
    tone(760, 0.055, 0.018, "sine", 0);
  }

  // Short, bright coin-counting sound for a correct answer (~0.6 seconds).
  function playCorrect() {
    tone(1318.5, 0.11, 0.035, "triangle", 0);
    tone(1760, 0.12, 0.034, "triangle", 0.10);
    tone(2093, 0.13, 0.032, "sine", 0.21);
    tone(2637, 0.16, 0.028, "sine", 0.32);
    tone(2093, 0.10, 0.022, "sine", 0.46);
  }

  // Clear low descending alert for an incorrect answer.
  function playWrong() {
    tone(220, 0.18, 0.038, "sawtooth", 0);
    tone(165, 0.22, 0.034, "sawtooth", 0.16);
  }

  function playFinished() {
    tone(523.25, 0.15, 0.03, "sine", 0);
    tone(659.25, 0.15, 0.03, "sine", 0.14);
    tone(783.99, 0.18, 0.03, "sine", 0.28);
  }

  function speakMotivation(message) {
    if (!speech || !message || typeof SpeechSynthesisUtterance === "undefined") return;
    try {
      speech.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "ar-EG";
      utterance.rate = 1;
      utterance.pitch = 0.82;
      const voices = speech.getVoices ? speech.getVoices() : [];
      const arabicVoices = voices.filter(function (voice) {
        return /^ar([_-]|$)/i.test(voice.lang || "");
      });
      const likelyMale = arabicVoices.find(function (voice) {
        return /male|hamed|hamid|maged|majed|tarik|tariq|omar|ahmed|mohamed|youssef|khaled/i.test(voice.name || "");
      });
      utterance.voice = likelyMale || arabicVoices[0] || null;
      speech.speak(utterance);
    } catch (e) {}
  }

  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest(".word-day-audio")) return;
    const target = event.target && event.target.closest
      ? event.target.closest("button, .tab, .subTab, .gradeTab, .page-nav a, .home-action, .platform-back-button, a[href$='.html']")
      : null;
    if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return;
    playClick();
  }, true);

  window.PlatformSounds = {
    playAnswer: function (isCorrect) {
      if (isCorrect) playCorrect();
      else playWrong();
    },
    playQuizResult: function (outcomes, message) {
      const results = Array.isArray(outcomes) ? outcomes : [];
      const gap = 0.22;
      results.forEach(function (isCorrect, index) {
        window.setTimeout(function () {
          if (isCorrect) playCorrect();
          else playWrong();
        }, index * gap * 1000);
      });
      const finishDelay = results.length * gap * 1000 + 120;
      window.setTimeout(playFinished, finishDelay);
      window.setTimeout(function () { speakMotivation(message); }, finishDelay + 650);
    }
  };
})();
