$(document).ready(function() {
    purgeUserPrefs();
    storeUserPrefs(["example.com","dave.com","woohoo.com"]);
    getUserPrefs();
});

var storage = chrome.storage.sync;

function storeUserPrefs(urlCollection) {
    var key='chromeboardPrefs', testPrefs = {'urlCol': urlCollection};
        storage.set({"chromeboardPrefs": testPrefs}, function() {
            //console.log('Saved', key, testPrefs);
        });
}

function getUserPrefs() {
    storage.get('chromeboardPrefs', function (obj) {
        //console.log('chromeboardPrefs', obj);
    });
}

function purgeUserPrefs() {
    chrome.storage.sync.clear();
}