document.addEventListener('DOMContentLoaded', function() {
    loadGroups();
});

async function loadGroups() {
    try {
        const response = await fetch('http://localhost:3000/groups');
        const groups = await response.json();
        const groupsList = document.getElementById('groupsList');
        groupsList.innerHTML = '';

        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.classList.add('group-card');
            groupCard.innerHTML = `
                <h2>${group.name}</h2>
                <p>${group.description}</p>
                <button onclick="joinGroup('${group.name}')">Entrar no Grupo</button>
            `;
            groupsList.appendChild(groupCard);
        });
    } catch (error) {
        console.error('Erro ao carregar grupos:', error);
    }
}

function showCreateGroupPopup() {
    document.getElementById('createGroupPopup').style.display = 'flex';
}

function hideCreateGroupPopup() {
    document.getElementById('createGroupPopup').style.display = 'none';
}

async function createGroup() {
    const groupName = document.getElementById('groupName').value;
    const groupDescription = document.getElementById('groupDescription').value;

    if (!groupName || !groupDescription) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: groupName, description: groupDescription })
        });

        if (response.ok) {
            hideCreateGroupPopup();
            loadGroups();
        } else {
            alert('Erro ao criar grupo.');
        }
    } catch (error) {
        console.error('Erro ao criar grupo:', error);
    }
}

async function joinGroup(groupName) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Você precisa estar logado para se juntar a um grupo.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/groups/${groupName}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: currentUser })
        });

        if (response.ok) {
            alert(`Você se juntou ao grupo ${groupName}.`);
        } else {
            alert('Erro ao entrar no grupo.');
        }
    } catch (error) {
        console.error('Erro ao entrar no grupo:', error);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
