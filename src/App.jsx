import { useState } from "react";

import "./App.css";

import Intro from "./Intro";
import Outro from "./Outro";
import Gameplay from "./Gameplay";

function App() {
  const [count, setCount] = useState(0);

  const africaCities = ["Nairobi", "Cairo", "Johannesburg"];
  const americaCities = ["Pasadena", "Los%20Angeles", "Seattle"];
  const australiaCities = ["Auckland", "Brisbane", "Manila"];
  const eurasiaCities = ["Hong%20Kong", "Barcelona", "Vienna"];

  return (
    <>
      <Intro></Intro>

      <Gameplay></Gameplay>

      <Outro></Outro>
    </>
  );
}

export default App;
