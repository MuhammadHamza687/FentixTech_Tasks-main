# FentixTech Tasks

A collection of frontend internship tasks. React tasks are available in `Task11-TodoApp` and `Task12-WeatherApp`.

## Task 11 - React To-Do List

```bash
cd Task11-TodoApp
npm install
npm run dev
```

## Task 12 - Weather App

```bash
cd Task12-WeatherApp
npm install
npm run dev
```

The app uses Open-Meteo for geocoding and live weather data, so no API key is required.

For Vercel deployment:

- Root directory: repository root
- Build command: `npm run build`
- Publish directory: `dist`

Task 12 is a static React/Vite app, so it does not need a separate Node server.

The root build script keeps the tasks hub at `/` and copies React apps to `/Task11-TodoApp/` and `/Task12-WeatherApp/`.
