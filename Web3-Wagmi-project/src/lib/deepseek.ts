import OpenAI from "openai";

export const deepseek = new OpenAI({
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,

  baseURL: "https://api.deepseek.com",

  dangerouslyAllowBrowser: true,
});