const ourChoiceContainer = document.querySelector(".big-choice");
const compChoiceContainer = document.querySelector(".ai-big-choice");
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
const humanChoicesArray = [];
const ironChoiceElement = document.querySelector("#iron");
const paperChoiceElement = document.querySelector("#paper");
const scissorsChoiceElement = document.querySelector("#scissors");

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
    const theActualMove = data.candidates[0].content.parts[0].text;
    console.log("here is the move", theActualMove);
    return theActualMove;
  } catch (error) {
    console.log(error);
  }
}

//event listeners
ironChoiceElement.addEventListener("click", async () => {
  const ourImg = document.createElement("img");
  ourImg.src = "./images/iron.png";
  ourImg.alt = "iron picture";
  ourImg.classList.add("our-big-choice");
  ourChoiceContainer.appendChild(ourImg);

  const computerChoice = await getMoveFromAI();
  if (computerChoice === "Scissors") {
    console.log("comp choose scissors ");
    const compImg = document.createElement("img");
    compImg.src = "./images/scissors.jpg";
    compImg.alt = "scissors picture";
    compImg.classList.add("our-big-choice");
    compChoiceContainer.appendChild(compImg);

    //alert the player who won
    setTimeout(() => {
      alert("Iron beats Scissors, you win!!!");
      compChoiceContainer.innerHTML = "";
      ourChoiceContainer.innerHTML = "";
    }, 1000);
  } else if (computerChoice === "Rock") {
    console.log("comp choose rock ");
    const compImg = document.createElement("img");
    compImg.src = "./images/iron.png";
    compImg.alt = "iron picture";
    compImg.classList.add("our-big-choice");
    compChoiceContainer.appendChild(compImg);

    //alert the player who won
    setTimeout(() => {
      alert("Iron vs Iron, its a tie :)");
      compChoiceContainer.innerHTML = "";
      ourChoiceContainer.innerHTML = "";
    }, 1000);
  } else {
    console.log("comp choose paper ");
    const compImg = document.createElement("img");
    compImg.src = "./images/paper.png";
    compImg.alt = "paper picture";
    compImg.classList.add("our-big-choice");
    compChoiceContainer.appendChild(compImg);

    //alert the player who won
    setTimeout(() => {
      alert("Paper Beats Iron, AI wins");
      compChoiceContainer.innerHTML = "";
      ourChoiceContainer.innerHTML = "";
    }, 1000);
  }
});
