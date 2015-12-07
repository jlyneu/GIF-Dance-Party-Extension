/******************************************************************************
 * INCLUDES
 *****************************************************************************/
 $('head').append('<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"></link>')
    .append("<link href='https://fonts.googleapis.com/css?family=Hammersmith+One' rel='stylesheet' type='text/css'>");

/******************************************************************************
 * CONSTANTS
 *****************************************************************************/
/** Maximum z-index value */
var maxZIndex = Math.pow(2, 31);

/** z-index of front-most GIF */
var frontZIndex = maxZIndex - 500;

/** z-index of back-most GIF */
var backZIndex = frontZIndex - 1;

/******************************************************************************
* DANCER CREATION
*****************************************************************************/

/* Horizontally flip the given image element */
function flipImage($image) {
    if ($image.hasClass('gdp-flipped')) {
        $image.removeClass('gdp-flipped');
    } else {
        $image.addClass('gdp-flipped');
    }
}

/* Create a GIF of the dancer with the given name in the top left corner
of the screen. On hover, the GIF will have an X button in the top left,
a FLIP, FRONT, and BACK button in the top right, a CLONE button in
the bottom left, and a RESIZE handle in the bottom right. GIFS should
by default be in front of the other divs upon creation. */
function createGIFDancer(dancerName, url) {
    if(!url){
        //no url was defined
        // Giphy url for the GIF dancer
        var gifUrl = gdpMedia.getGifUrl(dancerName);
        // Img element of the GIF dancer
        var gifImg = $('<img src="' + gifUrl + '" />');
    }
    else{
        var gifUrl = url;
        var gifImg = $('<img src="' + url + '" />');
    }


    // ----------------- create the various dancer options ----------------- //

    // Remove the GIF dancer on click of the close X button
    var closeDiv = $('<div class="gdp-opt gdp-top-left">X</div>')
        .click(function() {
            $(this).parents('.gdp-dancer').remove();
        });
    // Horizontally flip the GIF dancer on click of the FLIP button
    var flipDiv = $('<div class="gdp-opt gdp-top-right">FLIP</div>')
        .click(function() {
            flipImage($(this).parents('.gdp-dancer').find('img'));
        });
    // Send the GIF dancer to the back on click of the BACK button
    var backDiv = $('<div class="gdp-opt gdp-top-right">BACK</div>')
        .click(function() {
            $(this).parents('.gdp-dancer').css('z-index', backZIndex);
            backZIndex--;
        });
    // Send the GIF dancer to the front on click of the FRONT button
    var frontDiv = $('<div class="gdp-opt gdp-top-right">FRONT</div>')
        .click(function() {
            $(this).parents('.gdp-dancer').css('z-index', frontZIndex);
            frontZIndex++;
        });
    // Create a new GIF of the same dancer on click of the CLONE button
    var cloneDiv = $('<div class="gdp-opt gdp-bottom-left">CLONE</div>')
        .css('z-index', maxZIndex)
        .click(function() {
            if(!url){
                //one from a list
                createGIFDancer(dancerName);
            }
            else{
                //one from Custom
                createGIFDancer("",gifUrl);
            }
        });

    // Create a div to hold the top dancer options above the GIF itself
    var topOptDiv = $('<div class="gdp-top-opt"></div>')
        .append(closeDiv)
        .append(flipDiv)
        .append(backDiv)
        .append(frontDiv)
        .css('z-index', maxZIndex);

    // --------------------------------------------------------------------- //

    // create an div that resizes with the dancer GIF
    var resizableDiv = $('<div class="gdp-resizable"></div>')
        // append the buttons for the dancer options
        .append(topOptDiv)
        .append(cloneDiv)
        // append the actual GIF dancer
        .append(gifImg)
        // on hover, display the dancer options
        .hover(function() {
            $(this).css('background-color', 'rgba(0,0,0,.3)');
            $(this).find('.gdp-opt').css('display', 'inline-block');
            $(this).find('.ui-resizable-handle').css('display', 'block');
        }, function() {
            $(this).css('background-color', 'rgba(0,0,0,0)');
            $(this).find('.gdp-opt').css('display', 'none');
            $(this).find('.ui-resizable-handle').css('display', 'none');
        });

    // create the dancer div containing the GIF and the various dancer options
    var dancerDiv = $('<div class="gdp-dancer"></div>')
        // allow the user to drag this div around the screen
        .draggable()
        .css('z-index', frontZIndex)
        .append(resizableDiv);

    // increment the frontZIndex value so the next created GIF will be in front
    frontZIndex++;
    // append the dancer to the screen
    $('body').append(dancerDiv);

    // set resizing functionality. Currently does so for all dancers,
    // but it would be great to find a different solution
    $.each($('.gdp-resizable'), function(index, value) {
        $(this).resizable({
            alsoResize: $(this).find('img'),
            aspectRatio: true
        })
    });

    // hide the jQuery UI resize handle upon creation
    dancerDiv.find('.ui-resizable-handle').css('display', 'none');

}

/******************************************************************************
* MENU CREATION
*****************************************************************************/

/* Append the main menu containing "ADD DANCER" and "SELECT SONG" options
to the bottom right corner of the screen */
function createMainMenu() {

    var menuHtml = [
        '<div class="gdp-main-menu">',
        '<div class="gdp-add-dancer gdp-main-menu-btn">ADD DANCER</div>',
        '<div class="gdp-select-song gdp-main-menu-btn">SELECT SONG</div>',
        '</div>'
    ].join('');

    // append the menu to the screen
    $('body').append(menuHtml);
    $('.gdp-main-menu').css('z-index', maxZIndex);

    // set a click listener for the "ADD DANCER" menu option
    $('.gdp-add-dancer').click(function() {
        createAddDancerMenu();
    });
    // set a click listener for the "SELECT SONG" menu option
    $('.gdp-select-song').click(function() {
        createSelectSongMenu();
    });
}

// ---------------------- create the ADD DANCER menu ----------------------- //

/* Return an element representing the 100px by 100px thumbnail of the GIF
dancer framed by a white circle with a black border */
function createThumbnail(dancerName, imageUrl) {

    var dancerThumbnailWrapper = $('<div class="gdp-thumbnail-wrapper"></div>');
    var dancerThumbnailImg = $('<img class="gdp-thumbnail-img" src="' + imageUrl + '" />');
    if (!dancerName) {
        dancerThumbnailWrapper.addClass('gdp-custom-thumbnail');
        var dancerThumbnailDelete = $('<div class="gdp-thumbnail-delete">X</div>').css("z-index", maxZIndex).click(function() {
            var customDancerIndex = $('.gdp-custom-thumbnail').index($(this).parent());
            chrome.storage.sync.get("customDancers", function(storageItem){
                storageItem.customDancers.splice(customDancerIndex, 1);
                var storageObj = {};
                storageObj["customDancers"] = storageItem.customDancers;
                chrome.storage.sync.set(storageObj);
                createAddDancerMenu();
            });
            $(this).parent().remove();
        });
        dancerThumbnailWrapper.append(dancerThumbnailDelete);
    }

    // on click of the thumbnail, remove the ADD DANCER menu and append the
    // corresponding dancer GIF to the top left corner of the screen
    dancerThumbnailImg.click(function() {
        if (dancerName) {
            createGIFDancer(dancerName);
        } else {
            createGIFDancer("", imageUrl);
        }
        $('.gdp-add-dancer-menu').remove();
    });

    dancerThumbnailWrapper.append(dancerThumbnailImg);
    return dancerThumbnailWrapper;
}

/* Create the ADD DANCER menu, containing the thumbnails of all the GDP GIF
dancers. On click of a GIF dancer thumbnail, the menu will be removed and
the GIF dancer will be appended to the screen. Clicking on anything besides
the thumbnails will close the ADD DANCER menu without appending any GIF
dancers to the screen */
function createAddDancerMenu() {

    // a list to hold the DOM elements of the GIF dancer thumbnails
    var thumbnailDivs = [];

    // loop through all of the GIF dancer names and add the thumbnail DOM
    // element for the corresponding dancers to the thumbnailDivs list
    for (var dancerName in gdpMedia.mediaIds) {
        if (gdpMedia.mediaIds.hasOwnProperty(dancerName)) {
            var imgurUrl = gdpMedia.getThumbnailUrl(dancerName);
            thumbnailDivs.push(createThumbnail(dancerName, imgurUrl));
        }
    }

    chrome.storage.sync.get("customDancers", function(storageItem) {
        var customDancers = storageItem.customDancers;
        if (customDancers && customDancers.length > 0) {
            for (var i = 0; i < customDancers.length; i++) {
                var currentDancer = customDancers[i];
                thumbnailDivs.push(createThumbnail("", currentDancer));
            }
        } else {
            var storageObj = {}
            storageObj["customDancers"] = []
            chrome.storage.sync.set(storageObj);
        }

        // transparent full screen div that contains the list of thumbnails, but
        // will close on click
        var gdpAddDancerMenu = $('<div class="gdp-menu"></div>')
        .css('z-index', maxZIndex)
        .click(function() {
            if(!$("#gdp-add-gif-input").is(":focus")){
                //input and text area has focus
                $(this).remove();
            }
        });

        // div containing the GIF dancer thumbnails
        var gdpAddDancerList = $('<div class="gdp-menu-list"></div>');
        // loop through the GIF dancer thumbnail list and append each thumbnail
        // to the menu list
        for (var i = 0; i < thumbnailDivs.length; i++) {
            gdpAddDancerList.append(thumbnailDivs[i]);
        }

        // append the thumbnail list to the screen
        gdpAddDancerMenu.append(gdpAddDancerList);
        var addGif = ["<div id='gdp-add-gif-wrapper' class='gdp-add-custom-wrapper'>",
                           "<input type='text' align='left' ",
                               "placeholder='Add a custom GIF URL' id='gdp-add-gif-input' ",
                               "class='gdp-add-custom-short-input'></input>" +
                           "<div id='gdp-add-gif-button' class='gdp-add-custom-button'>Submit</div>",
                       "</div>"].join('');
        gdpAddDancerMenu.append(addGif);
        $('body').append(gdpAddDancerMenu);
        $("#gdp-add-gif-button").click(function(){
            addGiphy();
        });
    });
}

// ---------------------Take In Custom Gifs from Giphy---------------------- //

/*
    Listen for an enter event or click Submit
*/
$(document).keypress(function(e) {
    if(e.which == 13 && $("#gdp-add-gif-input").is(":focus")) {
        //pressed enter while focused
        $('#gdp-add-gif-button').click();
    }
});
function saveGiphy(url) {
    chrome.storage.sync.get("customDancers", function(storageItem) {
        var customDancers = storageItem["customDancers"];
        var storageObj = {};
        if (customDancers) {
            customDancers.push(url);
            storageObj["customDancers"] = customDancers;
            chrome.storage.sync.set(storageObj)
        } else {
            storageObj["customDancers"] = [];
            chrome.storage.sync.set(storageObj);
        }
    });
}
function addGiphy(){
   var link = $("#gdp-add-gif-input").val(); //get the link from the input
   var ending = link.slice(-4);
   if(ending == ".gif"){
       $('.gdp-menu').remove();
       saveGiphy(link);
       createGIFDancer("",link);
   }else{
       alert("URL did not point to a .GIF");
   }
}

// ---------------------- create the SELECT SONG menu ---------------------- //

/* Return an element representing a song choice for the GDP */
function createSongOption(songName) {
    songUrl = null;

    var songOption = $('<div class="gdp-song-option">' + songName.toUpperCase() + '</div>');
    // add delete button for custom song options
    if (!gdpMedia.gdpSongMap.hasOwnProperty(songName)) {
        songOption.addClass('gdp-custom-song-option').click(function() {
            var customSongOptionIndex = $('.gdp-custom-song-option').index($(this));
            chrome.storage.sync.get("customSongs", function(storageItem){
                songUrl = storageItem.customSongs[customSongOptionIndex].url;
                gdpMedia.selectSong(songName, songUrl, true);
                $('.gdp-select-song-menu').remove();
            });
        });
        var songOptionDelete = $('<div class="gdp-song-option-delete">X</div>').css("z-index", maxZIndex).click(function() {
            var customSongDeleteOptionIndex = $('.gdp-custom-song-option').index($(this).parent());
            chrome.storage.sync.get("customSongs", function(storageItem){
                storageItem.customSongs.splice(customSongDeleteOptionIndex, 1);
                var storageObj = {};
                storageObj["customSongs"] = storageItem.customSongs;
                chrome.storage.sync.set(storageObj);
                createSelectSongMenu();
            });
            $(this).parent().remove();
        });
        songOption.append(songOptionDelete);
    } else {
        songOption.click(function() {
            gdpMedia.selectSong(songName, songUrl || "");
            $('.gdp-select-song-menu').remove();
        });
    }

    return songOption;
}

/* Create the SELECT SONG menu, containing a list of available GDP songs to
play in the background. On click of a song option, the menu will be removed
and the new song will be played. Clicking on anything besides the song
options will close the SELECT SONG menu without playing a new song */
function createSelectSongMenu() {

    // a list to hold the DOM elements of the song options
    var songOptions = [];

    // loop through all of the GDP song names and add the song option
    // DOM element to the songOptions list
    for (var i = 0; i < gdpMedia.gdpPlaylist.length; i++) {
        songOptions.push(createSongOption(gdpMedia.gdpPlaylist[i]));
    }

    chrome.storage.sync.get("customSongs", function(storageItem) {
        var customSongs = storageItem.customSongs;
        if (customSongs && customSongs.length > 0) {
            for (var i = 0; i < customSongs.length; i++) {
                var currentSong = customSongs[i];
                songOptions.push(createSongOption(currentSong.name));
            }
        } else {
            var storageObj = {}
            storageObj["customSongs"] = []
            chrome.storage.sync.set(storageObj);
        }

            // transparent full screen div that contains the list of song options,
            // but will close on click
            var gdpSelectSongMenu = $('<div class="gdp-menu"></div>')
            .css('z-index', maxZIndex)
            .click(function() {
                if(!$("#gdp-add-song-url-input").is(":focus") && !$("#gdp-add-song-name-input").is(":focus")){
                    //input and text area has focus
                    $(this).remove();
                }
            });

            // div containing the song options
            var gdpSelectSongList = $('<div class="gdp-menu-list"></div>');
            // loop through the song options list and append each song option
            // to the menu list
            for (var i = 0; i < songOptions.length; i++) {
                gdpSelectSongList.append(songOptions[i]);
            }

            // append the song option list to the screen
            gdpSelectSongMenu.append(gdpSelectSongList);

            var addSong = ["<div id='gdp-add-song-wrapper' class='gdp-add-custom-wrapper'>",
                               "<input type='text' align='left' ",
                                   "placeholder='Add a custom song URL' id='gdp-add-song-url-input' ",
                                   "class='gdp-add-custom-input' />" +
                               "<input type='text' align='left' ",
                                   "placeholder='Add a custom song name' id='gdp-add-song-name-input' ",
                                   "class='gdp-add-custom-short-input' maxlength=20 />",
                               "<div id='gdp-add-song-button' class='gdp-add-custom-button'>Submit</div>",
                           "</div>"].join('');
            gdpSelectSongMenu.append(addSong);
            $('body').append(gdpSelectSongMenu);
            $("#gdp-add-song-button").click(function(){
                addCustomSong();
            });

            $('body').append(gdpSelectSongMenu);
    });
}

// ---------------------Take In Custom Songs---------------------- //

/*
    Listen for an enter event or click Submit
*/
$(document).keypress(function(e) {
    if(e.which == 13 && $("#gdp-add-song-input").is(":focus")) {
        //pressed enter while focused
        $('#gdp-add-song-button').click();
    }
});
function saveCustomSong(songName, url) {
    chrome.storage.sync.get("customSongs", function(storageItem) {
        var customSongs = storageItem["customSongs"];
        var storageObj = {};
        if (customSongs) {
            customSongs.push({name: songName, url: url});
            storageObj["customSongs"] = customSongs;
            chrome.storage.sync.set(storageObj)
        } else {
            storageObj["customSongs"] = [];
            chrome.storage.sync.set(storageObj);
        }
    });
}
function addCustomSong(){
    var name = $("#gdp-add-song-name-input").val(); // get the song name from the input
    var url = $("#gdp-add-song-url-input").val(); //get the link from the input
    if(url.indexOf('.mp3') > -1 || url.indexOf('.wav') > -1 || url.indexOf('.ogg') > -1){
        saveCustomSong(name, url);
        $('.gdp-menu').remove();
        gdpMedia.selectSong(name, url, true);
    }else{
        alert("URL did not point to a .mp3, .wav, or .ogg");
    }
}

/******************************************************************************
* STARTING AND STOPPING THE PARTY
*****************************************************************************/

/* Return true if the part is on, meaning the main menu is currently
displayed on the screen. Otherwise, return false */
function isPartyOn() {
    return $('.gdp-main-menu').length > 0;
}

/* Append the main menu to the screen, start the music, and append the default
GIF dancers to the screen */
function startTheParty() {
    createMainMenu();
    gdpMedia.selectSong('singalong');
    createGIFDancer('pumpgirl');
    gdpMedia.unloadAudio();
}

/* Remove the main menu, stop the music, and remove the GIF dancers, ADD
DANCER menu, and SELECT SONG menu */
function stopTheParty() {
    $('.gdp-main-menu').remove();
    gdpMedia.stopAudio();
    $('.gdp-dancer').remove();
    $('.gdp-menu').remove();
    $(window).off('unload');
}

/******************************************************************************
* LISTENERS
*****************************************************************************/

/* Set a listener for messages requesting to start and stop the GDP */
chrome.runtime.onMessage.addListener(function(request, sender) {
    // tell the background script whether the party is on or off
    if(request.type == "isPartyOn") {
        chrome.runtime.sendMessage({
            type: "partyStatus",
            isPartyOn: isPartyOn()
        });
    }
    else if (request.type == "startParty") {
        startTheParty();
    }
    else if (request.type == "stopParty") {
        stopTheParty();
    }
});
