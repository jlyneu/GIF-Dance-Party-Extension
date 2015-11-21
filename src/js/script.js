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
function createGIFDancer(dancerName) {
    // Giphy url for the GIF dancer
    var gifUrl = gdpMedia.getGifUrl(dancerName);
    // Img element of the GIF dancer
    var gifImg = $('<img src="' + gifUrl + '" />');

    // ----------------- create the various dancer options ----------------- //

    // Remove the GIF dancer on click of the close X button
    var closeDiv = $('<div class="gdp-opt gdp-top-left">X</div>')
        .click(function() {
            $(this).parent().remove();
        });
    // Horizontally flip the GIF dancer on click of the FLIP button
    var flipDiv = $('<div class="gdp-opt gdp-top-right">FLIP</div>')
        .click(function() {
            flipImage($(this).parent().find('img'));
        });
    // Send the GIF dancer to the back on click of the BACK button
    var backDiv = $('<div class="gdp-opt gdp-top-right">BACK</div>')
        .click(function() {
            $(this).parent().css('z-index', backZIndex);
            backZIndex--;
        });
    // Send the GIF dancer to the front on click of the FRONT button
    var frontDiv = $('<div class="gdp-opt gdp-top-right">FRONT</div>')
        .click(function() {
            $(this).parent().css('z-index', frontZIndex);
            frontZIndex++;
        });
    // Create a new GIF of the same dancer on click of the CLONE button
    var cloneDiv = $('<div class="gdp-opt gdp-bottom-left">CLONE</div>')
        .click(function() {
            createGIFDancer(dancerName);
        });
    // On mouse down on the RESIZE button, allow the user to resize the GIF
    var resizeDiv = $('<div class="gdp-opt gdp-bottom-right">RESIZE</div>');

    // --------------------------------------------------------------------- //

    // create the dancer div containing the GIF and the various dancer options
    var dancerDiv = $('<div class="gdp-dancer"></div>')
        // set the z-index such that this dancer is in front
        .css('z-index', frontZIndex)
        // append the buttons for the dancer options
        .append(closeDiv)
        .append(flipDiv)
        .append(backDiv)
        .append(frontDiv)
        .append(cloneDiv)
        .append(resizeDiv)
        // append the actual GIF dancer
        .append(gifImg)
        // allow the user to drag this div around the screen
        .draggable()
        // on hover, display the dancer options
        .hover(function() {
            $(this).css('background-color', 'rgba(0,0,0,.3)');
            $(this).find('.gdp-opt').css('color', 'rgba(255,255,255,1)');
        }, function() {
            $(this).css('background-color', 'rgba(0,0,0,0)');
            $(this).find('.gdp-opt').css('color', 'rgba(0,0,0,0)');
        });

    // increment the frontZIndex value so the next created GIF will be in front
    frontZIndex++;
    // append the dancer to the screen
    $('body').append(dancerDiv);
}

/******************************************************************************
 * MENU CREATION
 *****************************************************************************/

/* Append the main menu containing "ADD DANCER" and "SELECT SONG" options
   to the bottom right corner of the screen */
function createMainMenu() {

    var menuHtml = [
        '<div class="gdp-main-menu">',
            '<div class="gdp-add-dancer">ADD DANCER</div>',
            '<div class="gdp-select-song">SELECT SONG</div>',
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
    var dancerThumbnailImg = $('<img class="gdp-thumbnail-img" src="' + imageUrl + '.png" />');

    // on click of the thumbnail, remove the ADD DANCER menu and append the
    // corresponding dancer GIF to the top left corner of the screen
    dancerThumbnailImg.click(function() {
        createGIFDancer(dancerName);
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

    // transparent full screen div that contains the list of thumbnails, but
    // will close on click
    var gdpAddDancerMenu = $('<div class="gdp-menu"></div>')
        .css('z-index', maxZIndex)
        .click(function() {
            $(this).remove();
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
    $('body').append(gdpAddDancerMenu);
}

// ------------------------------------------------------------------------- //

// ---------------------- create the SELECT SONG menu ---------------------- //

/* Return an element representing a song choice for the GDP */
function createSongOption(songName) {
    var songOption = $('<div class="gdp-song-option">' + songName.toUpperCase() + '</div>');
    // on click of the song option, remove the SELECT SONG menu and play the
    // corresponding audio
    songOption.click(function() {
        gdpMedia.selectSong(songName);
        $('.gdp-select-song-menu').remove();
    });
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

       // transparent full screen div that contains the list of song options,
       // but will close on click
       var gdpSelectSongMenu = $('<div class="gdp-menu"></div>')
           .css('z-index', maxZIndex)
           .click(function() {
               $(this).remove();
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
       $('body').append(gdpSelectSongMenu);
   }


// ------------------------------------------------------------------------- //

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
}

/* Remove the main menu, stop the music, and remove the GIF dancers, ADD
   DANCER menu, and SELECT SONG menu */
function stopTheParty() {
    $('.gdp-main-menu').remove();
    gdpMedia.stopAudio();
    $('.gdp-dancer').remove();
    $('.gdp-menu').remove();
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

/* Set the listener to stop playing audio after leaving the current page */
$(document).ready(gdpMedia.unloadAudio);
