/** z-index of front-most GIF */
var frontZIndex = Math.pow(2, 31) - 500;

/** z-index of back-most GIF */
var backZIndex = frontZIndex - 1;

/**
 * Set of GIF dancer names and giphy ids
 */
var gifDancers = {
    carlton: 'wn8rVP7qC8TNC',
    pumpGirl: '26BkNiQlYeHc5jpf2'
};

var gdpPlaylist = [
    'bazz', 'bubblebutt', 'fatboy', 'grounded',
    'halffull', 'nahnahnah', 'singalong', 'trololo',
    'twist', 'walkmen', 'wegotyou'
];

var thumbnailImgurIds = {
    '8bitcarlton': 'ifuoPqn',
    apple: 'wbv3RCd',
    arnold: 'Sh6WPJs',
    babe: 'hDWrKI7',
    banana: 'Li3pOWH',
    bananabounce: 'Ky3jiGQ',
    bear: '7KW1zWk',
    blob: 'P7meKeB',
    bmo: 'Q6Jyks5',
    bonebreak: 'otdi7m9',
    bones: 'WEl9Npv',
    breakglitch: 'TXYwR2F',
    brian: 'mcVtWQT',
    bunny: 'OPfS7wP',
    bunnyspank: 'G9Bs0N9',
    business: 'QaSTmdL',
    cact: 'fn0xLOv',
    carlton: 'uF179oM',
    charlie: 'aXXDfwI',
    chicken: 'Uckh2i8',
    cowboy: 'sCxQ7om',
    discoball: 'FqqZgIZ',
    doggy: 'Q6r1gYp',
    elvenbooty: '1GZgAQV',
    fabio: '320x7kR',
    fatspidey: '5GZYEmt',
    foreveralone: 'jgOvt9T',
    fred: 'FSvV7is',
    fuzzball: 'ehDJ5bp',
    gene: 'nfO1s5a'
}

/*
var dancerNameList = [
    '8bitcarlton', 'apple', 'arnold', 'babe',
    'banana', 'bananabounce', 'bear', 'blob',
    'bmo', 'bonebreak', 'bones', 'breakglitch',
    'brian', 'bunny', 'bunnyspank', 'business',
    'cact', 'carlton', 'charlie', 'chicken',
    'cowboy', 'discoball', 'doggy', 'elvenbooty',
    'fabio', 'fatspidey', 'foreveralone', 'fred',
    'fuzzball', 'gene', 'ghosty', 'girlstep',
    'glitchtwist', 'greenlady', 'greenlady2', 'greything',
    'headspin', 'hellicopter', 'hipdog', 'hotdogs',
    'hula', 'humpery', 'jason', 'kirby',
    'kitty', 'lilguy', 'maranda', 'matrix',
    'mj', 'momdance', 'morpher', 'nerd',
    'noshorts', 'nudeflames', 'obama', 'orangeguy',
    'pa', 'patrick', 'pedopickle', 'pilboy',
    'pixelly', 'pizza', 'ponyshuffle', 'possum',
    'pretzel', 'psych', 'pumpgirl', 'ravecat',
    'robothump', 'roger', 'runningworm', 'saxguy',
    'scorpion', 'shawty', 'slappy', 'smooch',
    'speakerhead', 'spinglitch', 'spongeybob', 'squidword',
    'stripper1', 'stripper2', 'tej', 'thehop',
    'thewizard', 'theworm', 'tim', 'twerk',
    'twerk2', 'whiteguy', 'wormlady', 'yeti'
];*/

//listen for the button click to start and stop
chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if(request.type == "startParty"){
            startTheParty();
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
    createGIFDancer('pumpGirl');
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
        }, function() {
            $(this).css('background-color', 'rgba(0,0,0,0)');
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
