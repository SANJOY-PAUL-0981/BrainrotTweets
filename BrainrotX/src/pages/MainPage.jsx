import axios from "axios";
import { div } from "framer-motion/client";
import { useState } from "react";

function MainPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
async function generateAnswer() {
  setAnswer("loading...");

  // Define the brainrot prompt
  const brainrotPrompt = `I want you to replace all the normal words in my tweet with brainrot words. Here are the brainrot words you can use: skibidi, toilet, Ohio, rizz, cringe, epic, pog, simp, vibe, sus, yeet, cap, woke, lit, slay, boujee, extra, ratchet, shady, fire, flex, drip, clout, thirst trap, stan, ship, tea, shade, iconic, woke.

Example:

Original tweet: "I'm so excited to see the new Star Wars movie! It looks epic!"
Brainrot tweet: "I'm so lit to see the new Star Wars movie! It looks fire!"

Please replace all the words in my tweet with brainrot words from the list above. Here are a few more examples to inspire you:

Original: "I'm so tired of this rainy weather."
Brainrot: "I'm so ratchet of this Ohio weather."

Original: "This new song is really catchy."
Brainrot: "This new song is really fire."

Original: "I'm feeling really stressed lately."
Brainrot: "I'm feeling really sus lately."

Original: "I'm so excited for the weekend!"
Brainrot: "I'm so lit for the weekend, yeet!"

Original: "I'm not sure what to do with my life."
Brainrot: "I'm so cringe, what's my vibe?"

Original: "I'm so proud of you!"
Brainrot: "You slay, queen!"

Original: "I'm so hungry, I could eat a horse."
Brainrot: "I'm so hungry, I could eat a whole toilet."

Original: "I'm so bored, I'm going to watch some TV."
Brainrot: "I'm so bored, I'm going to watch some skibidi toilet."

Original: "I'm so happy, I could cry."
Brainrot: "I'm so pog, I could yeet."
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