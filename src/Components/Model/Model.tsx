// Modal.js
import noImage from "../../Assets/noImage.png";
import {getPosterPath} from "../../Services/api";
import {Genre} from "../../Types/Types";
import {Movie} from "../../Types/Types";
import "./Model.css";

type ModelProps = {
  movie: Movie;
  genres: Genre[];
  onClose: () => void;
}

const Modal = ({movie, genres, onClose}: ModelProps) =>
{
  const movieGenres = movie.genre_ids.map((genreId) =>
    genres.find((genre) => genre.id === genreId)?.name
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span
          className="close-button"
          onClick={onClose}
        >
          &times;
        </span>
        <div className="modal-body">
          <div className="modal-image-container">
            {movie.poster_path ? (
              <img
                src={getPosterPath(movie.poster_path)}
                alt={movie.title}
                className="movie-image"
              />
            ) : (
              <img
                src={noImage}
                alt="No Image"
                className="movie-image"
              />
            )}
          </div>
          <div className="modal-details">
            <h2>{movie.title}</h2>
            <div className="movie-info">
              <div className="genres">
                {movieGenres.join(" • ")}
              </div>
              <p>{movie.overview}</p>

            </div>
            <div className="release-date">
              <strong>Release Date:</strong> {movie.release_date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
