let fillBar = document.querySelector('.fill');
let listSong = ['audio_1.mp3', 'audio_2.mp3', 'audio_3.mp3'];
let covers = [
  'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTQlYzL-pc2sGt5kiM4weh8uyr65xcGTB6WJZ9EgP7H6HkoYVcY',
  'https://i.pinimg.com/originals/0e/d3/5c/0ed35c271377e77a3ddd7ca19d4adb9b.jpg',
  'https://6.viki.io/image/143428ab5a6d4b9dbf16f6db7bc87f0c.jpeg?s=900x600&e=t'
];
let currentTime = document.querySelector('.time');
let currentImage = document.querySelector('img');

let slideVolume = document.querySelector('.volume');
let iconShow = document.querySelector('.icon-show');
let audio = new Audio();
audio.volume = slideVolume.defaultValue;
let currentSong = 0;

window.onload = playSong;

function playSong(){
  audio.src = `audio/${listSong[currentSong]}`;
  let play = audio.play();
  if(play !== undefined) {
    play.then(()=> {
      //Auto started
    }).catch(() => {
      // throw new Error('Prevent!!!');
    })

  }

}

function togglePlayPause(){
  if(audio.paused){
    audio.play();
    let playBtn = document.querySelector('.play-pause');
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audio.pause();
    playBtn = document.querySelector('.play-pause');
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
}

audio.addEventListener('timeupdate', function(){
  if(Number.isNaN(audio.duration)){
    audio.duration = 1;
  }
  let fillBarValue = audio.currentTime * 100 / audio.duration;

  setFillSlide(fillBarValue);
  let playTime = convertTime(Math.round(audio.currentTime));
  let durationTime = convertTime(Math.round(audio.duration));
  currentTime.textContent = playTime+' - '+ durationTime;


  if(audio.ended){
    nextAudio();
  }
})

function convertTime(seconds){
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  if(Number.isNaN(min)){
    min = 0;
  }
  if(Number.isNaN(sec)){
    sec = 0;
  }

  min = min < 10 ? "0"+min : min;
  sec = sec < 10 ? "0"+sec : sec;
  return min+":"+sec;
}

function nextAudio(){
  setFillSlide(0);
  currentSong++;
  if(currentSong > 2){
    currentSong = 0;
  }
  playSong();
  let playBtn = document.querySelector('.play-pause');
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  currentImage.setAttribute('src', covers[currentSong]);


}
function prevAudio(){
  setFillSlide(0);
  currentSong--;
  if(currentSong < 0){
    currentSong = 2;
  }
  playSong();
  let playBtn = document.querySelector('.play-pause');
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  currentImage.setAttribute('src', covers[currentSong]);

}

function setFillSlide(fillBarValue){
  if(Number.isNaN(fillBarValue)){
    fillBarValue = 0;
  }
  fillBar.style.background = 'linear-gradient(to right, gray 0%, gray ' + Math.round(fillBarValue) + '%, #fff '
                                                                  + Math.round(fillBarValue) + '%, white 100%)';
  fillBar.value= fillBarValue;
}

function decreaseVolume(){
  if(audio.volume <= 0){
    audio.volume = 0;
  }else{
    audio.volume  -= 0.25;
  }
  //update slide volume
  slideVolume.value = audio.volume;

}
function increaseVolume(){
  if(audio.volume >= 1){
    audio.volume = 1;
  }else{
    audio.volume  += 0.25;
  }
  //update slide volume
  slideVolume.value = audio.volume;
}

let volumeUp = document.querySelector('.volume-up');
volumeUp.addEventListener('click', function(){
  console.log(audio.volume);
  if(audio.volume > 0){
    audio.volume = 0;
    document.querySelector('.volume-up i').className = 'fa fa-volume-mute';
  } else {
    audio.volume = 1;
    document.querySelector('.volume-up i').className = 'fa fa-volume-up';
  }
})

fillBar.addEventListener('input', function() {
  let value = (this.value-this.min)/(this.max-this.min)*100
  this.style.background = 'linear-gradient(to right, gray 0%, gray ' + value + '%, #fff ' + value + '%, white 100%)';
  audio.currentTime = value * audio.duration / 100;
}, false);

iconShow.addEventListener('click', function(){
  let isShow = slideVolume.style.display !== 'none';
  if(isShow){
    slideVolume.style.display = 'none';
  }else{
    slideVolume.style.display = 'block';
  }
});

slideVolume.addEventListener('input', function(){
  audio.volume = this.value;
})

