README

# 💰 Monty Hall "Cash or Bust" Visualizer

A high-fidelity, interactive simulation of the Monty Hall problem. This project moves away from cartoonish visuals to a cleaner, game-show aesthetic where the goal is to win the **Cash Prize**. It focuses heavily on statistical proof via a "Turbo Mode" and provides immediate feedback on the impact of your strategic choices.

-----

## 1\. Project Goal

To build a professional visualization that allows users to:

1.  **Experience the Dilemma:** Physically choose a door, see a non-prize door open, and face the pressure of the "Switch or Stick" decision.
2.  **Visualize the Cash:** Use high-quality assets (SVG icons or images) for the Cash Prize and "Bust" (losing) doors—**strictly no emojis**.
3.  **Verify via Turbo Mode:** Run 1,000+ simulated games instantly to see the statistical divergence between sticking (33%) and switching (66%) visualized in a sleek "Live Statistics" dashboard.
4.  **Analyze the "What If":** After every game, explicitly show the user *what would have happened* if they had made the opposite choice.

-----

## 2\. The Rules (Cash Edition)

1.  **The Setup:** There are **3 Doors**.
      * Behind **1 Door** is a **Stack of Cash** 💵.
      * Behind the other **2 Doors** is **Nothing/Zonk** ❌ (generic "Bust" symbol, NO emojis).
2.  **The Pick:** The user selects one door.
3.  **The Host Reveal:** The host (AI) opens one of the *other* doors that definitely contains **Nothing**.
4.  **The Decision:** The user must choose to **STICK** with their current door or **SWITCH** to the remaining closed door.
5.  **The Climax:** The final doors open. If the Cash is behind the chosen door, the user wins.

-----

## 3\. Core Features

### 3.1 Interactive "TV Show" Mode

  * **Visuals:** Three sleek, modern doors.
  * **Game Flow:**
    1.  **Selection:** User clicks a door. It highlights Gold.
    2.  **Tension:** Short pause.
    3.  **Host Action:** One of the unpicked, losing doors opens to reveal "Empty/Trash".
    4.  **The Choice:** Two large buttons appear: `STICK` and `SWITCH`.
    5.  **Result:** The chosen door opens.
          * **Win:** Cash animation plays.
          * **Loss:** "Bust" image appears.
    6.  **Impact Reflection:** A message appears below the result:
        > *"You stuck with Door 1 and LOST. If you had switched to Door 2, you would have WON."*

### 3.2 Turbo Simulation Mode (The Statistical Bay)

A dedicated dashboard for running high-speed simulations.

  * **Initial State (Pre-Simulation):**
      * Shows only the **Expected Theory**:
          * *Expected Stay Win Rate: \~33%*
          * *Expected Switch Win Rate: \~66%*
  * **Action:**
      * User selects "1,000 Games" and clicks `Run Simulation`.
  * **Post-Simulation State (Live Statistics):**
      * The UI transforms to match the "Live Statistics" reference image:
          * **Header:** "Live Statistics"
          * **Always Stay:** A Yellow progress bar showing the actual result (e.g., **30.2%**).
          * **Always Switch:** A Blue/Purple gradient progress bar showing the actual result (e.g., **69.8%**).
          * **Counts:** Display exact Win/Loss numbers below the bars (e.g., "302W / 698L (1000 games)").
          * **Footer:** A small note reiterating: *"Expected: Stay ≈ 33% | Switch ≈ 67%. The more games, the closer to expected values."*

-----

## 4\. Visual Design & Layout

### 4.1 Aesthetics

  * **Theme:** Dark mode, "High Stakes" feel. Deep greens (money), golds, and dark grays.
  * **Assets:**
      * `cash_stack.svg` (The Prize)
      * `empty_vault.svg` (The Loss)

### 4.2 The Dashboard (UI)

```text
+-------------------------------------------------------+
|  MONTY HALL: CASH VISUALIZER                          |
+-------------------------------------------------------+
|                                                       |
|   [ DOOR 1 ]       [ DOOR 2 ]       [ DOOR 3 ]        |
|                                                       |
|            (Status: Host revealed Door 3 is empty)    |
|                                                       |
|         [ STICK (Door 1) ]   [ SWITCH (Door 2) ]      |
|                                                       |
+-------------------------------------------------------+
|  IMPACT ANALYSIS                                      |
|  "Last Round: You Stuck and Lost. Switching wins!"    |
+-------------------------------------------------------+
|  STATISTICAL BAY (TURBO MODE)                         |
|  [Run 1000 Games]                                     |
|                                                       |
|  ● Live Statistics                                    |
|                                                       |
|  Always Stay                            30.2%         |
|  [🟨🟨🟨🟨__________]                                 |
|  302W / 698L (1000 games)                             |
|                                                       |
|  Always Switch                          69.8%         |
|  [🟦🟦🟦🟦🟦🟦🟦🟦__]                                 |
|  698W / 302L (1000 games)                             |
|                                                       |
|  📊 Expected: Stay ≈ 33% | Switch ≈ 67%               |
+-------------------------------------------------------+
```

-----

## 5\. Technical Logic

### 5.1 The "What If" Engine

The simulation runs **counterfactual analysis** for every single game seed. It doesn't just pick one strategy; it calculates the outcome for *both* strategies simultaneously to ensure the comparison is fair.

```javascript
// Pseudo-code for Simulation Loop
games.forEach(game => {
  // 1. Set up the game (Prize is random)
  // 2. Player picks random door
  // 3. Host reveals goat
  
  // 4. Calculate STAY outcome:
  if (playerPick == prizeDoor) stayWins++;
  
  // 5. Calculate SWITCH outcome:
  if (playerPick != prizeDoor) switchWins++;
});
// 6. Update State with exact counts
```

-----

## 6\. How to Run

1.  Clone the repository.
2.  Install dependencies (React + Tailwind + Framer Motion).
3.  Add your generic asset images to `/public/assets` (ensure no emojis are used).
4.  `npm start` to run the visualizer.
5.  Click **"Turbo Mode"** to see the Live Statistics populate and compare against the theory.