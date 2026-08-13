import { GoogleGenerativeAI } from "@google/generative-ai";

const LumiAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
);

export const gemini = LumiAI.getGenerativeModel({
    model: "gemini-2.0-flash",
})