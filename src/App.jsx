import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import Square from './components/square'
import ResultModule from './components/modules/resultModule'
import { checkEndGameFrom, checkWinnerFrom } from './components/logic/winners'
import { removeLocal, saveLocal } from './components/logic/localStorage/index'


// las props son lo que necesita el map para funcionar y rederizar en pantalla



function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return (turnFromStorage ?? TURNS.X)
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // si hay algo en el indice, ejecuta, sino, ignorar.
    if (board[index] || winner) return

    // se hace una copia para evitar mutar el original
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveLocal(newBoard, newTurn)

    // revisamos si hay un winner
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } // TODO: check if game is over
    else if (checkEndGameFrom(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    removeLocal()
  }

  return (
    <main className='board'>
      <h1>Partida</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      {/* cuando mi estado es de un tipo u otro, hacemos el cambio del seleccionado */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
      </section>

      <ResultModule winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App
