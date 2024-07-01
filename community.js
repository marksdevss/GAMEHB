document.addEventListener('DOMContentLoaded', function() {
    loadSuggestions();
    loadPosts();
});

async function loadSuggestions() {
    try {
        const response = await fetch('http://localhost:3000/suggestions');
        const suggestions = await response.json();
        const communitySuggestions = document.getElementById('communitySuggestions');
        communitySuggestions.innerHTML = '';

        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('suggestion-card');
            suggestionElement.innerHTML = `
                <p>${suggestion.type === 'community' ? 'Comunidade' : 'Usuário'}: ${suggestion.name}</p>
                <button onclick="followSuggestion('${suggestion.name}', '${suggestion.type}')">Seguir</button>
            `;
            communitySuggestions.appendChild(suggestionElement);
        });
    } catch (error) {
        console.error('Erro ao carregar sugestões:', error);
    }
}

function followSuggestion(name, type) {
    alert(`Seguindo ${type === 'community' ? 'Comunidade' : 'Usuário'}: ${name}`);
}

async function createPost() {
    const postContent = document.getElementById('postContent').value;
    const postLink = document.getElementById('postLink').value;
    const postImage = document.getElementById('postImage').files[0];
    const postVideo = document.getElementById('postVideo').files[0];

    if (!postContent && !postLink && !postImage && !postVideo) {
        alert('Por favor, escreva algo ou adicione uma mídia.');
        return;
    }

    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('link', postLink);
    if (postImage) formData.append('image', postImage);
    if (postVideo) formData.append('video', postVideo);
    formData.append('author', localStorage.getItem('currentUser') || 'Anônimo');

    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.getElementById('createPostForm').reset();
            await loadPosts(); // Atualizar a lista de postagens em tempo real
        } else {
            alert('Erro ao criar postagem.');
        }
    } catch (error) {
        console.error('Erro ao criar postagem:', error);
    }
}

async function loadPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts');
        const posts = await response.json();
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <h3>${post.author}</h3>
                <p>${post.content}</p>
                ${post.link ? `<a href="${post.link}" target="_blank">${post.link}</a>` : ''}
                ${post.image ? `<img src="${post.image}" alt="Imagem da postagem">` : ''}
                ${post.video ? `<video src="${post.video}" controls></video>` : ''}
            `;
            postsContainer.appendChild(postCard);
        });
    } catch (error) {
        console.error('Erro ao carregar postagens:', error);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
