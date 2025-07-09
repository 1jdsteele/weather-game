import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

//this needs to be more generalized numQuestions->numVar, setNumQuestions->setNumVar
//then this can be used for number players
function PlayerChoice({ question, numQuestions, setNumQuestions }) {
  return (
    <>
      <p>{question}</p>
      <Box sx={{ width: 300 }}>
        <Slider
          value={numQuestions}
          //below we are setting numQuestions EVERY TIme - change to when we submit
          onChange={(e, value) => setNumQuestions(value)}
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
