import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function PlayerChoice({ question, numQuestions, setNumQuestions }) {
  return (
    <>
      <p>{question}</p>
      <Box sx={{ width: 300 }}>
        <Slider
          value={numQuestions} // controlled value
          onChange={(e, value) => setNumQuestions(value)} // update App
          valueLabelDisplay="on"
          marks
          min={1}
          max={10}
        />
      </Box>
    </>
  );
}

export default PlayerChoice;
