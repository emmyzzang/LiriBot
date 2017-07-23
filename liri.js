const keys = require('./keys.js');

const Twitter = require('twitter');
 
const getMyTweets = function() {

const client = new Twitter(keys.twitterKeys);
 
const params = {screen_name: 'SchwiftySauce'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
  		// var tweetsObject = JSON.stringify(tweets, null, 2);
  		// tweets.forEach(function(tweet) {
    	// console.log(tweet.text);
    //loop thru all the tweets in the array and console.log the data 
    	for (var i = 0; i < tweets.length; i++) {
    		console.log(tweets[i].created_at); 
    		console.log(' '); 
    		console.log(tweets[i].text); 
	    	}
  		}
	});
}

let pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets': 
		getMyTweets(); 
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



