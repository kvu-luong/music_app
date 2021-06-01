class PlayAudio{
  constructor(config) {
    this.audio = new Audio();
    try{
      this.currentSong = 0;
      this.totalSong = (config.totalSong - 1);
      this.imageCover = config.imageCover;
      this.src = config.linkAudio;
      this.playBtn = config.playBtn;
      this.sliderInputAudio = config.sliderInputAudio;
      this.sliderInputAudioColor = config.sliderInputAudioColor;
      this.labelCurrentTime = config.labelCurrentTime;
      this.stepVolume = config.stepVolume;
      this.singleAudio = config.singleAudio;
      this.listSong = config.listSong;
      this.listCoverImage = config.listCoverImage;
    } catch(e){
      throw new Error('Missing Setting!!!');
    }
  }

  getAudio(){
    return this.audio;
  }

  playSong(){

    if(!this.singleAudio){
      this.audio.src = this.listSong[this.currentSong];
    }else{
      this.audio.src = this.src;
    }
    let play = this.audio.play();
    if(play !== undefined){
      play.then(() => {
        //auto started
      }).catch(() => {
        //throw new Error('error play audio');
      });
    }
  }

  togglePlayPause(){
    if (this.audio.paused) {
      this.playSong();
      this.playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
      this.audio.pause();
      this.playBtn.innerHTML = '<i class="fa fa-play"></i>';
    }
    return true;
  }

  updateAudioCurrentTime(){
    let durationOfAudio = this.audio.duration;
    if(Number.isNaN(this.audio.duration)){
      durationOfAudio = 0;
    }
    let audioCurrentTime = this.audio.currentTime * 100 / durationOfAudio;
    let playTime = this.convertTime(Math.round(this.audio.currentTime));
    let durationTime = this.convertTime(Math.round(durationOfAudio));
    this.labelCurrentTime.textContent = playTime+ ' - '+ durationTime;

    //update slider input when music is play
    this.updateAudioSlide(audioCurrentTime);

    //next Audio
    if(!this.singleAudio){
      if(this.audio.ended){
        this.nextAudio();
      }
    }
  }

  updateAudioSlide(inputValue){
    if(Number.isNaN(inputValue)){
      inputValue = 0;
    }
    let color = this.sliderInputAudioColor;
    this.sliderInputAudio.style.background = `linear-gradient(to right, 
                      ${color} 0%,
                      ${color} ${Math.round(inputValue)}%, 
                      #fff ${Math.round(inputValue)}%, 
                      white 100%)`;
    this.sliderInputAudio.value = inputValue;
  }

  updateAudioSlideDrag(inputValue){
    this.updateAudioSlide(inputValue);
    this.audio.currentTime = inputValue * this.audio.duration / 100;
  }

  convertTime(seconds){
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

  increaseVolume(){
    if(this.audio.volume >= 1){
      this.audio.volume = 1;
    }else{
      this.audio.volume  += this.stepVolume;
    }
    // //update slide volume
    // slideVolume.value = audio.volume;
  }
  decreaseVolume(){
    if(audio.volume <= 0){
      audio.volume = 0;
    }else{
      audio.volume  -= this.stepVolume;
    }
    // //update slide volume
    // slideVolume.value = audio.volume;
  }

  muteOrUnmuteAudio(iconMute){
    if(this.audio.volume > 0){
      this.audio.volume = 0;
      iconMute.className = 'fa fa-volume-mute';
    } else {
      this.audio.volume = 1;
      iconMute.className = 'fa fa-volume-up';
    }
  }

  nextAudio(){
    this.updateAudioSlide(0);
    this.currentSong ++;
    if(this.currentSong > this.totalSong){
      this.currentSong = 0;
    }

    this.playSong();
    this.updateUiPlay();
  }

  prevAudio(){
    this.updateAudioSlide(0);
    this.currentSong --;
    if(this.currentSong < 0){
      this.currentSong = this.totalSong;
    }

    this.playSong();
    this.updateUiPlay();
  }

  updateUiPlay(){
    this.playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    if(this.imageCover){
      this.imageCover.setAttribute('src', this.listCoverImage[this.currentSong]);
    }
  }
}