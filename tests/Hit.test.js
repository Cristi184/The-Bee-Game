import { Hit } from '../src/classes/hit.js';
import { Game } from '../src/classes/game.js';
import { Bee } from '../src/classes/bee.js';
import { enemy } from '../src/data/enemyData.js';

describe('Hit class', () => {
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
        game = new Game('canvas1', 800, 1000, null, null, null, enemy);

        // Mock window.alert
        jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('should initialize Hit class correctly', () => {
        const addEventListenerSpy = jest.spyOn(document.getElementById('hit'), 'addEventListener');
        const hit = new Hit(game);
        expect(hit.game).toBe(game);
        expect(addEventListenerSpy).toHaveBeenCalled();
    });


    it('should remove bee when health is zero', () => {
        game.enemies = [
            new Bee('Worker', 100, 10, 10, 'worker.png', game, 100, 200)
        ];
        const hit = new Hit(game);
        hit.applyRandomDamage();
        expect(game.enemies.length).toBe(0);
    });

    it('should handle queen bee killed scenario', () => {
        game.enemies = [
            new Bee('Queen', 100, 0, 10, 'queen.png', game, 100, 200)
        ];
        const hit = new Hit(game);
        hit.applyRandomDamage();
        expect(window.alert).toHaveBeenCalledWith('Game Over! The Queen bee is killed.');
        expect(document.querySelector('.input-name').style.display).toBe('block');
        expect(document.getElementById('save_name').style.display).toBe('block');
        expect(document.querySelector('.wrapper_bottom_buttons').style.display).toBe('none');
    });

    it('should update last hit information correctly', () => {
        const hit = new Hit(game);
        hit.updateLastHit('Worker', 10);
        expect(document.getElementById('last_hit').textContent).toBe('Last hit: Worker bee with 10 damage');
    });
});