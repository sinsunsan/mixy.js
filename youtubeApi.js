// Object to make it easy insert video with javascript
// https://developers.google.com/youtube/iframe_api_reference

var youtubeApi = {
  // Video is an array of object with the following properties
  // id the id of the video player (to have more than one)
  // vidId like M7lc1UVf-VE
  // width of the video
  // height of the video
  // divId the name of the div to put the video 
  
  videosToLoad: {}, // Store the video objects to load
  players: {}, // The players 
  playing: [] , // Store the id of the playing players
  
  loadVideos: function() {
    console.log(this.videosToLoad);
    var videos = [];
    if ($.isEmptyObject(this.videosToLoad) == false) {
        videos = this.videosToLoad;
    } 
    else if ($.isEmptyObject(slider.videos) == false) {
      videos = slider.videos;
    }else{
      console.log('youtubeApi : there is no videos to load');
    }
    if ($.isEmptyObject(videos) == false) {
      console.log(videos)
        $.each(videos, function(i,v) {
          console.log(v);
          if (v.id && v.divId && v.vidId) {
            
              if (v.height == undefined) { height: 390; }
              if (v.width == undefined) { height: 640; }
              youtubeApi.players[v.id] = new YT.Player(v.divId, {
                  autoplay: 1,
                  height: '390',
                  width: '640',
                  videoId: v.vidId,
                  events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                  },
                  // Set player options
                  playerVars: {
                    autoplay: 0,
                  },
              });
              
            } else {
              console.log('Error in youTubeApi : At the video object n° ' + i + ' have not enought properties');
            }
          });
    }
  },
  
  // Queue the video that will be loaded when ready
  queueVideos: function(videos) {
    this.videosToLoad = videos;
    return videos;
  }, 
  // stop All playing players as recorded in this.playingPlayers array
  stopAll: function() {
    $.each(youtubeApi.playing, function(i, v){
      youtubeApi.stopVideo(v);
    })
  },
  
  // Stop the video by name
  // player is a video object
  stopVideo: function(id) {
    youtubeApi.players[id].stopVideo();
  },
  
  // Load youtube video 
  load: function(id) {

    // https://developers.google.com/youtube/iframe_api_reference
    
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    
    // We declare this function as global
    // Because it's the one that youtube api will call
    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady(id) {
        console.log('the youtube api is ready !');
        youtubeApi.loadVideos();
    }
    
    // 4. The API will call this function when the video player is ready.
    window.onPlayerReady = function onPlayerReady(event) {

    }
    
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    
    var done = false;
    window.onPlayerStateChange =  function onPlayerStateChange(event) {
      console.log(event);
      
      var videoId = event.target.a.id.slice(7); // youtube1 youtube4 ....
      console.log('le nom de a video est ' + videoId);
      
      //event.data is the state code of the player
      // YT.PlayerState.PLAYING is list the code used to identify player state
      // event.target.a.id is the id of the player

      if (event.data == YT.PlayerState.PLAYING) {
        youtubeApi.playing.push(videoId);
        console.log(youtubeApi.playing);
      }else {
        youtubeApi.playing.pop(videoId);
        console.log(youtubeApi.playing);
      }
    }
  },
}