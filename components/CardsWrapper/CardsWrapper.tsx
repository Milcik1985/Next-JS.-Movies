import React from "react";
import Card from "../Card/Card";
import { MovieType } from "@/types/movie";
import styles from "./CardsWrapper.module.css";

type CardsWrapperProps = {
  movies: MovieType[];
};

const CardsWrapper = ({ movies }: CardsWrapperProps) => {
  return (
    <div className={styles.cardWrapper}>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default CardsWrapper;
