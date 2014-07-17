var mixy = {};
    //http://html5hub.com/ellipse-my-text/#i.7ruh141bulev7t
    // Good but make assumption of the space available to display the text
    textShorten: function(text, maxLength) {
            var ret = text;
            if (ret.length > maxLength) {
                ret = ret.substr(0,maxLength-3) + "...";
            }
            return ret;  
    },
    
    getUrlParts: function(){
        var urlParts = window.location.pathname.split('/');
        return urlParts;
    },
    
    addWidth: function() {
        var screenWidth = this.getWinWidth();
        $('body').attr('data-screenwidth', screenWidth.toString());
    },
    
    addBodyUrlClasses: function() {
        var urlParts = this.getUrlParts();
        var classes = '';
        for (var i = 0; i < urlParts.length; i++) {
            if (urlParts[i] != null) {
                var part = urlParts[i]; // Remove the .
                part = part.replace(/html/, '');
                part = part.replace(/\./, '');
                classes += ' ' + part;
            }
        }
        if (classes != null) {
            $('body').addClass(classes);
        }
    },
    
    getUrlPara: function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    },
    
    // Find the a in the div, and make the whole div clickable
    makeDivClickable: function(ele) {
        $(ele).click(function() {
            window.location = $(this).find("a").attr("href");
        });
    },
    
    // Return the height of the window
    getWinHeight : function() {
        var viewportheight;
        if (typeof window.innerHeight != 'undefined') viewportheight = window.innerHeight
        else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0) viewportheight = document.documentElement.clientHeight
        else viewportheight = document.getElementsByTagName('body')[0].clientHeight
        
        return viewportheight;  
    },  
    
    // container : selector of the container 
    // ele : selection of the centered div
    verticalCenter: function(container, ele) {    
        var contHeight = $(container).height();
        var eleHeight = $(ele).height();
        
        // Vertical center an element is 
        // (Container's height  / 2) - Element's height
        var offset = (contHeight / 2) - (eleHeight / 2);
        $(ele).css("top", offset);
    },
    
    // Return the width of the window
    getWinWidth : function() {
        var viewportwidth;
        if (typeof window.innerWidth != 'undefined') viewportwidth = window.innerWidth
        else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) viewportwidth = document.documentElement.clientWidth
        else viewportwidth = document.getElementsByTagName('body')[0].clientWidth
        return viewportwidth;
    },
    
    /**
     * Test the existence of a sub property of an object 
     * @ngdoc function 
     * @name wecook.checkNested
     * @param {obj} The object to check 
     * @param {string} level1 the name of level 1 to n (need to be in order). 
     * @description Test the  existence of sub property of an object 
     * For example to check obj.prop1.prop2 we put checkNested(obj, 'prop1', 'prop2')
     * @link http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
     */
    checkNested = function(obj /*, level1, level2, ... levelN*/) {
      var args = Array.prototype.slice.call(arguments),
          obj = args.shift();

      for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
          return false;
        }
        obj = obj[args[i]];
      }
      return true;
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