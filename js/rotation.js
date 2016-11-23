$(document).ready(function() {
    chrome.storage.sync.get('chromeboardPrefs', function (obj) {
        var opt = obj.chromeboardPrefs.urlCol;
        //document.getElementById("sites").value = ArrayToSite( opt );
        console.log('chromeboardPrefs', opt);

        for (var i = 0; i < opt.length; i++) {
            $("#site-collection").append("<iframe src=\"" + opt[i] + "\"></iframe>")
        }
    });
});