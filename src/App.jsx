import { useState } from 'react'
import Card from './components/Card'
import './App.css'

const cards = [
  { question: 'When is NiziU\'s debut day?', answer: 'December 2, 2020' },
  { question: 'How many members are there in NiziU?', answer: '9 members' },
  { question: 'Who is the oldest member of NiziU?', answer: 'MAKO' },
  { question: 'Who is the youngest member of NiziU?', answer: 'NINA' },
  { question: 'What is their predebut song that went viral in Japan shortly after the conclusion of their audition program?', answer: 'Make you happy' },
  { question: 'What is their audition program called?', answer: 'Nizi Project' },
  { question: 'What was the song MAYUKA performed in Nizi Project that helped her break out of her shell?', answer: 'Heartbeat' },
  { question: 'What is the name of NiziU\'s first best album that is going to release on July 1, 2026?', answer: 'Portfolio' },
  { question: 'How many times have NiziU done a concert at Tokyo Dome?', answer: '4 times' },
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    let next
    do {
      next = Math.floor(Math.random() * cards.length)
    } while (next === currentIndex && cards.length > 1)
    setCurrentIndex(next)
  }

  const card = cards[currentIndex]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Web Dev Trivia</h1>
        <p className="description">Test your JavaScript and web development knowledge!</p>
        <p className="card-count">{cards.length} cards total</p>
      </header>

      <main className="app-main">
        <p className="flip-hint">Click the card to reveal the answer</p>
        <Card key={currentIndex} question={card.question} answer={card.answer} />
        <button className="next-btn" onClick={handleNext}>Next →</button>
      </main>
    </div>
  )
}

export default App
