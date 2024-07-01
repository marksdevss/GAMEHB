document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(`user_${currentUser}`));
        if (user && user.games) {
            user.games.forEach((game, index) => renderGame(game, index));
        }
    }
});

function renderGame(game, index) {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game-card');

    gameElement.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.background_image}" alt="${game.name}">
        <p class="release-date">Released: ${game.released}</p>
        <p class="rating">Rating: ${game.rating}</p>
        <button onclick="removeGame(${index})">Remover</button>
    `;

    document.getElementById('gamesList').appendChild(gameElement);
}

function saveGameToLibrary(game) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(`user_${currentUser}`));
        user.games.push(game);
        localStorage.setItem(`user_${currentUser}`, JSON.stringify(user));
        renderGame(game, user.games.length - 1);
        alert(`${game.name} foi salvo na sua biblioteca!`);
    } else {
        alert('Você precisa estar logado para salvar jogos.');
    }
}

function removeGame(index) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(`user_${currentUser}`));
        user.games.splice(index, 1);
        localStorage.setItem(`user_${currentUser}`, JSON.stringify(user));
        location.reload(); // Recarrega a página para atualizar a lista de jogos
    }
}
