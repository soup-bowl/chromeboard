$(document).ready(function() {
    setTitle();
    $('h1, h2, p, a, li, button').each(function() {
        if( $(this).data("translation") ) {
            getTranslation( $(this) );
        } 
        if( $(this).data("translationtooltip") ) {
            getTooltipTranslation( $(this) );
        }
    });
});

var tsl = chrome.i18n;

/**
 * Picks out the element contents and replaces it with translated version.
 * @param {Element} element
 */
function getTranslation(element) {
    element.html( tsl.getMessage( element.data('translation') ) );
}

/**
 * Picks out the element tooltips and replaces it with translated version, including aria.
 * @param {Element} element
 */
function getTooltipTranslation(element) {
    element[0].title = tsl.getMessage( element.data('translationtooltip') );
    element[0].setAttribute('aria-label', tsl.getMessage( element.data('translationtooltip') ) );  
}

/**
 * Replaces the page title with a converted version. 
 */
function setTitle() {
    var currentTitle = $('title').data('translation');

    if(currentTitle === "") {
        document.title = tsl.getMessage('appName');
    } else {
        var translationTitle = tsl.getMessage( $('title').data('translation') );
        document.title = translationTitle + ' - ' + tsl.getMessage('appName');
    }

}