document.addEventListener("DOMContentLoaded", function(event) { 
    applyTranslations();
});

function applyTranslations() {
    var tsl = chrome.i18n;
    document.getElementById("bpHeadline").innerHTML = tsl.getMessage("cbBlankingTitle");
    document.getElementById("bpDesc").innerHTML = tsl.getMessage("cbBlankingDesc");
    document.getElementById("bpb1").innerHTML = tsl.getMessage("cbBlankingBullet1");
    document.getElementById("bpb2").innerHTML = tsl.getMessage("cbBlankingBullet2");
    document.getElementById("bpb3").innerHTML = tsl.getMessage("cbBlankingBullet3");
}