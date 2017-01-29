$(document).ready(function() {
	document.getElementById("btnSave").addEventListener("click",goSettings);
	document.getElementById("btnReset").addEventListener("click",goReset);
	document.getElementById("btnAddEntry").addEventListener("click",AppendSiteInputElement);

	// Register the site list as JQuery UI sortable. 
	$( "#sortable" ).sortable();

	// Show the current settings.
	updatePageWithCurrentPrefs();

	// Handler to delete dynamic site inputs.
	$('body').on('click', 'a.deleteSite', function(e) {
		removeSiteInputElement(e.target.parentElement.dataset.site);
	});
});

// Shorthand for Chrome storage commands.
var storage = chrome.storage.sync;

/**
 * Collects all the input data from the page and saves it to Chrome sync. Closes the window if in an IFrame.
 * @param {boolean} save
 */
function goSettings(save = true) {
	if (save) {
		var siteEntry = $( "#sortable" ).find("input");
		var siteCollection = [];
		var dockPosDropdown = document.getElementById("dockplacement");

		$.each(siteEntry, function( index, value ) {
			if (value.value != "") {
				siteCollection.push(value.value);
			}
		});

		storeUserPrefs( 
			siteCollection,
			document.getElementById("transition").value,
			dockPosDropdown.options[dockPosDropdown.selectedIndex].value
		);
	}

	if (window.frameElement) {
		parent.toggleSettingsFrame(event);
	}
}

/**
 * Resets the tool back to factory settings.
 */
function goReset() {
	var confirm = window.confirm( chrome.i18n.getMessage('cbSettingsSiteResetDialog') );

	if (confirm) {
		storage.clear();
		storeUserPrefs([], 30, 2);
	} else {
		return false;
	}
}

/**
 * Stores preferences in Chrome storage.
 * @param {string} urlCollection
 * @param {integer} transitionTime
 * @param {integer} dockPlacement
 */
function storeUserPrefs(urlCollection = "", transitionTime = 30, dockPlacement = 2) {
	storage.clear();
	var key='chromeboardPrefs', testPrefs = 
	{
		'urlCol': urlCollection,
		'transitionTime': transitionTime,
		'dockPlacement': dockPlacement
	};
		storage.set({"chromeboardPrefs": testPrefs}, function() {
			//console.log('Saved', key, testPrefs);
		});
}

/**
 * Updates the DOM with settings retrieved from storage.
 */
function updatePageWithCurrentPrefs() {
	var prefs = storage.get('chromeboardPrefs', function (obj) {
		var opt = obj.chromeboardPrefs.urlCol;
			
		if (opt != "") {
			$.each(opt, function( index, value ) {
				createSiteInputElement('#sortable', index, value)
			});
		} else {
			createSiteInputElement('#sortable', 1);
		}

		document.getElementById("transition").value = obj.chromeboardPrefs.transitionTime;

		var dockPosDropdown = document.getElementById('dockplacement');
		var opts = dockPosDropdown.options.length;
		for (var i = 0; i < opts; i++){
			if (dockPosDropdown.options[i].value == obj.chromeboardPrefs.dockPlacement){
				dockPosDropdown.options[i].selected = true;
				break; // No point finishing.
			}
		}
	});
	
}

/**
 * Clears the storage area.
 */
function purgeUserPrefs() {
	storage.clear();
}

/**
 * Creates a site input element with grab and delete button.
 * @param {string} location
 * @param {integer} number
 * @param {string} site
 */
function createSiteInputElement(location, number, site = '') {
	$('<input>', {
		id: 'site' + number,
		type: 'text',
		value: site,
		placeholder: 'http://example.com'
	}).wrap('<li>').parent().appendTo(location);
	$('#site' + number).before('<i class="fa fa-arrows-v" aria-hidden="true"></i> - ');
	$('#site' + number).after(" <a class='deleteSite' data-site='" + number + "' href='#'><i class='fa fa-minus' aria-hidden='true'></i></a>");
}

/**
 * Finds the last numeric entry on-screen, and adds a new site. Uses createSiteInputElement.
 */
function AppendSiteInputElement() {
	var siteEntry = $( "#sortable" ).find("input").length;
	createSiteInputElement('#sortable', (siteEntry + 1));
}

/** 
 * Removes the inputted site number from the list.
 * @param {integer} sNo Site number (ID of site#)
 */
function removeSiteInputElement(sNo) {
	console.log( sNo );
	$('#site' + sNo).parent().remove();
}