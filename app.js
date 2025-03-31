// app.js
console.log('=== DEBUG START ===');

// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    console.log('Telegram WebApp detected');
    tg.ready();
    tg.expand();
} else {
    console.log('Regular browser mode');
}

// Хранилище с обработкой ошибок
const storage = {
    get: (key) => {
        try {
            return localStorage.getItem(key);
        } catch(e) {
            console.error('Storage get error:', e);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch(e) {
            console.error('Storage set error:', e);
        }
    }
};

// Основная логика
function initApp() {
    console.log('Initializing app...');
    
    let score = parseInt(storage.get('score')) || 0;
    const scoreElement = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');

    if (!scoreElement || !clickButton) {
        console.error('Critical DOM elements missing!');
        return;
    }

    scoreElement.textContent = score;

    const handleClick = () => {
        score++;
        scoreElement.textContent = score;
        storage.set('score', score.toString());
        
        scoreElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 100);
    };

    // Универсальные обработчики
    clickButton.addEventListener('click', handleClick);
    clickButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleClick();
    });
}

// Запуск приложения
if (document.readyState === 'complete') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}