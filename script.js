console.log("Lets start writting some javascript");

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for(let i=0; i<as.length; i++){
        const element = as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    return songs
}

async function main(){
    let songs = await getSongs()
    console.log(songs);
    var audio = new Audio(songs[0]);
    console.log(audio);
    // audio.play();

    // let playButton = document.createElement("button");
    // playButton.innerText = "Play Song";
    // playButton.addEventListener("click", function() {
    //     audio.play().catch(error => {
    //         console.error("Error playing audio:", error);
    //     });
    // });
    // document.body.appendChild(playButton);

    audio.addEventListener("loadeddata",()=>{
        console.log(audio.duration,audio.src,audio.currentTime);
    })
}

main();