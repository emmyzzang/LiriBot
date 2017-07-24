
//**DEPENDENCIES**//

//Node Packages 

const request = require('request'); 
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');


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
	    	}
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

		 	console.log(item.name);
		    console.log(item.album.name);
		    console.log(item.artists[0].name);
		    console.log(item.preview_url);
		    console.log('-------------');		

	 	});
	});
}

//**ONLINE MOVIE DATABASE**// 

const getMyMovie = function (movieName) {

	request('http://www.omdbapi.com/?t='+ movieName + '&apikey=40e9cece', function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log(body);
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
		default: 
			console.log('LIRI does not know that'); 
	}
}

//pass the arguments from the user 
let runThis = function(argOne, argTwo) {
	pick(argOne, argTwo); 
}; 

runThis(process.argv[2], process.argv[3]); 

