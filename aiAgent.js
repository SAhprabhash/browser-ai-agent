import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const parseInstruction = async (instruction, pageContext) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are an AI agent that interacts with webpages using instructions." },
            { role: "user", content: `Instruction: ${instruction} \nCurrent page context: ${pageContext}` }
        ]
    });
    return response.choices[0].message.content;
};
