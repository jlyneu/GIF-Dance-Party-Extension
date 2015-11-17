/** z-index of front-most GIF */
var frontZIndex = Math.pow(2, 31) - 500;

/** z-index of back-most GIF */
var backZIndex = frontZIndex - 1;

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
        $image.removeClass('gdp-flipped');
    } else {
        $image.addClass('gdp-flipped');
    }
}

function createGIFDancer(dancerName) {
    var gifId = gifDancers[dancerName];
    var gifUrl = getFullSizeGifUrl(gifId);

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
    $('.gdp-start').click(function() {
        createGIFDancer('carlton');
    });
}

// kick it all off once the page loads
$(document).ready(createStartButton);
