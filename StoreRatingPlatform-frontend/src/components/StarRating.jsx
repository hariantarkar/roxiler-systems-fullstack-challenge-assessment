const StarRating = ({ value, onRate }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <i
          key={star}
          className={`bi ${star <= value ? "bi-star-fill" : "bi-star"} text-warning me-1`}
          style={{ cursor: "pointer", fontSize: "1.1rem" }}
          onClick={() => onRate(star)}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
