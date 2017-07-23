
$(document).ready(function() {
//Initial array of Pixar characters

var onClick = function() {
    console.log("worked!");
};

var pixars = ["CARL FREDRICKSEN", "DORY", "EDNA MODE", "WALL-E", "SULLY", "BUZZ LIGHTYEAR"];

var deleteCandidate;

//displayPixarInfo function re-renders the HTML to display the appropriate content
function displayPixarInfo() {
var pixar = $(this).attr("data-name");
// pixarArray.push(pixar);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pixar + "&api_key=32d6554f7a0f44bbae84e6da0781d34f&limit=10";
// console.log(pixarArray);
//Creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  var results = response.data;
  // console.log(results);
//clears the mainArea for next search result. stackoverflow.com/questions/44687331
  $("#main").html('');
//looping through the 10 response (results)
  for (var i = 0; i < results.length; i++) {
//creating the div to hold the pixarimage and holding the info in variable pixarDiv
    var pixarDiv = $("<div class='col-md-2'>");
//creating a variable to hold hte rating response from giphy.com
    var rating = results[i].rating;
//creating a variable to hold the fixed height url of the image from giphy.com
    var defaultGif = results[i].images.fixed_height.url;
//creating a variable to hold the fixed height still url image from giphy.com
    var stillGif = results[i].images.fixed_height_still.url;
//creating a paragraph div to hold the Rating results in variable p.
    var p = $("<p>").text("Rating: " + rating);
//creating a variable pixarImg to hold the image div.
    var pixarImg = $("<img>");
//creatiing an attribute for the image of its source url which is held in the stillGif variable.
    pixarImg.attr("src", stillGif);
//crating a class attribute called pixarGif
    pixarImg.addClass("pixarGif");
//creating an attribute for the image div of data-state of still
    pixarImg.attr("data-state", "still");
//creating an attribute for data-still with the url held in stillGif
    pixarImg.attr("data-still", stillGif);
//creating an attribute for data-animate with the url held in defaultGif
    pixarImg.attr("data-animate", defaultGif);
//appending the paragraph div of rating to the html
    pixarDiv.append(p);
//appending the pixarImg attributes to the html
    pixarDiv.append(pixarImg);
//prepending the images in the main area of the html
    $("#main").prepend(pixarDiv);
    // console.log(pixarArray);
    }
  });
}



// Function for displaying data
function renderButtons() {
// (this is necessary otherwise you will have repeat buttons)
  $("#buttonView").empty();
// Looping through the array of pixar characters in the array
  for (var i = 0; i < pixars.length; i++) {
    console.log("rendering...", i);
// Then dynamicaly generating buttons for each pixar in the array
// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $('<button class= "btn btn-primary">');
// Adding a class of "pixar" to our buttons
    a.addClass("pixar");
// Adding a data-name attribute to our pixars array contents
    a.attr("data-name", pixars[i]);
// Providing the initial button text
    a.text(pixars[i]);
// Adding the button to the buttons-view div
    $("#buttonView").append(a);
    }

};

$("#buttonView").on("click", ".pixar", function() {
deleteCandidate = $(this);
console.log("a button clicked ", deleteCandidate);
});

// This function handles events where a search button is clicked
$("#addPixar").on("click", function(event) {
  event.preventDefault();
// This line grabs the input from the textbox
  var pix = $("#pixar-input").val().trim();
  var pixar = pix.toUpperCase();
console.log(pixar); //this console logs the input entered in search box
//if no text entered in search field, this prevents a blank button being appended, or
//if the same search is entered, this prevents a duplicate button
  if ((pixar === "") || (pixars.indexOf(pixar) >= 0)) {
    event.preventDefault();
    console.log("please enter text");
  } else {
// Adding pixar textinput from the textbox to our pixars array
  pixars.push(pixar);}
//clears the search box
  $("#pixar-input").val(" ");
// Calling renderButtons which handles the processing of our array
  renderButtons();
});

$("#removePixar").on("click", function() {
console.log("removing...");
deleteCandidate.remove();
});


//Function to manipulate the state of the gif
function stateOfGifs() {
//taking this attribute of data state (whichever one is clicked)
  var state = $(this).attr("data-state");
//if the current state is still, then when button clicked will animate
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
//if the current state is animate, button click will make still
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

//Click event listener to all elements with a class of "pixar"
$(document).on("click", ".pixar", displayPixarInfo);
//Click event listener for gif images
$(document).on("click", ".pixarGif", stateOfGifs);

//Calling the renderButtons function to display the intial buttons on screen
renderButtons();

});

//To do:
//activate remove button to only the button selected, not all.



