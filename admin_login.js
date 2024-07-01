function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === 'adm' && password === 'adm123') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'DashboardAD.html';
    } else {
        errorMessage.textContent = 'Invalid credentials. Please try again.';
        errorMessage.style.display = 'block';
    }
}
