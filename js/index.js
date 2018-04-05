"use strict";
var quotes;
// assigning var quotes to the list of quotes from the source below

$.ajax({
    url: "https://random-quote-generator.herokuapp.com/api/quotes/",
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
        quotes = data;
        applyQuote();
    }
});

var randomNum;
var quote;
var author;


// adding listener for the new quote button
function listeners() {
    $(".new-quote").on("click", function() {
        // change colors and buttons
        $(".quote-box").toggleClass("alternate-color");
        $("button").toggleClass("alternate-button");
        applyQuote();
        var twitterString = "https://twitter.com/intent/tweet?text=" + quote + " -" + author;
        $("a").attr("href", twitterString);
    });
}

// new random number
function getRandomNumber() {
    randomNum = Math.floor(Math.random() * 80);
}

// get new quote
function getQuote() {
    getRandomNumber();
    quote = quotes[randomNum].quote;
    quote = quote.replace(/;/g, ";"); // replace semicolon with greek question mark for twitter
    author = quotes[randomNum].author;
}

// apply quote
function applyQuote() {
    getQuote();
    updateTwitter();
    // apply the fade to the text
    $(".quote, .name").fadeOut(200, function() {
        $(".quote").text(quote);
        $("span").text(author);
        $(".quote, .name").fadeIn(200);
    });
}

function updateTwitter() {
    var twitterString = 'https://twitter.com/intent/tweet?text=' + quote + ' -' + author;
    $("a").attr("href", twitterString);
}


$(document).ready(function() {
    listeners();
});