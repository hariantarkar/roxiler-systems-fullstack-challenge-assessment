import { useState } from "react";
import StarRating from "./StarRating.jsx";
import { submitRating } from "../api/userApi.js";

const StoreCard = ({ store, onRated }) => {
  const [saving, setSaving] = useState(false);

  const handleRate = async (rating) => {
    setSaving(true);
    try {
      await submitRating(store.sid, rating);
      onRated();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="col-md-6 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{store.name}</h5>
          <p className="text-muted mb-2">{store.address}</p>
          <p className="mb-1">
            Overall Rating: <strong>{store.overallRating ?? "No ratings yet"}</strong>
          </p>
          <p className="mb-1">Your Rating:</p>
          <StarRating value={store.userRating || 0} onRate={handleRate} />
          {saving && <small className="text-muted d-block mt-1">Saving...</small>}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
