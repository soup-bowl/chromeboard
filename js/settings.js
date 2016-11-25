$(document).ready(function() {
    document.getElementById("saveS").addEventListener("click",goSettings);
    document.getElementById("sites").value
    
    updatePageWithCurrentPrefs();
});

var storage = chrome.storage.sync;

function goSettings() {
    storeUserPrefs( 
        siteToArray(document.getElementById("sites").value),
        document.getElementById("transition").value
    );
}

function storeUserPrefs(urlCollection, transitionTime) {
    storage.clear();
    var key='chromeboardPrefs', testPrefs = 
    {
        'urlCol': urlCollection,
        'transitionTime': transitionTime 
    };
        storage.set({"chromeboardPrefs": testPrefs}, function() {
            //console.log('Saved', key, testPrefs);
        });
}

function updatePageWithCurrentPrefs() {
    var prefs = storage.get('chromeboardPrefs', function (obj) {
        var opt = obj.chromeboardPrefs.urlCol;
        document.getElementById("sites").value = ArrayToSite( opt );
        document.getElementById("transition").value = obj.chromeboardPrefs.transitionTime;
    });
    
}

function purgeUserPrefs() {
    storage.clear();
}

function siteToArray(textareaContent) {
    comSepStr = textareaContent.replace(/(\r\n|\n|\r)/gm,",");
    comSepStr2 = comSepStr.split(",");
    comSepStr3 = comSepStr2.slice(0, -1);
    return comSepStr3;
}

function ArrayToSite(arr) {
    var str = '';
    arr.forEach(function(element) {
        str += element + "\r\n";
    }, this);
    return str;
}