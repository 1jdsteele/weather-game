import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function PlayerChoice(props) {
  const { question } = props;
  return (
    <>
      <p>{question}</p>
      <Box sx={{ width: 300 }}>
        <Slider
          //   aria-label="Temperature"
          defaultValue={2}
          valueLabelDisplay="on"
          //   shiftStep={1}
          //   step={1}
          marks
          min={1}
          max={10}
        />
        {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
      </Box>{" "}
    </>
  );
}

export default PlayerChoice;
