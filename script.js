let selectedColor = '#6A67CE';

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.getElementById('time');
    const periodElement = document.getElementById('period');
    const dateElement = document.getElementById('date');
    const dayProgressElement = document.getElementById('day-progress');
    const weekProgressElement = document.getElementById('week-progress');
    const monthProgressElement = document.getElementById('month-progress');
    const timezoneListElement = document.getElementById('timezone-list');
    const unixTimeElement = document.getElementById('unix-time');
    const dayOfYearElement = document.getElementById('day-of-year');
    const weekNumberElement = document.getElementById('week-number');
    const leapYearElement = document.getElementById('leap-year');
    const timezoneElement = document.getElementById('timezone');
    const browserTimeElement = document.getElementById('browser-time');
    const pageLoadedElement = document.getElementById('page-loaded');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');
    const daylightElement = document.getElementById('daylight');
    const daylightProgressElement = document.getElementById('daylight-progress');
    const timezoneSearchElement = document.getElementById('timezone-search');
    const hourHandElement = document.getElementById('hour-hand');
    const minuteHandElement = document.getElementById('minute-hand');
    const secondHandElement = document.getElementById('second-hand');
    const moonFillElement = document.getElementById('moon-fill');
    const moonPhaseElement = document.getElementById('moon-phase');
    const moonIlluminationElement = document.getElementById('moon-illumination');
    const moonZodiacElement = document.getElementById('moon-zodiac');
    const calendarMonthElement = document.getElementById('calendar-month');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const themeToggleElement = document.getElementById('theme-toggle');
    const formatToggleElement = document.getElementById('format-toggle');
    const secondsToggleElement = document.getElementById('seconds-toggle');
    const glowToggleElement = document.getElementById('glow-toggle');
    const colorOptions = document.querySelectorAll('.color-option');
    const customColorInput = document.getElementById('customColor');
    const resetThemeButton = document.getElementById('reset-theme');
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    const currentWeatherElement = document.getElementById('current-weather');
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmListElement = document.getElementById('alarm-list');

    let is24HourFormat = false;
    let showSeconds = true;
    let glowEffects = true;
    let isDarkTheme = true;
    let currentCalendarDate = new Date();
    let alarms = [];
    const pageLoadTime = new Date();
    let lastUpdate = 0;
    const updateInterval = 1000;

    const timezones = [
        { name: "Abu Dhabi, UAE", offset: 4, id: "Asia/Dubai" },
        { name: "Amman, Jordan", offset: 3, id: "Asia/Amman" },
        { name: "Amsterdam, Netherlands", offset: 1, id: "Europe/Amsterdam" },
        { name: "Ankara, Turkey", offset: 3, id: "Europe/Istanbul" },
        { name: "Athens, Greece", offset: 2, id: "Europe/Athens" },
        { name: "Bangkok, Thailand", offset: 7, id: "Asia/Bangkok" },
        { name: "Beijing, China", offset: 8, id: "Asia/Shanghai" },
        { name: "Berlin, Germany", offset: 1, id: "Europe/Berlin" },
        { name: "Bogota, Colombia", offset: -5, id: "America/Bogota" },
        { name: "Brasilia, Brazil", offset: -3, id: "America/Sao_Paulo" },
        { name: "Brussels, Belgium", offset: 1, id: "Europe/Brussels" },
        { name: "Buenos Aires, Argentina", offset: -3, id: "America/Argentina/Buenos_Aires" },
        { name: "Cairo, Egypt", offset: 2, id: "Africa/Cairo" },
        { name: "Canberra, Australia", offset: 10, id: "Australia/Sydney" },
        { name: "Caracas, Venezuela", offset: -4, id: "America/Caracas" },
        { name: "Dublin, Ireland", offset: 0, id: "Europe/Dublin" },
        { name: "Hanoi, Vietnam", offset: 7, id: "Asia/Bangkok" },
        { name: "Havana, Cuba", offset: -5, id: "America/Havana" },
        { name: "Helsinki, Finland", offset: 2, id: "Europe/Helsinki" },
        { name: "Islamabad, Pakistan", offset: 5, id: "Asia/Karachi" },
        { name: "Jakarta, Indonesia", offset: 7, id: "Asia/Jakarta" },
        { name: "Kabul, Afghanistan", offset: 4.5, id: "Asia/Kabul" },
        { name: "Kathmandu, Nepal", offset: 5.75, id: "Asia/Kathmandu" },
        { name: "Lima, Peru", offset: -5, id: "America/Lima" },
        { name: "Lisbon, Portugal", offset: 0, id: "Europe/Lisbon" },
        { name: "London, UK", offset: 0, id: "Europe/London" },
        { name: "Madrid, Spain", offset: 1, id: "Europe/Madrid" },
        { name: "Manila, Philippines", offset: 8, id: "Asia/Manila" },
        { name: "Mexico City, Mexico", offset: -6, id: "America/Mexico_City" },
        { name: "Moscow, Russia", offset: 3, id: "Europe/Moscow" },
        { name: "New Delhi, India", offset: 5.5, id: "Asia/Kolkata" },
        { name: "New York, USA", offset: -5, id: "America/New_York" },
        { name: "Ottawa, Canada", offset: -5, id: "America/Toronto" },
        { name: "Paris, France", offset: 1, id: "Europe/Paris" },
        { name: "Rome, Italy", offset: 1, id: "Europe/Rome" },
        { name: "Seoul, South Korea", offset: 9, id: "Asia/Seoul" },
        { name: "Stockholm, Sweden", offset: 1, id: "Europe/Stockholm" },
        { name: "Sydney, Australia", offset: 10, id: "Australia/Sydney" },
        { name: "Tokyo, Japan", offset: 9, id: "Asia/Tokyo" },
        { name: "Washington DC, USA", offset: -5, id: "America/New_York" },
        { name: "Wellington, New Zealand", offset: 12, id: "Pacific/Auckland" },
        { name: "Zagreb, Croatia", offset: 1, id: "Europe/Zagreb" }
    ];

    function initClock() {
        updateClock();
        function animateClock(timestamp) {
            if (!lastUpdate || timestamp - lastUpdate >= updateInterval) {
                lastUpdate = timestamp;
                updateClock();
            }
            requestAnimationFrame(animateClock);
        }
        requestAnimationFrame(animateClock);
        
        renderTimezones();
        updateSystemInfo();
        setInterval(updateSystemInfo, 1000);
        generateCalendar();
        setupEventListeners();
        setInitialTheme();
        setInitialColorTheme();
        setAccessibilityAttributes();
        updateWeather();
        setInterval(updateWeather, 600000);
        setupPWA();
    }

    function setAccessibilityAttributes() {
        const progressBars = [
            { element: dayProgressElement, label: 'Day progress' },
            { element: weekProgressElement, label: 'Week progress' },
            { element: monthProgressElement, label: 'Month progress' },
            { element: daylightProgressElement, label: 'Daylight progress' }
        ];
        
        progressBars.forEach(bar => {
            if (bar.element) {
                bar.element.setAttribute('role', 'progressbar');
                bar.element.setAttribute('aria-valuenow', '0');
                bar.element.setAttribute('aria-valuemin', '0');
                bar.element.setAttribute('aria-valuemax', '100');
                bar.element.setAttribute('aria-label', bar.label);
            }
        });
    }

    function updateClock() {
        const now = new Date();
        updateMainTime(now);
        updateDate(now);
        updateProgressBars(now);
        updateTimezoneTimes(now);
        updateAnalogClock(now);
        updateAstronomicalData(now);
        updateAccessibilityAttributes(now);
        checkAlarms(now);
    }

    function updateAccessibilityAttributes(now) {
        const dayProgress = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400 * 100;
        const weekProgress = (now.getDay() * 86400 + now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / (7 * 86400) * 100;
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const monthProgress = (now.getDate() * 86400 + now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / (daysInMonth * 86400) * 100;
        
        dayProgressElement.setAttribute('aria-valuenow', Math.round(dayProgress));
        weekProgressElement.setAttribute('aria-valuenow', Math.round(weekProgress));
        monthProgressElement.setAttribute('aria-valuenow', Math.round(monthProgress));
        
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        if (!is24HourFormat) {
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
        
        const timeString = showSeconds ? 
            `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${is24HourFormat ? '' : ampm}` :
            `${padZero(hours)}:${padZero(minutes)} ${is24HourFormat ? '' : ampm}`;
            
        timeElement.setAttribute('aria-label', `Current time: ${timeString}`);
    }

    function updateMainTime(now) {
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        if (!is24HourFormat) {
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
        
        timeElement.textContent = showSeconds ? 
            `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}` :
            `${padZero(hours)}:${padZero(minutes)}`;
        
        periodElement.textContent = is24HourFormat ? '' : ampm;
        
        formatToggleElement.setAttribute('aria-checked', is24HourFormat);
        secondsToggleElement.setAttribute('aria-checked', showSeconds);
    }

    function updateDate(now) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    function updateProgressBars(now) {
        const dayProgress = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400 * 100;
        dayProgressElement.style.width = `${dayProgress}%`;
        
        const weekProgress = (now.getDay() * 86400 + now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / (7 * 86400) * 100;
        weekProgressElement.style.width = `${weekProgress}%`;
        
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const monthProgress = (now.getDate() * 86400 + now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / (daysInMonth * 86400) * 100;
        monthProgressElement.style.width = `${monthProgress}%`;
    }

    function renderTimezones() {
        timezoneListElement.innerHTML = '';
        timezones.forEach(tz => {
            const tzElement = document.createElement('div');
            tzElement.className = 'timezone-item';
            tzElement.setAttribute('role', 'listitem');
            tzElement.setAttribute('aria-label', `Time in ${tz.name}`);
            tzElement.innerHTML = `
                <div class="timezone-name">${tz.name}</div>
                <div class="timezone-time" data-timezone="${tz.id}" aria-live="polite">00:00:00</div>
                <div class="timezone-offset">UTC${tz.offset >= 0 ? '+' : ''}${tz.offset}</div>
            `;
            timezoneListElement.appendChild(tzElement);
        });
    }

    function updateTimezoneTimes(now) {
        document.querySelectorAll('.timezone-time').forEach(element => {
            const tzId = element.dataset.timezone;
            const tz = timezones.find(t => t.id === tzId);
            if (tz) {
                const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
                const tzTime = new Date(utc + (3600000 * tz.offset));
                let hours = tzTime.getHours();
                let minutes = tzTime.getMinutes();
                let seconds = tzTime.getSeconds();
                if (!is24HourFormat) {
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                }
                element.textContent = showSeconds ? 
                    `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}` :
                    `${padZero(hours)}:${padZero(minutes)}`;
                const ampm = tzTime.getHours() >= 12 ? 'PM' : 'AM';
                const timeString = showSeconds ? 
                    `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${is24HourFormat ? '' : ampm}` :
                    `${padZero(hours)}:${padZero(minutes)} ${is24HourFormat ? '' : ampm}`;
                element.setAttribute('aria-label', timeString);
            }
        });
    }

    function updateSystemInfo() {
        const now = new Date();
        unixTimeElement.textContent = Math.floor(now.getTime() / 1000);
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        dayOfYearElement.textContent = dayOfYear;
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        weekNumberElement.textContent = weekNumber;
        const isLeapYear = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0);
        leapYearElement.textContent = isLeapYear ? 'Yes' : 'No';
        const timezoneOffset = -now.getTimezoneOffset() / 60;
        timezoneElement.textContent = `UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;
        browserTimeElement.textContent = now.toLocaleTimeString();
        const timeSinceLoad = Math.floor((now - pageLoadTime) / 1000);
        const hours = Math.floor(timeSinceLoad / 3600);
        const minutes = Math.floor((timeSinceLoad % 3600) / 60);
        const seconds = timeSinceLoad % 60;
        pageLoadedElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function updateAnalogClock(now) {
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours() % 12;
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        secondHandElement.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHandElement.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHandElement.style.transform = `rotate(${hoursDegrees}deg)`;
        const analogClock = document.querySelector('.analog-clock');
        if (analogClock) {
            const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            analogClock.setAttribute('aria-label', `Analog clock showing ${timeString}`);
        }
    }

    function updateAstronomicalData(now) {
        const lunarCycle = 29.530588853;
        const knownNewMoon = new Date(2023, 0, 21, 20, 53);
        const daysSinceNewMoon = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
        const moonAge = daysSinceNewMoon % lunarCycle;
        const phaseAngle = 2 * Math.PI * moonAge / lunarCycle;
        const illumination = 0.5 * (1 - Math.cos(phaseAngle)) * 100;
        let moonPhaseText;
        let moonRotation = 0;
        if (moonAge < 1) moonPhaseText = "New Moon";
        else if (moonAge < 6.5) {
            moonPhaseText = "Waxing Crescent";
            moonRotation = 180 * (moonAge / 6.5);
        }
        else if (moonAge < 7.8) {
            moonPhaseText = "First Quarter";
            moonRotation = 180;
        }
        else if (moonAge < 13.5) {
            moonPhaseText = "Waxing Gibbous";
            moonRotation = 180 + 90 * ((moonAge - 7.8) / 5.7);
        }
        else if (moonAge < 15.5) {
            moonPhaseText = "Full Moon";
            moonRotation = 270;
        }
        else if (moonAge < 21.2) {
            moonPhaseText = "Waning Gibbous";
            moonRotation = 270 + 90 * ((moonAge - 15.5) / 5.7);
        }
        else if (moonAge < 22.5) {
            moonPhaseText = "Last Quarter";
            moonRotation = 0;
        }
        else {
            moonPhaseText = "Waning Crescent";
            moonRotation = 90 * ((moonAge - 22.5) / 7.03);
        }
        moonPhaseElement.textContent = moonPhaseText;
        moonIlluminationElement.textContent = `${illumination.toFixed(1)}% illuminated`;
        const isWaxing = moonAge < lunarCycle / 2;
        const shadowDirection = isWaxing ? 1 : -1;
        moonFillElement.style.transform = `scale(${illumination / 100}) rotate(${moonRotation}deg)`;
        moonFillElement.style.opacity = Math.min(1, illumination / 100 + 0.2);
        moonFillElement.style.boxShadow = `
            inset ${shadowDirection * 5}px 0 15px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(255, 255, 255, ${illumination / 200})
        `;
        const lat = 40;
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const declination = 23.45 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365);
        const hourAngle = Math.acos(-Math.tan(lat * Math.PI/180) * Math.tan(declination * Math.PI/180)) * 180/Math.PI;
        const sunriseHour = 12 - hourAngle/15 - (now.getTimezoneOffset()/60 - (now.getTimezoneOffset() < 0 ? -1 : 1));
        const sunsetHour = 12 + hourAngle/15 - (now.getTimezoneOffset()/60 - (now.getTimezoneOffset() < 0 ? -1 : 1));
        const sunriseMins = Math.floor((sunriseHour % 1) * 60);
        const sunsetMins = Math.floor((sunsetHour % 1) * 60);
        const daylightHours = Math.floor(sunsetHour - sunriseHour);
        const daylightMins = Math.floor((sunsetHour - sunriseHour) % 1 * 60);
        const formatTime = (hours) => {
            if (is24HourFormat) {
                return `${Math.floor(hours)}:${padZero(Math.floor((hours % 1) * 60))}`;
            } else {
                const period = hours >= 12 ? 'PM' : 'AM';
                const twelveHour = hours % 12 || 12;
                return `${Math.floor(twelveHour)}:${padZero(Math.floor((hours % 1) * 60))} ${period}`;
            }
        };
        sunriseElement.textContent = formatTime(sunriseHour);
        sunsetElement.textContent = formatTime(sunsetHour);
        daylightElement.textContent = `${daylightHours}h ${padZero(daylightMins)}m`;
        const currentHour = now.getHours() + now.getMinutes() / 60;
        const daylightProgress = (currentHour - sunriseHour) / (sunsetHour - sunriseHour);
        if (daylightProgressElement) {
            daylightProgressElement.style.width = `${Math.max(0, Math.min(100, daylightProgress * 100))}%`;
            daylightProgressElement.setAttribute('aria-valuenow', Math.round(daylightProgress * 100));
        }
        const zodiacSigns = [
            "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
            "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
        ];
        const moonZodiacIndex = Math.floor((moonAge / lunarCycle) * 12);
        if (moonZodiacElement) {
            moonZodiacElement.textContent = zodiacSigns[moonZodiacIndex];
        }
    }

    function generateCalendar() {
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        calendarMonthElement.textContent = `${monthNames[month]} ${year}`;
        calendarMonthElement.setAttribute('aria-live', 'polite');
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        calendarDaysElement.innerHTML = '';
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            emptyCell.setAttribute('aria-hidden', 'true');
            calendarDaysElement.appendChild(emptyCell);
        }
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = i;
            dayCell.setAttribute('role', 'button');
            dayCell.setAttribute('tabindex', '0');
            dayCell.setAttribute('aria-label', `${monthNames[month]} ${i}, ${year}`);
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('current-day');
                dayCell.setAttribute('aria-current', 'date');
            }
            calendarDaysElement.appendChild(dayCell);
        }
    }

    function setupEventListeners() {
        themeToggleElement.addEventListener('change', function() {
            isDarkTheme = this.checked;
            this.setAttribute('aria-checked', isDarkTheme);
            document.body.classList.toggle('light-theme', !isDarkTheme);
            document.body.classList.toggle('dark-theme', isDarkTheme);
        });
        formatToggleElement.addEventListener('change', function() {
            is24HourFormat = this.checked;
            this.setAttribute('aria-checked', is24HourFormat);
            updateClock();
        });
        secondsToggleElement.addEventListener('change', function() {
            showSeconds = this.checked;
            this.setAttribute('aria-checked', showSeconds);
            updateClock();
        });
        glowToggleElement.addEventListener('change', function() {
            glowEffects = this.checked;
            this.setAttribute('aria-checked', glowEffects);
            document.body.classList.toggle('glow-effects', glowEffects);
        });
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => {
                    opt.classList.remove('selected');
                    opt.setAttribute('aria-selected', 'false');
                });
                this.classList.add('selected');
                this.setAttribute('aria-selected', 'true');
                const color = this.dataset.color || customColorInput.value;
                updateThemeColor(color);
            });
            option.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        customColorInput.addEventListener('change', function() {
            const customOption = document.querySelector('.custom-color-option');
            customOption.style.backgroundColor = this.value;
            customOption.classList.add('selected');
            customOption.setAttribute('aria-selected', 'true');
            colorOptions.forEach(opt => {
                if (opt !== customOption) {
                    opt.classList.remove('selected');
                    opt.setAttribute('aria-selected', 'false');
                }
            });
            updateThemeColor(this.value);
        });
        document.querySelector('.custom-color-option').addEventListener('click', function() {
            customColorInput.click();
        });
        resetThemeButton.addEventListener('click', function() {
            colorOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.setAttribute('aria-selected', 'false');
            });
            const defaultOption = document.querySelector('.color-option[data-color="#6A67CE"]');
            defaultOption.classList.add('selected');
            defaultOption.setAttribute('aria-selected', 'true');
            updateThemeColor('#6A67CE');
        });
        prevMonthButton.addEventListener('click', function() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            generateCalendar();
        });
        nextMonthButton.addEventListener('click', function() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            generateCalendar();
        });
        timezoneSearchElement.addEventListener('input', throttle(function() {
            const searchTerm = this.value.toLowerCase();
            const timezoneItems = document.querySelectorAll('.timezone-item');
            timezoneItems.forEach(item => {
                const timezoneName = item.querySelector('.timezone-name').textContent.toLowerCase();
                if (timezoneName.includes(searchTerm)) {
                    item.style.display = 'flex';
                    item.setAttribute('aria-hidden', 'false');
                } else {
                    item.style.display = 'none';
                    item.setAttribute('aria-hidden', 'true');
                }
            });
        }, 100));
        timezoneSearchElement.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
        fullscreenToggle.addEventListener('click', toggleFullScreen);
        setAlarmButton.addEventListener('click', addAlarm);
        alarmListElement.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                const index = Array.from(alarmListElement.children).indexOf(e.target.parentElement);
                alarms.splice(index, 1);
                e.target.parentElement.remove();
            }
        });
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }

    function setInitialTheme() {
        document.body.classList.add(isDarkTheme ? 'dark-theme' : 'light-theme');
        document.body.classList.add(glowEffects ? 'glow-effects' : '');
        themeToggleElement.checked = isDarkTheme;
        themeToggleElement.setAttribute('aria-checked', isDarkTheme);
        formatToggleElement.checked = is24HourFormat;
        formatToggleElement.setAttribute('aria-checked', is24HourFormat);
        secondsToggleElement.checked = showSeconds;
        secondsToggleElement.setAttribute('aria-checked', showSeconds);
        glowToggleElement.checked = glowEffects;
        glowToggleElement.setAttribute('aria-checked', glowEffects);
    }

    function updateThemeColor(color) {
        selectedColor = color;
        document.documentElement.style.setProperty('--primary', color);
        document.documentElement.style.setProperty('--glow-primary', `0 0 10px ${color}, 0 0 20px ${color}`);
        localStorage.setItem('selectedColor', color);
    }

    function setInitialColorTheme() {
        const savedColor = localStorage.getItem('selectedColor') || '#6A67CE';
        updateThemeColor(savedColor);
        colorOptions.forEach(option => {
            if (option.dataset.color === savedColor) {
                option.classList.add('selected');
                option.setAttribute('aria-selected', 'true');
            } else if (!option.dataset.color && savedColor !== '#6A67CE') {
                option.style.backgroundColor = savedColor;
                option.classList.add('selected');
                option.setAttribute('aria-selected', 'true');
            } else {
                option.classList.remove('selected');
                option.setAttribute('aria-selected', 'false');
            }
        });
    }

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    async function updateWeather() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`);
                    const data = await response.json();
                    const weather = data.current;
                    currentWeatherElement.textContent = `${weather.temperature_2m}°C, Wind: ${weather.wind_speed_10m} km/h`;
                } catch (error) {
                    currentWeatherElement.textContent = 'Weather unavailable';
                }
            }, () => {
                currentWeatherElement.textContent = 'Location denied';
            });
        } else {
            currentWeatherElement.textContent = 'Geolocation not supported';
        }
    }

    function addAlarm() {
        const alarmTime = alarmTimeInput.value;
        if (alarmTime) {
            alarms.push(alarmTime);
            const li = document.createElement('li');
            li.textContent = alarmTime;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            li.appendChild(removeBtn);
            alarmListElement.appendChild(li);
            alarmTimeInput.value = '';
        }
    }

    function checkAlarms(now) {
        if (now.getSeconds() === 0) {
            const currentTime = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;
            if (alarms.includes(currentTime)) {
                playBeep();
                if (Notification.permission === 'granted') {
                    new Notification('Alarm!', { body: `It's ${currentTime}!` });
                } else {
                    alert(`Alarm: It's ${currentTime}!`);
                }
            }
        }
    }

    function playBeep() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 1000);
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    function setupPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('Service Worker registered'))
                .catch(err => console.error('Service Worker registration failed', err));
        }
    }

    initClock();
});