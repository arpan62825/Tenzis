import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {
  const [die, setDie] = useState(() => getDieData());

  function getDieData() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  function holdTheDie(id) {
    setDie((prevArray) => {
      return prevArray.map((dieObj) => {
        return dieObj.id === id
          ? { ...dieObj, isHeld: !dieObj.isHeld }
          : dieObj;
      });
    });
  }

  const dieElement = die.map((dieObj) => {
    return (
      <Die
        key={dieObj.id}
        className="dice"
        value={dieObj.value}
        id={dieObj.id}
        isHeld={dieObj.isHeld}
        handleClick={holdTheDie}
      />
    );
  });

  function rollDice() {
    if (!isGameWon) {
      setDie((prevArray) => {
        return prevArray.map((dieObj) => {
          if (dieObj.isHeld === false) {
            return {
              ...dieObj,
              value: Math.ceil(Math.random() * 6),
            };
          } else {
            return {
              ...dieObj,
            };
          }
        });
      });
    } else {
      setDie(getDieData());
    }
  }

  const isGameWon = die.every((dieObj) => {
    return dieObj.value === die[0].value && dieObj.isHeld;
  });

  return (
    <main>
      {isGameWon && <Confetti numberOfPieces={1000} recycle={false} />}
      <section className="the-game">
        <h1>Tenzis</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>
      <div className="die-holder">
        {isGameWon ? <h1 className="win-header">You Win!</h1> : dieElement}
      </div>
      <button className="roll-button" onClick={() => rollDice()}>
        {isGameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
