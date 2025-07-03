import * as React from "react";

import PlayerChoice from "./playerChoice";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

function Intro() {
  const [region, setRegion] = React.useState("");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <>
      <h1>INTRO</h1>
      <h3>intro title</h3>
      {/* <PlayerChoice question={"How many players?"}></PlayerChoice> */}
      {/* <PlayerChoice question={"How many questions?"}></PlayerChoice> */}

      {/* drop down menu for regions */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose a region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value="this the value yo"
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
      <button onClick={() => console.log("from intro submit", region)}>
        submit
      </button>
    </>
  );
}

export default Intro;
