/**
 * Exports the users current configuration as a JSON file.
 */
function saveSettingsToFile() {
	chrome.storage.sync.get('chromeboardPrefs', function (obj) {
		chrome.downloads.download({
			url: 'data:application/json;base64,' + btoa( JSON.stringify(obj.chromeboardPrefs) ),
			filename: 'chromeboard-config.json'
		});
	});
}

/**
 * Replaces the user configuration with that of a compatible JSON file.
 * @param {string} json Stringified JSON.
 */
function loadSettingsFromJSON(json) {
	var newConfig = JSON.parse(json);

	if( typeof newConfig.urlCol === 'object' && typeof newConfig.dockPlacement === 'string' ) {
		storage.clear();
		var key='chromeboardPrefs', testPrefs = newConfig;
		storage.set({"chromeboardPrefs": testPrefs});
		
		return true;
	} else {
		return false;
	}
}