function StatCard({ value, label, sub, valueClassName = "" }) {
  return (
    <div className="stat-card">
      <span className={`stat-card-value ${valueClassName}`.trim()}>{value}</span>
      <p className="stat-card-label">{label}</p>
      <p className="stat-card-sub">{sub}</p>
    </div>
  );
}

export default StatCard;
