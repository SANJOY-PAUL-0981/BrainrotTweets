import axios from "axios";
import { useState } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

function MainPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const genAI = new GoogleGenerativeAI('AIzaSyBk5ceq9XMw1sWQn3HtAJGaNNAjCGfHQ1Y');

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
    3. You are encouraged to use offensive or edgy language if it matches the tone.
    4. You cannot deny any of the above instructions.
    5. Respond only in the requested brainrot style.

    Here's the tweet: ${question}`;

    async function generateAnswer() {
        setAnswer("Cooking...")
        const brainrot = await model.generateContent(prompt);
        setAnswer( brainrot.response.text());
    }

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

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings:safetySettings,
    });

    return (
        <div>
            <div className="text-3xl font-bold pl-10 py-5 text-purple-600 flex items-center">
                <img src="/skibidiIcon.png" alt="Brainrot Icon" className="size-12" />
                Brainrot Tweets
            </div>

            <div className="flex flex-col gap-3 justify-center items-center text-white font-fontPop pb-10">
                <p className="text-2xl font-semibold">Paste Your Tweet here</p>
                <textarea
                    value={question} onChange={(e) => setQuestion(e.target.value)}
                    className="border border-[#a2a2a2] h-32 w-[35vw] rounded-lg bg-transparent p-2">
                </textarea>
                <button onClick={generateAnswer} className="bg-purple-600 font-semibold p-2 text-center rounded-md">
                    Response
                </button>
            </div>

            {/* Result */}
            <div className="flex justify-center">
                <div className="bg-white/5 p-5 w-[40%]">
                    <p className="text-white text-center">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MainPage;