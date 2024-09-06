export class Bee {
    constructor(type,maxHealth,  health, hitDamage, imageSrc, game,x ,y) {
        this.maxHealth = maxHealth; // Store the maximum health
        this.health = health;
        this.hitDamage = hitDamage;
        this.type = type;
        this.image = new Image();
        this.image.src = imageSrc;
        this.x =  x;
        this.y = y;
        this.color = 'green'; // Default color for health bar
        this.borderColor = 'black'; // Default border color
        this.textColor = 'black'; // Default text color

        this.image.onload = () => {
            this.loaded = true;
            game.drawEnemies();
        };
    }

    drawHealthBar(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, 50, 5);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - 10, 50 * (this.health / this.maxHealth), 5); // Use maxHealth for percentage
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y - 10, 50, 5);
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        ctx.fillText(`${Math.round((this.health / this.maxHealth) * 100)}%`, this.x + 55, this.y - 5); // Display percentage
    }

    drawType(ctx) {
        ctx.fillStyle = this.textColor;
        ctx.font = '12px Arial';
        ctx.fillText(this.type, this.x, this.y - 25); // Display type above the health percentage
    }

    changeBorderColor(newColor) {
        this.borderColor = newColor;
    }

    changeTextColor(newColor) {
        this.textColor = newColor;
    }
}