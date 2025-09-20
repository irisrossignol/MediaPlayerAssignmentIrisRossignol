const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");

video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here

// Événement : mise à jour de la barre à chaque avancée de la vidéo
video.addEventListener("timeupdate", updateProgressBar);

// Cliquer sur la barre pour avancer/reculer
progressBar.parentElement.addEventListener("click", (e) => {
  const bar = e.currentTarget;
  const clickPosition = e.offsetX;
  const barWidth = bar.offsetWidth;
  const newTime = (clickPosition / barWidth) * video.duration;
  video.currentTime = newTime;
});

// Mute / Unmute
const muteBtn = document.querySelector("#mute-btn");
const muteImg = document.querySelector("#mute-img");

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  if (video.muted) {
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/mute--v1.png";
  } else {
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";
  }
});

// Icône par défaut = volume activé
muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";

// Fullscreen toggle
const fullscreenBtn = document.querySelector("#fullscreen-btn");
const fullscreenImg = document.querySelector("#fullscreen-img");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
    fullscreenImg.src = "https://img.icons8.com/ios-glyphs/30/collapse.png"; // icône "réduire"
  } else {
    document.exitFullscreen();
    fullscreenImg.src =
      "https://img.icons8.com/ios-glyphs/30/full-screen--v1.png"; // icône "plein écran"
  }
});

// Double-clic sur la vidéo pour activer/désactiver le plein écran
video.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
    fullscreenImg.src = "https://img.icons8.com/ios-glyphs/30/collapse.png"; // icône "réduire"
  } else {
    document.exitFullscreen();
    fullscreenImg.src =
      "https://img.icons8.com/ios-glyphs/30/full-screen--v1.png"; // icône "plein écran"
  }
});

const jumpButtons = document.querySelectorAll(".jump-buttons button");
jumpButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const time = parseFloat(btn.dataset.time);
    video.currentTime = time;
    video.play(); // si tu veux qu'elle joue après le saut
  });
});

// --- Nouvelle fonctionnalité : Step buttons highlight ---
const stepButtons = document.querySelectorAll(".step-btn");

// Quand je clique sur un bouton → la vidéo saute au bon moment
stepButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const time = parseInt(btn.getAttribute("data-time"));
    video.currentTime = time;
    video.play();

    // Active uniquement le bouton cliqué
    stepButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Pendant la lecture → mettre à jour quelle étape est active
video.addEventListener("timeupdate", () => {
  stepButtons.forEach((btn, index) => {
    const time = parseInt(btn.getAttribute("data-time"));
    const nextTime = stepButtons[index + 1]
      ? parseInt(stepButtons[index + 1].getAttribute("data-time"))
      : video.duration;

    if (video.currentTime >= time && video.currentTime < nextTime) {
      stepButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }
  });
});
