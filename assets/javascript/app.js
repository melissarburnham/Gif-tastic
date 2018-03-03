$(document).ready(function(){


var topics = ["sad", "angry", "tired", "confused", "annoyed", "excited", "laughing", "crying", "ashamed", "ecstatic", "love", "hungry"];

function displayGifs(){
    // var rating = 
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=o4AWaJdZms9c7YCrvCHRCURV3GC5eSCj&q=" + topic + "&limit=10&offset=0&rating=G&lang=en"

    $("#gifs").empty(); 
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
            console.log(response);
          //loop through API and append image to gifs div 
            for (var i = 0; i < response.data.length; i++) { 
                var gifDisplay = $("<div>");
                gifDisplay.addClass("gifDisplay");
                gifDisplay.appendTo("#gifs");

                var gifImg = $("<img>");
                gifImg.attr("src", response.data[i].images.fixed_height_still.url);
                gifImg.attr("data-still", response.data[i].images.fixed_height_still.url); 
                gifImg.attr("data-animate", response.data[i].images.fixed_height.url); 
                gifImg.attr("data-state", "still");
                gifImg.addClass("gifImg");
                gifImg.addClass("img-responsive");
                gifDisplay.append(gifImg); 
               
                //add rating from API to gifs div
               var gifRating = $("<div>");
               gifRating.html("Rating: " + response.data[i].rating.toUpperCase());
               gifRating.addClass("gifRating");
               gifRating.appendTo(gifDisplay);
            }
      }); 
}
//when you click the image
function clickPicture(){
    $(document).on("click", ".gifImg", function(){
        var picVal = $(this).attr("data-state");
        console.log(picVal);
        //if image is still, replace with animated, else replace with still 
        if(picVal === "still"){
            var gifAnimate = $(this).attr("data-animate");
            $(this).attr("src", gifAnimate);
            $(this).attr("data-state", "animate");
            console.log(gifAnimate);
            console.log(picVal);
        } else {
            var gifStill = $(this).attr("data-still");
            $(this).attr("src", gifStill);
            $(this).attr("data-state", "still");
        }
    });
}
//create feelings button and append to buttons div
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
//when user searches for a feeling...
    $("#find-feelings").on("click", function(event){
        event.preventDefault();
        //grabs input from textbox
        var topic = $("#feelings-input").val().trim();
        //if input is blank, do nothing. otherwise, push input to array
        if(!topic){
            return;
      } else {
        topics.push(topic);
        console.log(topics)
      }

        renderButtons();
}); 
//clears only the gifs
function clearGifs(){

    var clearGifs = $("<button>");
        clearGifs.text("CLEAR GIFS");
        clearGifs.addClass("clearBtn");
        clearGifs.attr("data-name", "clearGifs")
        $("#feelings-form").append(clearGifs);
        
        clearGifs.on("click", function(){
            event.preventDefault();
            $("#gifs").empty(); 
    });
}
//clears gifs and buttons
function clearAll(){

    var clearAll = $("<button>");
        clearAll.text("CLEAR ALL");
        clearAll.addClass("clearBtn");
        clearAll.attr("data-name", "clearAll")
        $("#feelings-form").append(clearAll);
        
        clearAll.on("click", function(){
            $("#gifs").empty(); 
    });
}
//call to all functions
$(document).on("click", ".button", displayGifs);

clearGifs();
clearAll();
renderButtons();
clickPicture();


});