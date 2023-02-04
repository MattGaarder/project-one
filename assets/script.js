
var videoIdo;
var seenList = $("#seenList");
var watchList = $("#watchList");

$("#find-movie").on("click", function (event) {
    //moving all element generation inside find-movie button
    playerDiv = $("<div id='player'>");
    buttonDiv = $("<div id='buttonDiv'>");
    discoverDiv = $("<div class='discover'>");
    seenButton = $("<button id='seen'>");
    watchButton = $("<button id='watch'>");
    detailsDiv = $("<div class='details'>");
    $("#movies-view").append(discoverDiv);
    event.preventDefault();
    OMDBInfoRequest();
    getTrailer()
});

function OMDBInfoRequest() {
    var queryParam = $("#find-input").val();
    var queryURL = "https://www.omdbapi.com/?t=" + queryParam + "&apikey=" + OMDBKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (OMDBObject) {
        displayInfo(OMDBObject);
    })
};


function displayInfo(OMDBCall) {
    var imageURL = OMDBCall.Poster;
    var moviePoster = $("<img>").attr("src", imageURL);
    discoverDiv.append(moviePoster);
    const keys = Object.keys(OMDBCall);
    let i = 0;
    for (const key of keys) {
        if (i === 13) break;
        if (i === 3 || i === 7 || i === 11) {
            i++;
            continue;
        }
        var theDeets = $("<p>").text(OMDBCall[key]).addClass(key);
        detailsDiv.append(theDeets);
        i++;
    }
    movieObject = {
        Title: OMDBCall.Title,
        Year: OMDBCall.Year,
        Poster: OMDBCall.Poster,
    };
    console.log(movieObject);
    console.log(OMDBCall.Title);
    appendElements(movieObject);
    getTrailer();
};

function appendElements(OMDBCall) {
    discoverDiv.append(detailsDiv);
    discoverDiv.append(playerDiv);
    detailsDiv.append(buttonDiv);
    buttonDiv.append(watchButton);
    buttonDiv.append(seenButton);
    seenButton.on('click', function () {
        moveToSeen(OMDBCall);
    });
    watchButton.on('click', function () {
        moveToWatch(OMDBCall);
    });
}

function getTrailer() {
    var queryParam = $("#find-input").val();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + queryParam + " trailer&key=" + youtubeApiKey;
    console.log(queryParam)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (youtubeObject) {
        videoIdo = youtubeObject.items[0].id.videoId;
        onYouTubeIframeAPIReady(youtubeObject)
    })
};

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(youtubeObject) {
    videoIdo = youtubeObject.items[0].id.videoId;
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoIdo,
        playerVars: {
            'playsinline': 1
        },
    });
}
function moveToSeen(movieObject) {
    console.log(movieObject);
    var seenArray = JSON.parse(localStorage.getItem("seenArray")) || [];
    for(var i = 0; i < seenArray.length; i++) {
        if(movieObject.Title === seenArray[i].Title) {
            return;
        }
    }
        clearArray(seenList);
        seenArray.push(movieObject);
        localStorage.setItem("seenArray", JSON.stringify(seenArray));
        createSeenArray();
}

function createSeenArray() {
    var seenArray = JSON.parse(localStorage.getItem("seenArray")) || [];
    for(var i = 0; i < seenArray.length; i++) {
        var seenItem = $("<li>");
        seenItem.text(seenArray[i].Title);
        seenList.append(seenItem);
    }
};
createSeenArray();

function moveToWatch(movieObject) {
    console.log(movieObject);
    var watchArray = JSON.parse(localStorage.getItem("watchArray")) || [];
    for(var i = 0; i < watchArray.length; i++) {
        if(movieObject.Title === watchArray[i].Title) {
            return;
        }
    }   
        clearArray(watchList)
        watchArray.push(movieObject);
        localStorage.setItem("watchArray", JSON.stringify(watchArray));
        createWatchArray();
}

function createWatchArray() {
    var watchArray = JSON.parse(localStorage.getItem("watchArray")) || [];
    for(var i = 0; i < watchArray.length; i++) {
        var watchItem = $("<li>");
        watchItem.text(watchArray[i].Title);
        watchList.append(watchItem);
    }
};
createWatchArray();

function clearArray(array) {
    array.empty();
}


// events: {
// 'onReady': onPlayerReady,
// 'onStateChange': onPlayerStateChange
// }





// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
// event.target.playVideo();
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
// if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
// }
// }
// function stopVideo() {
// player.stopVideo();
// }












// // Initial array of movies
// var movies = ["The Matrix", "Dune", "Mr. Right", "The Lion King"];

// // displayMovieInfo function re-renders the HTML to display the appropriate content
// function displayMovieInfo() {

//  // var movie = $(event.target).attr("data-name");
//  var movie = $(this).attr("data-name");
//  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

//   // Creating an AJAX call for the specific movie button being clicked
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {

//     // Creating a div to hold the movie
//     var movieDiv = $("<div class='movie'>");

//     // Storing the rating data
//     var rating = response.Rated;

//     // Creating an element to have the rating displayed
//     var pOne = $("<p>").text("Rating: " + rating);

//     // Displaying the rating
//     movieDiv.append(pOne);

//     // Storing the release year
//     var released = response.Released;

//     // Creating an element to hold the release year
//     var pTwo = $("<p>").text("Released: " + released);

//     // Displaying the release year
//     movieDiv.append(pTwo);

//     // Storing the plot
//     var plot = response.Plot;

//     // Creating an element to hold the plot
//     var pThree = $("<p>").text("Plot: " + plot);

//     // Appending the plot
//     movieDiv.append(pThree);

//     // Retrieving the URL for the image
//     var imgURL = response.Poster;

//     // Creating an element to hold the image
//     var image = $("<img>").attr("src", imgURL);

//     // Appending the image
//     movieDiv.append(image);

//     // Putting the entire movie above the previous movies
//     $("#movies-view").prepend(movieDiv);
//   });

// }

// // Function for displaying movie data
// function renderButtons() {

//   // Deleting the movies prior to adding new movies
//   // (this is necessary otherwise you will have repeat buttons)
//   $("#buttons-view").empty();

//   // Looping through the array of movies
//   for (var i = 0; i < movies.length; i++) {

//     // Then dynamicaly generating buttons for each movie in the array
//     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//     var a = $("<button>");
//     // Adding a class of movie-btn to our button
//     a.addClass("movie-btn");
//     // Adding a data-attribute
//     a.attr("data-name", movies[i]);
//     // Providing the initial button text
//     a.text(movies[i]);
//     // Adding the button to the buttons-view div
//     $("#buttons-view").append(a);
//   }
// }

// // This function handles events where a movie button is clicked
// $("#add-movie").on("click", function(event) {
//   event.preventDefault();
//   // This line grabs the input from the textbox
//   var movie = $("#movie-input").val().trim();

//   // Clear out the value in the input field
//   $("#movie-input").val("")

//   // Adding movie from the textbox to our array
//   movies.push(movie);

//   // Calling renderButtons which handles the processing of our movie array
//   renderButtons();
// });

// // Adding a click event listener to all elements with a class of "movie-btn"
// $(document).on("click", ".movie-btn", displayMovieInfo);

// // Calling the renderButtons function to display the initial buttons
// renderButtons();



















// // var youtubeApiKey = "AIzaSyArZC4w_ZrUpGsejJW0TBItsl8bm2JQMTs";




// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
// player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: "YoHD9XEInc0",
//     playerVars: {
//     'playsinline': 1
//     },
//     events: {
//     'onReady': onPlayerReady,
//     'onStateChange': onPlayerStateChange
//     }
// });
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
// event.target.playVideo();
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
// if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
// }
// }
// function stopVideo() {
// player.stopVideo();
// }
    


