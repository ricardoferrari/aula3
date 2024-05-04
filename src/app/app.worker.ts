import { DecisionNode } from './DecisionNode';
import { PlayersEnum } from './enums/players.enum';
import { Move } from './interfaces/Move';
import { BoardSnapshot } from './models/BoardSnapshot';

addEventListener('message', ({ data }) => {

  const initialBoard: BoardSnapshot = new BoardSnapshot(data.cells);


  // NOTE: If the board is empty, the AI will always start randomly
  if (initialBoard.availableCells() === 9) {
    const randomMove: Move = {
      x: Math.floor(Math.random() * 3),
      y: Math.floor(Math.random() * 3)
    };
    postMessage(randomMove);
    return;
  }
  let nextMove = initialBoard.nextAvailableCell();
  let bestMove: Move | false = nextMove;
  let bestScore: number = -Infinity;

  while (nextMove) {
    initialBoard.lockCell(nextMove);
    const cells = initialBoard.cloneCells();
    const tempDecisionNode = new DecisionNode(PlayersEnum.AI, nextMove, cells);
    const score = tempDecisionNode.updateScore();
    // console.log('Decision:', score, nextMove, tempDecisionNode);
    if (tempDecisionNode.didIAWon()) {
      bestMove = nextMove;
      break;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMove = nextMove;
    }
    nextMove = initialBoard.nextAvailableCell();
  }

  // console.log('Movimento:', bestMove, bestScore);

  if(bestMove !== false) {
    postMessage(bestMove);
  }

});
