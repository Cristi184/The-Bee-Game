export function saveGameState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
}

export function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : null;
}