document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(currentUser));
        if (user && user.reviews) {
            user.reviews.forEach((review, index) => renderReview(review, index));
        }
    }

    const reviewGameInput = document.getElementById('reviewGame');
    const suggestionsList = document.getElementById('suggestions');

    reviewGameInput.addEventListener('input', function() {
        const query = reviewGameInput.value;
        if (query.length > 2) {
            fetch(`https://api.rawg.io/api/games?key=9fa7ef1b92634c39ad1f407e41de0ca3&search=${query}`)
                .then(response => response.json())
                .then(data => {
                    suggestionsList.innerHTML = '';
                    data.results.forEach(game => {
                        const suggestionItem = document.createElement('li');
                        suggestionItem.textContent = game.name;
                        suggestionItem.addEventListener('click', function() {
                            reviewGameInput.value = game.name;
                            suggestionsList.innerHTML = '';
                        });
                        suggestionsList.appendChild(suggestionItem);
                    });
                })
                .catch(error => console.error('Error fetching games:', error));
        } else {
            suggestionsList.innerHTML = '';
        }
    });
});

function addReview() {
    const gameName = document.getElementById('reviewGame').value;
    const reviewText = document.getElementById('reviewText').value;
    const reviewRating = document.getElementById('reviewRating').value;

    if (gameName && reviewText && reviewRating) {
        const review = {
            game: gameName,
            text: reviewText,
            rating: reviewRating
        };

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(localStorage.getItem(currentUser));
            if (!user.reviews) {
                user.reviews = [];
            }
            user.reviews.push(review);
            localStorage.setItem(currentUser, JSON.stringify(user));
            renderReview(review, user.reviews.length - 1);

            document.getElementById('addReviewForm').reset();
        } else {
            alert('Você precisa estar logado para adicionar uma review.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function renderReview(review, index) {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-card');

    reviewElement.innerHTML = `
        <h3>${review.game}</h3>
        <p>${review.text}</p>
        <p class="rating">Nota: ${review.rating}/10</p>
        <button onclick="removeReview(${index})">Excluir</button>
    `;

    document.getElementById('reviewsList').appendChild(reviewElement);
}

function removeReview(index) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(currentUser));
        if (user && user.reviews) {
            user.reviews.splice(index, 1);
            localStorage.setItem(currentUser, JSON.stringify(user));
            location.reload(); // Recarrega a página para atualizar a lista de reviews
        }
    }
}