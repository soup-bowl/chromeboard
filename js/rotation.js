$(document).ready(function() {
    applyTranslations();
    var opt;
    chrome.storage.sync.get('chromeboardPrefs', function (obj) {
        opt = obj.chromeboardPrefs.urlCol;
        
        if (opt.length > 0 && opt != "") {
            for (var i = 0; i < opt.length; i++) {
                $("#site-collection").append("<iframe id=\"site-" + (i + 1) + "\" src=\"" + opt[i] + "\"></iframe>");
            }
        } else {
            $("#site-collection").append("<iframe id=\"site-1\" src=\"blankingpage.html\" class=\"active\"></iframe>");
        }

        slide(10, opt.length, -1, obj.chromeboardPrefs.transitionTime);
    });
      
});

$("#settclick").click(function(event) {
    event.preventDefault();
    $('.settings-modal-close-shadow').addClass('active');
    $('.settings-modal').addClass('active');
});

$(".settings-modal-close-shadow").click(function(event) {
    event.preventDefault();
    $('.settings-modal-close-shadow').removeClass('active');
    $('.settings-modal').removeClass('active');
    window.location.reload();
});

function applyTranslations() {
    var tsl = chrome.i18n;
    document.title = tsl.getMessage("appName");
    document.getElementById("settclick").setAttribute('aria-label', tsl.getMessage("rSettings"));
    document.getElementById("settclick").title = tsl.getMessage("rSettings");
}

function slide(repeats, count, current, duration) {
    nextActive = current + 1;
    if (nextActive > (count -1)) {
        nextActive = 0;
    }

    if (duration < 1) {
        duration = 1;
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
            slide(repeats, count, nextActive, duration)
          },
          (duration * 1000)
        );
    }
}