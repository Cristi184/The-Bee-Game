# Bee Swarm Game

## Story

In this game, you manage a bee swarm with the following members:

- **Queen** – 1 bee
- **Worker** – 5 bees
- **Drone** – 8 bees

### Initial Health Points (HP)

- **Queen** – 100 HP
- **Worker (each)** – 75 HP
- **Drone (each)** – 50 HP

## Gameplay

### Objective

The player hits random bees in the swarm and causes damage. The goal is to manage the swarm and deal with the consequences when bees die or the Queen loses all HP.

### Game Mechanics

1. **Hit Button**: Click this button to deal damage to a random bee in the swarm.
    - **Queen**: 8 damage
    - **Worker**: 10 damage
    - **Drone**: 12 damage

2. **Bee Health Management**:
    - When a bee's HP reaches zero, it dies.
    - If the Queen dies, all other swarm members also die.

### User Interface

The game UI is designed to be clear, concise, and intuitive. The main elements are:

- **Hit Button**: To perform an action on the swarm.
- **Player Name**: Displays the name of the player.
- **Alive Bees**: Groups bees by type and shows detailed health information (Bonus: Detailed info about each bee's health status).
- **Last Hit Information**: Shows which bee type was hit and the damage done during the last action.

### End Game Conditions

- The game ends when there are no bees alive.
- The game also ends when the Queen has lost all HP.

### Re-initialization

After a game over, the game can be re-initialized with default parameters.

### Persistence

The game state is saved between different browser sessions to allow players to continue from where they left off.

## Running Tests with Jest

To ensure that your app's classes are functioning correctly, follow these steps:

1. **Install Dependencies**

   Make sure you have all the necessary development dependencies installed. Run:
   ```bash
   npm install
1. **Run Unit tests**

   Make sure you have all the necessary development dependencies installed. Run:
   ```bash
   npm test
