import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizQuestion, WritingFeedback } from "../types";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Generates a quiz based on the provided text using structured JSON output.
 */
export const generateQuiz = async (contextText: string): Promise<QuizQuestion[]> => {
  const prompt = `
    你是一個中文老師。請根據以下課文內容，設計 3 條由淺入深的選擇題 (Reading Comprehension)。
    
    課文:
    "${contextText}"
    
    請以 JSON 格式回傳，包含問題 (question)、四個選項 (options)、正確答案 (answer, 必須完全符合選項文字) 以及解釋 (explanation)。
    語言請使用繁體中文（香港慣用語）。
  `;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        options: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING } 
        },
        answer: { type: Type.STRING },
        explanation: { type: Type.STRING },
      },
      required: ["question", "options", "answer", "explanation"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a helpful Cantonese tutor designed to test reading comprehension.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Quiz generation error:", error);
    return [];
  }
};

/**
 * Grades the handwriting image.
 */
export const gradeHandwriting = async (base64Image: string, targetChar: string): Promise<WritingFeedback> => {
  // Remove data URL header if present
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  const prompt = `
    這是一位學生寫的中文單字。
    目標字是：「${targetChar}」。
    請評分（1-10分）並給出一句簡短的廣東話建議（例如：筆畫順序、結構比例、是否寫錯字）。
    
    如果完全寫錯字，請給 1-3 分。
    如果字體端正漂亮，請給 9-10 分。
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.INTEGER },
      comment: { type: Type.STRING }
    },
    required: ["score", "comment"]
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: cleanBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WritingFeedback;
    }
    return { score: 0, comment: "無法評分，請重試。" };
  } catch (error) {
    console.error("Grading error:", error);
    return { score: 0, comment: "AI 服務暫時不可用，請檢查網絡。" };
  }
};
