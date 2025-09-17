const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let isPlaying = false;
let songIndex = 0;

// Daftar lagu
const songs = [
  { title: "Running-Gaho (OST Start-Up Pt.5)", src: "audio/gaho_running.mp3", cover: "images/gaho.png" },
  { title: "In The Rain-Kim Sejeong", src: "audio/kimsejeong_intherain.mp3", cover: "images/kimsj.png" },
  { title: "Quarter Life-TXT", src: "audio/txt_quarterlife.mp3", cover: "images/txt.png" },
  { title: "Palette-IU ft.G-Dragon", src: "audio/iu_palette.mp3", cover: "images/iu.png" },
  { title: "Popcorn-Do Kyungsoo", src: "audio/do.mp3", cover: "images/do.png" },
  { title: "Super Shy-Newjeans", src: "audio/supershy.mp3", cover: "images/supershy.png"}, 
  {title: "Hear Me Out-EXO", src: "audio/exo.mp3", cover: "images/exo.png"},
  {title: "Marathon-Day6", src: "audio/daysix.mp3", cover: "images/daysix.png"}
];

const songList = document.getElementById("songList");

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songIndex);
    playSong();
  });
  songList.appendChild(li);
});


function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  cover.src = songs[index].cover;
}


function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

function playSong() {
  audio.play();
  playBtn.src = "images/pause.png";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.src = "images/play.png";
  isPlaying = false;
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function shuffleSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === songIndex); // avoid same song
  songIndex = randomIndex;
  loadSong(songIndex);
  playSong();
}


function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  
  currentTimeEl.textContent = formatTime(currentTime);

  
  if (!isNaN(duration)) {
    durationEl.textContent = formatTime(duration);
  }
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}


playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

const shuffleBtn = document.getElementById("shuffleBtn");
shuffleBtn.addEventListener("click", shuffleSong);


audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// Init
loadSong(songIndex);
