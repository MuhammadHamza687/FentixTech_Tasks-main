import { getOpenMeteoDetails, getWeatherDetails } from "../utils/weatherCodes.js";

const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("OpenWeatherMap rejected the API key. Check VITE_OPENWEATHER_API_KEY and confirm the key is active.");
    }

    throw new Error(data.message || data.reason || "Weather service is unavailable right now.");
  }

  return data;
}

async function getOpenWeatherMapByCity(cityName, signal) {
  const params = new URLSearchParams({
    q: cityName,
    appid: API_KEY,
    units: "metric"
  });

  const weatherData = await fetchJson(`${CURRENT_WEATHER_URL}?${params}`, signal);

  if (!weatherData.main || !weatherData.weather?.[0]) {
    throw new Error("Weather details are not available for this city.");
  }

  const currentWeather = weatherData.weather[0];
  const isDay = weatherData.sys?.sunrise && weatherData.sys?.sunset
    ? weatherData.dt >= weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset
    : true;
  const details = getWeatherDetails(currentWeather.id, isDay);
  const localTime = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(new Date((weatherData.dt + weatherData.timezone) * 1000));

  return {
    city: weatherData.name,
    locationLabel: [weatherData.name, weatherData.sys?.country].filter(Boolean).join(", "),
    latitude: weatherData.coord?.lat,
    longitude: weatherData.coord?.lon,
    temperature: Math.round(weatherData.main.temp),
    temperatureUnit: "C",
    apparentTemperature: Math.round(weatherData.main.feels_like),
    condition: currentWeather.description.replace(/^./, (letter) => letter.toUpperCase()),
    humidity: weatherData.main.humidity,
    humidityUnit: "%",
    windSpeed: Math.round((weatherData.wind?.speed || 0) * 3.6),
    windSpeedUnit: "km/h",
    windDirection: Math.round(weatherData.wind?.deg || 0),
    windDirectionUnit: "deg",
    weatherCode: String(currentWeather.id),
    localTime,
    icon: details.icon,
    tone: details.tone
  };
}

function formatWeatherTime(value) {
  if (!value || !value.includes("T")) {
    return "just now";
  }

  const [date, time] = value.split("T");
  const [hours, minutes] = time.split(":");
  return `${date} at ${hours}:${minutes}`;
}

async function getOpenMeteoByCity(cityName, signal) {
  const locationParams = new URLSearchParams({
    name: cityName,
    count: "1",
    language: "en",
    format: "json"
  });
  const locationData = await fetchJson(`${GEOCODING_URL}?${locationParams}`, signal);
  const location = locationData.results?.[0];

  if (!location) {
    throw new Error("City not found. Please check the spelling and try again.");
  }

  const weatherParams = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto"
  });
  const weatherData = await fetchJson(`${FORECAST_URL}?${weatherParams}`, signal);

  if (!weatherData.current) {
    throw new Error("Weather details are not available for this city.");
  }

  const { current, current_units: units = {} } = weatherData;
  const details = getOpenMeteoDetails(current.weather_code, current.is_day === 1);

  return {
    city: location.name,
    locationLabel: [location.admin1, location.country].filter(Boolean).join(", ") || location.country || "Selected city",
    latitude: location.latitude,
    longitude: location.longitude,
    temperature: Math.round(current.temperature_2m),
    temperatureUnit: units.temperature_2m || "C",
    apparentTemperature: Math.round(current.apparent_temperature),
    condition: details.label,
    humidity: current.relative_humidity_2m,
    humidityUnit: units.relative_humidity_2m || "%",
    windSpeed: Math.round(current.wind_speed_10m),
    windSpeedUnit: units.wind_speed_10m || "km/h",
    windDirection: Math.round(current.wind_direction_10m),
    windDirectionUnit: units.wind_direction_10m || "deg",
    weatherCode: String(current.weather_code),
    localTime: formatWeatherTime(current.time),
    icon: details.icon,
    tone: details.tone
  };
}

export async function getWeatherByCity(cityName, signal) {
  let openWeatherError;

  if (API_KEY) {
    try {
      return await getOpenWeatherMapByCity(cityName, signal);
    } catch (error) {
      if (error.name === "AbortError") {
        throw error;
      }
      openWeatherError = error;
    }
  }

  try {
    const weather = await getOpenMeteoByCity(cityName, signal);
    return {
      ...weather,
      notice: API_KEY
        ? "OpenWeatherMap is unavailable right now. Showing live fallback data from Open-Meteo."
        : "OpenWeatherMap is not configured yet. Showing live fallback data from Open-Meteo."
    };
  } catch (fallbackError) {
    if (fallbackError.name === "AbortError") {
      throw fallbackError;
    }

    if (openWeatherError) {
      throw new Error(`OpenWeatherMap failed: ${openWeatherError.message} Open-Meteo fallback failed: ${fallbackError.message}`);
    }

    throw fallbackError;
  }
}
