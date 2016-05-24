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
by default be in front of the other divs upon creation.
If a url is provided, then this means that this GIF is not in gdpMedia but
is instead custom and added by the user */
function createGIFDancer(dancerName, url) {
    // No url was provided
    if(!url) {
        // Giphy url for the GIF dancer
        url = gdpMedia.getGifUrl(dancerName);
    }
    // Img element of the GIF dancer
    var gifImg = $('<img src="' + url + '" />');

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
                // one from a list
                createGIFDancer(dancerName);
            }
            else{
                // one from Custom
                createGIFDancer("", url);
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
        .append(cloneDiv)
        // append the buttons for the dancer options
        .append(topOptDiv)
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
            '<div class="gdp-ytplayer"></div>',
            '<div class="gdp-harlem-shake gdp-main-menu-btn">SHAKE</div>',
            '<div class="gdp-add-dancer gdp-main-menu-btn">ADD DANCER</div>',
            '<div class="gdp-select-song gdp-main-menu-btn">SELECT SONG</div>',
        '</div>'
    ].join('');

    // append the menu to the screen
    $('body').append(menuHtml);
    $('.gdp-main-menu').css('z-index', maxZIndex);

    $('.gdp-harlem-shake').click(function() {
        if (!gdpHarlemShake.isShaking) {
            // DO THE HARLEM SHAKE [harlemshake.js]
            gdpHarlemShake.startTheShake();
        }
    });

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
dancer framed by a white circle with a black border. When creating a thumbnail
for a custom GIF, provide null or "" for the dancerName */
function createThumbnail(dancerName, imageUrl) {

    var dancerThumbnailWrapper = $('<div class="gdp-thumbnail-wrapper"></div>');
    var dancerThumbnailImg = $('<img class="gdp-thumbnail-img" src="' + imageUrl + '" />');
    // if dancerName isn't provided, then this is a thumbnail for a custom GIF
    if (!dancerName) {
        dancerThumbnailWrapper.addClass('gdp-custom-thumbnail');
        // X button to delete the custom GIF
        var dancerThumbnailDelete = $('<div class="gdp-thumbnail-delete">X</div>')
            .css("z-index", maxZIndex)
            .click(function() {
                // use the position of the custom GIF in the menu to determine which
                // url in the customDancers array corresponds with the clicked thumbnail
                var customDancerIndex = $('.gdp-custom-thumbnail').index($(this).parent());
                // retrieve the list of custom GIF urls from chrome storage
                chrome.storage.sync.get("customDancers", function(storageItem){
                    // remove the url for the clicked custom GIF from the array
                    storageItem.customDancers.splice(customDancerIndex, 1);
                    // set the new array as the customDancers list in storage
                    var storageObj = {};
                    storageObj["customDancers"] = storageItem.customDancers;
                    chrome.storage.sync.set(storageObj);
                    // after deleting the custom GIF, reopen the menu
                    createAddDancerMenu();
                });
                // remove the thumbnail of the custom GIF from the menu
                $(this).parent().remove();
            });
        // add the X button to the thumbnail
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

    // retrieve the custom GIF dancers from storage
    chrome.storage.sync.get("customDancers", function(storageItem) {
        var customDancers = storageItem.customDancers;
        if (customDancers && customDancers.length > 0) {
            // loop through custom dancers and create thumbnails for each
            for (var i = 0; i < customDancers.length; i++) {
                var currentDancer = customDancers[i];
                thumbnailDivs.push(createThumbnail("", currentDancer));
            }
        } else {
            // create the customDancers list if it hasn't already been created
            var storageObj = {}
            storageObj["customDancers"] = []
            chrome.storage.sync.set(storageObj);
        }

        // transparent full screen div that contains the list of thumbnails, but
        // will close on click
        var gdpAddDancerMenu = $('<div class="gdp-menu"></div>')
        .css('z-index', maxZIndex)
        .click(function() {
            // close the menu if the user is not clicking the on the input
            // for adding a custom GIF
            if (!$("#gdp-add-gif-input").is(":focus")) {
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

        // create the input and submit button for adding custom GIFs
        var addGifInterface = ["<div id='gdp-add-gif-wrapper' class='gdp-add-custom-wrapper'>",
                                   "<input type='text' align='left' ",
                                       "placeholder='Add a custom GIF URL' id='gdp-add-gif-input' ",
                                       "class='gdp-add-custom-short-input'></input>" +
                                   "<div id='gdp-add-gif-button' class='gdp-add-custom-button'>Submit</div>",
                               "</div>"].join('');
        gdpAddDancerMenu.append(addGifInterface);
        $('body').append(gdpAddDancerMenu);
        // create a new custom GIF when clicking the submit button
        $("#gdp-add-gif-button").click(function(){
            addGiphy();
        });
    });
}

// ---------------------Take In Custom Gifs from Giphy---------------------- //

/* Listen for an enter event or click Submit to add a custom GIF */
$(document).keypress(function(e) {
    if(e.which == 13 && $("#gdp-add-gif-input").is(":focus")) {
        // pressed enter while focused
        $('#gdp-add-gif-button').click();
    }
});
/* Save the given url of a custom GIF to the Chrome storage */
function saveGiphy(url) {
    // retrieve custom GIF dancers from storage
    chrome.storage.sync.get("customDancers", function(storageItem) {
        var customDancers = storageItem["customDancers"];
        var storageObj = {};
        // if customDancers is already present, then push the given url
        // of the new custom GIf onto the end of the list and set in storage
        if (customDancers) {
            customDancers.push(url);
            storageObj["customDancers"] = customDancers;
            chrome.storage.sync.set(storageObj)
        } else {
            // otherwise create a new list with the given url
            storageObj["customDancers"] = [url];
            chrome.storage.sync.set(storageObj);
        }
    });
}
/* Add a custom GIF based on the value in the ADD DANCER menu input field */
function addGiphy(){
    //get the link from the input
    var link = $("#gdp-add-gif-input").val();
    var ending = link.slice(-4);
    // make sure that the input ends in .gif
    if(ending == ".gif"){
        // close the menu, save the URL, and add the dancer to the screen
        $('.gdp-menu').remove();
        saveGiphy(link);
        createGIFDancer("",link);
    } else {
        alert("URL did not point to a .GIF");
    }
}

// ---------------------- create the SELECT SONG menu ---------------------- //

/* Return an element representing a song choice for the GDP */
function createSongOption(songName) {
    songUrl = null;

    var songOption = $('<div class="gdp-song-option">' + songName.toUpperCase() + '</div>');
    // add delete button for custom song option
    if (!gdpMedia.gdpSongMap.hasOwnProperty(songName)) {
        songOption.addClass('gdp-custom-song-option').click(function() {
            // use the position of the custom song in the menu to determine which
            // entity in the customSongs array corresponds with the clicked song
            var customSongOptionIndex = $('.gdp-custom-song-option').index($(this));
            // retrieve the list of custom songs from storage
            chrome.storage.sync.get("customSongs", function(storageItem){
                // retrieve the song url from the list, play the song, and close the menu
                songUrl = storageItem.customSongs[customSongOptionIndex].url;
                stopYoutube(); //stop any existing playing videos
                if(songUrl.indexOf('youtube') > -1){
                    //play as youtube song
                    playYoutube(songUrl);
                } else{
                    gdpMedia.selectSong(songName, songUrl, true);
                }
                $('.gdp-select-song-menu').remove();
            });
        });
        // X button to remove this custom song from the menu
        var songOptionDelete = $('<div class="gdp-song-option-delete">X</div>').css("z-index", maxZIndex).click(function() {
            // use the position of the custom song in the menu to determine which
            // entity in the customSongs array corresponds with the clicked song
            var customSongDeleteOptionIndex = $('.gdp-custom-song-option').index($(this).parent());
            chrome.storage.sync.get("customSongs", function(storageItem){
                // remove the custom song from the list
                storageItem.customSongs.splice(customSongDeleteOptionIndex, 1);
                var storageObj = {};
                // set the new array in storage
                storageObj["customSongs"] = storageItem.customSongs;
                chrome.storage.sync.set(storageObj);
                // reopen the song menu
                createSelectSongMenu();
            });
            // remove this custom song from the menu
            $(this).parent().remove();
        });
        songOption.append(songOptionDelete);
    } else {
        // otherwise, the song is not custom so play the song on click and close the menu
        songOption.click(function() {
            stopYoutube(); //kill youtube videos if running
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
    for (var songName in gdpMedia.gdpSongMap) {
        if (gdpMedia.gdpSongMap.hasOwnProperty(songName)) {
            songOptions.push(createSongOption(songName));
        }
    }

    // look in chrome storage for custom songs that users have added
    chrome.storage.sync.get("customSongs", function(storageItem) {
        var customSongs = storageItem.customSongs;
        if (customSongs && customSongs.length > 0) {
            // loop through each custom song and add an option to the menu for each
            for (var i = 0; i < customSongs.length; i++) {
                var currentSong = customSongs[i];
                songOptions.push(createSongOption(currentSong.name));
            }
        } else {
            // otherwise create a new list for custom songs
            var storageObj = {}
            storageObj["customSongs"] = []
            chrome.storage.sync.set(storageObj);
        }

        // transparent full screen div that contains the list of song options,
        // but will close on click
        var gdpSelectSongMenu = $('<div class="gdp-menu"></div>')
            .css('z-index', maxZIndex)
            .click(function() {
                // close the song menu if the user isn't clicking on the inputs
                // for adding a custom song
                if(!$("#gdp-add-song-url-input").is(":focus") && !$("#gdp-add-song-name-input").is(":focus")){
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

        var addSongInterface = ["<div id='gdp-add-song-wrapper' class='gdp-add-custom-wrapper'>",
                                    "<input type='text' align='left' ",
                                        "placeholder='Add a custom song URL or Youtube link.' id='gdp-add-song-url-input' ",
                                        "class='gdp-add-custom-input' />" +
                                    "<input type='text' align='left' ",
                                        "placeholder='Add a custom song name' id='gdp-add-song-name-input' ",
                                        "class='gdp-add-custom-short-input' maxlength=20 />",
                                    "<div id='gdp-add-song-button' class='gdp-add-custom-button'>Submit</div>",
                                "</div>"].join('');
        gdpSelectSongMenu.append(addSongInterface);
        $('body').append(gdpSelectSongMenu);
        // save and play the custom song specified by the input fields when
        // the submit button is clicked
        $("#gdp-add-song-button").click(function(){
            addCustomSong();
        });

        $('body').append(gdpSelectSongMenu);
    });
}

// ---------------------Take In Custom Songs---------------------- //

/* Listen for an enter event or click Submit to add a custom song */
$(document).keypress(function(e) {
    if(e.which == 13 && $("#gdp-add-song-input").is(":focus")) {
        // pressed enter while focused
        $('#gdp-add-song-button').click();
    }
});
/* Add a custom song based on the value in the ADD SONG menu input fields */
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
/* Save the name and url of a custom song to the Chrome storage */
function addCustomSong(){
    // get the song name from the input
    var name = $("#gdp-add-song-name-input").val();
    // get the link from the input
    var url = $("#gdp-add-song-url-input").val();
    // make sure url has .mp3, .wav, or .ogg in input value
    if(url.indexOf('youtube') > -1){
        //this is a youtube video
        saveCustomSong(name, url);
        playYoutube(url);
    } else if(url.indexOf('.mp3') > -1 || url.indexOf('.wav') > -1 || url.indexOf('.ogg') > -1) {
        // save the song name and url, close the menu, and play the song
        saveCustomSong(name, url);
        $('.gdp-menu').remove();
        gdpMedia.selectSong(name, url, true);
    } else {
        alert("URL did not point to a .mp3, .wav, or .ogg");
    }
}

function playYoutube(url) {
    //play song from youtube
    stopYoutube(); //stop any existing player
    gdpMedia.stopAudio(); //stop any existing audio
    id = getParameterByName("v", url); //get video id from url
    player = ['<iframe id="ytplayer" type="text/html" width="160" height="97"',
                'src="https://www.youtube.com/embed/'+id+'?autoplay=1&loop=1&playlist='+id+'&origin=http://example.com"',
                'frameborder="0"/>'].join('');
    $('.gdp-ytplayer').append(player);
}

function stopYoutube() {
    $('.gdp-ytplayer').children("iframe").remove();
}

//this function parses urls for url parameters
//this is used by the youtube player which needs the v parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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
    // clean up Harlem Shake if it's happening
    gdpHarlemShake.isShaking = false;
    $('.gdpAnimated').removeClass("gdpAnimated animated infinite " + animations.join(' '));
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
