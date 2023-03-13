import React from 'react'
import Square from '../square'

export default function ResultModule({winner, resetGame}) {
  if (winner === null) return null

  const winnerTest = winner === false ? 'Empate' : 'Ganó:'
  return (
    
        <section className='winner'>
          <div className='text'>
          <h2>
            {winnerTest}
          </h2>
          <header className='win'>
            {winner && <Square>{winner}</Square>}
          </header>
          <footer>
            <button onClick={resetGame}>
              Play Again
            </button>
          </footer>
          </div>
        </section>
      )
}
