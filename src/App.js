import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


const App = () => {
  
  const [tenzies, setTenzies] = useState(false)

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid(),
    }
  }

  const allNewDice = () => {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie())
    } 
    return diceArray
  }

  const [dice, setDice] = useState(allNewDice())

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won')
    }
  }, [dice])
  
  const rollDice = () => {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ?
        die :
        generateNewDie()
    }))
  }

  const holdDice = (id) => {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/> 
  ))

  return (
    <main className='container'>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-board'>
        {diceElements}
      </div>
      <button 
        className='roll-dice' 
        onClick={rollDice}
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}

export default App
