import { useState } from 'react'

function Card({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="card-scene" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">
          <p>{question}</p>
        </div>
        <div className="card-face card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
