import { useState } from 'react'

function Card({ question, answer, onCorrect, onIncorrect }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'incorrect'

  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = guess.trim()
    if (!trimmed) return

    const normGuess = normalize(trimmed)
    const normAnswer = normalize(answer)
    const isCorrect = normAnswer.includes(normGuess) || normGuess.includes(normAnswer)

    setFeedback(isCorrect ? 'correct' : 'incorrect')
    setIsFlipped(true)
    if (isCorrect) onCorrect()
    else onIncorrect()
  }

  return (
    <div className="card-container">
      <div
        className={`card-scene ${feedback ? `scene-${feedback}` : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-face card-front">
            <p>{question}</p>
          </div>
          <div className="card-face card-back">
            <p>{answer}</p>
          </div>
        </div>
      </div>

      <form className="guess-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`guess-input ${feedback ? `input-${feedback}` : ''}`}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your answer here..."
          disabled={feedback !== null}
        />
        <button type="submit" className="submit-btn" disabled={feedback !== null}>
          Submit
        </button>
      </form>

      {feedback && (
        <p className={`feedback-msg feedback-${feedback}`}>
          {feedback === 'correct' ? 'Correct!' : 'Incorrect — click the card to see the answer.'}
        </p>
      )}
    </div>
  )
}

export default Card
