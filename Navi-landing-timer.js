(function() {
            // Функция для добавления ведущих нулей
            function pad(num) {
                return ("0" + num).slice(-2);
            }

            // Функция для расчета следующего вторника в 9:00 по Парижу
            function getNextTuesdayParis9AM() {
                const now = new Date();

                // Определяем часовой пояс Парижа
                const parisTime = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Europe/Paris',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                }).formatToParts(now);

                const year = parisTime.find(part => part.type === 'year').value;
                const month = parisTime.find(part => part.type === 'month').value;
                const day = parisTime.find(part => part.type === 'day').value;
                const hour = parisTime.find(part => part.type === 'hour').value;
                const minute = parisTime.find(part => part.type === 'minute').value;
                const second = parisTime.find(part => part.type === 'second').value;

                // Создаем объект даты в часовой зоне Парижа
                const parisDate = new Date(`${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}+01:00`);

                // Находим следующий вторник
                const dayOfWeek = parisDate.getDay(); // Воскресенье - 0, понедельник -1, ..., суббота -6
                const daysUntilTuesday = (2 - dayOfWeek + 7) % 7 || 7; // Если сегодня вторник, берем следующий
                parisDate.setDate(parisDate.getDate() + daysUntilTuesday);
                parisDate.setHours(9, 0, 0, 0); // Устанавливаем время на 9:00

                return parisDate;
            }

            // Функция для установки даты начала курса
            function setStartDate() {
                const startDateElement = document.getElementById('start_date');
                const targetDate = getNextTuesdayParis9AM();

                // Форматируем дату в формате 'dd.mm.yyyy'
                const day = pad(targetDate.getDate());
                const month = pad(targetDate.getMonth() + 1);
                const year = targetDate.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                startDateElement.textContent = formattedDate;

                return targetDate;
            }

            // Функция для обновления таймера
            function updateTimer(targetDate) {
                const now = new Date();
                const timeUntilStart = targetDate - now;

                if (timeUntilStart <= 0) {
                    document.getElementById('Y_timer_div').innerHTML = "<span>Курс уже начался!</span>";
                    clearInterval(timerInterval);
                    return;
                }

                const totalSeconds = Math.floor(timeUntilStart / 1000);
                const days = Math.floor(totalSeconds / (3600 * 24));
                const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                // Обновляем элементы
                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = pad(hours);
                document.getElementById('minutes').textContent = pad(minutes);
                document.getElementById('seconds').textContent = pad(seconds);
            }

            // Инициализация таймера
            let timerInterval;
            function initTimer() {
                const targetDate = setStartDate();

                // Обновлять таймер каждую секунду
                timerInterval = setInterval(() => updateTimer(targetDate), 1000);
                updateTimer(targetDate);
            }

            // Настройка IntersectionObserver для инициализации таймера при появлении элемента в зоне видимости
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initTimer();
                        observer.disconnect();
                    }
                });
            }, {
                threshold: 0.1
            });

            // Начало наблюдения за элементом таймера
            const timerElement = document.getElementById('Y_timer_div');
            if (timerElement) {
                observer.observe(timerElement);
            } else {
                // Если элемент не найден, инициализировать таймер сразу
                initTimer();
            }
        })();
