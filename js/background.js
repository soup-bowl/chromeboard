chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.tabs.create({'url': chrome.extension.getURL('rotation.html')}, function(tab) {
        // Tab opened.
    });
});