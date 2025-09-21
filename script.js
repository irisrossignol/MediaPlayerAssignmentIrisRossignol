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

video.addEventListener("timeupdate", updateProgressBar);

progressBar.parentElement.addEventListener("click", (e) => {
  const bar = e.currentTarget;
  const clickPosition = e.offsetX;
  const barWidth = bar.offsetWidth;
  const newTime = (clickPosition / barWidth) * video.duration;
  video.currentTime = newTime;
});

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

muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";

const fullscreenBtn = document.querySelector("#fullscreen-btn");
const fullscreenImg = document.querySelector("#fullscreen-img");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
    fullscreenImg.src = "https://img.icons8.com/ios-glyphs/30/collapse.png";
  } else {
    document.exitFullscreen();
    fullscreenImg.src =
      "https://img.icons8.com/ios-glyphs/30/full-screen--v1.png";
  }
});

video.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
    fullscreenImg.src = "https://img.icons8.com/ios-glyphs/30/collapse.png";
  } else {
    document.exitFullscreen();
    fullscreenImg.src =
      "https://img.icons8.com/ios-glyphs/30/full-screen--v1.png";
  }
});

const jumpButtons = document.querySelectorAll(".jump-buttons button");
jumpButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const time = parseFloat(btn.dataset.time);
    video.currentTime = time;
    video.play();
  });
});

const stepButtons = document.querySelectorAll(".step-btn");

stepButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const time = parseInt(btn.getAttribute("data-time"));
    video.currentTime = time;
    video.play();

    stepButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

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
