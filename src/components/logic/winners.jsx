import { WINNER_COMBOS } from "../../constants";

export const checkWinnerFrom = (checkBoard) => {

  for(const combo of WINNER_COMBOS)  {
    const [a,b,c] = combo
    if (
      checkBoard[a] && checkBoard[a] === checkBoard[b] && checkBoard[a] === checkBoard[c]
    ) {
      return checkBoard[a]
    }
  }
    return null
}

export const checkEndGameFrom = (newBoard) => {
    // Si al llenar el tablero no hay ganador
    return newBoard.every((square) => square != null)
}