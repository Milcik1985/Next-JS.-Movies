import React from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constance/links";
import cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MovieWrapper from "../../components/MovieWrapper/MovieWrapper";

const Movie = () => {
  const [movie, setMovie] = useState();
  const router = useRouter();
  const fetchedMovie = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.get(
        `${process.env.SERVER_URL}/movies/${router.query.id}`,
        {
          headers,
        }
      );

      setMovie(response.data.movie);
    } catch (err) {
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    router.query.id && fetchedMovie();
  }, [router]);

  return (
    <div>
      <Header links={links} />
      {movie && <MovieWrapper movie={movie} />}
    </div>
  );
};

export default Movie;
