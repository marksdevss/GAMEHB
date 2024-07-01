document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.getElementById('chatBubble');
    const chatPopup = document.getElementById('chatPopup');
    const chatWindow = document.getElementById('chatWindow');
    const textInput = document.getElementById('textInput');
    const fileInput = document.getElementById('fileInput');
    const sendButton = document.getElementById('sendButton');
    const userList = document.getElementById('userList');
    const chatHeader = document.getElementById('chatHeader');

    let currentChatUser = null;

    const users = ['User1', 'User2', 'User3']; // Lista de usuários fictícios

    users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        userElement.addEventListener('click', () => {
            selectUser(user);
        });
        userList.appendChild(userElement);
    });

    chatBubble.addEventListener('click', () => {
        chatPopup.style.display = chatPopup.style.display === 'none' ? 'block' : 'none';
    });

    sendButton.addEventListener('click', sendMessage);
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function selectUser(user) {
        currentChatUser = user;
        chatHeader.textContent = `Conversando com ${user}`;
        loadMessages(user);
    }

    function sendMessage() {
        if (!currentChatUser) {
            alert('Por favor, selecione um usuário para conversar.');
            return;
        }

        const text = textInput.value.trim();
        const file = fileInput.files[0];

        if (text) {
            displayMessage(text, 'text');
            saveMessage(currentChatUser, { type: 'text', content: text });
            textInput.value = '';
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileType = file.type.split('/')[0];
                const content = e.target.result;
                displayMessage(content, fileType);
                saveMessage(currentChatUser, { type: fileType, content });
                fileInput.value = '';
            };
            reader.readAsDataURL(file);
        }
    }

    function displayMessage(content, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');

        if (type === 'text') {
            messageElement.textContent = content;
        } else if (type === 'image') {
            const img = document.createElement('img');
            img.src = content;
            messageElement.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = content;
            video.controls = true;
            messageElement.appendChild(video);
        } else if (type === 'audio') {
            const audio = document.createElement('audio');
            audio.src = content;
            audio.controls = true;
            messageElement.appendChild(audio);
        }

        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function saveMessage(user, message) {
        const chatKey = `chat_${user}`;
        const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
        messages.push(message);
        localStorage.setItem(chatKey, JSON.stringify(messages));
    }

    function loadMessages(user) {
        chatWindow.innerHTML = '';
        const chatKey = `chat_${user}`;
        const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
        messages.forEach(message => {
            displayMessage(message.content, message.type);
        });
    }
});