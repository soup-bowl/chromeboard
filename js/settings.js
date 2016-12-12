$(document).ready(function() {
    document.getElementById("btnSave").addEventListener("click",goSettings);
    document.getElementById("btnAddEntry").addEventListener("click",AppendSiteInputElement);

    $( "#sortable" ).sortable();

    updatePageWithCurrentPrefs();

    // Handler to delete dynamic site inputs.
    $('body').on('click', 'a.deleteSite', function(e) {
        removeSiteInputElement(e.target.parentElement.dataset.site);
    });
});

var storage = chrome.storage.sync;

function goSettings(save = true) {
    if (save) {
        var siteEntry = $( "#sortable" ).find("input");
        var siteCollection = [];
        
        $.each(siteEntry, function( index, value ) {
            if (value.value != "") {
                siteCollection.push(value.value);
            }
        });
        var sitelist = ArrayToSite(siteCollection);

        storeUserPrefs( 
            ArrayToSite(siteCollection),
            document.getElementById("transition").value
        );
    }

    if (window.frameElement) {
        parent.toggleSettingsFrame(event);
    }
}

function storeUserPrefs(urlCollection = "", transitionTime = 30) {
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
            
        if (opt != "") {
            var allSites = siteToArray(opt);
            $.each(allSites, function( index, value ) {
                createSiteInputElement('#sortable', index, value)
            });
        } else {
            createSiteInputElement('#sortable', 1);
        }

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

/**
 * Creates a site input element with grab and delete button.
 * @param {string} location
 * @param {integer} number
 * @param {string} site
 */
function createSiteInputElement(location, number, site = '') {
    $('<input>', {
        id: 'site' + number,
        type: 'text',
        value: site,
        placeholder: 'http://example.com'
    }).wrap('<li>').parent().appendTo(location);
    $('#site' + number).before('<i class="fa fa-arrows-v" aria-hidden="true"></i> - ');
    $('#site' + number).after(" <a class='deleteSite' data-site='" + number + "' href='#'><i class='fa fa-minus' aria-hidden='true'></i></a>");
}

/**
 * Finds the last numeric entry on-screen, and adds a new site. Uses createSiteInputElement.
 */
function AppendSiteInputElement() {
    var siteEntry = $( "#sortable" ).find("input").length;
    createSiteInputElement('#sortable', (siteEntry + 1));
}

/** 
 * Removes the inputted site number from the list.
 * @param {integer} sNo Site number (ID of site#)
 */
function removeSiteInputElement(sNo) {
    console.log( sNo );
    $('#site' + sNo).parent().remove();
}