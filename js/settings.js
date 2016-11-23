$(document).ready(function() {
    document.getElementById("saveS").addEventListener("click",goSettings);
    document.getElementById("sites").value
    //purgeUserPrefs();
    //storeUserPrefs(["example.com","dave.com","woohoo.com"]);
    getUserPrefs();
});

var storage = chrome.storage.sync;

function goSettings() {
    console.log(
        siteToArray(document.getElementById("sites").value)
    );
    storeUserPrefs( siteToArray(document.getElementById("sites").value) );
}

function storeUserPrefs(urlCollection) {
    storage.clear();
    var key='chromeboardPrefs', testPrefs = {'urlCol': urlCollection};
        storage.set({"chromeboardPrefs": testPrefs}, function() {
            //console.log('Saved', key, testPrefs);
        });
}

function getUserPrefs() {
    var aaa = storage.get('chromeboardPrefs', function (obj) {
        //console.log('chromeboardPrefs', obj);
        return obj.chromeboardPrefs.urlCol;
    });  

    console.log(aaa);
}

function purgeUserPrefs() {
    storage.clear();
}

function siteToArray(textareaContent) {
    comSepStr = textareaContent.replace(/(\r\n|\n|\r)/gm,",");
    return comSepStr.split(",");
}