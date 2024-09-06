export class Hit {
    constructor(game) {
        this.game = game;
        this.init();
    }

    init() {
        if(this.game.lastHit){
            this.updateLastHit(this.game.lastHit.type, this.game.lastHit.damage)
        }
        document.getElementById('hit').addEventListener('click', () => this.applyRandomDamage());
    }

    applyRandomDamage() {
        if (this.game.enemies.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.game.enemies.length);
            const selectedBee = this.game.enemies[randomIndex];
            const hitDamage = selectedBee.hit_damage; // Use hit_damage property
            selectedBee.health = Math.max(0, selectedBee.health - selectedBee.hit_damage); // Ensure health doesn't go below 0

            // Update the last hit information
            this.updateLastHit(selectedBee.type, hitDamage);
            this.game.saveGameState(this.game.enemies,this.game.enemies[randomIndex].type, hitDamage); // Save game state after applying damage

            // Change border color and text color to red
            selectedBee.changeBorderColor('red');
            selectedBee.changeTextColor('red');
            this.game.drawEnemies();

            // Revert border color and text color back to black after 1 second
            setTimeout(() => {
                selectedBee.changeBorderColor('black');
                selectedBee.changeTextColor('black');
                this.game.drawEnemies();
            }, 1000);

            if (selectedBee.health === 0) {
                this.game.enemies.splice(randomIndex, 1); // Remove the bee from the array
            }

            if (this.game.checkQueenKilled()) {
                this.game.saveGameState(this.game.enemies);
                alert("Game Over! The Queen bee is killed.");
                document.querySelector('.input-name').style.display = 'block'; // Show input-name
                document.getElementById('save_name').style.display = 'block'; // Show save_name button
                document.querySelector('.wrapper_bottom_buttons').style.display = 'none';
            }
        }
    }

    updateLastHit(type, damage) {
        const lastHit = document.getElementById('last_hit');
        lastHit.textContent = `Last hit: ${type} bee with ${damage} damage`;
    }
}
