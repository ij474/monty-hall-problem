import { useState, useCallback } from 'react';

const DOORS_COUNT = 3;

export const useMontyHall = () => {
  // Game State
  const [gameState, setGameState] = useState('PICK'); // PICK, REVEAL, RESULT
  const [doors, setDoors] = useState([0, 1, 2]);
  const [prizeDoor, setPrizeDoor] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [hostOpenedDoor, setHostOpenedDoor] = useState(null);
  const [finalResult, setFinalResult] = useState(null); // 'WIN' or 'LOSE'
  const [message, setMessage] = useState("Select a door to begin.");
  const [impactMessage, setImpactMessage] = useState(null); // New: Counterfactual analysis

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    stay: { wins: 0, losses: 0 },
    switch: { wins: 0, losses: 0 },
  });

  // Initialize a new round
  const startNewGame = useCallback(() => {
    const newPrize = Math.floor(Math.random() * DOORS_COUNT);
    setPrizeDoor(newPrize);
    setGameState('PICK');
    setSelectedDoor(null);
    setHostOpenedDoor(null);
    setFinalResult(null);
    setImpactMessage(null);
    setMessage("Select a door to begin.");
  }, []);

  // Step 1: Player picks a door
  const pickDoor = (doorIndex) => {
    if (gameState !== 'PICK') return;
    setSelectedDoor(doorIndex);
    setMessage("Waiting for host...");
    
    // Host logic: Must open a door that is NOT the prize and NOT the selected door
    const availableDoors = doors.filter(
      (d) => d !== doorIndex && d !== prizeDoor
    );
    
    const doorToOpen = availableDoors[Math.floor(Math.random() * availableDoors.length)];
    
    setTimeout(() => {
      setHostOpenedDoor(doorToOpen);
      setGameState('REVEAL');
      setMessage(`Host opened Door ${doorToOpen + 1} (Empty). Stick or Switch?`);
    }, 800); 
  };

  // Step 2: Player decides to Switch or Stay
  const finalizeChoice = (shouldSwitch) => {
    const finalDoor = shouldSwitch
      ? doors.find((d) => d !== selectedDoor && d !== hostOpenedDoor)
      : selectedDoor;

    const won = finalDoor === prizeDoor;
    const prizeAmount = "$10,000";
    
    setFinalResult(won ? 'WIN' : 'LOSE');
    setGameState('RESULT');
    setMessage(won ? `🎉 You WON the ${prizeAmount}!` : "❌ You went BUST.");

    // Counterfactual Analysis
    if (won) {
      setImpactMessage({
        text: shouldSwitch 
          ? "Great choice! If you had stuck, you would have LOST."
          : "Lucky! If you had switched, you would have LOST.",
        type: 'positive'
      });
    } else {
      setImpactMessage({
        text: shouldSwitch
          ? `Tough luck. If you had stuck, you would have WON ${prizeAmount}.`
          : `Ouch. If you had switched, you would have WON ${prizeAmount}.`,
        type: 'negative'
      });
    }

    // Update Stats
    setStats((prev) => {
      const strategy = shouldSwitch ? 'switch' : 'stay';
      return {
        ...prev,
        total: prev.total + 1,
        [strategy]: {
          ...prev[strategy],
          wins: prev[strategy].wins + (won ? 1 : 0),
          losses: prev[strategy].losses + (won ? 0 : 1),
        },
      };
    });
  };

  // Simulation Logic (Counterfactual / "What If" Engine)
  const runSimulation = (count) => {
    let newStayWins = 0;
    let newSwitchWins = 0;
    
    // We simulate 'count' games. For each game, we calculate BOTH outcomes.
    for (let i = 0; i < count; i++) {
      const simPrize = Math.floor(Math.random() * DOORS_COUNT);
      const simInitialPick = Math.floor(Math.random() * DOORS_COUNT);
      
      // STAY Strategy: Wins if initial pick is the prize
      if (simInitialPick === simPrize) {
        newStayWins++;
      } else {
        // SWITCH Strategy: Wins if initial pick is NOT the prize
        // (Because host removes one loser, leaving the prize as the only switch option)
        newSwitchWins++;
      }
    }

    setStats((prev) => ({
      total: prev.total + count,
      stay: {
        wins: prev.stay.wins + newStayWins,
        losses: prev.stay.losses + (count - newStayWins),
      },
      switch: {
        wins: prev.switch.wins + newSwitchWins,
        losses: prev.switch.losses + (count - newSwitchWins),
      },
    }));
  };

  const resetStats = () => {
    setStats({
      total: 0,
      stay: { wins: 0, losses: 0 },
      switch: { wins: 0, losses: 0 },
    });
  };

  return {
    gameState,
    doors,
    prizeDoor,
    selectedDoor,
    hostOpenedDoor,
    finalResult,
    message,
    impactMessage,
    stats,
    startNewGame,
    pickDoor,
    finalizeChoice,
    runSimulation,
    resetStats
  };
};
