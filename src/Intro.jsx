import * as React from "react";

import PlayerChoice from "./playerChoice";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

function Intro({
  region,
  setRegion,
  handleIntroSubmit,
  numQuestions,
  setNumQuestions,
}) {
  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <>
      <h1>INTRO</h1>
      <h3>intro title: cache seemingly necessary, i cry</h3>
      {/* <PlayerChoice question={"How many players?"}></PlayerChoice> */}
      <PlayerChoice
        question={"How many questions?"}
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
      ></PlayerChoice>

      {/* drop down menu for regions */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose a region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="region from label"
            onChange={handleChange}
          >
            <MenuItem value={"africa"}>Africa</MenuItem>
            <MenuItem value={"america"}>America</MenuItem>
            <MenuItem value={"australia"}>
              Australia and Pacific Islands
            </MenuItem>
            <MenuItem value={"eurasia"}>Eurasia</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <button onClick={handleIntroSubmit}>submit</button>
    </>
  );
}

export default Intro;
