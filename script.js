/* ═══════════════════════════════════════════════════════════════════
   OM PRAKASH ♥ SHALINI — WEDDING INVITATION & CINEMATIC STORY
   Master Script: Door Opening + Ganesha + Cinematic Photo Journey
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── DOM ELEMENTS ───────────────────────────────────────────────
  // Step 1: Palace Entrance
  const intro         = document.querySelector('#intro');
  const knockerBtn    = document.querySelector('#door-knocker');
  const doorway       = document.querySelector('#doorway');
  const finalNames    = document.querySelector('#final-names');
  const btnContinue   = document.querySelector('#btn-continue');

  // Step 2: Landing Screen
  const landingScreen = document.querySelector('#landing-screen');
  const enterStoryBtn = document.querySelector('#enter-story-btn');

  // Step 3: Cinematic Curtain & Prologue
  const curtain       = document.querySelector('#cinematic-curtain');
  const prologueLine1 = document.querySelector('#prologue-line1');
  const prologueLine2 = document.querySelector('#prologue-line2');
  const journey       = document.querySelector('#cinematic-journey');

  // Controls
  const audioControl  = document.querySelector('#audio-control');
  const audioBtn      = document.querySelector('#audio-btn');
  const audioLabel    = document.querySelector('#audio-label');
  const storyNav      = document.querySelector('#story-nav');

  // Chapter 7 Proposal Elements
  const chapter7      = document.querySelector('#chapter-7');
  const propImg       = document.querySelector('#proposal-img');
  const propStep1     = document.querySelector('#prop-step-1');
  const propStep2     = document.querySelector('#prop-step-2');
  const propStep3     = document.querySelector('#prop-step-3');

  let isEntranceTriggered = false;
  let isStoryEntered = false;
  let proposalRevealed = false;

  // ─── AUDIO ENGINE (CINEMATIC AMBIENT SYNTHESIZER) ───────────────
  let audioCtx = null;
  let masterGain = null;
  let isMusicPlaying = false;
  let ambientInterval = null;

  function initAudioEngine() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  }

  // Play a soft, resonant modal chime (Indian Raag inspired warm harmonics)
  function playAmbientChime(freq, duration = 3.5, gainVal = 0.08) {
    if (!audioCtx || !masterGain || audioCtx.state === 'suspended') return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  // Warm continuous drone pad (C# Indian Raag Yaman / Bhupali tonic)
  function startContinuousDrone() {
    if (!audioCtx || !masterGain) return;
    try {
      const droneFreqs = [138.59, 207.65, 277.18, 415.30]; // C#3, G#3, C#4, G#4
      droneFreqs.forEach((f) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
      });

      // Periodic delicate notes
      const notes = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37];
      ambientInterval = setInterval(() => {
        if (!isMusicPlaying) return;
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        playAmbientChime(randomNote, 4.0, 0.04);
      }, 2200);
    } catch (e) {}
  }

  function fadeInMusic(targetVol = 0.5, duration = 3.0) {
    initAudioEngine();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    masterGain.gain.setValueAtTime(masterGain.gain.value || 0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(targetVol, now + duration);
    isMusicPlaying = true;
    startContinuousDrone();
    if (audioControl) audioControl.classList.remove('paused');
    if (audioLabel) audioLabel.textContent = 'SOUND ON';
  }

  function fadeOutMusic(duration = 1.5) {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    isMusicPlaying = false;
    if (audioControl) audioControl.classList.add('paused');
    if (audioLabel) audioLabel.textContent = 'MUTED';
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      fadeOutMusic(1.0);
    } else {
      fadeInMusic(0.5, 1.5);
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleMusic);
  }

  // ─── STEP 1: BRASS KNOCKER SOUND & PALACE OPENING SEQUENCE ────────
  function playBrassKnockSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      // Low door thud
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
    } catch (e) {}
  }

  function initiateEntrance() {
    if (isEntranceTriggered) return;
    isEntranceTriggered = true;

    // Step 1: Knocker tactile vibration & sound
    if (knockerBtn) {
      knockerBtn.disabled = true;
      knockerBtn.classList.add('knocking');
    }
    playBrassKnockSound();

    // Step 2 (0.5s): Double doors begin opening
    setTimeout(() => {
      if (intro) intro.classList.add('opening');
    }, 500);

    // Step 3 (2.8s): Ganesha emerges from soft blur
    setTimeout(() => {
      if (intro) intro.classList.add('revealing');
    }, 2800);

    // Step 4 (5.0s): Doors fully open; royal gentle swing
    setTimeout(() => {
      if (intro) {
        intro.classList.add('open');
        intro.classList.add('swinging');
      }
    }, 5000);

    // Step 5 (11.4s): Ganesha settles; couple names & blessing fade in
    setTimeout(() => {
      if (intro) {
        intro.classList.remove('swinging');
        intro.classList.add('settled');
      }
      if (finalNames) {
        finalNames.classList.add('visible');
      }
    }, 11400);
  }

  if (knockerBtn) {
    knockerBtn.addEventListener('click', initiateEntrance);
    knockerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        initiateEntrance();
      }
    });
  }

  if (doorway) {
    doorway.addEventListener('click', initiateEntrance);
  }

  // ─── TRANSITION: PALACE STAGE -> LANDING SCREEN ──────────────────
  function transitionToLandingScreen() {
    if (intro) {
      intro.classList.add('leaving');
    }
    setTimeout(() => {
      if (intro) intro.classList.add('hidden');
      if (landingScreen) {
        landingScreen.classList.remove('hidden');
        window.scrollTo(0, 0);
      }
    }, 900);
  }

  if (btnContinue) {
    btnContinue.addEventListener('click', transitionToLandingScreen);
  }

  // ─── TRANSITION: LANDING SCREEN -> CINEMATIC PHOTO JOURNEY ───────
  function startCinematicStory() {
    if (isStoryEntered) return;
    isStoryEntered = true;

    // Fade in ambient music smoothly
    fadeInMusic(0.5, 3.0);

    // Activate dark curtain
    if (curtain) {
      curtain.classList.add('active');
    }

    // Sequence the prologue subtitles
    setTimeout(() => {
      if (prologueLine1) prologueLine1.classList.add('show');
    }, 600);

    setTimeout(() => {
      if (prologueLine2) prologueLine2.classList.add('show');
    }, 2400);

    // After pause, unveil the journey
    setTimeout(() => {
      if (landingScreen) landingScreen.classList.add('hidden');
      if (journey) journey.classList.remove('hidden');
      if (audioControl) audioControl.classList.remove('hidden');
      if (storyNav) storyNav.classList.remove('hidden');

      // Fade out curtain
      if (curtain) {
        curtain.classList.remove('active');
        setTimeout(() => curtain.classList.add('hidden'), 1000);
      }
      window.scrollTo(0, 0);
      setupScrollObservers();
    }, 5200);
  }

  if (enterStoryBtn) {
    enterStoryBtn.addEventListener('click', startCinematicStory);
  }

  // ─── CHAPTER 07: PROPOSAL REVEAL OBSERVER ─────────────────────────
  function revealProposal() {
    if (proposalRevealed) return;
    proposalRevealed = true;

    // Step 1: “Then came the question…”
    setTimeout(() => {
      if (propStep1) propStep1.classList.add('visible');
    }, 400);

    // Step 2: “And this time, I already knew my answer.”
    setTimeout(() => {
      if (propStep2) propStep2.classList.add('visible');
    }, 2000);

    // Step 3: Dramatic “YES. ❤️” reveal & proposal photo sharp reveal!
    setTimeout(() => {
      if (propStep3) propStep3.classList.add('visible');
      if (propImg) {
        propImg.classList.remove('hidden-photo');
        propImg.classList.add('revealed');
      }
      // Play triumphant emotional chime
      playAmbientChime(554.37, 4.5, 0.12);
    }, 3800);
  }

  // ─── SCROLL OBSERVERS FOR NAVIGATION & REVEALS ────────────────────
  function setupScrollObservers() {
    // Chapter 7 trigger
    if (chapter7 && 'IntersectionObserver' in window) {
      const propObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealProposal();
            propObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });

      propObserver.observe(chapter7);
    }

    // Story navigation active link updater
    const sections = document.querySelectorAll('#prologue, #wedding-reveal, #event-wedding, #event-reception, #rsvp-section');
    const navLinks = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window && sections.length > 0) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              if (link.dataset.target === id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { threshold: 0.4 });

      sections.forEach((sec) => navObserver.observe(sec));
    }
  }

  // ─── GLOBAL CALENDAR EXPORT ───────────────────────────────────────
  window.addToCalendar = function (type) {
    let title, details, location, start, end;

    if (type === 'wedding') {
      title = "Wedding of Shalini & Om Prakash";
      details = "Auspicious wedding ceremony of Arugonda Shalini and Gurram Om Prakash at BRR Madhura Conventions.";
      location = "BRR Madhura Conventions, Raghaipally, Veldanda, Amangal, Kalwakurthy, Telangana 509360";
      start = "20261206T090000";
      end   = "20261206T140000";
    } else {
      title = "Wedding Reception: Shalini & Om Prakash";
      details = "Celebratory evening wedding reception of Arugonda Shalini and Gurram Om Prakash at JMR Gardens.";
      location = "JMR Gardens, Nagarjuna Sagar Rd, Manneguda, Telangana 501510";
      start = "20261207T190000";
      end   = "20261207T233000";
    }

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(gcalUrl, '_blank');
  };

  // ─── RSVP SUBMISSION HANDLER ──────────────────────────────────────
  window.handleRSVP = function (e) {
    e.preventDefault();
    const guestName = document.querySelector('#guest-name')?.value;
    const phone     = document.querySelector('#guest-phone')?.value;
    const attendance = document.querySelector('#attendance')?.value;
    const guestCount = document.querySelector('#guest-count')?.value;
    const message   = document.querySelector('#guest-message')?.value;

    const rsvpData = { guestName, phone, attendance, guestCount, message, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem('wedding_rsvp_' + Date.now(), JSON.stringify(rsvpData));
    } catch (err) {}

    // Show success feedback
    const form = document.querySelector('#rsvp-form');
    const success = document.querySelector('#rsvp-success');
    if (form) form.classList.add('hidden');
    if (success) success.classList.remove('hidden');

    // Update WhatsApp link with prefilled personalized wish
    const waLink = document.querySelector('#whatsapp-direct');
    if (waLink) {
      const waText = encodeURIComponent(`Dear Shalini & Om Prakash,\n\nWarmest congratulations on your wedding! This is ${guestName || 'a family friend'}. ${message ? '"' + message + '" ' : ''}Looking forward to celebrating with you on Dec 6th & 7th!`);
      waLink.href = `https://wa.me/919989912345?text=${waText}`;
    }
  };

})();
