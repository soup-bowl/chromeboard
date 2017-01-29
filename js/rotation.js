// Global rotation variables.
var ROTATION_CURRENT = -1;
var ROTATION_TOTAL   = 0;
var ROTATION_PAUSED  = false;

$(document).ready(function() {
	var opt;
	chrome.storage.sync.get('chromeboardPrefs', function (obj) {
		opt = obj.chromeboardPrefs.urlCol;
		ROTATION_TOTAL = opt.length;
		
		if (opt.length > 0 && opt != "") {
			for (var i = 0; i < opt.length; i++) {
				createFrame((i + 1), opt[i]);
			}
		} else {
			createFrame();
		}
		
		dockPosition(obj.chromeboardPrefs.dockPlacement);

		slide(10, obj.chromeboardPrefs.transitionTime);
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

// -- Other buttons --

$("#pauserotation").click(function(event) {
	pause();
});

$("#resumerotation").click(function(event) {
	pause();
});

$("#nextrotation").click(function(event) {
	rotation();
});

// -- End of Other buttons --

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
 * @param {integer} repeats Defunct, amount of times to repeat. Input less than 0 to stop entirely.
 * @param {integer} duration Length of time on the tab.
 */
function slide(repeats, duration) {
	if (duration < 1) {
		duration = 1;
	}

	if (!ROTATION_PAUSED) {
		rotation();
	}	
	
	window.setTimeout(
		function(){
		slide(repeats, duration)
		},
		(duration * 1000)
	);
}

/**
 * Switches the current tab. Allows specifying of the desired page number (listing order).
 * 
 * @param {integer} newtab If unchanged, goes to next in line.
 */
function rotation(newtab = false) {
	nextActive = ROTATION_CURRENT + 1;
	if (nextActive > (ROTATION_TOTAL - 1)) {
		nextActive = 0;
	}
	
	// New tab wasn't specified.
	if (newtab === false) {
		for (var i = 0; i < ROTATION_TOTAL; i++) {    
			// Each site to the count of the rotation, remove (if any) the 'active' class, 
			// and add it to the selected one.	
			$('#site-'+(i + 1)).removeClass('active');
			
			if (nextActive == i) {
				$('#site-'+(i + 1)).addClass('active');
				ROTATION_CURRENT = nextActive;
			}
		}
	} else {
		for (var i = 0; i < ROTATION_TOTAL; i++) {    
			// TODO - Remove code duplication.
			$('#site-'+(i + 1)).removeClass('active');
			
			if (i == newtab) {
				$('#site-'+(i + 1)).addClass('active');
				ROTATION_CURRENT = newtab;
			}
		}
	}
}

/**
 * Pauses the rotation.
 */
function pause() {
	ROTATION_PAUSED = (ROTATION_PAUSED) ? false : true;

	if (ROTATION_PAUSED) {
		$('#floater').removeClass('hidden');
		
		$('#pauserotation').addClass('hidden');
		$('#resumerotation').removeClass('hidden');
	} else {
		$('#floater').addClass('hidden');

		$('#pauserotation').removeClass('hidden');
		$('#resumerotation').addClass('hidden');
	}
}

/**
 * Change the dock position.
 * @param {integer} posId Numeric corners, clockwise around screen.
 */
function dockPosition(posId = 2) {
	$('#settings-tray').removeClass('topright topleft bottomleft bottomright');
	switch (parseInt(posId)) {
		case 1:
			$('#settings-tray').addClass('topleft');
			return true;
		case 2:
			$('#settings-tray').addClass('topright');
			return true;
		case 3:
			$('#settings-tray').addClass('bottomleft');
			return true;
		case 4:
			$('#settings-tray').addClass('bottomright');
			return true;	
		default:
			console.log('Invalid position ID of ' + posId + ' supplied. Default position used.');
			$('#settings-tray').addClass('topright');
			return true;	
	}
}

/**
 * Creates an IFrame in the site-collection ID. No arguments creates an example tab.
 * @param {integer} $id 
 * @param {string} $url
 */
function createFrame(id = -1, url = null) {
	var newFrame = document.createElement('iframe');
	newFrame.id = "site-" + id;
	newFrame.setAttribute("src", url);
	newFrame.setAttribute("sandbox", "allow-forms allow-same-origin allow-scripts");

	if (id !== -1) {
		newFrame.id = "site-" + id;
		newFrame.setAttribute("src", url);
	} else {
		newFrame.id = "site-1";
		newFrame.setAttribute("src", "blankingpage.html");
		newFrame.setAttribute("class", "active");
	}
	
	document.getElementById("site-collection").appendChild(newFrame);
}