let currentMovieId = null;
let selectedRating = 10;
let isLoginMode = true;

function toggleAuth() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? 'Вход' : 'Регистрация';
    document.getElementById('regFields').classList.toggle('auth-hidden');
}

function goToProfile() {
    localStorage.getItem('token') ? window.location.href = 'profile.html' : showAuth();
}

function showAuth() {
    document.getElementById('homeSection').classList.add('auth-hidden');
    document.getElementById('authSection').classList.remove('auth-hidden');
}

async function handleAuth() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPass').value;
    const username = document.getElementById('regName').value;
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password, username })
    });
    const data = await res.json();
    if(res.ok) {
        if(isLoginMode) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'index.html';
        } else { alert("Зарегистрировано! Теперь войдите."); toggleAuth(); }
    } else alert(data.message);
}

async function loadMovies() {
    const res = await fetch('/api/movies');
    const movies = await res.json();
    document.getElementById('movieContainer').innerHTML = movies.map(m => `
        <div class="col-md-4">
            <div class="card movie-card h-100 shadow" onclick="openModal('${m._id}', '${m.title}', \`${m.description}\`, '${m.trailerUrl}')">
                <img src="https://img.youtube.com/vi/${getYTId(m.trailerUrl)}/mqdefault.jpg" class="card-img-top">
                <div class="card-body">
                    <h6 class="text-danger fw-bold">${m.title}</h6>
                </div>
            </div>
        </div>
    `).join('');
}

function getYTId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^#\&\?]*)/);
    return match ? match[1] : url;
}

async function openModal(id, title, desc, trailer) {
    currentMovieId = id;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('videoBox').innerHTML = `<iframe src="https://www.youtube.com/embed/${getYTId(trailer)}" allowfullscreen></iframe>`;
    
    // Записываем просмотр
    const token = localStorage.getItem('token');
    if(token) fetch(`/api/users/watch/${id}`, { method: 'POST', headers: {'x-access-token': token} });

    renderStars();
    loadReviews(id);
    new bootstrap.Modal(document.getElementById('movieModal')).show();
}

function renderStars() {
    let stars = '';
    for(let i=1; i<=10; i++) {
        stars += `<i class="bi bi-star${i <= selectedRating ? '-fill' : ''}" onclick="selectedRating=${i}; renderStars()"></i>`;
    }
    document.getElementById('starSelector').innerHTML = stars;
}

async function loadReviews(id) {
    const res = await fetch(`/api/movies/${id}/reviews`);
    const reviews = await res.json();
    document.getElementById('reviewsList').innerHTML = reviews.map(r => `
        <div class="mb-3 p-2 border-start border-danger bg-black rounded">
            <span class="user-link small" onclick="window.location.href='profile.html?id=${r.user?._id}'">${r.user?.username}</span>
            <span class="text-warning ms-2 small">${'★'.repeat(r.rating)}</span>
            <p class="mb-0 small text-secondary mt-1">${r.content}</p>
        </div>
    `).join('');
}

async function submitReview() {
    const token = localStorage.getItem('token');
    if(!token) return alert("Войдите в систему!");
    const content = document.getElementById('reviewText').value;
    await fetch(`/api/movies/${currentMovieId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify({ content, rating: selectedRating })
    });
    document.getElementById('reviewText').value = '';
    loadReviews(currentMovieId);
}

window.onload = () => {
    loadMovies();
    const u = JSON.parse(localStorage.getItem('user'));
    if(u) document.getElementById('welcomeText').innerText = `Привет, ${u.username}`;

};
