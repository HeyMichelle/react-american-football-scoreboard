//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.scss";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.


  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);

  const [isActive, setActive] = useState(true);  
  const [time, setTime] = useState[900]; // timer, use seconds for now

  const format = () => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return `${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`
  };

  const touchDownHome = (e) => {
    setHomeScore(homeScore + 7);
  }
  const fieldGoalHome = (e) => {
    setHomeScore(homeScore + 3);
  }

  const touchDownAway = (e) => {
    setAwayScore(awayScore + 7);
  }
  const fieldGoalAway = (e) => {
    setAwayScore(awayScore + 3);
  }

  const reset = (e) => {
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(0);
  };

  useEffect(
    () => {
      let int = null;
      if (isActive && time > 0) {
            int = setInterval(() => {
              setTime((time) => time - 1);
            }, 1000);
      } else if (!isActive && time !== 0) {
              clearInterval(int);
      } else if (time === 0 && quarter <= 4) {
            console.log('stopped here')
              clearInterval(int);
              setTime(900);
              nextQuarter();
      } else if ((time === 0 && quarter === 4) || quarter === 'OT' || quarter === 'OT2') {
              clearInterval(int);
              nextQuarter();
              setTime(900);
      } 
      return () => clearInterval(int);
    }, 
    [time, isActive],
  );

  const leader = homeScore > awayScore ? `Home Team Wins` : `Away Team Wins`;

  const nextQuarter = (e) => {
    if(homeScore === awayScore && quarter === 4) {
        setQuarter('OT');
        console.log('going to OT');
    } else if(quarter === 4){
        alert(`The game is over! ${leader} wins!`); 
        reset();
    } else if(quarter === "OT"){
        setQuarter(quarter + '2');
    } else if(quarter === "OT2"){
        if(homeScore === awayScore){
          alert("Game is over in a Tie.");
          reset();
        } else {
          alert(`The winner is ${leader}`);
          reset();
        }
    } else setQuarter(quarter + 1);
  };

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Cats</h2>
            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{format()}</div>
          <div className="away">
            <h2 className="away__name">Dogs</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>

        <BottomRow quarter={quarter} />

      </section>
      <section className="buttons">
        <button onClick={nextQuarter}>Next Quarter</button>
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button onClick={touchDownHome} className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick={fieldGoalHome} className="homeButtons__fieldGoal">Home Field Goal</button>
        </div>
        
        <div className="awayButtons">
          <button onClick={touchDownAway} className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick={fieldGoalAway} className="awayButtons__fieldGoal">Away Field Goal</button>
          <button onClick={() => setActive(!isActive)}>Pause Game</button>
        </div>

      </section>
    </div>
  );
}

export default App;
