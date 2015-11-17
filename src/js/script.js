/** z-index of front-most GIF */
var frontZIndex = Math.pow(2, 31) - 500;

/** z-index of back-most GIF */
var backZIndex = frontZIndex - 1;

/** styles for draggable divs */
var dancerStyles = {
    position: 'absolute',
    display: '-moz-inline-stack',
    display: 'inline-block',
    'vertical-align': 'top',
    left: '0',
    top: '0',
    zoom: '1',
    '*display': 'inline',
    cursor: 'hand',
    cursor: 'pointer'
};

/** styles for dancer options (X, FLIP, RESIZE, etc.) */
var dancerOptStyles = {
    color: 'white',
    display: 'inline-block',
};

var topLeftStyles = {
    float: 'left',
    margin: '10px 0 0 10px'
};

var topRightStyles = {
    float: 'right',
    margin: '10px 10px 0 0'
};

var bottomLeftStyles = {
    position: 'absolute',
    bottom: '10px',
    left: '10px'
};

var bottomRightStyles = {
    position: 'absolute',
    bottom: '10px',
    right: '10px'
};

/** styles for the dancer close button */
var closeStyles = {
    position: 'relative',
    top: '0',
    left: '0',
    color: 'white',
    'text-align': 'left'
}

/** styles for the START THE PARTY button */
var startButtonStyles = {
    'background-color': 'gray',
    bottom: '0',
    color: 'white',
    'font-size': '16px',
    left: '0',
    padding: '20px',
    position: 'fixed',
    'z-index': '99999999'
};

/**
 * Set of GIF dancer names and giphy ids
 */
var gifDancers = {
    carlton: 'wn8rVP7qC8TNC'
};

/*
var dancerNameList = [
    '8bitcarlton',
    'apple',
    'arnold',
    'babe',
    'banana',
    'bananabounce',
    'bear',
    'blob',
    'bmo',
    'bonebreak',
    'bones',
    'breakglitch',
    'brian',
    'bunny',
    'bunnyspank',
    'business',
    'cact',
    'carlton',
    'charlie',
    'chicken',
    'cowboy',
    'discoball',
    'doggy',
    'elvenbooty',
    'fabio',
    'fatspidey',
    'foreveralone',
    'fred',
    'fuzzball',
    'gene',
    'ghosty',
    'girlstep',
    'glitchtwist',
    'greenlady',
    'greenlady2',
    'greything',
    'headspin',
    'hellicopter',
    'hipdog',
    'hotdogs',
    'hula',
    'humpery',
    'jason',
    'kirby',
    'kitty',
    'lilguy',
    'maranda',
    'matrix',
    'mj',
    'momdance',
    'morpher',
    'nerd',
    'noshorts',
    'nudeflames',
    'obama',
    'orangeguy',
    'pa',
    'patrick',
    'pedopickle',
    'pilboy',
    'pixelly',
    'pizza',
    'ponyshuffle',
    'possum',
    'pretzel',
    'psych',
    'pumpgirl',
    'ravecat',
    'robothump',
    'roger',
    'runningworm',
    'saxguy',
    'scorpion',
    'shawty',
    'slappy',
    'smooch',
    'speakerhead',
    'spinglitch',
    'spongeybob',
    'squidword',
    'stripper1',
    'stripper2',
    'tej',
    'thehop',
    'thewizard',
    'theworm',
    'tim',
    'twerk',
    'twerk2',
    'whiteguy',
    'wormlady',
    'yeti'
];*/

var dancerNameToUrl = {
    carlton: 'https://media.giphy.com/media/wn8rVP7qC8TNC/giphy.gif'
};

function getPreviewGifUrl(gifId) {
    return "https://media2.giphy.com/media/" + gifId + "/200.gif";
}

function getFullSizeGifUrl(gifId) {
    return "https://media.giphy.com/media/" + gifId + "/giphy.gif";
}

function flipImage($image) {
    if ($image.hasClass('gdp-flipped')) {
        $image.css('transform', 'scaleX(1)')
            .removeClass('gdp-flipped');
    } else {
        $image.css('transform', 'scaleX(-1)')
            .addClass('gdp-flipped');
    }
}

function createGIFDancer(dancerName) {
    var gifId = gifDancers[dancerName];
    var gifUrl = getFullSizeGifUrl(gifId);

    var gifImg = $('<img class="gdp-resizable" src="' + gifUrl + '" />');
    var closeDiv = $('<div class="gdp-close gdp-opt">X</div>')
        .css(dancerOptStyles)
        .css(topLeftStyles)
        .click(function() {
            $(this).parent().remove();
        });
    var flipDiv = $('<div class="gdp-flip gdp-opt">FLIP</div>')
        .css(dancerOptStyles)
        .css(topRightStyles)
        .click(function() {
            flipImage($(this).parent().find('img'));
        });
    var backDiv = $('<div class="gdp-back gdp-opt">BACK</div>')
        .css(dancerOptStyles)
        .css(topRightStyles)
        .click(function() {
            $(this).parent().css('z-index', backZIndex);
            backZIndex--;
        });
    var frontDiv = $('<div class="gdp-front gdp-opt">FRONT</div>')
        .css(dancerOptStyles)
        .css(topRightStyles)
        .click(function() {
            $(this).parent().css('z-index', frontZIndex);
            frontZIndex++;
        });
    var cloneDiv = $('<div class="gdp-clone gdp-opt">CLONE</div>')
        .css(dancerOptStyles)
        .css(bottomLeftStyles)
        .click(function() {
            createGIFDancer(dancerName);
        });
    var resizeDiv = $('<div class="gdp-resize gdp-opt">RESIZE</div>')
        .css(dancerOptStyles)
        .css(bottomRightStyles);
    var dancerDiv = $('<div class="gdp-dancer"></div>')
        .css(dancerStyles)
        .css('z-index', frontZIndex)
        .append(closeDiv)
        .append(flipDiv)
        .append(backDiv)
        .append(frontDiv)
        .append(cloneDiv)
        .append(resizeDiv)
        .append(gifImg)
        .draggable()
        .resizable()
        .hover(function() {
            $(this).css('background-color', 'rgba(0,0,0,.3)');
        }, function() {
            $(this).css('background-color', 'rgba(0,0,0,0)');
        });
    frontZIndex++;
    $('body').append(dancerDiv);
}

/**
 * Create the START THE PARTY button in the bottom left corner of the screen
 */
function createStartButton() {

    // append the button to the body of the current screen
    $('body').append('<div class="gdp-start">START THE PARTY</div>');
    $('head').append('<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery.ui.all.css"></link>')
    // apply the styles to the start button
    $('.gdp-start').css(startButtonStyles)
        .click(function() {
            createGIFDancer('carlton');
        });
}

// kick it all off once the page loads
$(document).ready(createStartButton);
