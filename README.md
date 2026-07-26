# FentixTech Tasks

A collection of frontend internship tasks. The final React task is available in `Task12-WeatherApp`.

## Task 12 - Weather App

```bash
cd Task12-WeatherApp
npm install
npm run dev
```

The app uses Open-Meteo for geocoding and live weather data, so no API key is required.

For Vercel deployment:

- Root directory: `Task12-WeatherApp`
- Build command: `npm run build`
- Publish directory: `dist`

Task 12 is a static React/Vite app, so it does not need a separate Node server.

If Vercel is connected to the whole repository, the root `vercel.json` builds `Task12-WeatherApp` and serves its `dist` folder.
