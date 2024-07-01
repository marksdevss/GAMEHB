document.addEventListener('DOMContentLoaded', function() {
    populateProfileSelector();
    loadUserGames();
    loadUserProfile();
});

function populateProfileSelector() {
    const profileSelector = document.getElementById('profileSelector');
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profileSelector.innerHTML = '';

    profiles.forEach(profile => {
        const option = document.createElement('option');
        option.value = profile.username;
        option.textContent = profile.username;
        profileSelector.appendChild(option);
    });

    // Seleciona o perfil atual
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        profileSelector.value = currentUser;
        loadUserProfile();
    }
}

function switchProfile() {
    const profileSelector = document.getElementById('profileSelector');
    const selectedProfile = profileSelector.value;
    localStorage.setItem('currentUser', selectedProfile);
    loadUserProfile();
    loadUserGames();
}

function loadUserProfile() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(`user_${currentUser}`));
        if (user) {
            document.getElementById('userAvatar').src = user.avatar;
        }
    }
}

function loadUserGames() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userGames = JSON.parse(localStorage.getItem(`games_${currentUser}`)) || [];
        const gamesList = document.getElementById('gamesList');
        gamesList.innerHTML = '';
        userGames.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.classList.add('game-card');
            gameElement.innerHTML = `
                <h2>${game.name}</h2>
                <img src="${game.background_image}" alt="${game.name}">
                <p>Released: ${game.released}</p>
                <p>Rating: ${game.rating}</p>
            `;
            gamesList.appendChild(gameElement);
        });
    }
}

function redirectToProfile() {
    window.location.href = 'Profile.html';
}
