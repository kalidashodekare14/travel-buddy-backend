const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let openai;
let genAI;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const generatePost = async (req, res) => {
  try {
    const { destination, budget, peopleNeeded, travelDate } = req.body;
    const prompt = `Write an engaging travel post for a trip to ${destination} with a budget of $${budget}, needing ${peopleNeeded} people, traveling on ${travelDate}. Keep it friendly and exciting.`;

    if (openai) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
      return res.json({ description: response.choices[0].message.content });
    }

    if (genAI) {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      return res.json({ description: result.response.text() });
    }

    res.status(400).json({ message: 'No AI API key configured' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const suggestDestination = async (req, res) => {
  try {
    const { interests, budget } = req.body;
    const prompt = `Suggest 5 travel destinations for someone interested in ${interests?.join(', ')} with a budget of $${budget}. Return as a JSON array of {destination, description, estimatedCost}.`;

    if (openai) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
      return res.json({ suggestions: response.choices[0].message.content });
    }

    if (genAI) {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      return res.json({ suggestions: result.response.text() });
    }

    res.status(400).json({ message: 'No AI API key configured' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generatePost, suggestDestination };
