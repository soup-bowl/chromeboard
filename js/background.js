chrome.browserAction.onClicked.addListener(function(activeTab){
	chrome.tabs.create({'url': chrome.extension.getURL('src/browser/rotation.html')}, function(tab) {
		// Tab opened.
	});
});

chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		chrome.storage.sync.clear();
		chrome.storage.sync.set({
				"chromeboardPrefs": {
					'urlCol':[],
					'transitionTime': 30 
				}
			}, function() {});
	}
});