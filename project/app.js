let nr = 0
let r = 0
let l = 0
let prev = 0
let image = document.querySelector("img")
let box = document.querySelector("div.image")
let counter = document.querySelector('.songcounter')
let playpause = document.querySelector('.playpause')
let songname = document.querySelector(".songname")
let songauthor = document.querySelector(".songauthor")
let curr_time = document.querySelector('.current-time')
let total_duration = document.querySelector('.total-duration')
let seek_slider = document.querySelector('.seek_slider')
let volume_slider = document.querySelector('.volume_slider')
let loop = document.querySelector('.icon-loop')
let shuffle = document.querySelector('.icon-shuffle')
let subscribe_description = document.querySelector('.subscribe-description')
let musicbox = document.querySelector('.musicbox-left')
let seekPosition = 0
let n = 0

const music_list = [
    {
        img: 'images/P.I.M.P..jpg',
        name: 'P.I.M.P',
        artist: '50 Cent ft. Snoop Dogg',
        audio: 'audio/P.I.M.P..mp3'
    },
    {
        img: 'images/YoungWildFree.jpg',
        name: 'Young, Wild & Free',
        artist: 'Snoop Dogg & Wiz Khalifa ft. Bruno Mars',
        audio: 'audio/youngwildfree.mp3'
    },
    {
        img: 'images/CandyShop.jpg',
        name: 'Candy Shop',
        artist: '50 Cent ft. Olivia',
        audio: 'audio/CandyShop.mp3'
    },
    {
        img: 'images/somesay.jpg',
        name: 'Some Say',
        artist: 'Nea (CLIMO Bootleg)',
        audio: 'audio/SomeSay.mp3'
    },
    {
        img: 'images/bambam.jpg',
        name: 'Bam Bam',
        artist: 'Camila Cabello (club bootleg)',
        audio: 'audio/BamBam.mp3'
    },
    {
        img: 'images/whenever.jpg',
        name: 'Whenever, Whenever',
        artist: 'Shakira (Maniutek Bootleg)',
        audio: 'audio/Whenever.mp3'
    }
]
let player = new Audio(music_list[0].audio)
function song(element)
{
    if((r == 0)&&(l == 0)&&(n == 0))
    {
        if(element == -1) {nr--}
        else if(element == 1) {nr++}
        if(nr < 0) {nr = music_list.length - 1}
        if(nr > music_list.length - 1) {nr = 0}
        player.pause()
        playpause.classList.replace('icon-play-circled2', 'icon-pause-circle-o')
        player = new Audio(music_list[nr].audio)
        image.src = music_list[nr].img
        counter.textContent = "Playing music " + (nr + 1) + " of " + music_list.length
        random_bg_color()
        songname.textContent = music_list[nr].name
        songauthor.textContent = music_list[nr].artist
        player.play()
        setTimeout(function ()
        {
            image.classList.add('rotate')
            playpause.classList.replace('icon-pause-circle-o', 'icon-play-circled2')
        },200)
    }
    else
    {
        player.pause()
        playpause.classList.replace('icon-play-circled2', 'icon-pause-circle-o')
        player = new Audio(music_list[element].audio)
        image.src = music_list[element].img
        counter.textContent = "Playing music " + (element + 1) + " of " + music_list.length
        random_bg_color()
        songname.textContent = music_list[element].name
        songauthor.textContent = music_list[element].artist
        player.play()
        setTimeout(function ()
        {
            image.classList.add('rotate')
            playpause.classList.replace('icon-pause-circle-o', 'icon-play-circled2')
        },200)
    }
    visualizer()
}

window.addEventListener('keydown', (element) => {if(element.keyCode == 32) {play()}})
window.addEventListener('keydown', (element) => {if(element.keyCode == 37) {song(-1)}})
window.addEventListener('keydown', (element) => {if(element.keyCode == 38) {volume_slider.value++}})
window.addEventListener('keydown', (element) => {if(element.keyCode == 39) {song(1)}})
window.addEventListener('keydown', (element) => {if(element.keyCode == 40) {volume_slider.value--}})

function play()
{
    if(playpause.classList.contains('icon-play-circled2'))
    {
        player.pause()
        state = false;
        image.classList.remove('rotate')
        playpause.classList.replace('icon-play-circled2', 'icon-pause-circle-o')
    }
    else
    {
        player.play()
        state = true;
        image.classList.add('rotate')
        playpause.classList.replace('icon-pause-circle-o', 'icon-play-circled2')
    }
    if(visualizer) {visualizer()}
}


function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e']
    let a = 0

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14)
            let y = hex[x]
            a += y
        }
        return a
    }
    let Color1 = populate('#')
    let Color2 = populate('#')

    let gradient = 'linear-gradient(' + 'to right' + ',' + Color1 + ', ' + Color2 + ")"
    document.body.style.background = gradient

    const rgbColor1 = hexToRgb(Color1)
    const rgbColor2 = hexToRgb(Color2)


    function hexToRgb(hex)
    {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    }
    document.querySelector('.seek_slider').style.background = Color1
    document.querySelector('.volume_slider').style.background = Color2
}

function seekTo()
{
    let seekto = player.duration * (seek_slider.value / 100)
    player.currentTime = seekto
}
function setVolume()
{
    player.volume = volume_slider.value / 100
}
setInterval(function setUpdate()
{
    if(!isNaN(player.duration))
    {
        seekPosition = player.currentTime * (100 / player.duration)
        seek_slider.value = seekPosition

        let currentMinutes = Math.floor(player.currentTime / 60)
        let currentSeconds = Math.floor(player.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(player.duration / 60)
        let durationSeconds = Math.floor(player.duration - durationMinutes * 60)

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds}
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds}
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes}
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes}

        curr_time.textContent = currentMinutes + ":" + currentSeconds
        total_duration.textContent = durationMinutes + ":" + durationSeconds
    }
    if(player.currentTime == player.duration)
    {
        player.currentTime = 0
        image.classList.remove('rotate')
        player.pause()
        if(l == 0)
        {
            if(r == 0) {song(1)}
            else
            {
                nr = Math.floor(Math.random() * (music_list.length - 0 + 1) + 0)
                song(nr)
            }
        }
        else {song(nr)}
    }
},1000)
setInterval(() => {player.volume = volume_slider.value / 100;})
window.addEventListener('load', () =>
{
    random_bg_color()
    counter.textContent = "Playing music " + (nr + 1) + " of " + music_list.length
    image.src = music_list[nr].img
    songname.textContent = music_list[nr].name
    songauthor.textContent = music_list[nr].artist
    player = new Audio(music_list[nr].audio)
    musicleftlist()
})

function randomTrack()
{
    if(r == 1)
    {
        if(shuffle.classList.contains('infinite-shadow')) {shuffle.classList.remove("infinite-shadow")}
        r = 0
    }
    else
    {
        shuffle.classList.add("infinite-shadow")
        r = 1
    }
}

function repeatTrack()
{
    if(l == 1)
    {
        if(loop.classList.contains('infinite-shadow')) {loop.classList.remove("infinite-shadow")}
        l = 0
    }
    else
    {
        loop.classList.add("infinite-shadow")
        l = 1
    }
}

function songchange(element)
{
    n = 1;
    for(let i = 0; i < music_list.length; i++) {if(element.classList.contains(i)) {song(i)}}
    n = 0;
}

function musicleftlist()
{
    for(let i = 0; i < music_list.length; i++)
    {
        let element = document.createElement('div')
        element.classList.add('list-element')
        let number = document.createElement('p')
        number.classList.add('number')
        let imagez = document.createElement('img')
        imagez.classList.add('listimg')
        let title = document.createElement('p')
        title.classList.add('title')
        number.textContent = "#" + (i+1)
        imagez.src = music_list[i].img
        title.textContent = music_list[i].name + " - " + music_list[i].artist
        element.classList.add(i)
        element.onclick = function() {songchange(this)}
        element.appendChild(number)
        element.appendChild(imagez)
        element.appendChild(title)
        musicbox.appendChild(element)
    }
}

let ac,source,analyser

function visualizer()
{
    ac = new AudioContext()
    source = ac.createMediaElementSource(player)
    analyser = ac.createAnalyser()

    source.connect(analyser)
    analyser.connect(ac.destination)

    let canvas = document.querySelector('.visualizer')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let ctx = canvas.getContext('2d')

    analyser.fftSize = 256
    let bufferLen = analyser.frequencyBinCount

    let data = new Uint8Array(bufferLen)

    let height = canvas.height
    let width = canvas.width

    let bar_Width = (width / bufferLen) * 2
    let bar_Height

    let x = 0

    function render()
    {
        requestAnimationFrame(render)
        x = 0
        analyser.getByteFrequencyData(data)
        ctx.clearRect(0,-10, canvas.width, canvas.height)

        bufferLen[10] * 2
        for(var i = 0; i < bufferLen; i++)
        {
            bar_Height = data[i] * 2
            ctx.fillStyle = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")"
            ctx.fillRect(x * 100 / bufferLen, canvas.height - bar_Height/3, bar_Width/2.5, bar_Height)
            x += bar_Width
        }
    }
    render();
}