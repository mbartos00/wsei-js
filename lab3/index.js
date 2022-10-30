
const playBtn = document.querySelector(".play")
let keyCodeArray = [];

const playSound = e => {
    const keyCode = e.keyCode;
    const keyElement = document.querySelector(`div[data-key="${keyCode}"]`);
    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    if(!keyElement) return;
    audioElement.currentTime = 0;
    audioElement.play();
    keyCodeArray.push(e.keyCode);
 
}

playBtn.addEventListener('click', () =>{
    console.log(keyCodeArray);
    keyCodeArray.forEach(key =>{
        const audioElement = document.querySelector(`audio[data-key="${key}"]`);
        setInterval(()=>{
            console.log( audioElement.play())
            audioElement.play();
        },2000)
    })
})

window.addEventListener('keydown', playSound);

