import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://twitter283.p.rapidapi.com/TweetDetail',
  params: {
    tweet_id: '1855589118941478917'
  },
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
