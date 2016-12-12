$(document).ready(function() {
    var opt;
    chrome.storage.sync.get('chromeboardPrefs', function (obj) {
        opt = siteToArray(obj.chromeboardPrefs.urlCol);
        
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

// -- Settings button and background handlers --
$("#settclick").click(function(event) {
    toggleSettingsFrame(event);
});

$(".settings-modal-close-shadow").click(function(event) {
    toggleSettingsFrame(event);
});
// -- End of settings button and background handlers --

// -- Lockstate handlers --
$("#setlockstate").click(function(event) {
    toggleLockstate(event);
});

$("#setunlockstate").click(function(event) {
    toggleLockstate(event);
});

$(document).on({
    "contextmenu": function(e) {
        if($('#sb-unlocked').hasClass('hidden')) {
            e.preventDefault();
        }
    }
});

// --  End of lockstate handlers --

/**
 * Opens and closes the modal settings IFrame.
 * @param {event} event
 */
function toggleSettingsFrame(event) {
    event.preventDefault();
    if( $('.settings-modal').hasClass('active') ) {
        $('.settings-modal-close-shadow').removeClass('active');
        $('.settings-modal').removeClass('active');
        window.location.reload();
    } else {
        $('.settings-modal-close-shadow').addClass('active');
        $('.settings-modal').addClass('active');
    }
}

/**
 * Enables and disables the locked rotation state.
 * @param {event} event
 */
function toggleLockstate(event) {
    event.preventDefault();
    if( $('#sb-unlocked').hasClass('hidden') ) {
        $('#sb-unlocked').removeClass('hidden');
        $('#sb-locked').addClass('hidden');

        $('.noclick-zone').remove();
    } else {
        $('#sb-unlocked').addClass('hidden');
        $('#sb-locked').removeClass('hidden');
        
        $('body').append( $('<div/>').addClass("noclick-zone") );
    }
}

/**
 * Infinite loop handling the tab switching process.
 *  
 * Repeats - Defunct, amount of times to repeat. Input less than 0 to stop entirely.
 * 
 * Count - Number of sites in the rotation.
 * 
 * Current - The site currently designated to be shown.
 * 
 * Duration - Length of time on the tab.
 * @param {integer} repeats
 * @param {integer} count 
 * @param {integer} current 
 * @param {integer} duration 
 */
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

/**
 * Receives a CSV of URLs and returns an array.
 * @param {string} textareaContent
 */
function siteToArray(textareaContent) {
    comSepStr = textareaContent.split(",");
    return comSepStr;
}