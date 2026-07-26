# Task 12 - Weather App

A responsive React weather application for the final FentixTech task. It searches cities, fetches live weather data, and displays temperature, condition, humidity, wind speed, wind direction, and a condition icon.

## Features

- React component structure with reusable search, status, display, and stat components
- City search with invalid-city error handling
- Loading feedback while weather data is being fetched
- Live weather data from Open-Meteo, so no API key is required
- Responsive layout for mobile, tablet, and desktop screens

## Tech Stack

- React.js
- Vite
- Lucide React icons
- Open-Meteo Geocoding API and Forecast API

## Setup

```bash
cd Task12-WeatherApp
npm install
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

For Vercel:

- Root directory: `Task12-WeatherApp`
- Build command: `npm run build`
- Publish directory: `dist`

The included `vercel.json` keeps these settings in the project and rewrites all routes back to `index.html`.

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
