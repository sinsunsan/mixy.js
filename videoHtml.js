//http://www.creativebloq.com/html5/build-custom-html5-video-player-9134473    

// @todo abstract the paramaters
var videoHtml = {  
  mediaPlayer: '',
  iniMediaPlayer: function() {
    this.mediaPlayer = document.getElementById('media-video');
    this.mediaPlayer.addEventListener('timeupdate', videoHtml.updateProgressBar, false);
    // Hide the default controls for all with js enabled
    this.mediaPlayer.controls = false;

    $('#video-modal').modal('show');
  }, 
  togglePlayPause: function() {
    var btn = document.getElementById('play-pause-button');
    if (videoHtml.mediaPlayer.paused || videoHtml.mediaPlayer.ended) {
       videoHtml.changeButtonType(btn, 'glyphicon-pause');
       videoHtml.mediaPlayer.play();
    }
    else {
       videoHtml.changeButtonType(btn, 'glyphicon-play');
       videoHtml.mediaPlayer.pause();
    }
  }, 
  changeButtonType: function(btn, value) {
     btn.title = value;
     //btn.innerHTML = value;
     btn.className = value + ' ' + 'glyphicon';
  }, 
  updateProgressBar: function() {
    var progressBar = document.getElementById('progress-bar');
    var percentage = Math.floor((100 / videoHtml.mediaPlayer.duration) *
    videoHtml.mediaPlayer.currentTime);
    progressBar.value = percentage;
    //progressBar.innerHTML = percentage + '% played';  
  }, 
  resetPlayer: function() {
     progressBar.value = 0;
     videoHtml.mediaPlayer.currentTime = 0;
     changeButtonType(playPauseBtn, 'play');
  }
}