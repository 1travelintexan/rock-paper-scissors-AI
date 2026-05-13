const API_KEY = "AIzaSyBHvDXtVyqgie8U4VtuOw6uZo9t-edB7Bg";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
const requestBody = {
  contents: [
    {
      parts: [
        {
          text: ' We are playin Rock paper scissors. Pick your move. Respond with ONLY the word "Rock", "Paper" or "Scissors" and nothing else',
        },
      ],
    },
  ],
};

async function getMoveFromAI() {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    const AIsMove = data.candidates[0].content.parts[0].text;
    console.log("here is the move", AIsMove);
    return AIsMove;
  } catch (error) {
    console.log(error);
  }
}
