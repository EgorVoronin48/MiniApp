<!DOCTYPE html>
<html>
<head>
    <title>🎡 Рулетка</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        body { font-family: Arial; text-align: center; }
        #wheel {
            width: 200px;
            height: 200px;
            margin: 20px auto;
            border: 3px solid #333;
            border-radius: 50%;
            transition: transform 3s ease-out;
        }
        button { padding: 10px 20px; font-size: 16px; }
    </style>
</head>
<body>
    <h1>🎡 Рулетка</h1>
    <div id="wheel"></div>
    <button onclick="spin()">Крутить!</button>
    <p id="result"></p>

    <script>
        function spin() {
            const wheel = document.getElementById("wheel");
            const result = document.getElementById("result");

            // Анимация вращения
            wheel.style.transform = "rotate(3600deg)";

            // Рандомный результат (1-36)
            setTimeout(() => {
                const num = Math.floor(Math.random() * 36) + 1;
                result.textContent = `Выпало: ${num}`;

                // Отправляем результат в бота (если нужно)
                if (Telegram.WebApp.initDataUnsafe?.user) {
                    Telegram.WebApp.sendData(JSON.stringify({
                        user_id: Telegram.WebApp.initDataUnsafe.user.id,
                        game: "roulette",
                        result: num
                    }));
                }
            }, 3000);
        }
    </script>
</body>
</html>