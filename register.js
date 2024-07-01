function registerUser() {
    const newUsername = document.querySelector('input[name="newUsername"]').value;
    const newPassword = document.querySelector('input[name="newPassword"]').value;
    const fileUpload = document.getElementById('fileUpload').files[0];

    if (newUsername && newPassword && fileUpload) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const avatar = event.target.result;
            const user = {
                username: newUsername,
                password: newPassword,
                avatar: avatar,
                games: [] 
            };

            localStorage.setItem(`user_${newUsername}`, JSON.stringify(user));
            alert('Usuário registrado com sucesso!');
            window.location.href = 'Login.html';
        };
        reader.readAsDataURL(fileUpload);
    } else {
        alert('Por favor, preencha todos os campos e faça o upload de uma imagem.');
    }
}
