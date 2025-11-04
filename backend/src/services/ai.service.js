const { GoogleGenAI } =require("@google/genai");

const ai = new GoogleGenAI({});

async function captionGenerator(base64Image) {
 const prompt = [
    { text: "generate a caption" },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config:{
      systemInstruction:`
      you are a master in generating cool captions
      you are generating it in short and concise manner
      you can generate most relatable captions according to image
      make it more cool for genz use hastags and emojis no other things just like in instagram
      do not add \n in the caption`
    }
  });
  return response.text
}

module.exports=captionGenerator


