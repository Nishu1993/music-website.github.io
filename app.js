const music = new Audio('audio/2.mp3');
// music.play();

const songs = [
    {
        id: "1",
        songName: ' lets play music <br> <div class ="singer">Alan</div>',
        poster: "covers/1.jpg",
        song: "audio/1.mp3",
    },
    {
        id: "2",
        songName: ' tu hi re <br> <div class ="singer">kk</div>',
        poster: "covers/2.jpg",
        song: "audio/2.mp3",
    },
    {
        id: "3",
        songName: ' sajde <br> <div class ="singer">sajid</div>',
        poster: "covers/3.jpg",
        song: "audio/3.mp3",
    },
    {
        id: "4",
        songName: ' jai ho <br> <div class ="singer">A R rehman</div>',
        poster: "covers/4.jpg",
        song: "audio/4.mp3",
    },
    {
        id: "5",
        songName: ' papa meri jaan <br> <div class ="singer">B pareek</div>',
        poster: "covers/5.jpg",
        song: "audio/5.mp3",
    },
    {
        id: "6",
        songName: ' lets play music <br> <div class ="singer">yo yo</div>',
        poster: "covers/6.jpg",
        song: "audio/6.mp3",
    },
    {
        id: "7",
        songName: ' nach meri jaan <br> <div class ="singer">badshah</div>',
        poster: "covers/7.jpg",
        song: "audio/7.mp3",
    },
    {
        id: "8",
        songName: ' blue he pani <br> <div class ="singer">honey singh</div>',
        poster: "covers/8.jpg",
        song: "audio/8.mp3",
    },
    {
        id: "9",
        songName: ' lets play music <br> <div class ="singer">walker</div>',
        poster: "covers/9.jpg",
        song: "audio/9.mp3",
    },
    {
        id: "10",
        songName: ' moye moye <br> <div class ="singer">tik tok</div>',
        poster: "covers/10.jpg",
        song: "audio/10.mp3",
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src =songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML =songs[i].songName;
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill'); 
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');  
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=> {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');   
    })
};
let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) =>{
    e.addEventListener('click', (el) =>{
        index = el.target.id;
        console.log(index);
        // music.src = `audio/${index}.mp3`;
        // poster_master_play.src = `covers/${index}.jpg`;
        // music.play();
        // masterPlay.classList.remove('bi-play-fill');
        // masterPlay.classList.add('bi-pause-fill'); 

        let songTitles = songs.filter((els) =>{
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let { songName, poster, song } = elss;
            title.innerHTML = songName;
            poster_master_play.src = poster;
            music.src = song;
            music.play();
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill'); 

        });
        makeAllPlays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill'); 
        wave.classList.add('active1');
    });
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar = document.getElementsByClassName('bar');

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    //console.log(min1);
    //console.log(sec1);
    currentEnd.innerHTML = min1+':'+sec1;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = '0'+sec2;
    }

    currentStart.innerText = min2+':'+sec2;

    let progressBar =parseInt((music_curr / music_dur)*100);
    seek.value = progressBar;
    let seekbar = seek.value;
    bar.style.width = `${seekbar}%`;
    
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');

vol.addEventListener('change', () => {
    if(vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if(vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if(vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    music.volume = vol_a / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if(index < 1){
        index= Array.from(document.getElementsByClassName('songItem')).length;
    }
    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach((elss) =>{
        let { songName, poster, song } = elss;
        title.innerHTML = songName;
        poster_master_play.src = poster;
        music.src = song;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill'); 

    });
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill'); 
    wave.classList.add('active1');

});

next.addEventListener('click', () => {
    index += 1;
    if(index >= Array.from(document.getElementsByClassName('songItem')).length){
        index= 1;
    }
    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach((elss) =>{
        let { songName, poster, song } = elss;
        title.innerHTML = songName;
        poster_master_play.src = poster;
        music.src = song;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill'); 

    });
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill'); 
    wave.classList.add('active1');

});


