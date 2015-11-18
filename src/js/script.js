/** z-index of front-most GIF */
var frontZIndex = Math.pow(2, 31) - 500;

/** z-index of back-most GIF */
var backZIndex = frontZIndex - 1;

//listen for the button click to start and stop
chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if(request.type == "startParty"){
            $(document).ready(function(){
                startTheParty();
            });
        }
        else if(request.type == "stopParty"){
            stopTheParty();
        }
    });

function getImgurThumbnailUrl(dancerName) {
    return "https://imgur.com/" + thumbnailImgurIds[dancerName];
}

function getPreviewGifUrl(dancerName) {
    return "https://media2.giphy.com/media/" + gifDancers[dancerName] + "/200.gif";
}

function getFullSizeGifUrl(dancerName) {
    return "https://media.giphy.com/media/" + gifDancers[dancerName] + "/giphy.gif";
}

function selectSong(name) {
    chrome.runtime.sendMessage({
        type: "songName",
        songName: name
    });
}

function stopAudio() {
    chrome.runtime.sendMessage({
        type: "stopAudio"
    });
}

function thePartyIsOff() {
    return $('.gdp-menu').length === 0;
}

function startTheParty() {
    createMenu();
    selectSong('singalong');
    createGIFDancer('carlton');
    $('.gdp-start').text("STOP THE PARTY");
}

function stopTheParty() {
    stopAudio();
    $('.gdp-menu').remove();
    $('.gdp-dancer').remove();
    $('.gdp-start').text("START THE PARTY");
}

function flipImage($image) {
    if ($image.hasClass('gdp-flipped')) {
        $image.removeClass('gdp-flipped');
    } else {
        $image.addClass('gdp-flipped');
    }
}

function createGIFDancer(dancerName) {
    var gifUrl = getFullSizeGifUrl(dancerName);

    var gifImg = $('<img class="gdp-resizable" src="' + gifUrl + '" />');
    var closeDiv = $('<div class="gdp-close gdp-opt gdp-top-left">X</div>')
    .click(function() {
        $(this).parent().remove();
    });
    var flipDiv = $('<div class="gdp-flip gdp-opt gdp-top-right">FLIP</div>')
    .click(function() {
        flipImage($(this).parent().find('img'));
    });
    var backDiv = $('<div class="gdp-back gdp-opt gdp-top-right">BACK</div>')
    .click(function() {
        $(this).parent().css('z-index', backZIndex);
        backZIndex--;
    });
    var frontDiv = $('<div class="gdp-front gdp-opt gdp-top-right">FRONT</div>')
    .click(function() {
        $(this).parent().css('z-index', frontZIndex);
        frontZIndex++;
    });
    var cloneDiv = $('<div class="gdp-clone gdp-opt gdp-bottom-left">CLONE</div>')
    .click(function() {
        createGIFDancer(dancerName);
    });
    var resizeDiv = $('<div class="gdp-resize gdp-opt gdp-bottom-right">RESIZE</div>');
    var dancerDiv = $('<div class="gdp-dancer"></div>')
        .css('z-index', frontZIndex)
        .append(closeDiv)
        .append(flipDiv)
        .append(backDiv)
        .append(frontDiv)
        .append(cloneDiv)
        .append(resizeDiv)
        .append(gifImg)
        .draggable()
        .hover(function() {
            $(this).css('background-color', 'rgba(0,0,0,.3)');
            $(this).find('.gdp-opt').css('color', 'rgba(255,255,255,1)');
        }, function() {
            $(this).css('background-color', 'rgba(0,0,0,0)');
            $(this).find('.gdp-opt').css('color', 'rgba(0,0,0,0)');
        });
    frontZIndex++;
    $('body').append(dancerDiv);
}

function createMenu() {
    var menuHtml = [
        '<div class="gdp-menu">',
            '<div class="gdp-add-dancer">ADD DANCER</div>',
            '<div class="gdp-select-song">SELECT SONG</div>',
        '</div>'
    ].join('');
    $('body').append(menuHtml);
    $('.gdp-add-dancer').click(function() {
        createDancerMenu();
    })
}

function createDancerIcon(dancerName, imageUrl) {

    var dancerIconDiv = $('<div class="gdp-dancer-icon"></div>');
    var dancerThumbnailImg = $('<img class="gdp-dancer-thumbnail" src="' + imageUrl + '.png" />');
    dancerIconDiv.append(dancerThumbnailImg);
    dancerThumbnailImg.click(function() {
        createGIFDancer(dancerName);
        $('.gdp-dancer-menu').remove();
    });

    return dancerIconDiv;
}

function createDancerMenu() {

    var dancerIconDivs = [];

    for (var dancerName in thumbnailImgurIds) {
        if (thumbnailImgurIds.hasOwnProperty(dancerName)) {
            var imgurUrl = getImgurThumbnailUrl(dancerName);
            dancerIconDivs.push(createDancerIcon(dancerName, imgurUrl));
        }
    }

    var gdpDancerMenuDiv = $('<div class="gdp-dancer-menu"></div>');
    var gdpDancerListContainer = $('<div class="gdp-dancer-list-container"></div>');
    for (var i = 0; i < dancerIconDivs.length; i++) {
        gdpDancerListContainer.append(dancerIconDivs[i]);
    }
    gdpDancerMenuDiv.append(gdpDancerListContainer);

    $('body').append(gdpDancerMenuDiv);
}

/**
 * Create the START THE PARTY button in the bottom left corner of the screen
 */
function unloadAudio() {
    // when leaving the page, be sure to stop the gdp audio
    $(window).unload(function() {
        stopAudio();
    });
}

// kick it all off once the page loads
$(document).ready(unloadAudio);
