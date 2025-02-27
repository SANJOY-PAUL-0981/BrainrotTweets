import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDCG6jyz8BFV1NR6-t_qw6OQPV5-vhw29k");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "Explain how AI works, explain it in small way";

const result = await model.generateContent(prompt);
console.log(result.response.text());