import axios from "axios";

// Sample tweet link (from input box)
const tweetLink = "https://twitter.com/elonmusk/status/1855589118941478917"; // Replace this with the actual input value

// Function to extract tweet_id
function extractTweetId(url) {
  const regex = /status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Extracted tweet_id
const tweetId = extractTweetId(tweetLink);

if (tweetId) {
  // Use tweetId in the API call
  const options = {
    method: 'GET',
    url: 'https://twitter283.p.rapidapi.com/TweetDetail',
    params: { tweet_id: tweetId },
    headers: {
      'x-rapidapi-key': '0cebf5fe6amshbfec054204c6dd9p148a7cjsn4159d63c8aca',
      'x-rapidapi-host': 'twitter283.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const fullText = response.data.data.tweet_result.result.legacy.full_text;
    console.log(fullText);
  } catch (error) {
    console.error(error);
  }
} else {
  console.log("Invalid tweet link");
}
