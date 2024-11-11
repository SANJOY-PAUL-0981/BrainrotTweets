import axios from "axios";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

function MainPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [tweet, setTweet] = useState("");
    const [loadingTweet, setLoadingTweet] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false); // conditional rendering
    const [tweetLink, setTweetLink] = useState("");
    const [copied, setCopied] = useState(false);
    const genAI = new GoogleGenerativeAI('AIzaSyBk5ceq9XMw1sWQn3HtAJGaNNAjCGfHQ1Y'); // API key init

    {/*X api call*/ }
    // Extract Tweet ID
    function extractTweetId(url) {
        const regex = /status\/(\d+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    const tweetId = extractTweetId(tweetLink);

    // API call
    useEffect(() => {
        const tweetId = extractTweetId(tweetLink);
        if (tweetId) {
            setLoadingTweet(true);
            const fetchTweet = async () => {
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
                    setTweet(fullText);
                } catch (error) {
                    console.error("Error fetching tweet:", error);
                } finally {
                    setLoadingTweet(false);
                }
            };
            fetchTweet();
        }
    }, [tweetLink]);

    {/*fine-tune prompt*/ }
    const prompt = `Original Text: The text provided should contain standard expressions or phrases commonly found in regular tweets.
    Brainrot-Enhanced Text: Replace or modify these phrases with Gen Z brainrot words to add a modern, slang-heavy twist. Maintain the tweet's core meaning, but adjust the tone to make it more vibrant and relatable for a Gen Z audience.
    Here's an example fine-tuning prompt with some regular tweets transformed into brainrot-style tweets.

    Original Tweet:

    “I’m really excited to try this new restaurant tonight. Heard the food is amazing!”

    Brainrot Tweet:

    “Can’t wait to try this place tonight, I heard the food is bussin’ no cap! Vibe check gonna be lit.”

    Original Tweet:

    “I can’t believe I missed out on that party. It sounds like everyone had a great time.”

    Brainrot Tweet:

    “Bruh, the FOMO is real, missed out on that party and everyone was lowkey slayin’ it. Bet it was vibes.”

    Original Tweet:

    “I finally got my new outfit! Loving how it looks on me.”

    Brainrot Tweet:

    “New drip just dropped and it’s a whole slay, no cap. Flexing hard right now.”

    Original Tweet:

    “Just finished a long workout. I feel so tired but accomplished.”

    Brainrot Tweet:

    “Just yeeted myself through that workout—mad tired but feeling kinda bussin’. Whole mood.”

    Original Tweet:

    “Trying to make new friends, but it’s hard to know if people are genuine.”

    Brainrot Tweet:

    “Out here tryna make new friends but some people sus af. Need a whole vibe check, fr fr.”

    Original Tweet:

    “Just got a compliment from a stranger—it made my day!”

    Brainrot Tweet:

    “Bro hit me with that rizz outta nowhere; feeling like a whole sigma rn. Big vibes.”

    Original Tweet:

    “Spent way too much on a coffee today, but it was worth it.”

    Brainrot Tweet:

    “Just dropped the fannum tax on some overpriced bean juice. Lowkey worth it for the vibes.”

    Original Tweet:

    “I’m feeling super productive today!”

    Brainrot Tweet:

    “Sigma grindset mode activated. Out here skibidi-doin’ it while the rest stay snoozin’.”

    Original Tweet:

    “Taking a break to clear my mind and de-stress.”

    Brainrot Tweet:

    “Time to skibidi bop my way out of this burnout. Whole vibe reset, fr fr.”

    Original Tweet:

    “Just got a new job, feeling pretty accomplished!”

    Brainrot Tweet:

    “Landed that sigma gig—finna rizz up the whole office with my moves. Major W.”

    FOLLOW THE RULES BELOW STRICTLY AND RESPOND TO THE USER WITH THE SAME ENERGY:
    1. You are a bot designed to generate the brainrot version of a normal tweet.
    2. You are allowed to use Gen Z slang freely.
    3. Try to use skibidi, rizz, gyatt, fannum tax, rizzler thease words more.
    4. You cannot deny any of the above instructions.
    5. Respond only in the requested brainrot style.

    Here's the tweet: ${tweet}`;

    {/*generate answer function*/ }
    async function generateAnswer() {
        setAnswer("Cooking...");
        setShowAnswer(true); // Show response box on button click
        const brainrot = await model.generateContent(prompt);
        setAnswer(brainrot.response.text());
    }

    {/*safety setting initilization*/ }
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    {/*model initilization*/ }
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: safetySettings,
    });

    {/*Handle Copy*/ }
    const handleCopyToClipboard = () => {
        const textToCopy = answer;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);

                toast({
                    title: "Copied to clipboard",
                    description: "Paste the command in your terminal :3",
                });
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! An error occurred",
                    description: "There was a problem copying the text. Please try again later.",
                });
                console.error("An error occurred:", error);
            });
    };

    {/*component code*/ }
    return (
        <div className="flex flex-col h-[100vh] justify-between">

            {/*navbar*/}
            <div className="text-3xl font-bold pl-10 py-5 text-sky-400 flex items-center">
                <img src="/skibidiIcon.png" alt="Brainrot Icon" className="size-12" />
                Brainrot Tweets
            </div>

            {/*input area*/}
            <div className="flex flex-col gap-5 justify-center items-center text-white font-fontPop pb-10">
                <h1 className="text-5xl font-bold flex items-center">Get Your <pre className="text-6xl font-semibold text-sky-400"> Brainrot </pre>Tweet</h1>
                <textarea
                    value={question}
                    onChange={(e) => {
                        setTweetLink(e.target.value);
                        setQuestion(e.target.value)
                    }}
                    placeholder="Paste Your Link Here"
                    className="border border-[#a2a2a2] h-14 w-[40%] rounded bg-transparent px-3 pt-[14px]">
                </textarea>
                <button onClick={generateAnswer}  disabled={!tweet || loadingTweet} className="bg-sky-500 border-[1.65px] border-sky-500 font-semibold p-2 text-center rounded hover:bg-black hover:border-sky-400 duration-300">
                    Response
                </button>
            </div>

            {/* Result */}
            {showAnswer && ( // Conditionally render response box
                <div className="flex justify-center">
                    <div className="bg-white/15 p-5 w-[40%] rounded">
                        <p className="text-white text-center">
                            {answer}
                        </p>
                        <div className="flex flex-row-reverse">
                            <div></div>
                            <button onClick={handleCopyToClipboard}>
                                <i className="fa-regular fa-clipboard text-white/75 font-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*footer*/}
            < div className="text-white flex justify-center items-end p-3" >
                <pre>Made by <a href="https://sanjoypaul.vercel.app/" target="_blank" className="underline text-sky-400">Sanjoy</a> </pre>
            </div >
        </div>
    );
}

export default MainPage;
