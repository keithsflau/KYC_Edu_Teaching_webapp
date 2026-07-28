document.addEventListener("DOMContentLoaded", () => {
  const playlistEl = document.getElementById("playlist");
  const audioPlayer = document.getElementById("audio-player");
  const currentTitle = document.getElementById("current-title");
  const currentDate = document.getElementById("current-date");
  const visualizer = document.getElementById("visualizer");

  // Create visualizer bars
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = Math.random() * 80 + "%";
    bar.style.animationDuration = 0.5 + Math.random() + "s";
    visualizer.appendChild(bar);
  }

  fetch("songs.json")
    .then((res) => res.json())
    .then((songs) => {
      if (songs.length === 0) {
        playlistEl.innerHTML =
          '<div class="text-center py-10 text-white/30 italic">No songs deployed yet.</div>';
        return;
      }

      renderPlaylist(songs);
      // Load first song but don't play
      playSong(songs[0], false);
    })
    .catch((err) => {
      console.error(err);
      playlistEl.innerHTML =
        '<div class="text-center py-10 text-red-400">Error loading playlist.</div>';
    });

  function renderPlaylist(songs) {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
      const div = document.createElement("div");
      div.className =
        "song-item p-3 rounded-xl cursor-pointer flex items-center justify-between group";
      div.onclick = () => {
        playSong(song, true);
        updateActiveItem(div);
      };

      div.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                        ${index + 1}
                    </div>
                    <div>
                        <div class="font-medium text-white/90 group-hover:text-white">${
                          song.title
                        }</div>
                        <div class="text-xs text-white/40">${new Date(
                          song.date
                        ).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="text-white/0 group-hover:text-white/60 transition-colors">
                    ▶
                </div>
            `;
      playlistEl.appendChild(div);
    });
  }

  function playSong(song, autoPlay) {
    currentTitle.textContent = song.title;
    currentDate.textContent = new Date(song.date).toLocaleString();

    // Ensure path is relative encoded
    audioPlayer.src = song.file;

    if (autoPlay) {
      audioPlayer.play().catch((e) => console.log("Autoplay blocked usually"));
    }

    // Update lyrics
    const lyricsContainer = document.getElementById("lyrics-container");
    if (lyricsContainer) {
      lyricsContainer.textContent = song.lyrics || "No lyrics available.";
    }
  }

  function updateActiveItem(activeDiv) {
    document
      .querySelectorAll(".song-item")
      .forEach((el) => el.classList.remove("active"));
    activeDiv.classList.add("active");
  }
});
