
//**DEPENDENCIES**//

//Node Packages 

const request = require('request'); 
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('fs');

// Keys 

const keys = require('./keys.js');
const spotify = new Spotify(keys.spotifyKeys);
const client = new Twitter(keys.twitterKeys);


//**TWITTER**// 

const getMyTweets = function() {

	const params = {screen_name: 'SchwiftySauce'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
    	for (var i = 0; i < tweets.length; i++) {
    		console.log(tweets[i].created_at); 
    		console.log(' '); 
    		console.log(tweets[i].text); 
    		fs.appendFile('random.txt', tweets[i].text + " Created on: " + tweets[i].created_at + "\n");
	    	}
	    fs.appendFile('random.txt', "============================================================\n");
  		}
	});
}


//**SPOTIFY**// 

const getMySpotify = function (functionData) {
 
	spotify.search({type: 'track', query: functionData}, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 		data.tracks.items.forEach(function(item)
	 	{

    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("The Song's Name: " + data.tracks.items[0].name);
    console.log("A Preview Link of the Song: " + data.tracks.items[0].external_urls.spotify);
    console.log("Album: " + data.tracks.items[0].album.name);
    fs.appendFile('random.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + 
    	"Song Name: " + data.tracks.items[0].name + "\n" + 
    	"Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + 
    	"Album: " +
      data.tracks.items[0].album.name + "\n" + "====================================================\n");
	 	});
	});
}

//**ONLINE MOVIE DATABASE**// 

const getMyMovie = function (movieName) {

	request('http://www.omdbapi.com/?t='+ movieName + '&apikey=40e9cece', function(error, response, body){
		if(!error && response.statusCode == 200){
	  console.log("Title: " + JSON.parse(body).Title);
      console.log("Released: " + JSON.parse(body).Released);
      console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      fs.appendFile('random.txt', "\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating + "\nCountry: " + JSON.parse(body).Country +
        "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n======================================================");
		} else {
			console.log(' :(');
		}
	})
}


let pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets': 
			getMyTweets(); 
			break; 
		case 'spotify-this-song':
			getMySpotify(functionData);
			break;
		case 'movie-this': 
			getMyMovie(functionData);
			break;  
		case "do-what-it-says":
    		doThis();
    		break;
		default: 
			console.log('LIRI does not know that'); 
	}
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    } else {
      let dataArray = data.split(",");
      let one = dataArray[0];
      let two = dataArray[1];
    }
  });
}

//pass the arguments from the user 
let runThis = function(argOne, argTwo) {
	pick(argOne, argTwo); 
}; 

runThis(process.argv[2], process.argv[3]); 

