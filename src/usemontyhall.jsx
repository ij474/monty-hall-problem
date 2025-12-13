import { useState, useCallback } from 'react';

// We have 3 doors in the standard Monty Hall problem
const DOORS_COUNT = 3;

/**
 * Custom Hook: useMontyHall
 * This hook contains all the "Brain" or logic for the game.
 * It handles the rules, the state of the doors, and the statistics.
 */
export const useMontyHall = () => {
  // --- GAME STATE VARIABLES ---
  // 'gameState' tracks where we are: 'PICK' (start), 'REVEAL' (host opens door), or 'RESULT' (game over)
  const [gameState, setGameState] = useState('PICK'); 
  
  // 'doors' is just an array [0, 1, 2] representing the 3 doors
  const [doors, setDoors] = useState([0, 1, 2]);
  
  // 'prizeDoor' stores the index (0-2) of the door hiding the money
  const [prizeDoor, setPrizeDoor] = useState(null);
  
  // 'selectedDoor' stores the index of the door the player clicked
  const [selectedDoor, setSelectedDoor] = useState(null);
  
  // 'hostOpenedDoor' stores the index of the door the host opened (always a goat/bust)
  const [hostOpenedDoor, setHostOpenedDoor] = useState(null);
  
  // 'finalResult' remembers if the player won or lost
  const [finalResult, setFinalResult] = useState(null); // 'WIN' or 'LOSE'
  
  // 'message' is the text shown to the user (e.g., "Select a door...")
  const [message, setMessage] = useState("Select a door to begin.");
  
  // 'impactMessage' shows the "What If" analysis after the game
  const [impactMessage, setImpactMessage] = useState(null); 

  // --- STATISTICS STATE ---
  // This object keeps track of wins/losses for both strategies over time
  const [stats, setStats] = useState({
    total: 0,
    stay: { wins: 0, losses: 0 },
    switch: { wins: 0, losses: 0 },
  });

  /**
   * Function: startNewGame
   * Resets all the game variables to their starting values.
   * Randomly hides the prize behind one of the doors.
   */
  const startNewGame = useCallback(() => {
    const newPrize = Math.floor(Math.random() * DOORS_COUNT); // Random number 0-2
    setPrizeDoor(newPrize);
    setGameState('PICK');
    setSelectedDoor(null);
    setHostOpenedDoor(null);
    setFinalResult(null);
    setImpactMessage(null);
    setMessage("Select a door to begin.");
  }, []);

  /**
   * Function: pickDoor
   * Called when the user clicks a door in the first phase.
   * @param {number} doorIndex - The ID of the door clicked
   */
  const pickDoor = (doorIndex) => {
    if (gameState !== 'PICK') return; // Ignore clicks if not in PICK phase
    setSelectedDoor(doorIndex);
    setMessage("Waiting for host...");
    
    // --- HOST LOGIC ---
    // The host must open a door that is:
    // 1. NOT the door the player picked
    // 2. NOT the door with the prize
    const availableDoors = doors.filter(
      (d) => d !== doorIndex && d !== prizeDoor
    );
    
    // Pick a random door from the valid options
    const doorToOpen = availableDoors[Math.floor(Math.random() * availableDoors.length)];
    
    // Add a small delay for dramatic effect before opening
    setTimeout(() => {
      setHostOpenedDoor(doorToOpen);
      setGameState('REVEAL'); // Move to the next phase
      setMessage(`Host opened Door ${doorToOpen + 1} (Empty). Stick or Switch?`);
    }, 800); 
  };

  /**
   * Function: finalizeChoice
   * Called when the user chooses to 'STICK' or 'SWITCH'.
   * @param {boolean} shouldSwitch - True if user clicked Switch, False if Stick
   */
  const finalizeChoice = (shouldSwitch) => {
    // Determine the final door based on the choice
    const finalDoor = shouldSwitch
      ? doors.find((d) => d !== selectedDoor && d !== hostOpenedDoor) // The remaining closed door
      : selectedDoor; // The original door

    const won = finalDoor === prizeDoor; // Did they pick the prize?
    const prizeAmount = "$10,000";
    
    setFinalResult(won ? 'WIN' : 'LOSE');
    setGameState('RESULT'); // Game Over
    setMessage(won ? `🎉 You WON the ${prizeAmount}!` : "❌ You went BUST.");

    // --- COUNTERFACTUAL ANALYSIS ---
    // This logic tells the user what WOULD have happened if they did the opposite.
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

    // Update the running statistics
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

  /**
   * Function: runSimulation
   * Instantly plays 'count' number of games in the background.
   * This proves the probability math (66% vs 33%) quickly.
   */
  const runSimulation = (count) => {
    let newStayWins = 0;
    let newSwitchWins = 0;
    
    // Loop 'count' times (e.g., 1000 times)
    for (let i = 0; i < count; i++) {
      const simPrize = Math.floor(Math.random() * DOORS_COUNT);
      const simInitialPick = Math.floor(Math.random() * DOORS_COUNT);
      
      // LOGIC:
      // If you STAY, you only win if your initial pick was correct (1/3 chance).
      if (simInitialPick === simPrize) {
        newStayWins++;
      } else {
        // If you SWITCH, you win if your initial pick was WRONG (2/3 chance).
        // Why? Because the host removes the other wrong door, leaving the prize.
        newSwitchWins++;
      }
    }

    // Update stats with the simulation results
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

  // Return all the variables and functions so the UI components can use them
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
