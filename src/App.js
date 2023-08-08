import { useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'


const App = () => {

  const allNewDice = () => {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid(),
      })
    } 
    return diceArray
  }

  const [dice, setDice] = useState(allNewDice())
  
  const rollDice = () => {
    setDice(allNewDice())
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
      <div className='die-board'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
