global.Image = class {
    constructor() {
        this.onload = jest.fn();
        this.src = '';
    }
};
import { Bee } from '../src/classes/bee.js';

describe('Bee class', () => {
    let gameMock;
    let ctxMock;

    beforeEach(() => {
        gameMock = {
            drawEnemies: jest.fn(),
        };
        ctxMock = {
            fillStyle: '',
            fillRect: jest.fn(),
            strokeStyle: '',
            strokeRect: jest.fn(),
            font: '',
            fillText: jest.fn(),
        };
    });

    it('should initialize with correct properties', () => {
        const bee = new Bee('Worker', 100, 50, 10, 'worker.png', gameMock, 100, 200);
        expect(bee.type).toBe('Worker');
        expect(bee.maxHealth).toBe(100);
        expect(bee.health).toBe(50);
        expect(bee.hitDamage).toBe(10);
        expect(bee.x).toBe(100);
        expect(bee.y).toBe(200);
        expect(bee.color).toBe('green');
        expect(bee.borderColor).toBe('black');
        expect(bee.textColor).toBe('black');
    });

    it('should call drawEnemies when image is loaded', () => {
        const bee = new Bee('Worker', 100, 50, 10, 'worker.png', gameMock, 100, 200);
        bee.image.onload();
        expect(gameMock.drawEnemies).toHaveBeenCalled();
    });

    it('should draw health bar correctly', () => {
        const bee = new Bee('Worker', 100, 50, 10, 'worker.png', gameMock, 100, 200);
        bee.drawHealthBar(ctxMock);
        expect(ctxMock.fillRect).toHaveBeenCalledWith(100, 190, 50, 5);
        expect(ctxMock.fillRect).toHaveBeenCalledWith(100, 190, 25, 5);
        expect(ctxMock.strokeRect).toHaveBeenCalledWith(100, 190, 50, 5);
        expect(ctxMock.fillText).toHaveBeenCalledWith('50%', 155, 195);
    });

    it('should draw type correctly', () => {
        const bee = new Bee('Worker', 100, 50, 10, 'worker.png', gameMock, 100, 200);
        bee.drawType(ctxMock);
        expect(ctxMock.fillText).toHaveBeenCalledWith('Worker', 100, 175);
    });

    it('should change border color', () => {
        const bee = new Bee('Worker', 100, 50, 10, 'worker.png', gameMock, 100, 200);
        bee.changeBorderColor('red');
        expect(bee.borderColor).toBe('red');
    });

    it('should change text color', () => {
        const bee = new Bee('Worker', 100, 50, 10, 'worker.png', gameMock, 100, 200);
        bee.changeTextColor('blue');
        expect(bee.textColor).toBe('blue');
    });
});