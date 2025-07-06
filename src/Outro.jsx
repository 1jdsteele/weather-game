function Outro({ player1Score, startOver }) {
  return (
    <>
      <h1>OUTRO</h1>
      <h3>outr title</h3>
      <p>{player1Score}</p>
      <button onClick={startOver}>play again</button>{" "}
    </>
  );
}

export default Outro;
