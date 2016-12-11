$(document).ready(function() {
    applyTranslations();
    
    document.getElementById("btnSave").addEventListener("click",goSettings);
    document.getElementById("sites").value
    
    updatePageWithCurrentPrefs();
});

function applyTranslations() {
    var tsl = chrome.i18n;
    var warningTriangle = "<i class=\"fa fa-exclamation-triangle fa-fw\" aria-hidden=\"true\"></i> ";

    document.title                                  = tsl.getMessage("cbSettingsTitle") + " - " + tsl.getMessage("appName");
    document.getElementById("title").innerHTML      = tsl.getMessage("appName") + " " + tsl.getMessage("cbSettingsTitle");
    document.getElementById("siterotate").innerHTML = tsl.getMessage("cbSettingsSiteRotation");
    document.getElementById("srwarning").innerHTML  = warningTriangle + tsl.getMessage("cbSettingsSiteRotationWarning");
    document.getElementById("transtime").innerHTML  = tsl.getMessage("cbSettingsSiteTransitionTime");
    document.getElementById("btnSave").innerHTML    = tsl.getMessage("cbSettingsSiteSubmit");    
}

var storage = chrome.storage.sync;

function goSettings() {
    storeUserPrefs( 
        siteToArray(document.getElementById("sites").value),
        document.getElementById("transition").value
    );

    if (window.frameElement) {
        parent.toggleSettingsFrame(event);
    }
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
    comSepStr = textareaContent.split(",");
    return comSepStr;
}

function ArrayToSite(arr) {
    var str = '';
    arr.forEach(function(element) {
        str += element + ",";
    }, this);
    var str2 = str.slice(0, -1);
    return str2;
}