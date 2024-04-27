import ArtificialPlayer from './ArtificialPlayer';
import Board from './Board';
import { DecisionNode } from './DecisionNode';
import { PlayersEnum } from './enums/players.enum';
import { BoardSnapshot } from './interfaces/BoardSnapshot';

// addEventListener('message', ({ data }) => {
//   const board: Board = new Board(data, 3);
//   const AI: ArtificialPlayer = new ArtificialPlayer(data, 3);

//   const play = AI.play();
//   postMessage(`AI play ${play.x} ${play.y}`);
//   const winner1 = board.someoneWonAnyLine();
//   const response1 = `Has winner line ${winner1} and ${board.playerWon}`;
//   postMessage(response1);
//   const winner2 = board.someoneWonAnyColumn();
//   const response2 = `Has winner column ${winner2} and ${board.playerWon}`;
//   postMessage(response2);
//   const winner3 = board.someoneWonAnyDiagonal();
//   const response3 = `Has winner diagonal ${winner3} and ${board.playerWon}`;
//   postMessage(response3);
// });

addEventListener('message', ({ data }) => {

  const initialBoard: BoardSnapshot = new BoardSnapshot([
    [PlayersEnum.AI, PlayersEnum.HUMAN, PlayersEnum.AI],
    [PlayersEnum.AI, PlayersEnum.AI, PlayersEnum.AI],
    [PlayersEnum.AI, PlayersEnum.AI, PlayersEnum.AI]
  ]);

  const decision = new DecisionNode(PlayersEnum.AI, { x: 0, y: 0}, initialBoard);
  console.log(decision.board.nextAvailableCell());
  decision.check();
  const response = `Create step`;
  postMessage(response);
});
