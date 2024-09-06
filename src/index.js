import { Game } from './classes/game.js';
import { enemy } from './data/enemyData.js';
import { loadGameState } from './utils/stateManager.js';

const savedState = loadGameState();
if (savedState && savedState.playerName) {
    console.log('daaa')
    const game = new Game('canvas1', 800, 1000, savedState.enemies, savedState.playerName, savedState.lastHit, enemy);
    game.savePlayerName();
}

document.getElementById('save_name').addEventListener('click', () => {
    console.log('ratata');
    const game = new Game('canvas1', 800, 1000, null, null, null, enemy);
    game.savePlayerName();
});