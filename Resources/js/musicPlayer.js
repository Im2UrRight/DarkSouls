const musicContainer = document.querySelector('.music-player')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.pb-bar')
const progressContainer = document.querySelector('.pb-container')
const title = document.querySelector('#songTitle')
const currTime = document.querySelector('#currTime')
const durTime = document.querySelector('#durTime')

//song titles
const songs = ['Epilogue','Sister Friede','Soul Of Cinder','Slave Knight Gale']
// keep track of songs
let songIndex = 0
// initially load song info DOM 
loadSong(songs[songIndex])
//Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `Resources/audio/${song}.mp3`
    //set duration
    //setDuration(audio.duration)
}
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}
function prevSong() {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex]),
    playSong()
}
function nextSong() {
    songIndex++
    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
// update progress bar/seeker
function updateProgress(e) {
    const {duration, currentTime}= e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
// set time with progressbar/seeker
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width)*duration 
}
// set song duration and current time
function normalizeTime(time) {
    let sec = time
    if (time === NaN) {
        return '0:00'
    }
    let minutes = Math.floor(sec / 60)
    let seconds = Math.floor(sec - (minutes * 60))
    // if (minutes < 10) {minutes = "0"+minutes}
    if (seconds < 10) {seconds = "0"+seconds}
    
    return minutes +':'+ seconds
}
function setDisplayTime() {
    currTime.innerText = normalizeTime(audio.currentTime)
    durTime.innerText = normalizeTime(audio.duration)
}
//function setDuration() {durTime.innerText = normalizeTime(audio.duration)}
// Volume
//set default volume
audio.volume = .15
// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    }else {
        playSong()
    }
})
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('timeupdate', setDisplayTime)
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)