// =============================================
// Music Player Script
// =============================================
const audio = document.querySelector('.music');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Initialize volume
audio.volume = volumeSlider.value;

// Format time
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// Track if user is currently seeking
let isSeeking = false;

// Update time display AND progress bar automatically
audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);

  // Only update progress bar if user is not seeking
  if (!isSeeking) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  }
});

// Set duration when loaded
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<img src="assets/image-content/pause.png" alt="Pause" style="width: 20px; height: 20px;">';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<img src="assets/image-content/play.png" alt="Play" style="width: 20px; height: 20px;">';
  }
});

// Mark that user is seeking
progressBar.addEventListener('mousedown', () => {
  isSeeking = true;
});

progressBar.addEventListener('touchstart', () => {
  isSeeking = true;
});

// Seek on progress bar change
progressBar.addEventListener('change', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
  isSeeking = false;
});

// Also handle when mouse is released
progressBar.addEventListener('mouseup', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
  isSeeking = false;
});

// Volume control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Update play/pause button on audio events
audio.addEventListener('play', () => {
  playPauseBtn.innerHTML = '<img src="assets/image-content/pause.png" alt="Pause" style="width: 20px; height: 20px;">';
});

// =============================================
// Relationship Counter Script
// =============================================
const timeTogetherEl = document.getElementById('time-together');

// Start date: October 4, 2025
const startDate = new Date('2025-10-04T00:00:00');

// Function to calculate time difference
function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  if (diff < 0) {
    timeTogetherEl.textContent = 'Not yet started';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timeTogetherEl.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Update counter every second
setInterval(updateCounter, 1000);

// Initial update
updateCounter();
