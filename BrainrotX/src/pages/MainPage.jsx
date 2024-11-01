import axios from "axios";
import { div } from "framer-motion/client";
import { useState } from "react";

function MainPage() {
    const [question, setQuestion] = useState("");


    async function generateAnswer() {
        console.log("loading...")

        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBk5ceq9XMw1sWQn3HtAJGaNNAjCGfHQ1Y",
            method: "post",
            data: {
                contents: [
                    { parts: [{ text: question }] }
                ]
            }
        })
        console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
    }

    return (
        <div>
            <div className="flex flex-col gap-3 justify-center items-center">
                <textarea
                value={question} onChange={(e) => setQuestion(e.target.value)}
                cols="30"
                row="10" 
                className="border-2 border-black">
                </textarea>
                <button onClick={generateAnswer} className="bg-purple-500 p-2 text-center">
                    Response
                </button>
            </div>
        </div>
    )
}
export default MainPage;