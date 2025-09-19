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
