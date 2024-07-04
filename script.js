console.log("Lets start writting some javascript");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio(("/songs/" + track))
    currentSong.src = "/songs/" + track
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00/00:00";
}

async function main() {

    let songs = await getSongs()
    playMusic(songs[0], true);

    let songUl = document.querySelector(".songsList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
     <img class="invert" src="img/music.svg" alt="music icon">
     <div class="info">
         <div> ${song.replaceAll("%20", " ")}</div>
         <div>Unknown</div>
     </div>
     <div class="playnow">
         <span>play now</span>
         <svg class="invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="30" height="30">
             <circle cx="14" cy="14" r="13" fill="none" stroke="#141B34" />
             <path d="M18.3906 14.846C18.0371 16.189 16.3667 17.138 13.0257 19.0361C9.796 20.8709 8.1812 21.7884 6.87983 21.4196C6.3418 21.2671 5.85159 20.9776 5.45624 20.5787C4.5 19.6139 4.5 17.7426 4.5 14C4.5 10.2574 4.5 8.3861 5.45624 7.42132C5.85159 7.02245 6.3418 6.73288 6.87983 6.58042C8.1812 6.21165 9.796 7.12907 13.0257 8.96393C16.3667 10.86197 18.0371 11.811 18.3906 13.154C18.5365 13.7084 18.5365 14.2916 18.3906 14.846Z" transform="scale(0.6) translate(12,9)" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linejoin="miter"/>
         </svg>
     </div>
 </li>`
    }

    Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(1);
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic((e.querySelector(".info").firstElementChild.innerHTML).trim());
        })
    });

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })

    var audio = new Audio(songs[0]);

    // console.log(audio);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.src, audio.currentTime);
    // })

    // let playButton = document.createElement("button");
    // playButton.innerText = "Play Song";
    // playButton.addEventListener("click", function() {
    //     audio.play().catch(error => {
    //         console.error("Error playing audio:", error);
    //     });
    // });
    // document.body.appendChild(playButton);


    //Listen For Time Update

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Moving Seekbar in on user's own will to select from where he wants to play song

    document.querySelector(".seekBar").addEventListener("click",(e)=>{
        console.log(e);
    })
}

main();