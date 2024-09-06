import { Bee } from './bee.js';
import { Hit } from './hit.js';

export class Game {
    constructor(canvasId, width, height, enemiesUpdated, namePlayer, lastHit, enemy) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.CANVAS_WIDTH = width;
        this.CANVAS_HEIGHT = height;
        this.enemiesUpdated = enemiesUpdated;
        this.namePlayer = namePlayer;
        this.lastHit = lastHit;
        this.enemy = enemy; // Store the enemy array
    }

    drawEnemies() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.enemies.forEach(enemy => {
            if (enemy.loaded) {
                this.ctx.drawImage(enemy.image, enemy.x, enemy.y, 50, 50);
                enemy.drawHealthBar(this.ctx);
                enemy.drawType(this.ctx); // Draw the type of the bee
            }
        });
    }

    isPositionValid(x, y) {
        return !this.enemies.some(enemy => {
            const dx = enemy.x - x;
            const dy = enemy.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < 100; // Assuming 50 is the width/height of the enemy
        });
    }

    getRandomPosition() {
        let x, y;
        do {
            x = Math.random() * (this.CANVAS_WIDTH - 50);
            y = 200 + Math.random() * (this.CANVAS_HEIGHT - 400);
        } while (!this.isPositionValid(x, y));
        return { x, y };
    }


    clearLastHeat() {
        const last_hit = document.getElementById('last_hit');
        last_hit.innerHTML = '';

    }

    checkQueenKilled() {
        const queenKilled = !this.enemies.some(enemy => enemy.type.toLowerCase() === "queen" && enemy.health > 0);
        if (queenKilled) {
            this.enemies = []; // Clear the enemies array
            document.getElementById('player_name').textContent = '';
            document.querySelector('.input-name').value = ''; // Clear the input field
            this.clearLastHeat();
        }
        return queenKilled;
    }

    start() {
        this.enemies = [];
        const allEnemies = this.enemiesUpdated ? [...this.enemiesUpdated] : this.enemy; // Use this.enemy
        const enemyMap = new Map(this.enemy.map(e => [e.type, e])); // Use this.enemy

        allEnemies.forEach(e => {
            const enemyData = enemyMap.get(e.type);
            if (enemyData) {
                for (let i = 0; i < (e.number || 1); i++) {
                    const { x, y } = this.getRandomPosition();
                    this.enemies.push(new Bee(e.type, enemyData.health, e.health, e.hit_damage, `src/assets/${e.type.toLowerCase()}.png`, this, e.x ? e.x : x, e.y ? e.y : y));
                }
            }
        });

        const savedPlayerName = localStorage.getItem('playerName');
        if (savedPlayerName) {
            document.getElementById('player_name').textContent = savedPlayerName;
            document.querySelector('.input-name').style.display = 'none';
            document.getElementById('save_name').style.display = 'none';
        }

        new Hit(this);
        document.querySelector('.wrapper_bottom_buttons').style.display = 'block';
    }
    savePlayerName() {
        if (!this.namePlayer) {
            const playerNameInput = document.querySelector('.input-name').value;
            if (playerNameInput.trim() === '') {
                alert('Please enter a player name to start the game.');
                return;
            }
            document.getElementById('player_name').textContent = playerNameInput;
            localStorage.setItem('playerName', playerNameInput); // Save player name to localStorage
        }
        // Hide the input-name and save_name button
        document.querySelector('.input-name').style.display = 'none';
        document.getElementById('save_name').style.display = 'none';

        this.start();
    }
    saveGameState(enemy,type,damage) {
        const state = {
            playerName: document.getElementById('player_name').textContent,
            enemies:enemy,
            lastHit: {type:type, damage:damage}
        };
        localStorage.setItem('gameState', JSON.stringify(state));
    }
}