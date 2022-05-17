import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false}, 
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //If choiceOne img == choiceTwo img


   //shuffle cards
   const shuffleCards = () => {
     const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() -0.5)
      .map((card) => ({ ...card, id: Math.random() }))


    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

   }
      //handle a choice
      //also, pass this function down to the <SingleCard key={card.id} card={card} />
    const handleChoice = (card) => {
      
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
    }

    //we want to see if we have a value for each choices in here:
    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
         setCards(prevCards => {
           return prevCards.map(card => {
             if (card.src === choiceOne.src) {
               return {...card, matched: true} //...spreads out the properties
             } else {
               return card
             }
           })
         })
          resetTurn()
        } else {
         
         setTimeout(() => resetTurn(), 1000)
        }
      }

    }, [choiceOne, choiceTwo])

    console.log(cards)


    //reset choices and increase turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
      
      
    }

    //to start the game automatically
    useEffect(() => {
      shuffleCards()

    }, [] )


   

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
      {cards.map(card => (
       <SingleCard 
       key={card.id} 
       card={card} 
       handleChoice={handleChoice}
       flipped={card === choiceOne || card === choiceTwo || card.matched}
       disabled={disabled}
       />
      ))}

      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;



