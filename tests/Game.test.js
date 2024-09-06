// tests/Game.test.js
import { Game } from '../src/classes/game.js';
import { Bee } from '../src/classes/bee.js';
import { enemy } from '../src/data/enemyData.js';

describe('Game class', () => {
    let game;
    let canvasMock;
    let ctxMock;

    beforeEach(() => {
        document.body.innerHTML = `
            <canvas id="canvas1"></canvas>
            <div id="last_hit"></div>
            <div class="player-name">
                Player Name: <span id="player_name"></span>
                <input class="input-name" type="text"/>
                <button id="save_name">Save Name & Start Game</button>
            </div>
            <div class="wrapper_bottom_buttons">
                <button id="hit">Hit</button>
            </div>
        `;
        canvasMock = document.getElementById('canvas1');
        ctxMock = {
            clearRect: jest.fn(),
            drawImage: jest.fn(),
            fillRect: jest.fn(),
            strokeRect: jest.fn(),
            fillText: jest.fn(),
        };
        canvasMock.getContext = jest.fn().mockReturnValue(ctxMock);
        game = new Game('canvas1', 800, 800, null, null, null, enemy);
    });

    it('should initialize with correct properties', () => {
        expect(game.canvas).toBe(canvasMock);
        expect(game.ctx).toBe(ctxMock);
        expect(game.CANVAS_WIDTH).toBe(800);
        expect(game.CANVAS_HEIGHT).toBe(800);
        expect(game.enemiesUpdated).toBe(null);
        expect(game.namePlayer).toBe(null);
        expect(game.lastHit).toBe(null);
        expect(game.enemy).toBe(enemy);
    });

    it('should draw enemies correctly', () => {
        game.enemies = [
            new Bee('Worker', 100, 50, 10, 'worker.png', game, 100, 200),
            new Bee('Drone', 100, 50, 10, 'drone.png', game, 200, 300)
        ];
        game.enemies.forEach(bee => bee.loaded = true);
        game.drawEnemies();
        expect(ctxMock.clearRect).toHaveBeenCalledWith(0, 0, 800, 1000);
        expect(ctxMock.drawImage).toHaveBeenCalledTimes(2);
        expect(ctxMock.fillRect).toHaveBeenCalled();
        expect(ctxMock.strokeRect).toHaveBeenCalled();
        expect(ctxMock.fillText).toHaveBeenCalled();
    });

    it('should validate positions correctly', () => {
        game.enemies = [
            new Bee('Worker', 100, 50, 10, 'worker.png', game, 100, 200)
        ];
        expect(game.isPositionValid(200, 300)).toBe(true);
        expect(game.isPositionValid(100, 200)).toBe(false);
    });

    it('should return a valid random position', () => {
        game.enemies = [
            new Bee('Worker', 100, 50, 10, 'worker.png', game, 100, 200)
        ];
        const position = game.getRandomPosition();
        expect(game.isPositionValid(position.x, position.y)).toBe(true);
    });

    it('should clear last hit information', () => {
        document.getElementById('last_hit').innerHTML = 'Last hit info';
        game.clearLastHeat();
        expect(document.getElementById('last_hit').innerHTML).toBe('');
    });

    it('should check if the queen bee is killed', () => {
        game.enemies = [
            new Bee('Queen', 100, 0, 10, 'queen.png', game, 100, 200),
            new Bee('Worker', 100, 50, 10, 'worker.png', game, 200, 300)
        ];
        expect(game.checkQueenKilled()).toBe(true);
        expect(game.enemies.length).toBe(0);
    });

    it('should start the game correctly', () => {
        game.start();
        expect(game.enemies.length).toBeGreaterThan(0);
        expect(document.querySelector('.wrapper_bottom_buttons').style.display).toBe('block');
    });

    it('should save player name correctly', () => {
        document.querySelector('.input-name').value = 'Player1';
        game.savePlayerName();
        expect(localStorage.getItem('playerName')).toBe('Player1');
        expect(document.getElementById('player_name').textContent).toBe('Player1');
        expect(document.querySelector('.input-name').style.display).toBe('none');
        expect(document.getElementById('save_name').style.display).toBe('none');
    });

    it('should save game state correctly', () => {
        game.enemies = [
            new Bee('Worker', 100, 50, 10, 'worker.png', game, 100, 200)
        ];
        game.saveGameState(game.enemies, 'Worker', 10);
        const savedState = JSON.parse(localStorage.getItem('gameState'));
        expect(savedState.playerName).toBe('');
        expect(savedState.enemies.length).toBe(1);
        expect(savedState.lastHit.type).toBe('Worker');
        expect(savedState.lastHit.damage).toBe(10);
    });
});