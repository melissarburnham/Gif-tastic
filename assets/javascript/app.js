//variables

var topics = ["happy", "sad", "angry", "tired", "confused", "annoyed", "excited", "laughing", "crying", "ashamed", "ecstatic", "love", "hungry"]

var apiKey = "o4AWaJdZms9c7YCrvCHRCURV3GC5eSCj";

var gifs = [];

function displayGifs(){
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=o4AWaJdZms9c7YCrvCHRCURV3GC5eSCj&q=" + topic + "&limit=10&offset=0&rating=G&lang=en"

    $("#gifs").empty(); 

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
            console.log(response);
            // var gif = response.data[i].images.fixed_height.url;
            // var picture = response.data[i].images.fixed_height_still.url;

            for (var i = 0; i < response.data.length; i++) { 
                var gifImg = $("<img>");
                gifImg.attr("src", response.data[i].images.fixed_height_still.url); 
                gifImg.addClass("gifImg");
               $("#gifs").append(gifImg); 

               var gifRating = $("<div>");
               gifRating.text("Rating: " + response.data[i].rating.toUpperCase());
               gifRating.addClass("gifRating");
               $(".gifImg").append(gifRating);
            }
            function clickPicture(){
                $(".gifImg").on("click", function(){
                    $(".gifImg").push(response.data[i].images.fixed_height.url);   
                });
            }
            clickPicture();
      });
}



function renderButtons(){

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++){
        var button = $("<button>");
        button.addClass("button");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttons").append(button);
    }
}

    $("#find-feelings").on("click", function(event){
        event.preventDefault();
        //grabs input from textbox
        var topic = $("#feelings-input").val().trim();
        //adding feelings from text to array
        topics.push(topic);
        console.log(topics)

        renderButtons();
}); 

function clear(){

    var clear = $("<button>");
        clear.text("CLEAR GIFS");
        clear.addClass("clearBtn");
        clear.attr("data-name", "clear")
        $("#feelings-form").append(clear);
        
        clear.on("click", function(){
            $("#gifs").empty(); 
    });
}

$(document).on("click", ".button", displayGifs);

renderButtons();
clear();


//when user clicks buttom
    //clear div
    //display 10 images about that topic
//when user searches, create button
    //clear div 
    //display 10 images about that topic
//create clear button function