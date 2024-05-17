import React from "react";
import { MovieType } from "@/types/movie";
import styles from "./Card.module.css";
import Link from "next/link";

type CardProps = {
  movie: MovieType;
};

const Card = ({ movie }: CardProps) => {
  return (
    <>
      <Link href={`/movie/${movie.id}`} className={styles.cardContainer}>
        <div className={styles.blurBackground} />
        <div className={styles.content}>
          <img
            className={styles.image}
            src={movie.imageUrl}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>Genre: {movie.genre}</p>
          <p>Rating: {movie.rating}</p>
        </div>
      </Link>
    </>
  );
};

export default Card;
