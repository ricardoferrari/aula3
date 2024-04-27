import { DecisionNode } from './DecisionNode';
import { PlayersEnum } from './enums/players.enum';
import { ResultEnum } from './enums/result.enum';
import { BoardSnapshot } from './models/BoardSnapshot';

addEventListener('message', ({ data }) => {

  console.log('Worker received:', data);
  const initialBoard: BoardSnapshot = new BoardSnapshot(data.cells);

  const decisionNode = new DecisionNode(PlayersEnum.AI, { x: 0, y: 0}, initialBoard);
  console.log(decisionNode.board.nextAvailableCell());
  const result: ResultEnum = decisionNode.check();

  let response = '';
  switch (result) {
    case ResultEnum.WIN:
      response = 'AI wins';
      break;
    case ResultEnum.LOOSE:
      response = 'AI looses';
      break;
    case ResultEnum.DRAW:
      response = 'Draw';
      break;
  }
  postMessage(response);
});
