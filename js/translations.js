$(document).ready(function() {
    setTitle();
    $('h1, h2, p, button').each(function() {
        if( $(this).data("translation") ) {
            getTranslation( $(this) );
        }
    });
});

function getTranslation(element) {
    var tsl = chrome.i18n;
    element.html( tsl.getMessage( element.data('translation') ) );
}

function setTitle() {
    var tsl = chrome.i18n;
    var currentTitle = tsl.getMessage( $('title').data('translation') );
    document.title = currentTitle + ' - ' + tsl.getMessage('appName');

}