import { getWeatherDetails } from "../utils/weatherCodes.js";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    let reason = "";

    try {
      const data = await response.json();
      reason = data.reason || data.message || "";
    } catch {
      reason = "";
    }

    throw new Error(reason || "Weather service is unavailable right now.");
  }

  return response.json();
}

function buildLocationLabel(location) {
  return [location.admin1, location.country].filter(Boolean).join(", ");
}

function formatWeatherTime(value) {
  if (!value || !value.includes("T")) {
    return "just now";
  }

  const [date, time] = value.split("T");
  const [hours, minutes] = time.split(":");

  return `${date} at ${hours}:${minutes}`;
}

export async function getWeatherByCity(cityName, signal) {
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
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto"
  });

  const weatherData = await fetchJson(`${FORECAST_URL}?${weatherParams}`, signal);

  if (!weatherData.current) {
    throw new Error("Weather details are not available for this city.");
  }

  const { current, current_units: units = {} } = weatherData;
  const details = getWeatherDetails(current.weather_code, current.is_day === 1);

  return {
    city: location.name,
    locationLabel: buildLocationLabel(location) || location.country || "Selected city",
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
