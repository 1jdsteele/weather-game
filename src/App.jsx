import { useState } from "react";

import "./App.css";

import Intro from "./Intro";
import Outro from "./Outro";
import Gameplay from "./Gameplay";

function App() {
  //user defined vars
  const [region, setRegion] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);

  //lists of city in a region, formatted to be called by APi
  const africaCities = ["Nairobi", "Cairo", "Johannesburg", "Alexandria"];
  const americaCities = ["Pasadena", "Los%20Angeles", "Seattle"];
  const australiaCities = ["Auckland", "Brisbane", "Manila"];
  const eurasiaCities = ["Hong%20Kong", "Barcelona", "Vienna"];

  //vars that control game states
  const [player1Score, setPlayer1Score] = useState(0);
  const [cities, setCities] = useState(["Vienna", "Hong Kong", "Barcelona"]); // from Intro
  const [phase, setPhase] = useState("intro");

  //when submit hit in intro, get region, get numQuestions, start Gameplay
  const handleIntroSubmit = () => {
    console.log("Region:", region);
    console.log("Num questions:", numQuestions);

    let selectedCities;
    switch (region) {
      case "africa":
        selectedCities = africaCities;
        break;
      case "america":
        selectedCities = americaCities;
        break;
      case "australia":
        selectedCities = australiaCities;
        break;
      case "eurasia":
        selectedCities = eurasiaCities;
        break;
      default:
        selectedCities = [];
    }

    console.log("Cities in region:", selectedCities);

    setCities(selectedCities);

    setPhase("gameplay");
  };

  const handleGamePlayNext = () => {
    setPhase("outro");
  };

  // vars and functions for intro (getting data and making question from it)
  const url =
    "http://api.weatherstack.com/current?access_key=741a1584b0a588be08c9943a04301514&query=";

  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState("");
  let questionsData = [];

  async function getData(city) {
    try {
      const response = await fetch(url + city);
      const cityData = await response.json();
      if (cityData.error) return;
      console.log("from getData", cityData);
      setCityData(cityData);
      //here is where I think that the map of {city:temp} should be appended to questionsData
    } catch {
      console.log("we caught an error");
    }
  }

  function getCitiesData(cities) {
    for (let i = 0; i < cities.length; i++) {
      getData(cities[i]);
    }
  }

  console.log("from before return: ", cityData);

  return (
    <>
      {phase === "intro" && (
        <Intro
          region={region}
          setRegion={setRegion}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          handleIntroSubmit={handleIntroSubmit}
        />
      )}
      {phase === "gameplay" && (
        <Gameplay
          cities={cities}
          numQuestions={numQuestions}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          //question for code reviewer:
          // I already have handleGamePlayNext
          // but goToOutro is so simple, should I just do what I do here
          //or do I should I call handleGamePlayNext here?
          goToOutro={() => setPhase("outro")}
        />
      )}
      {phase === "outro" && (
        <Outro
          player1Score={player1Score}
          startOver={() => {
            setPhase("intro");
            setPlayer1Score(0);
          }}
        />
      )}
    </>
  );
}

export default App;
