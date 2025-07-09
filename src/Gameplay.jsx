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

  //upon load, shffule the cities
  useEffect(() => {
    const shuffled = shuffleArray(cities);
    setShuffledCities(shuffled);
    console.log("✅ Local shuffledCities:", shuffled);
  }, []);

  //so this is cool in that I will never get a repeat
  //not cool bc once city is used cannot be used again
  // therefore not truly random
  //also what is cool is round controls which cities we get
  const startIndex = (currentRound - 1) * 2;
  const currentCities = shuffledCities.slice(startIndex, startIndex + 2);

  //if more rounds, continue in gameplay
  //else, go to outro
  function handleGamePlayNext() {
    if (currentRound < numQuestions) {
      setCurrentRound(currentRound + 1);
    } else {
      goToOutro();
    }
  }

  //shuffle function from ai, Fisher-Yates shuffle
  ///small initial testing shows it works for our purposes
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  //when current round updated (end of last round)
  //we get a random question type
  useEffect(() => {
    const randomType =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];
    setQuestionType(randomType);
    console.log("New question type:", randomType);
  }, [currentRound]);

  // only render if both city data loaded
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
        //key maybe not necessary anymore, for trying to differentiate loads of QuestionFormat
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
