$(document).ready(function() {
    var opt;
    chrome.storage.sync.get('chromeboardPrefs', function (obj) {
        opt = obj.chromeboardPrefs.urlCol;
        console.log('chromeboardPrefs', opt);

        for (var i = 0; i < opt.length; i++) {
            $("#site-collection").append("<iframe id=\"site-" + (i + 1) + "\" src=\"" + opt[i] + "\"></iframe>")
        }

        slide(10, opt.length, -1);
    });
      
});

function slide(repeats, count, current) {
    nextActive = current + 1;
    if (nextActive > (count -1)) {
        nextActive = 0;
    }

    if (repeats > 0) {
        for (var i = 0; i < count; i++) {    	
            $('#site-'+(i + 1)).removeClass('active');
            if (nextActive == i) {
                $('#site-'+(i + 1)).addClass('active');
            }
        }
        
        window.setTimeout(
          function(){
            slide(repeats, count, nextActive)
          },
          30000
        );
    }
}