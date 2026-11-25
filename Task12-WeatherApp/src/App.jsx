import { useCallback, useEffect, useRef, useState } from "react";
import { CloudSun } from "lucide-react";
import SearchBar from "./components/SearchBar.jsx";
import StatusMessage from "./components/StatusMessage.jsx";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
import { getWeatherByCity } from "./services/weatherApi.js";

const DEFAULT_CITY = "Karachi";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const activeRequest = useRef(null);

  const loadWeather = useCallback(async (cityName) => {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    activeRequest.current?.abort();

    const controller = new AbortController();
    activeRequest.current = controller;
    setIsLoading(true);
    setError("");

    try {
      const weatherData = await getWeatherByCity(trimmedCity, controller.signal);
      setWeather(weatherData);
    } catch (requestError) {
      if (requestError.name === "AbortError") {
        return;
      }

      setWeather(null);
      setError(
        requestError.message ||
          "Something went wrong while fetching weather details."
      );
    } finally {
      if (activeRequest.current === controller) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadWeather(DEFAULT_CITY);

    return () => {
      activeRequest.current?.abort();
    };
  }, [loadWeather]);

  return (
    <main className="app-shell">
      <section className="weather-app" aria-labelledby="app-title">
        <header className="app-header">
          <div>
            <p className="eyebrow">Task 12</p>
            <h1 id="app-title">Weather Now</h1>
          </div>
          <span className="live-badge">
            <CloudSun aria-hidden="true" size={18} />
            Live data
          </span>
        </header>

        <SearchBar
          initialCity={DEFAULT_CITY}
          isLoading={isLoading}
          onSearch={loadWeather}
        />

        <div className="status-stack" aria-live="polite">
          {isLoading && (
            <StatusMessage
              type="loading"
              message={weather ? "Refreshing weather data..." : "Fetching weather data..."}
            />
          )}

          {error && <StatusMessage type="error" message={error} />}
          {weather?.notice && <StatusMessage type="notice" message={weather.notice} />}
        </div>

        {weather && <WeatherDisplay weather={weather} />}
      </section>
    </main>
  );
}
