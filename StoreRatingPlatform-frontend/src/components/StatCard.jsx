const StatCard = ({ label, value }) => (
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h2 className="mb-0">{value}</h2>
        <small className="text-muted">{label}</small>
      </div>
    </div>
  </div>
);

export default StatCard;