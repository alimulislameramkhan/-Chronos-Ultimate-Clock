# Chronos Ultimate Clock

Chronos Ultimate is an advanced digital clock web application built with HTML, CSS, and JavaScript. It offers a modern, feature-rich dashboard displaying time, date, world clocks, astronomical data, a calendar, and customizable settings like color themes and alarms. The application is designed to be visually appealing, accessible, and installable as a Progressive Web App (PWA).

## Features

- **Digital Clock**: Displays local time with options for 12/24-hour format and seconds toggle.
- **Analog Clock**: Visualizes time with hour, minute, and second hands.
- **World Clocks**: Shows real-time clocks for multiple timezones with a search feature.
- **Calendar**: Interactive monthly calendar highlighting the current day.
- **Astronomical Data**: Displays moon phase, illumination, zodiac position, sunrise/sunset times, and daylight progress.
- **Progress Bars**: Visualizes day, week, month, and daylight progress.
- **Time Information**: Shows UNIX time, day of year, week number, leap year status, timezone, and page load time.
- **Weather Integration**: Fetches local weather (temperature and wind speed) using the Open-Meteo API and geolocation.
- **Alarms**: Set and manage alarms with notifications and beep sounds.
- **Customizable Themes**:
  - Toggle between dark and light themes.
  - Choose from predefined color themes or pick a custom color.
  - Reset to the default purple theme (`#6A67CE`).
- **Glow Effects**: Optional neon-like glow effects for clock elements.
- **Full-Screen Mode**: Toggle full-screen display.
- **PWA Support**: Installable as a standalone app with offline capabilities.
- **Animated Background**: Gradient background with smooth animations.
- **Accessibility**: Includes ARIA attributes and keyboard navigation for improved usability.

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.).
- A local server (e.g., `python -m http.server`, XAMPP, or Node.js) for testing PWA and weather features.
- Internet connection for weather API calls.

### Setup
1. **Clone or Download the Repository**:
   - Clone this repository or download the project files.
   ```bash
   git clone <repository-url>
   ```

2. **Project Structure**:
   Ensure the following files are in your project directory:
   - `index.html`: Main HTML file.
   - `style.css`: Stylesheet for the application.
   - `script.js`: JavaScript logic for clock functionality.
   - `manifest.json`: PWA manifest file.
   - `sw.js`: Service Worker for offline support.
   - Icon files (`icon-192.png`, `icon-512.png`) for PWA.

3. **Create `manifest.json`**:
   Place this in the root directory:
   ```json
   {
     "name": "Chronos Ultimate Clock",
     "short_name": "Chronos",
     "start_url": ".",
     "display": "standalone",
     "background_color": "#1E2029",
     "theme_color": "#6A67CE",
     "icons": [
       {
         "src": "icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "icon-512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

4. **Create `sw.js`**:
   Place this in the root directory for PWA offline support:
   ```javascript
   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open('chronos-cache').then((cache) => {
         return cache.addAll([
           '/',
           '/index.html',
           '/style.css',
           '/script.js'
         ]);
       })
     );
   });

   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request).then((response) => {
         return response || fetch(event.request);
       })
     );
   });
   ```

5. **Serve the Application**:
   - Use a local server to serve the files:
     ```bash
     python -m http.server 8000
     ```
   - Open your browser and navigate to `http://localhost:8000`.

6. **PWA Installation**:
   - Access the app in a browser.
   - Click the browser’s “Install” button (usually in the address bar) to install as a PWA.
   - Ensure `icon-192.png` and `icon-512.png` are available in the root directory.

## Usage

- **Main Clock**:
  - View the current local time and date.
  - Toggle full-screen mode using the expand icon.
- **World Clocks**:
  - Search for timezones using the search bar.
  - Times update automatically based on your settings (12/24-hour format, seconds).
- **Calendar**:
  - Navigate months using the previous/next buttons.
  - The current day is highlighted.
- **Astronomy**:
  - View moon phase, illumination, zodiac, sunrise/sunset times, and daylight progress.
- **Weather**:
  - Allow geolocation to display local weather (temperature and wind speed).
- **Alarms**:
  - Set alarms using the time input and “Set Alarm” button.
  - Alarms trigger browser notifications and a beep sound.
  - Remove alarms by clicking the “Remove” button next to each alarm.
- **Settings**:
  - Toggle dark/light theme, 24-hour format, seconds display, and glow effects.
  - Select a color theme from predefined options or use the custom color picker (click the “+”).
  - Click “Reset Theme” to revert to the default purple theme (`#6A67CE`).

## Development

### Technologies Used
- **HTML5**: Structure of the application.
- **CSS3**: Styling with CSS variables, animations, and responsive design.
- **JavaScript**: Core logic, including time calculations, event handling, and API integration.
- **Open-Meteo API**: For weather data.
- **Font Awesome**: For icons.
- **Google Fonts**: Orbitron and Exo 2 fonts for typography.
- **Service Worker & Web Manifest**: For PWA functionality.

### Customization
- **Add Timezones**: Modify the `timezones` array in `script.js` to include additional cities.
- **Change Default Theme**: Update the `--primary` color in `style.css` and the default color in `script.js`.
- **Enhance Weather Data**: Extend the `updateWeather` function in `script.js` to fetch more weather details from the Open-Meteo API.

### Notes
- The weather feature requires geolocation permission and an internet connection.
- Alarms use browser notifications; ensure notifications are enabled in your browser.
- The moon phase and astronomical calculations are simplified approximations.
- For best performance, serve the app over HTTPS in production for PWA functionality.

## Troubleshooting

- **Color Theme Not Changing**:
  - Ensure `updateThemeColor` in `script.js` is updating the `--primary` CSS variable.
  - Check `localStorage` for saved color (`selectedColor`).
- **Weather Not Loading**:
  - Verify geolocation is enabled in your browser.
  - Check the console for API errors (`https://api.open-meteo.com`).
- **PWA Not Installing**:
  - Ensure `manifest.json` and `sw.js` are correctly configured and accessible.
  - Serve the app over HTTPS or localhost.
- **Alarms Not Triggering**:
  - Confirm notifications are allowed in your browser.
  - Check that the system time matches the alarm time format.

## Contributing

Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Author

Created with ❤️ by Alimul Islam Eram Khan.