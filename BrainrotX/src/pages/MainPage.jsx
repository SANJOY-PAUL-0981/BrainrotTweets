import axios from "axios";
import { div } from "framer-motion/client";
import { useState } from "react";

function MainPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
async function generateAnswer() {
  setAnswer("loading...");

  // Define the brainrot prompt
  const brainrotPrompt = `Original Text: The text provided should contain standard expressions or phrases commonly found in regular tweets.
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


  Here's the tweet: ${question}`;

  const response = await axios({
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBk5ceq9XMw1sWQn3HtAJGaNNAjCGfHQ1Y",
    method: "post",
    data: {
      contents: [
        { parts: [{ text: brainrotPrompt }] }
      ]
    }
  });

  setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
}
    return (
        <div>
            <div className="text-3xl font-bold pl-10 py-5 text-purple-600 flex items-center">
                <img src="../../public/skibidiIcon.png" alt="Brainrot Icon" className="size-12" />
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

            <p className="text-white text-center">
                {answer}
            </p>
        </div>
    )
}
export default MainPage;