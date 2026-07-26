export default function WeatherStat({ icon: Icon, label, value }) {
  return (
    <article className="weather-stat">
      <div className="stat-icon">
        <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
