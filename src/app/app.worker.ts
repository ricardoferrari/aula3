import ArtificialPlayer from './ArtificialPlayer';
import Board from './Board';

addEventListener('message', ({ data }) => {
  const board: Board = new Board(data, 3);
  const AI: ArtificialPlayer = new ArtificialPlayer(data, 3);

  const play = AI.play();
  postMessage(`AI play ${play.x} ${play.y}`);
  const winner1 = board.someoneWonAnyLine();
  const response1 = `Has winner line ${winner1} and ${board.playerWon}`;
  postMessage(response1);
  const winner2 = board.someoneWonAnyColumn();
  const response2 = `Has winner column ${winner2} and ${board.playerWon}`;
  postMessage(response2);
  const winner3 = board.someoneWonAnyDiagonal();
  const response3 = `Has winner diagonal ${winner3} and ${board.playerWon}`;
  postMessage(response3);
});
