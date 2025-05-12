<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎡 Рулетка</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .wheel-container {
            position: relative;
            width: 300px;
            height: 300px;
            margin: 30px auto;
        }
        #wheel {
            width: 100%;
            height: 100%;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            transition: transform 4s cubic-bezier(0.17, 0.67, 0.21, 0.99);
            transform: rotate(0deg);
        }
        .wheel-section {
            position: absolute;
            width: 50%;
            height: 50%;
            transform-origin: 100% 100%;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        .pointer {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 30px solid #e74c3c;
            z-index: 10;
        }
        #spin-btn {
            background-color: #2ecc71;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 18px;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 20px;
            font-weight: bold;
        }
        #result {
            margin-top: 20px;
            font-size: 24px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🎡 Игровая Рулетка</h1>
    <div class="wheel-container">
        <div class="pointer"></div>
        <div id="wheel"></div>
    </div>
    <button id="spin-btn">Крутить!</button>
    <div id="result"></div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const wheel = document.getElementById('wheel');
            const spinBtn = document.getElementById('spin-btn');
            const resultEl = document.getElementById('result');
            let isSpinning = false;
            
            // Цвета для секций
            const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];
            const sections = 36;
            
            // Создаем секции рулетки
            function createWheel() {
                for (let i = 0; i < sections; i++) {
                    const section = document.createElement('div');
                    section.className = 'wheel-section';
                    section.style.transform = `rotate(${(360 / sections) * i}deg)`;
                    section.style.backgroundColor = colors[i % colors.length];
                    
                    const number = document.createElement('div');
                    number.textContent = i + 1;
                    number.style.transform = 'rotate(45deg)';
                    number.style.marginLeft = '40px';
                    number.style.marginBottom = '40px';
                    
                    section.appendChild(number);
                    wheel.appendChild(section);
                }
            }
            
            // Функция вращения
            function spin() {
                if (isSpinning) return;
                
                isSpinning = true;
                spinBtn.disabled = true;
                resultEl.textContent = '';
                
                // Вычисляем случайный результат
                const winningSection = Math.floor(Math.random() * sections);
                const degrees = 360 * 5 + (winningSection * (360 / sections));
                
                // Вращаем рулетку
                wheel.style.transform = `rotate(-${degrees}deg)`;
                
                // По завершении анимации
                setTimeout(() => {
                    isSpinning = false;
                    spinBtn.disabled = false;
                    resultEl.textContent = `Выпало: ${winningSection + 1}`;
                    
                    // Отправляем результат в Telegram
                    if (Telegram.WebApp.initDataUnsafe?.user) {
                        Telegram.WebApp.sendData(JSON.stringify({
                            user_id: Telegram.WebApp.initDataUnsafe.user.id,
                            game: 'roulette',
                            result: winningSection + 1
                        }));
                    }
                }, 4000);
            }
            
            // Инициализация
            createWheel();
            spinBtn.addEventListener('click', spin);
            
            // Настройка Telegram WebApp
            Telegram.WebApp.expand();
            Telegram.WebApp.enableClosingConfirmation();
        });
    </script>
</body>
</html>
