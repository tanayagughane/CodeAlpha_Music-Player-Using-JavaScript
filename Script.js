const songs = [
   
        { title: "Song 1", artist: "Artist 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", img: "https://picsum.photos/200?random=1" },
        { title: "Song 2", artist: "Artist 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", img: "https://picsum.photos/200?random=2" },
        { title: "Song 3", artist: "Artist 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", img: "https://picsum.photos/200?random=3" },
        { title: "Song 4", artist: "Artist 4", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", img: "https://picsum.photos/200?random=4" },
        { title: "Song 5", artist: "Artist 5", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", img: "https://picsum.photos/200?random=5" },
        { title: "Song 6", artist: "Artist 6", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", img: "https://picsum.photos/200?random=6" },
        { title: "Song 7", artist: "Artist 7", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", img: "https://picsum.photos/200?random=7" },
        { title: "Song 8", artist: "Artist 8", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", img: "https://picsum.photos/200?random=8" },
        { title: "Song 9", artist: "Artist 9", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", img: "https://picsum.photos/200?random=9" },
        { title: "Song 10", artist: "Artist 10", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", img: "https://picsum.photos/200?random=10" }
      
  ];
  
  let currentIndex = 0;
  
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const songTitle = document.getElementById("song-title");
  const songArtist = document.getElementById("song-artist");
  const albumImg = document.getElementById("album-img");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeControl = document.getElementById("volume");
  const playlistEl = document.getElementById("playlist");
  
  // Load playlist in HTML
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => loadSong(index));
    playlistEl.appendChild(li);
  });
  
  // Load song
  function loadSong(index) {
    currentIndex = index;
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumImg.src = song.img;
    updatePlaylistHighlight();
    playAudio();
  }
  
  // Play/Pause
  function playAudio() {
    audio.play();
    playBtn.textContent = "⏸️";
    albumImg.style.animationPlayState = "running";
  }
  
  function pauseAudio() {
    audio.pause();
    playBtn.textContent = "▶️";
    albumImg.style.animationPlayState = "paused";
  }
  
  playBtn.addEventListener("click", () => audio.paused ? playAudio() : pauseAudio());
  
  // Previous/Next
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
  });
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
  });
  
  // Update progress bar
  audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
    progressBar.value = progressPercent;
  
    let min = Math.floor(audio.currentTime / 60);
    let sec = Math.floor(audio.currentTime % 60);
    if(sec < 10) sec = `0${sec}`;
    currentTimeEl.textContent = `${min}:${sec}`;
  
    if(audio.duration){
      let dMin = Math.floor(audio.duration / 60);
      let dSec = Math.floor(audio.duration % 60);
      if(dSec < 10) dSec = `0${dSec}`;
      durationEl.textContent = `${dMin}:${dSec}`;
    }
  });
  
  // Seek
  progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });
  
  // Volume
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });
  
  // Autoplay next song
  audio.addEventListener("ended", () => nextBtn.click());
  
  // Highlight current song in playlist
  function updatePlaylistHighlight(){
    playlistEl.querySelectorAll("li").forEach((li, idx) => {
      li.classList.toggle("active", idx === currentIndex);
    });
  }
  
  // Load first song
  loadSong(0);
  