// import { useState, useEffect } from "react";

// function QuestionFormat({
//   currentCities,
//   questionType,
//   player1Score,
//   setPlayer1Score,
// }) {
//   const url =
//     "http://api.weatherstack.com/current?access_key=d718cf0a973843f442a7d9f92d9ef343&query=";

//   const cityA = currentCities[0];
//   const cityB = currentCities[1];
//   const [cityAData, setCityAData] = useState(null);
//   const [cityBData, setCityBData] = useState(null);
//   //const isAMore

//   let valueA, valueB, questionText, isCorrect;

//   useEffect(() => {
//     async function fetchCityData(city, setter) {
//       try {
//         const response = await fetch(url + city);
//         const data = await response.json();
//         if (data.error) {
//           console.error(`API error for ${city}:`, data.error);
//           return;
//         }
//         setter(data);
//       } catch (err) {
//         console.error(`Error fetching data for ${city}:`, err);
//       }
//     }

//     fetchCityData(cityA, setCityAData);
//     fetchCityData(cityB, setCityBData);
//   }, []);

//   // Show loading until both cities are ready
//   if (!cityAData || !cityBData) {
//     return <p>Loading city data...</p>;
//   }

//   switch (questionType) {
//     case "temp":
//       valueA = cityAData.current.temperature;
//       valueB = cityBData.current.temperature;
//       questionText = "Which city has the higher temperature?";
//       // Higher number is better
//       isCorrect = (choice) =>
//         (valueA >= valueB && choice === "A") ||
//         (valueB > valueA && choice === "B");
//       break;

//     case "west":
//       valueA = cityAData.location.lon;
//       valueB = cityBData.location.lon;
//       questionText = "Which city is further west?";
//       // More negative longitude means further west
//       isCorrect = (choice) =>
//         (valueA <= valueB && choice === "A") ||
//         (valueB < valueA && choice === "B");
//       break;

//     default:
//       valueA = 0;
//       valueB = 0;
//       questionText = "Unknown question type.";
//       isCorrect = () => false;
//   }

//   function handleChoice(choice) {
//     if (isCorrect(choice)) {
//       setPlayer1Score(player1Score + 1);
//       alert("Correct!");
//     } else {
//       alert("Wrong!");
//     }
//   }

//   // return (
//   //   <>
//   //     <p>Which city has the most {questionType}?</p>
//   //     <button>Choice 1: {cityA}</button>
//   //     <button>Choice 2: {cityB}</button>
//   //   </>
//   // );

//   console.log(`MOUNT QuestionFormat for round, cities: ${cityA} and ${cityB}`);

//   return (
//     <div>
//       <p>{questionText}</p>
//       <button onClick={() => handleChoice("A")}>
//         {cityA} ({valueA})
//       </button>
//       <button onClick={() => handleChoice("B")}>
//         {cityB} ({valueB})
//       </button>
//     </div>
//   );
// }

// export default QuestionFormat;

import { useState, useEffect } from "react";

// ✅ In-memory cache persists across renders during the session!
//cache AB test HERE
const cityCache = {};

function QuestionFormat({
  currentCities,
  questionType,
  player1Score,
  setPlayer1Score,
}) {
  const url =
    "https://api.weatherstack.com/current?access_key=d718cf0a973843f442a7d9f92d9ef343&query=";

  const cityA = currentCities[0];
  const cityB = currentCities[1];
  const [cityAData, setCityAData] = useState(null);
  const [cityBData, setCityBData] = useState(null);

  let valueA, valueB, questionText, isCorrect;

  useEffect(() => {
    console.log(
      `🚀 MOUNT: QuestionFormat for round, cities: ${cityA} and ${cityB}`
    );

    async function fetchCityData(city, setter) {
      // cache AB test HERE
      if (cityCache[city]) {
        console.log(`✅ Cache hit for ${city}`);
        setter(cityCache[city]);
        return;
      }

      console.log(`🌐 Fetching API for ${city}`);
      try {
        const response = await fetch(url + city);
        const data = await response.json();
        if (data.error) {
          console.error(`❌ API error for ${city}:`, data.error);
          return;
        }
        // cache AB test HERE
        cityCache[city] = data; // ✅ Save to cache
        setter(data);
      } catch (err) {
        console.error(`❌ Error fetching data for ${city}:`, err);
      }
    }

    fetchCityData(cityA, setCityAData);
    fetchCityData(cityB, setCityBData);
  }, []); // ✅ Only once per mount because of `key` in Gameplay

  // Show loading screen until both are ready
  if (!cityAData || !cityBData) {
    return <p>Loading city data...</p>;
  }

  // Create your question logic
  switch (questionType) {
    case "temp":
      valueA = cityAData.current.temperature;
      valueB = cityBData.current.temperature;
      questionText = "Which city has the higher temperature?";
      isCorrect = (choice) =>
        (valueA >= valueB && choice === "A") ||
        (valueB > valueA && choice === "B");
      break;

    case "west":
      valueA = cityAData.location.lon;
      valueB = cityBData.location.lon;
      questionText = "Which city is further west?";
      isCorrect = (choice) =>
        (valueA <= valueB && choice === "A") ||
        (valueB < valueA && choice === "B");
      break;

    default:
      valueA = 0;
      valueB = 0;
      questionText = "Unknown question type.";
      isCorrect = () => false;
  }

  function handleChoice(choice) {
    if (isCorrect(choice)) {
      setPlayer1Score(player1Score + 1);
      alert("✅ Correct!");
    } else {
      alert("❌ Wrong!");
    }
  }

  return (
    <div>
      <p>{questionText}</p>
      <button onClick={() => handleChoice("A")}>
        {cityA} ({valueA})
      </button>
      <button onClick={() => handleChoice("B")}>
        {cityB} ({valueB})
      </button>
    </div>
  );
}

export default QuestionFormat;
