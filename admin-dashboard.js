document.addEventListener('DOMContentLoaded', function() {
    const activeUsersCtx = document.getElementById('activeUsersChart').getContext('2d');
    const postsByCategoryCtx = document.getElementById('postsByCategoryChart').getContext('2d');
    const userTrafficCtx = document.getElementById('userTrafficChart').getContext('2d');

    // Obtém dados reais do localStorage
    const users = getUsersData();
    const posts = getPostsData();
    const traffic = getTrafficData();

    // Gráfico de Usuários Ativos
    const activeUsersChart = new Chart(activeUsersCtx, {
        type: 'pie',
        data: {
            labels: users.labels,
            datasets: [{
                label: 'Usuários Ativos',
                data: users.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Gráfico de Postagens por Categoria
    const postsByCategoryChart = new Chart(postsByCategoryCtx, {
        type: 'bar',
        data: {
            labels: posts.labels,
            datasets: [{
                label: 'Postagens por Categoria',
                data: posts.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Tráfego de Usuários
    const userTrafficChart = new Chart(userTrafficCtx, {
        type: 'line',
        data: {
            labels: traffic.labels,
            datasets: [{
                label: 'Tráfego de Usuários',
                data: traffic.data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
        }
    });
});

function logout() {
    // Lógica para deslogar o administrador
    alert('Deslogado com sucesso!');
    window.location.href = 'login.html';
}

function getUsersData() {
    // Suponha que os dados do usuário estão armazenados no localStorage como um array de objetos
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const labels = users.map(user => user.username);
    const data = users.map(user => user.isActive ? 1 : 0); // Exemplo simples, altere conforme necessário

    return { labels, data };
}

function getPostsData() {
    // Suponha que os dados das postagens estão armazenados no localStorage como um array de objetos
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const categories = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4']; // Categorias de exemplo
    const data = categories.map(category => posts.filter(post => post.category === category).length);

    return { labels: categories, data };
}

function getTrafficData() {
    // Suponha que os dados de tráfego estão armazenados no localStorage como um array de objetos
    const traffic = JSON.parse(localStorage.getItem('traffic')) || [];
    const labels = traffic.map(entry => entry.date);
    const data = traffic.map(entry => entry.visits);

    return { labels, data };
}
