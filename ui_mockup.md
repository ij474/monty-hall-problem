Part 2: UI Expectation Document
Project: Monty Hall "Cash or Bust"

Version: 2.0 (High-Fidelity)

Theme: "Cyber/High-Stakes"

1. Design Language & Aesthetics
Vibe: Professional, sleek, data-driven. Think "Bloomberg Terminal meets High-End Casino."

Background: Deep Slate/Black (#0f172a to #020617). Not flat black—use subtle radial gradients to create a "spotlight" effect on the center stage.

Lighting:

Interactive Elements: Emit a "glow" (box-shadow) when hovered or active.

The Prize (Cash): Gold/Green glows.

The Bust (Empty): Red/Gray dim lighting.

2. The Stage (Component Behavior)
The Doors:

Shape: Tall, rounded rectangles (AspectRatio ~ 3:5).

Idle State: Dark metallic finish. Subtle border (border-slate-700).

Hover State: Use scale-105 and a colored border glow (Cyan or Gold).

Selected State: Critical. The door must look "locked in." A thick Gold border (border-amber-500) and an "active" indicator tag "YOUR PICK".

Animations:

When the Host reveals a door, use a 3D Flip animation (rotate-y-180).

Do not just swap the image; show the door physically opening.

3. The "Live Statistics" Bay (The Turbo Mode)
State A: Pre-Simulation (Ghost Mode)

Before running a simulation, the bars should be empty or grayed out (opacity-30).

Text should read: "Target Expectation: 33.3% / 66.7%".

State B: Post-Simulation (Live Mode)

Transition: When "Run Simulation" is clicked, the bars should animate from 0 to their final width over ~1.5 seconds (ease-out).

Visuals:

Stay Bar: Flat Yellow/Gold. Represents the "Conservative" choice.

Switch Bar: Gradient (Cyan to Purple). Represents the "Smart/Modern" choice.

Markers: A faint white line must exist at exactly 33.3% and 66.6% of the bar width. This acts as the "Target Line" so users can see if their simulation beat the odds.

4. Feedback & Micro-Interactions
The "Impact" Message:

This is not a simple toast notification. It is a persistent bar below the game area.

Logic: It must explicitly compare the user's result to the counterfactual.

Example: "You Stuck and Lost (0 Cash). Switching would have won ($10,000)."

Color Coding: Use Green text for positive counterfactuals ("Switching would have WON") and Gray for neutral ones.

5. Assets (Strict No-Emoji Policy)
Prize: Use a vector illustration of a Gold Bar or Stack of Cash.

Zonk/Goat: Use a vector illustration of an Empty Vault or a Red X.

Note: Emojis are forbidden in this version to maintain the "High-Stakes" serious aesthetic.