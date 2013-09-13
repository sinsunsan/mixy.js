var mixy = {
  //http://html5hub.com/ellipse-my-text/#i.7ruh141bulev7t
  // Good but make assumption of the space available to display the text
  textShorten: function(text, maxLength) {
      var ret = text;
      if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
      }
      return ret;  
  },
  test: function(){
    mixyTest.init();
  }
}
var mixyTest = {
  init: function(){
    var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eros lorem, ultrices eget augue at, accumsan dictum ligula. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur egestas elit sit amet consectetur condimentum. Nullam cursus tortor eu turpis gravida auctor.';
    return mixy.textShorten(text, 100);
    
  }
}
console.log('mixy utiliy loaded !');
