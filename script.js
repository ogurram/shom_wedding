/* ═══════════════════════════════════════════════════════════════════
   SHALINI & PRAKASH — CINEMATIC WEDDING ENTRANCE EXPERIENCE
   Interactive State Machine & Ceremonial Sequence
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // DOM Elements
  const intro         = document.querySelector('#intro');
  const knockerBtn    = document.querySelector('#door-knocker');
  const finalNames    = document.querySelector('#final-names');
  const website       = document.querySelector('#website');
  const btnContinue   = document.querySelector('#btn-continue');
  const btnReplay     = document.querySelector('#btn-replay');

  // Animation State Guard
  let isTriggered = false;

  // Reset to initial closed state
  function resetState() {
    isTriggered = false;
    if (intro) intro.className = 'intro';
    if (finalNames) finalNames.className = 'final-names';
    if (website) website.className = 'website';
    if (knockerBtn) {
      knockerBtn.disabled = false;
      knockerBtn.classList.remove('knocking');
    }
  }

  // Synthesize realistic subtle antique brass knocker sound
  function playBrassKnockSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      
      // Low wood/door thud
      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(95, now);
      oscLow.frequency.exponentialRampToValueAtTime(35, now + 0.18);
      gainLow.gain.setValueAtTime(0.45, now);
      gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      oscLow.connect(gainLow);
      gainLow.connect(ctx.destination);
      oscLow.start(now);
      oscLow.stop(now + 0.25);

      // Brass ring resonance
      const oscBrass = ctx.createOscillator();
      const gainBrass = ctx.createGain();
      oscBrass.type = 'triangle';
      oscBrass.frequency.setValueAtTime(540, now);
      oscBrass.frequency.exponentialRampToValueAtTime(260, now + 0.35);
      gainBrass.gain.setValueAtTime(0.2, now);
      gainBrass.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      oscBrass.connect(gainBrass);
      gainBrass.connect(ctx.destination);
      oscBrass.start(now);
      oscBrass.stop(now + 0.42);

      // Rebound tap
      const reboundTime = now + 0.12;
      const oscRebound = ctx.createOscillator();
      const gainRebound = ctx.createGain();
      oscRebound.type = 'triangle';
      oscRebound.frequency.setValueAtTime(680, reboundTime);
      gainRebound.gain.setValueAtTime(0.12, reboundTime);
      gainRebound.gain.exponentialRampToValueAtTime(0.001, reboundTime + 0.18);
      oscRebound.connect(gainRebound);
      gainRebound.connect(ctx.destination);
      oscRebound.start(reboundTime);
      oscRebound.stop(reboundTime + 0.2);

    } catch (e) {
      // Audio context might be restricted; visual animation proceeds
    }
  }

  // Master Ceremonial Entrance Sequence
  function initiateEntrance() {
    if (isTriggered) return;
    isTriggered = true;

    // Step 1 (0.0s): Tactile knocker feedback & disable repeated clicks
    knockerBtn.disabled = true;
    knockerBtn.classList.add('knocking');
    playBrassKnockSound();

    // Step 2 (0.5s): Short natural pause, then doors slowly and gracefully begin opening
    setTimeout(() => {
      intro.classList.add('opening');
    }, 500);

    // Step 3 (2.8s): Doors reach mid-swing; Ganesha emerges from soft blur into sharp focus
    setTimeout(() => {
      intro.classList.add('revealing');
    }, 2800);

    // Step 4 (5.0s): Doors fully open; start the 2 gentle ceremonial swings
    setTimeout(() => {
      intro.classList.add('open');
      intro.classList.add('swinging');
    }, 5000);

    // Step 5 (11.4s): Swings conclude naturally and settle; couple names & divine blessings fade in
    setTimeout(() => {
      intro.classList.remove('swinging');
      intro.classList.add('settled');
      if (finalNames) {
        finalNames.classList.add('visible');
      }
    }, 11400);
  }

  function enterWebsite() {
    if (intro) intro.classList.add('leaving');
    if (website) website.classList.add('visible');
  }

  const doorway = document.querySelector('#doorway');
  if (doorway) {
    doorway.addEventListener('click', initiateEntrance);
  }

  if (knockerBtn) {
    knockerBtn.addEventListener('click', initiateEntrance);

    knockerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        initiateEntrance();
      }
    });

    knockerBtn.addEventListener('touchstart', () => {}, { passive: true });
  }

  if (btnContinue) {
    btnContinue.addEventListener('click', enterWebsite);
  }

  if (btnReplay) {
    btnReplay.addEventListener('click', resetState);
  }

  // Always reset on initial load
  resetState();

})();
