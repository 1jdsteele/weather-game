// import QuestionFormat from "./QuestionFormat";
// import { useState, useEffect } from "react";

// function Gameplay({
//   cities,
//   numQuestions,
//   player1Score,
//   setPlayer1Score,
//   goToOutro,
// }) {
//   const questionTypes = ["temp", "west"];
//   const [questionType, setQuestionType] = useState("");

//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [currentRound, setCurrentRound] = useState(1);

//   const [shuffledCities, setShuffledCities] = useState([]);

//   const startIndex = (currentRound - 1) * 2;
//   const currentCities = shuffledCities.slice(startIndex, startIndex + 2);

//   //move getData() function here
//   function handleGamePlayNext() {
//     if (currentRound < numQuestions) {
//       setCurrentRound(currentRound + 1);
//     } else {
//       // Reached the last round — go to outro
//       goToOutro();
//     }
//   }

//   //fisher yates shuffle
//   function shuffleArray(array) {
//     // Make a copy so we don't mutate the original
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       // Swap elements i and j
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   }

//   useEffect(() => {
//     const shuffled = shuffleArray(cities);
//     setShuffledCities(shuffled);
//     console.log("✅ Local shuffledCities:", shuffled);
//   }, []); // Only once!

//   useEffect(() => {
//     const randomType =
//       questionTypes[Math.floor(Math.random() * questionTypes.length)];
//     setQuestionType(randomType);
//     console.log("New question type:", randomType);
//   }, [currentRound]); // re-run whenever currentRound changes

//   // console.log("cities list from before return Gameplay", cities);

//   return (
//     <>
//       <h1>GAMEPLAY</h1>
//       <h3>
//         Round {currentRound} of {numQuestions}
//       </h3>
//       <h3>Choose your answer</h3>
//       <QuestionFormat
//         key={`round-${currentRound}`}
//         currentCities={currentCities}
//         questionType={questionType}
//         player1Score={player1Score}
//         setPlayer1Score={setPlayer1Score}
//       ></QuestionFormat>
//       <button onClick={handleGamePlayNext}>
//         {currentRound < numQuestions ? "NEXT" : "FINISH"}
//       </button>
//     </>
//   );
// }

// export default Gameplay;

import QuestionFormat from "./QuestionFormat";
import { useState, useEffect } from "react";

function Gameplay({
  cities,
  numQuestions,
  player1Score,
  setPlayer1Score,
  goToOutro,
}) {
  const questionTypes = ["temp", "west"];
  const [questionType, setQuestionType] = useState("");
  const [currentRound, setCurrentRound] = useState(1);
  const [shuffledCities, setShuffledCities] = useState([]);

  // ✅ This happens BEFORE we slice!
  useEffect(() => {
    const shuffled = shuffleArray(cities);
    setShuffledCities(shuffled);
    console.log("✅ Local shuffledCities:", shuffled);
  }, []); // Only once!

  const startIndex = (currentRound - 1) * 2;
  const currentCities = shuffledCities.slice(startIndex, startIndex + 2);

  function handleGamePlayNext() {
    if (currentRound < numQuestions) {
      setCurrentRound(currentRound + 1);
    } else {
      goToOutro();
    }
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    const randomType =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];
    setQuestionType(randomType);
    console.log("New question type:", randomType);
  }, [currentRound]);

  // ✅ Only render once we have enough cities to play
  if (shuffledCities.length < 2) {
    return <p>Loading cities...</p>;
  }

  return (
    <>
      <h1>GAMEPLAY</h1>
      <h3>
        Round {currentRound} of {numQuestions}
      </h3>
      <h3>Choose your answer</h3>
      <QuestionFormat
        key={`round-${currentRound}`}
        currentCities={currentCities}
        questionType={questionType}
        player1Score={player1Score}
        setPlayer1Score={setPlayer1Score}
      />
      <button onClick={handleGamePlayNext}>
        {currentRound < numQuestions ? "NEXT" : "FINISH"}
      </button>
    </>
  );
}

export default Gameplay;
