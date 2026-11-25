# Task 12 - Weather App

A responsive React weather application for the final FentixTech task. It searches cities, fetches live weather data, and displays temperature, condition, humidity, wind speed, wind direction, and a condition icon.

## Features

- React component structure with reusable search, status, display, and stat components
- City search with invalid-city error handling
- Loading feedback while weather data is being fetched
- Live current weather from OpenWeatherMap, with Open-Meteo as an automatic fallback
- OpenWeatherMap is tried first when an API key is configured; fallback weather needs no key
- Responsive layout for mobile, tablet, and desktop screens

## Tech Stack

- React.js
- Vite
- Lucide React icons
- OpenWeatherMap Current Weather API
- Open-Meteo Geocoding API and Forecast API as fallback providers

## Setup

```bash
cd Task12-WeatherApp
npm install
```

To use OpenWeatherMap as the primary provider, create `.env.local` in the repository root (beside the main `package.json`) and add your API key. Without a configured key, or if OpenWeatherMap is unavailable, the app automatically uses Open-Meteo and displays a fallback notice.

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

Then start the app:

```bash
npm run dev
```

Open the local URL printed by Vite in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Deployment

This project is a static React/Vite app. It does not need a separate Node.js server, Express server, or Next.js conversion for Vercel.

Recommended Vercel setup from the repository root:

- Root directory: repository root
- Build command: `npm run build`
- Publish directory: `dist`

This keeps the main tasks hub at `/` and serves this weather app from `/Task12-WeatherApp/`.

Alternative setup if you deploy this folder directly:

- Root directory: `Task12-WeatherApp`
- Build command: `npm run build`
- Publish directory: `dist`

The included `vercel.json` keeps these settings in the project. This app does not use client-side routes, so no catch-all rewrite is needed.

For deployment, add `VITE_OPENWEATHER_API_KEY` in the Vercel project's Environment Variables and redeploy. Vite embeds `VITE_` variables in the browser bundle, so this client-side key is suitable for a learning prototype only. A production app should proxy weather requests through a serverless function to keep the key private.

If you deploy the whole repository instead of selecting `Task12-WeatherApp` as the root, the repository-level `vercel.json` will build and publish this task automatically.

## Project Structure

```text
Task12-WeatherApp/
  src/
    components/
      SearchBar.jsx
      StatusMessage.jsx
      WeatherDisplay.jsx
      WeatherStat.jsx
    services/
      weatherApi.js
    utils/
      weatherCodes.js
    App.jsx
    App.css
    main.jsx
```
