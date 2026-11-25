export function getWeatherDetails(code, isDay) {
  const numericCode = Number(code);
  let details;

  if (numericCode >= 200 && numericCode < 300) {
    details = { icon: "cloudLightning", tone: "storm" };
  } else if (numericCode >= 300 && numericCode < 400) {
    details = { icon: "cloudDrizzle", tone: "rainy" };
  } else if (numericCode >= 500 && numericCode < 600) {
    details = { icon: "cloudRain", tone: "rainy" };
  } else if (numericCode >= 600 && numericCode < 700) {
    details = { icon: "cloudSnow", tone: "snowy" };
  } else if (numericCode >= 700 && numericCode < 800) {
    details = { icon: "cloudFog", tone: "mist" };
  } else if (numericCode === 800) {
    details = isDay
      ? { icon: "sun", tone: "sunny" }
      : { icon: "moon", tone: "night" };
  } else if (numericCode === 801) {
    details = isDay
      ? { icon: "cloudSun", tone: "sunny" }
      : { icon: "cloudMoon", tone: "night" };
  } else {
    details = { icon: "cloud", tone: "cloudy" };
  }

  return details;
}

const openMeteoCodeMap = {
  0: { label: "Clear sky", icon: "sun", tone: "sunny" },
  1: { label: "Mainly clear", icon: "cloudSun", tone: "sunny" },
  2: { label: "Partly cloudy", icon: "cloudSun", tone: "cloudy" },
  3: { label: "Overcast", icon: "cloud", tone: "cloudy" },
  45: { label: "Fog", icon: "cloudFog", tone: "mist" },
  48: { label: "Depositing rime fog", icon: "cloudFog", tone: "mist" },
  51: { label: "Light drizzle", icon: "cloudDrizzle", tone: "rainy" },
  53: { label: "Moderate drizzle", icon: "cloudDrizzle", tone: "rainy" },
  55: { label: "Dense drizzle", icon: "cloudDrizzle", tone: "rainy" },
  56: { label: "Light freezing drizzle", icon: "cloudDrizzle", tone: "rainy" },
  57: { label: "Dense freezing drizzle", icon: "cloudDrizzle", tone: "rainy" },
  61: { label: "Slight rain", icon: "cloudRain", tone: "rainy" },
  63: { label: "Moderate rain", icon: "cloudRain", tone: "rainy" },
  65: { label: "Heavy rain", icon: "cloudRain", tone: "rainy" },
  66: { label: "Light freezing rain", icon: "cloudRain", tone: "rainy" },
  67: { label: "Heavy freezing rain", icon: "cloudRain", tone: "rainy" },
  71: { label: "Slight snow", icon: "cloudSnow", tone: "snowy" },
  73: { label: "Moderate snow", icon: "cloudSnow", tone: "snowy" },
  75: { label: "Heavy snow", icon: "cloudSnow", tone: "snowy" },
  77: { label: "Snow grains", icon: "cloudSnow", tone: "snowy" },
  80: { label: "Slight rain showers", icon: "cloudRain", tone: "rainy" },
  81: { label: "Moderate rain showers", icon: "cloudRain", tone: "rainy" },
  82: { label: "Violent rain showers", icon: "cloudRain", tone: "storm" },
  85: { label: "Slight snow showers", icon: "cloudSnow", tone: "snowy" },
  86: { label: "Heavy snow showers", icon: "cloudSnow", tone: "snowy" },
  95: { label: "Thunderstorm", icon: "cloudLightning", tone: "storm" },
  96: { label: "Thunderstorm with slight hail", icon: "cloudLightning", tone: "storm" },
  99: { label: "Thunderstorm with heavy hail", icon: "cloudLightning", tone: "storm" }
};

export function getOpenMeteoDetails(code, isDay) {
  const numericCode = Number(code);
  const details = openMeteoCodeMap[numericCode] || {
    label: "Mixed conditions",
    icon: "cloudSun",
    tone: "cloudy"
  };

  if (!isDay && numericCode === 0) {
    return { ...details, icon: "moon", tone: "night" };
  }

  if (!isDay && [1, 2].includes(numericCode)) {
    return { ...details, icon: "cloudMoon", tone: "night" };
  }

  return details;
}
