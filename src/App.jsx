import { useState } from 'react'
import Card from './components/Card'
import './App.css'

const initialCards = [
  { question: "When is NiziU's debut day?", answer: 'December 2, 2020' },
  { question: 'How many members are there in NiziU?', answer: '9 members' },
  { question: 'Who is the oldest member of NiziU?', answer: 'MAKO' },
  { question: 'Who is the youngest member of NiziU?', answer: 'NINA' },
  { question: 'What is their predebut song that went viral in Japan shortly after the conclusion of their audition program?', answer: 'Make you happy' },
  { question: 'What is their audition program called?', answer: 'Nizi Project' },
  { question: 'What was the song MAYUKA performed in Nizi Project that helped her break out of her shell?', answer: 'Heartbeat' },
  { question: "What is the name of NiziU's first best album that is going to release on July 1, 2026?", answer: 'Portfolio' },
  { question: 'How many times have NiziU done a concert at Tokyo Dome?', answer: '4 times' },
]

function App() {
  const [deck, setDeck] = useState([...initialCards])
  const [mastered, setMastered] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  const handleNext = () => {
    if (currentIndex < deck.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5)
    setDeck(shuffled)
    setCurrentIndex(0)
  }

  const handleCorrect = () => {
    const next = currentStreak + 1
    setCurrentStreak(next)
    if (next > longestStreak) setLongestStreak(next)
  }

  const handleIncorrect = () => {
    setCurrentStreak(0)
  }

  const handleMastered = () => {
    const card = deck[currentIndex]
    const newDeck = deck.filter((_, i) => i !== currentIndex)
    setMastered(prev => [...prev, card])
    setDeck(newDeck)
    setCurrentIndex(Math.min(currentIndex, newDeck.length - 1))
  }

  if (deck.length === 0) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>NiziU Trivia</h1>
          <p className="description">Test your NiziU knowledge!</p>
        </header>
        <main className="app-main">
          <p className="all-mastered">All {mastered.length} cards mastered!</p>
          <button className="shuffle-btn" onClick={() => { setDeck([...initialCards]); setMastered([]); setCurrentIndex(0) }}>
            Start Over
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>NiziU Trivia</h1>
        <p className="description">Test your NiziU knowledge!</p>
        <div className="stats-row">
          <span className="card-count">{currentIndex + 1} / {deck.length} cards</span>
          <span className="streak-stat">Streak: {currentStreak} | Best: {longestStreak}</span>
          {mastered.length > 0 && (
            <span className="mastered-count">Mastered: {mastered.length}</span>
          )}
        </div>
      </header>

      <main className="app-main">
        <p className="flip-hint">Type your guess below, or click the card to reveal the answer</p>
        <Card
          key={deck[currentIndex].question}
          question={deck[currentIndex].question}
          answer={deck[currentIndex].answer}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
        />
        <div className="nav-row">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Back
          </button>
          <button className="shuffle-btn" onClick={handleShuffle}>Shuffle</button>
          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={currentIndex === deck.length - 1}
          >
            Next
          </button>
        </div>
        <button className="master-btn" onClick={handleMastered}>Mark as Mastered</button>
        {mastered.length > 0 && (
          <details className="mastered-section">
            <summary>Mastered Cards ({mastered.length})</summary>
            <ul>
              {mastered.map((c, i) => <li key={i}>{c.question}</li>)}
            </ul>
          </details>
        )}
      </main>
    </div>
  )
}

export default App
