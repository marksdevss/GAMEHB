function showAddProfilePopup() {
    document.getElementById('addProfilePopup').style.display = 'block';
}

function hideAddProfilePopup() {
    document.getElementById('addProfilePopup').style.display = 'none';
}

function addNewProfile() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const avatarFile = document.getElementById('newAvatar').files[0];

    if (username && password && avatarFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const avatar = event.target.result;
            const newUser = {
                username,
                password,
                avatar
            };

            // Salva o novo usuário no localStorage
            localStorage.setItem(`user_${username}`, JSON.stringify(newUser));
            addProfileToDropdown(username);

            // Fecha o pop-up
            hideAddProfilePopup();

            // Limpa o formulário
            document.getElementById('addProfileForm').reset();
        };
        reader.readAsDataURL(avatarFile);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function addProfileToDropdown(username) {
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    if (!profiles.some(profile => profile.username === username)) {
        profiles.push({ username });
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }
    populateProfileSelector();
}
