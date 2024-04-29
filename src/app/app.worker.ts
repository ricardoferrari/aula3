import { DecisionNode } from './DecisionNode';
import { PlayersEnum } from './enums/players.enum';
import { ResultEnum } from './enums/result.enum';
import { Move } from './interfaces/Move';
import { BoardSnapshot } from './models/BoardSnapshot';

addEventListener('message', ({ data }) => {

  console.log('Worker received:', data);
  const initialBoard: BoardSnapshot = new BoardSnapshot(data.cells);


  let nextMove = initialBoard.nextAvailableCell();
  let bestMove: Move | false = nextMove;
  let bestScore: number = 0;

  while (nextMove) {
    const cells = initialBoard.cloneCells();
    const tempDecisionNode = new DecisionNode(PlayersEnum.AI, nextMove, cells);
    const score = tempDecisionNode.updateScore();
    console.log('Decision:', tempDecisionNode);
    if (score > bestScore) {
      bestScore = score;
      bestMove = nextMove;
    }
    initialBoard.lockCell(nextMove);
    nextMove = initialBoard.nextAvailableCell();
  }

  console.log('Movimento:', bestMove, bestScore);

  if(bestMove !== false) {
    postMessage(bestMove);
  }


  let result = initialBoard.checkStatus();
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
  // postMessage(response);
});
