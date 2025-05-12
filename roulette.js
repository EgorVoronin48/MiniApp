document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const resultEl = document.getElementById('result');
    
    // Инициализация рулетки
    const initWheel = () => {
        const sections = 36;
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];
        
        for (let i = 0; i < sections; i++) {
            const section = document.createElement('div');
            section.className = 'wheel-section';
            section.style.transform = `rotate(${(360 / sections) * i}deg)`;
            section.style.backgroundColor = colors[i % colors.length];
            
            const number = document.createElement('div');
            number.textContent = i + 1;
            number.style.transform = `rotate(${(360 / sections) * i + 90}deg)`;
            section.appendChild(number);
            
            wheel.appendChild(section);
        }
    };

    // Функция вращения
    const spinWheel = () => {
        spinBtn.disabled = true;
        resultEl.textContent = '';
        
        const sections = 36;
        const spins = 5;
        const sectionAngle = 360 / sections;
        const winningSection = Math.floor(Math.random() * sections);
        const degrees = spins * 360 + (winningSection * sectionAngle);
        
        wheel.style.transform = `rotate(${-degrees}deg)`;
        
        setTimeout(() => {
            spinBtn.disabled = false;
            resultEl.textContent = `Выпало: ${winningSection + 1}`;
            sendToTelegram(winningSection + 1);
        }, 3000);
    };

    // Отправка результата в Telegram
    const sendToTelegram = (result) => {
        if (Telegram.WebApp.initDataUnsafe?.user) {
            Telegram.WebApp.sendData(JSON.stringify({
                user_id: Telegram.WebApp.initDataUnsafe.user.id,
                game: 'roulette',
                result: result
            }));
        }
    };

    // Инициализация
    initWheel();
    spinBtn.addEventListener('click', spinWheel);
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
});
