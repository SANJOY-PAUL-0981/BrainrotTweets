import axios from "axios";
import { useState } from "react";

function MainPage(){
    async function generateAnswer(){
        console.log("loading...")

        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBk5ceq9XMw1sWQn3HtAJGaNNAjCGfHQ1Y",
            method: "post",
            data: {
                contents:[
                    { parts: [{ text: "Explain how AI works" }] }
                ]
            }
        })
        console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
    }

    return(
        <button onClick={generateAnswer} className="bg-purple-500 p-2 text-center">
            Response
        </button>
    )
}
export default MainPage;