document.addEventListener('DOMContentLoaded', () => {
    let score = localStorage.getItem('score') || 0;
    const scoreElement = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');

    // Инициализация счета
    scoreElement.textContent = score;

    // Обработчик клика
    clickButton.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
        localStorage.setItem('score', score.toString());
        
        // Анимация
        scoreElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 100);
    });

    // Сброс анимации при касании
    clickButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        clickButton.classList.add('active');
    });
    
    clickButton.addEventListener('touchend', () => {
        clickButton.classList.remove('active');
    });
});