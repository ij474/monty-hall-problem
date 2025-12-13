# Monty Hall Visualizer

An interactive simulation of the Monty Hall problem where you actually pick a door, watch the host reveal a goat, and decide whether to switch or stay. The goal is to *see* the probabilities play out over many rounds, not just read about them.

---

## 1. Goal of the project

- Let the user play the Monty Hall game with clear visuals.
- Let the user choose: **stay** or **switch** after the host opens a door.
- Show **live statistics**:
  - Win rate when **staying**
  - Win rate when **switching**
- Include an **auto-simulation mode** so users can run thousands of games and watch the numbers converge toward:
  - Stay strategy ≈ 33.3% win
  - Switch strategy ≈ 66.7% win

This should feel like a small, polished mini-app rather than a throwaway demo.

---

## 2. Quick recap of the Monty Hall problem (for context)

Rules you should implement:

1. There are **3 doors**.
   - Behind **1 door** is a **car** (prize).
   - Behind the other **2 doors** are **goats**.
2. The player picks **one door**.
3. The host (who knows where the car is) opens **one of the remaining two doors**:
   - It always reveals a **goat**.
4. The player now chooses to:
   - **Stay** with the original door, or
   - **Switch** to the other unopened door.
5. Doors are revealed and the game outcome is shown.

Key fact:
- If you **always stay**: win probability ≈ 1/3  
- If you **always switch**: win probability ≈ 2/3

The UI should make this obvious over time via stats.

---

## 3. Core features

### 3.1 Interactive play mode

- Display **3 large doors** in the center of the screen.
- Each door has:
  - A label: `Door 1`, `Door 2`, `Door 3`
  - A clickable area (hover effect + click)
- Game flow:
  1. **Step 1: Choose a door**
     - User clicks a door.
     - That door is visually marked as *selected*.
  2. **Step 2: Host reveals a goat**
     - One of the other two doors opens with a short animation.
     - Inside: goat icon / image.
     - Host’s explanation text like:  
       `Host: I’ve opened a door with a goat. Do you want to switch?`
  3. **Step 3: Switch or stay decision**
     - Display two big buttons:
       - `Stay with Door X`
       - `Switch to Door Y`
     - The alternative door is visually highlighted, so the user clearly sees:
       - Original choice  
       - New possible choice
  4. **Step 4: Reveal outcome**
     - Open all remaining closed doors with an animation.
     - Show car / goats.
     - Text summary:
       - `You switched and WON the car!`  
       - or `You stayed and got a goat.`

### 3.2 Stats panel

A side panel (right or bottom) that always shows:

- **Total games played**
- **Games where user chose to stay**
  - Wins
  - Losses
  - Win rate (percentage)
- **Games where user chose to switch**
  - Wins
  - Losses
  - Win rate (percentage)

Example layout:

- Total games: 124
- Stay:
  - Wins: 21 (16.9%)
  - Losses: 103
- Switch:
  - Wins: 58 (66.7%)
  - Losses: 29

Optionally, show a small **bar chart** or progress bars:

- One bar for stay win rate
- One bar for switch win rate

### 3.3 Simulation mode (auto-play)

Add a tab or toggle: `Simulation Mode`.

Controls:

- **Number of games** input: `100`, `1000`, `10000`, or custom
- **Strategy** dropdown:
  - `Always stay`
  - `Always switch`
  - `Random (50% stay / 50% switch)`
- **Speed** slider or presets:
  - `Instant` (no per-game animation, just update numbers)
  - `Fast` (very quick door highlights)
  - `Normal` (like regular game pace, but automated)

Behavior:

- When the user clicks `Run Simulation`:
  - Run that many games programmatically.
  - Update all stats exactly as if the user had played.
- Optionally show:
  - A small log like `Game 1: switched, won car`, `Game 2: stayed, goat`, etc., but truncated.

---

## 4. Visual design and layout

### 4.1 Main layout

Suggested structure:

- **Top bar**
  - App title: `Monty Hall Visualizer`
  - Simple explanation link: `What is this?` (opens a small modal or tooltip)
- **Center**
  - 3 doors in a row, evenly spaced.
  - Status text above or below them:
    - `Step 1: Pick a door`
    - `Host opened Door 3 (goat).`
    - `Will you switch to Door 2?`
- **Right or bottom panel**
  - Stats panel (live statistics)
  - Buttons:
    - `Play again`
    - `Switch to Simulation Mode`

### 4.2 Door states

Each door should have clear visual states:

1. **Idle**
   - Neutral color
   - Slight hover effect
2. **Selected by player**
   - Highlighted border or glow
3. **Opened with goat**
   - Door visually open and goat visible
4. **Opened with car**
   - Door open and car visible
5. **Disabled / non-clickable**
   - During host actions or after round ends

You should never leave the user confused about:

- Which door they picked
- Which door the host opened
- Which door remains as the alternative

### 4.3 Feedback and microcopy

Short, clear messages during the game, for example:

- `Pick one of the three doors.`
- `You picked Door 1. The host is now opening a door...`
- `Host opened Door 3. It has a goat.`
- `Do you want to stay with Door 1 or switch to Door 2?`
- `You switched and won the car! 🎉`
- `You stayed and got a goat. Try switching next time.`

Keep the text small and focused; the visualization is the main teacher.

---

## 5. Game logic (high level, no code)

### 5.1 Data per round

Each game round should track:

- `prizeDoor`: which door has the car (1–3)
- `playerInitialChoice`
- `hostOpenedDoor`
- `playerFinalChoice`
- `chosenStrategy`: `stay`, `switch`, or `manual` (interactive play)
- `result`: `win` or `loss`

### 5.2 Host’s decision rule

When the player chooses a door:

1. If the chosen door has the **car**:
   - Host randomly picks **one of the two remaining doors** that has a goat.
2. If the chosen door has a **goat**:
   - Host must open the **only remaining door** with a goat.

This ensures the host never reveals the car and always opens exactly one goat door.

### 5.3 Stats updates

After each game:

- Decide if the user **stayed** or **switched**:
  - If `playerFinalChoice == playerInitialChoice` → stayed
  - Else → switched
- Compute:
  - Total games
  - For stay strategy:
    - total stay games
    - stay wins
    - stay losses
  - For switch strategy:
    - total switch games
    - switch wins
    - switch losses

Win rates:

- `stayWinRate = stayWins / max(1, stayGames)`
- `switchWinRate = switchWins / max(1, switchGames)`

---

## 6. User flows

### 6.1 First-time user

1. Open app.
2. See a short description and a `Play` button.
3. Click `Play`:
   - Doors appear
   - Message: `Pick a door`
4. User clicks a door.
5. Host opens another door, reveals goat.
6. User clicks `Stay` or `Switch`.
7. Result is shown visually.
8. Stats panel updates.
9. User clicks `Play again` or switches to `Simulation Mode`.

### 6.2 Simulation user

1. User goes to `Simulation Mode` tab.
2. Sets:
   - Games: 1000
   - Strategy: `Always switch`
   - Speed: `Instant`
3. Clicks `Run Simulation`.
4. Progress indicator:
   - `Running 1000 games...`
5. Once done:
   - Stats panel now shows large sample:
     - Stay win rate low
     - Switch win rate around 66%
6. User can then go back to Play mode and play manually to build intuition.

---

## 7. Extras and nice-to-haves

These are optional, but will make the visualization feel high quality:

- **Tooltips**:
  - Hover over stats:  
    `If you always switch, theory says you should win about 66.7% of the time.`
- **Theoretical vs Experimental comparison**:
  - Show:
    - Theoretical stay win rate: 33.3%
    - Theoretical switch win rate: 66.7%
  - Next to:
    - Current experimental rates from user’s games.
- **Reset button**:
  - `Reset stats` to clear all history and start fresh.
- **Number of doors variant**:
  - Advanced mode: choose 3, 4, 5 doors and see how switch strategy gets even more powerful.
- **Mobile-friendly layout**:
  - Doors stacked vertically on small screens.
  - Stats panel collapsible.

---

## 8. Project structure (suggested)

You can adapt this to any framework or tech stack, but a reasonable structure is:

- `README.md`  
- `src/`
  - `components/`
    - `Door`  
    - `GameBoard`  
    - `StatsPanel`  
    - `ControlPanel`  
    - `SimulationControls`
  - `logic/`
    - `montyHallGame` (game state + host logic)
    - `simulation` (batch runs)
  - `styles/`
    - Global styles and theme
- `public/`
  - `goat.png`
  - `car.png`
  - Any icons you want

You can ignore this structure if you already have your own setup, but the idea is to keep **logic** and **UI** clearly separated.

---

## 9. How to use this visualization

Once built, the app should let someone:

1. Play a handful of games manually.
2. Guess that both strategies feel similar at first.
3. Run a large simulation with:
   - `Always stay`
   - `Always switch`
4. Notice that the **switch strategy** clearly wins more often.
5. Go back to manual play and see the game with a fresh understanding.

If someone can do all that without reading a math textbook, you’ve nailed the visualization.
