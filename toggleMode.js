document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleModeButton');
    const body = document.body;

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');

        const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('mode', mode);
    });

    const savedMode = localStorage.getItem('mode') || 'light';
    body.classList.add(savedMode + '-mode');
});
