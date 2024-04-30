// MovieCardSkeleton.tsx
import React from "react";
import "./MovieCardSkeleton.css";

const MovieCardSkeleton = () =>
{
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-details">
        <div className="skeleton-details-top">
          <div className="skeleton-title"></div>
          <div className="skeleton-genres"></div>
        </div>
        <div className="skeleton-details-bottom">
          <div className="skeleton-button"></div>
          <div className="skeleton-rating"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
