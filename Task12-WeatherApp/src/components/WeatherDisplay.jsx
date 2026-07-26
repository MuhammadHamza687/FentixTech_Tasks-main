import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Moon,
  Sun,
  ThermometerSun,
  Wind
} from "lucide-react";
import WeatherStat from "./WeatherStat.jsx";

const weatherIcons = {
  cloud: Cloud,
  cloudDrizzle: CloudDrizzle,
  cloudFog: CloudFog,
  cloudLightning: CloudLightning,
  cloudMoon: CloudMoon,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  cloudSun: CloudSun,
  moon: Moon,
  sun: Sun
};

export default function WeatherDisplay({ weather }) {
  const WeatherIcon = weatherIcons[weather.icon] || CloudSun;

  return (
    <div className="weather-content">
      <section className={`current-weather ${weather.tone}`}>
        <div className="location-row">
          <MapPin aria-hidden="true" size={18} />
          <span>{weather.locationLabel}</span>
        </div>

        <div className="weather-summary">
          <div className="weather-icon" aria-label={weather.condition} role="img">
            <WeatherIcon aria-hidden="true" size={92} strokeWidth={1.4} />
          </div>

          <div>
            <p className="condition">{weather.condition}</p>
            <h2>{weather.city}</h2>
            <p className="updated">Updated {weather.localTime}</p>
          </div>
        </div>

        <div className="temperature-row">
          <span className="temperature-value">{weather.temperature}</span>
          <span className="temperature-unit">{weather.temperatureUnit}</span>
        </div>
      </section>

      <section className="stats-grid" aria-label="Weather details">
        <WeatherStat
          icon={ThermometerSun}
          label="Feels like"
          value={`${weather.apparentTemperature}${weather.temperatureUnit}`}
        />
        <WeatherStat
          icon={Droplets}
          label="Humidity"
          value={`${weather.humidity}${weather.humidityUnit}`}
        />
        <WeatherStat
          icon={Wind}
          label="Wind speed"
          value={`${weather.windSpeed} ${weather.windSpeedUnit}`}
        />
        <WeatherStat
          icon={Gauge}
          label="Wind direction"
          value={`${weather.windDirection}${weather.windDirectionUnit}`}
        />
        <WeatherStat
          icon={Eye}
          label="Condition code"
          value={weather.weatherCode}
        />
      </section>
    </div>
  );
}
