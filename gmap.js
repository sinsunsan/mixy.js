var map; // The global variable to store map object

var gmap = {

  init: function() {
    this.gmapInit();
    google.maps.event.addDomListener(window, 'load', this.gmapInit());
    this.makeDivClickable('#locator .post');
    $('#locator #pin-info').hide();
    $('.show-list').click(function(){
      $('#locator #bottom').toggleClass('active')
    });
  },
  
  gmapInit: function() {
    
    this.mapLoad();
    this.mapDesaturate();
    this.mapCustomControl();
    
    //this.geoLocate();
    
    // Abandoned
    //this.addFusionLayer('1pSyBim-hJGpFwiBc5dhz6JXJDjylPO346AiwPkY');
    //this.readGeoJson;
    
  
    //this.customizeMarkers();
    
    this.mapAddKlmLayer();
  },
  
  // Find the a in the div, and make the whole div clickable
  makeDivClickable: function(ele) {
    $(ele).click(function() {
      window.location = $(this).find("a").attr("href");
    });
  },
  
  // Create custom control 
  zoomControl: function(controlDiv, map) {
    
    controlDiv.style.marginRight = '20px';
    controlDiv.style.marginBottom = '60px';
    controlDiv.style.textAlign = 'center';
    
    // Set CSS for the control border.
    var controlCustomZoom = document.createElement('div'); 
    controlCustomZoom.className += 'zoom';   
    controlCustomZoom.title = 'Agrandir';     
    controlCustomZoom.style.width = '40px';
    controlCustomZoom.style.height = '40px';
    controlCustomZoom.style.lineHeight = '40px';
    controlCustomZoom.style.cursor = 'pointer';
    
    controlCustomZoom.style.fontSize = '20px';
     
    controlCustomZoom.innerHTML = '+';
    controlDiv.appendChild(controlCustomZoom);
    
    // Set CSS for the control border.
    var controlCustomUnzoom = document.createElement('div'); 
    controlCustomUnzoom.className += 'unzoom ';   
    controlCustomUnzoom.title = 'Agrandir';     
    controlCustomUnzoom.style.width = '40px';
    controlCustomUnzoom.style.height = '40px';
    controlCustomUnzoom.style.lineHeight = '40px';
    
    controlCustomUnzoom.style.cursor = 'pointer';
    controlCustomUnzoom.style.fontSize = '35px';
     
    controlCustomUnzoom.innerHTML = '-';
    controlDiv.appendChild(controlCustomUnzoom);
    
    /*
    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map.
    controlDiv.style.padding = '5px';

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to set the map to Home';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<strong>Home</strong>';
    controlUI.appendChild(controlText);
    */
    // Setup the click event listeners: simply set the map to Chicago.
    google.maps.event.addDomListener(controlCustomZoom, 'click', function() {
      map.setZoom(map.getZoom() + 1);
    });
    google.maps.event.addDomListener(controlCustomUnzoom, 'click', function() {
      map.setZoom(map.getZoom() - 1);
    });
  },
  
  geoLocate: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        /*                               
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Location found using HTML5.'
        });
        */

        map.setCenter(pos);
        
      }, function() {
        console.log('pas de geolocation possible');
        gmap.handleNoGeolocation(true);
      });
    } else {
      console.log('Browser doesn\'t support Geolocation');
      
      // Browser doesn't support Geolocation
      gmap.handleNoGeolocation(false);
    }
    
    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      var infowindow = new google.maps.InfoWindow(options);
      map.setCenter(options.position);
    }
  },
  
  customizeMarkers: function() {
    // https://developers.google.com/maps/tutorials/customizing/custom-markers
    var iconBase = 'http://5.9.82.45:8080/public/icons';
    var icons = {
      bar: {
        icon: iconBase + 'location.png',
        shadow: iconBase + 'location.png'
      },
    };
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: iconBase + 'location.png',
      icon: iconBase + 'location.shadow.png',
    });
  },
  
  mapDesaturate: function() {
    var styles = [
      {
        featureType: "all",
        stylers: [
          { saturation: -100 }
        ]
      }
    ];
    map.setOptions({styles: styles});
  },
  
  // url : identifier of the fusion table
  addFusionLayer: function(id) {
    var layer;
    layer = new google.maps.FusionTablesLayer({
        query: {
          select: '\'Location\'',
          from: id
        }
    });
    console.log(layer);
    layer.setMap(map);
  },
  
  readGeoJson: function() {
    // https://developers.google.com/maps/tutorials/data/importing_data
    // To create the geo json 

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'earthquakes.json', true);
    xhr.onload = function() {
      loadEarthquakes(this.responseText);
    };
    xhr.send();
  },
  
  mapAddKlmLayer: function() {
    // https://developers.google.com/maps/tutorials/kml/
    var baseKlm = 'http://5.9.82.45:8080/public/klm/';
    var kmlUrl = baseKlm + 'bars3' + '.klm';
    var kmlOptions = {
      //suppressInfoWindows: true, // Don't display data in the popup 
      suppressInfoWindows: false,
      preserveViewport: false, // zoom to the klm
      map: map
    };
    var kmlLayer = new google.maps.KmlLayer(kmlUrl, kmlOptions);
    
    google.maps.event.addListener(kmlLayer, 'click', function(event) {
      var content = event.featureData.infoWindowHtml;
      var postId = event.featureData.description;
      
      $('#locator .post-id' + postId).clone().appendTo('#pin-info');
      
      //pinInfo.html($('#locator .post' + postId));
      
      gmap.toggleTeaserList();
    });
  },
  
  toggleTeaserList: function() {
    $('#locator #pin-info').toggle();
    $('#locator #pin-list, .teaser-top .search-results, #locator #bottom .load').toggle();
    $('#locator .show-list').toggleClass('return-list');
    $('#locator .show-list .legend').html('Retourner à la liste');
    $('#locator .return-list').click(function() {
       gmap.toggleTeaserList();
     });
  },

  mapLoad: function() {
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(48.8567, 2.3508),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      //mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true,
      panControl: false,
      zoomControl: false, // Disable default zoom control
      zoomControlOptions: {
        'style': google.maps.ZoomControlStyle.SMALL,
        'position': google.maps.ControlPosition.RIGHT_BOTTOM
      },
    };
    
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  },
  
  mapCustomControl: function() {
    var homeControlDiv = document.createElement('div');
    homeControlDiv.className += 'custom-zoom';
    var homeControl = new this.zoomControl(homeControlDiv, map);

    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(homeControlDiv);
  }
}