import React from "react";
import { MovieType } from "../../types/movie";
import styles from "./MovieWrapper.module.css";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import axios from "axios";
import Button from "../Button/Button";

type MovieWrapperProps = {
  movie: MovieType;
};

const MovieWrapper = ({ movie }: MovieWrapperProps) => {
  const router = useRouter();

  const deleteMovie = async (id: string) => {
    console.log("Deleting movie with ID:", id);
    try {
      if (!router.query.id) {
        console.log("Invalid movie ID");
        return;
      }
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/movies/${id}`,
        {
          headers,
        }
      );

      console.log(response);

      if (response.status === 200) {
        router.push("/");
      }

      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.blurBackground}>
          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={movie.imageUrl}
                alt="Movie Image"
              />
            </div>
            <div className={styles.contentWrapper}>
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Rating: {movie.rating}</p>
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.deleteBtn}
                  type="WARNING"
                  isLoading={false}
                  title="Delete Movie"
                  onClick={() => deleteMovie(movie.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieWrapper;
